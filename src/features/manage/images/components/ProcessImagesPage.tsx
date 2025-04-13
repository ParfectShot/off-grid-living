import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs';
import { Search } from 'lucide-react';
import { ProcessedImage, S3Image } from '~/types/s3-types';
import {
  UploadTab,
  ProcessedImagesTab,
  ImageVariantModal,
  S3BrowserView,
  S3ConfigDialog,
} from '~/features/manage/images/components';
import { useImageProcessing, useConvexImageStore, useS3Management } from '~/features/manage/images/';
import { Id } from 'convex/_generated/dataModel';

export function ProcessImagesPage() {
  const search = useSearch({ from: '/dashboard/media/process-images' });
  const navigate = useNavigate({ from: '/dashboard/media/process-images' });
  const [activeTab, setActiveTab] = useState(search.tab || "upload");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    processedImages,
    isProcessing,
    processingProgress,
    processingError,
    processFiles,
    removeProcessedImage,
    updateProcessedImageS3Urls,
  } = useImageProcessing();

  console.log("processedImages", processedImages);

  const s3 = useS3Management();
  const { storeImageMetadata, isStoring, storeError } = useConvexImageStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageForModal, setSelectedImageForModal] = useState<ProcessedImage | S3Image | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const imagesReadyForUpload = useMemo(() => {
    return processedImages.filter((img: ProcessedImage) => !img.s3Url);
  }, [processedImages]);

  const uploadedImages = useMemo(() => {
    return processedImages.filter((img: ProcessedImage) => !!img.s3Url);
  }, [processedImages]);

  useEffect(() => {
    if (activeTab === 's3') {
      if (s3.s3Bucket) {
        s3.loadBrowserList(s3.s3Bucket, s3.browserCurrentPrefix, s3.s3Region);
      } else {
        s3.setShowS3Config(true);
        if (s3.buckets.length === 0 && !s3.isLoadingBuckets) {
          s3.loadBuckets(s3.s3Region);
        }
      }
    }
  }, [activeTab, s3.s3Bucket, s3.browserCurrentPrefix, s3.s3Region]);

  useEffect(() => {
    navigate({
      search: (prev: Record<string, unknown>) => ({ ...prev, tab: activeTab }),
      replace: true
    });
  }, [activeTab, navigate]);

  useEffect(() => {
    if (search.tab && ['upload', 'processed', 's3'].includes(search.tab as string)) {
      setActiveTab(search.tab as string);
    }
  }, [search.tab]);

  const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleProcessSelectedFiles = async () => {
    const newlyProcessed = await processFiles(selectedFiles);
    if (newlyProcessed && newlyProcessed.length > 0) {
      setSelectedFiles([]);
      setActiveTab("processed");
    }
  };

  const handleUploadImagesToS3 = async () => {
    s3.setShowS3Config(true);
    return;
  };

  const handleSaveS3ConfigAndUpload = () => {
    s3.setShowS3Config(false);
    if (imagesReadyForUpload.length > 0) {
      if (s3.s3Bucket && s3.s3Region) {
        uploadToS3();
      } else {
        console.error("Cannot upload: S3 bucket or region not configured after save.");
        s3.setShowS3Config(true);
      }
    } else {
      if (activeTab === 's3' && s3.s3Bucket) {
        s3.loadBrowserList(s3.s3Bucket, s3.browserCurrentPrefix, s3.s3Region);
      }
    }
  };

  const uploadToS3 = async () => {
    console.log("Uploading to S3:", imagesReadyForUpload);
    const result = await s3.uploadProcessedImages(imagesReadyForUpload);

    if (result.success && result.uploadedImageIds.length > 0 && result.s3UrlUpdates) {
      // Prepare the updated images with their S3 URLs before any state updates
      const updatedImages = imagesReadyForUpload.map(img => {
        const updateInfo = result.s3UrlUpdates!.get(img.id);
        if (updateInfo) {
          return {
            ...img,
            s3Url: updateInfo.originalS3Url,
            srcset: img.srcset.map(variant => {
              const variantUrl = updateInfo.variantS3Urls.get(variant.width);
              return variantUrl ? { ...variant, s3Url: variantUrl } : variant;
            })
          };
        }
        return img;
      }).filter(img => img.s3Url); // Only keep images that got S3 URLs

      // Update local state
      updatedImages.forEach(img => {
        const updateInfo = result.s3UrlUpdates!.get(img.id);
        if (updateInfo) {
          updateProcessedImageS3Urls(img.id, updateInfo.originalS3Url, updateInfo.variantS3Urls);
        }
      });

      // Store in Convex using the prepared updated images
      console.log(`Storing metadata for ${updatedImages.length} images in Convex...`);
      
      const storeResults = await Promise.allSettled(
        updatedImages.map(async (imageToStore) => {
          try {
            const convexId = await storeImageMetadata(imageToStore);
            if (convexId) {
              console.log(`✓ Stored metadata for ${imageToStore.originalName} (ID: ${convexId})`);
              return { success: true, imageId: imageToStore.id, convexId };
            } else {
              console.error(`✗ Failed to store metadata for ${imageToStore.originalName}`);
              return { success: false, imageId: imageToStore.id, error: 'Failed to get Convex ID' };
            }
          } catch (err) {
            console.error(`✗ Error storing metadata for ${imageToStore.originalName}:`, err);
            return { 
              success: false, 
              imageId: imageToStore.id, 
              error: err instanceof Error ? err.message : 'Unknown error'
            };
          }
        })
      );

      // Log summary of Convex storage results
      const successCount = storeResults.filter(
        r => r.status === 'fulfilled' && (r.value as any).success
      ).length;
      console.log(`Successfully stored ${successCount} of ${updatedImages.length} images in Convex`);

      // Navigate to S3 browser and refresh the list
      setActiveTab("s3");
      s3.loadBrowserList(s3.s3Bucket, s3.browserCurrentPrefix, s3.s3Region);

    } else if (!result.success) {
      console.error("S3 Upload failed:", result.error);
    } else {
      console.log("No new images were uploaded.");
    }
  };

  const handleDeleteProcessedImage = (imageId: string) => {
    removeProcessedImage(imageId);
  };

  const handleViewVariants = (image: ProcessedImage | S3Image) => {
    if ('key' in image) {
      const s3Image = image as S3Image;
      const adaptedImage: ProcessedImage = {
        id: s3Image.id,
        originalName: s3Image.originalName,
        originalSize: s3Image.originalSize,
        processedSize: s3Image.srcset?.reduce((sum, v) => sum + (v.size ?? 0), 0) || s3Image.originalSize,
        originalUrl: s3Image.originalUrl,
        srcset: s3Image.srcset?.map(v => ({
          width: v.width,
          url: v.url,
          s3Url: v.url
        })) || [],
        contentType: 'image/' + (s3Image.originalName.split('.').pop() || 'jpeg'),
        s3Url: s3Image.originalUrl,
        fileExtension: s3Image.originalName.split('.').pop() || undefined,
      };
      setSelectedImageForModal(adaptedImage);
    } else {
      setSelectedImageForModal(image as ProcessedImage);
    }
    setModalOpen(true);
  };

  const handleCopyUrl = useCallback((url: string) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        console.log("Copied URL:", url);
      })
      .catch(err => {
        console.error("Failed to copy URL:", err);
      });
  }, []);

  return (
    <div className="p-6 space-y-8 font-sans">
      <h1 className="text-3xl font-bold">Image Processing</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload & Process</TabsTrigger>
          <TabsTrigger value="processed">
            Processed ({imagesReadyForUpload.length})
          </TabsTrigger>
          <TabsTrigger value="s3" className="relative">
            S3 Browser
            {s3.s3Bucket && s3.browserImageList.length > 0 && !s3.isLoadingBrowserList && (
              <span className="ml-2 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {s3.browserImageList.length}
              </span>
            )}
            {s3.isLoadingBrowserList && (
              <span className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <UploadTab
            selectedFiles={selectedFiles}
            onFilesSelected={handleFilesSelected}
            handleProcessImages={handleProcessSelectedFiles}
            isProcessing={isProcessing}
            uploadProgress={processingProgress}
            uploadError={processingError}
            setSelectedFiles={setSelectedFiles}
          />
        </TabsContent>

        <TabsContent value="processed" className="mt-6">
          <ProcessedImagesTab
            processedImages={imagesReadyForUpload}
            handleViewVariants={handleViewVariants}
            handleUploadToS3={handleUploadImagesToS3}
            handleDeleteImage={handleDeleteProcessedImage}
            isUploading={s3.isUploading}
            isStoring={isStoring}
            storeError={storeError}
          />
          {uploadedImages.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <h2 className="text-xl font-semibold mb-4">Already Uploaded to S3 & Stored</h2>
              <ProcessedImagesTab
                processedImages={uploadedImages}
                handleViewVariants={handleViewVariants}
                handleUploadToS3={() => {}}
                handleDeleteImage={() => alert("Deletion of already uploaded images not implemented here.")}
                isUploading={false}
                readOnly={true}
                isStoring={false}
                storeError={null}
              />
            </div>
          )}
        </TabsContent>

        <TabsContent value="s3" className="mt-6">
          <div className="relative w-full mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter S3 images by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <S3BrowserView
            s3Bucket={s3.s3Bucket}
            s3CurrentPrefix={s3.browserCurrentPrefix}
            s3FolderList={s3.browserFolderList}
            s3ImageList={s3.browserImageList.filter((img: S3Image) => img.originalName.toLowerCase().includes(searchTerm.toLowerCase()))}
            isLoadingS3List={s3.isLoadingBrowserList}
            s3ListError={s3.browserListError}
            searchTerm={searchTerm}
            onFolderClick={s3.handleBrowserFolderClick}
            onImageView={handleViewVariants}
            onConfigureS3={() => {
              s3.setShowS3Config(true);
              if (s3.buckets.length === 0 && !s3.isLoadingBuckets) {
                s3.loadBuckets(s3.s3Region);
              }
            }}
            onRefresh={() => {
              if (s3.s3Bucket) {
                s3.loadBrowserList(s3.s3Bucket, s3.browserCurrentPrefix, s3.s3Region);
              } else {
                s3.setShowS3Config(true);
                if (s3.buckets.length === 0 && !s3.isLoadingBuckets) {
                  s3.loadBuckets(s3.s3Region);
                }
              }
            }}
            onCopyUrl={handleCopyUrl}
          />
        </TabsContent>
      </Tabs>

      <ImageVariantModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        image={selectedImageForModal}
        onCopyUrl={handleCopyUrl}
      />

      <S3ConfigDialog
        open={s3.showS3Config}
        onOpenChange={(open) => {
          s3.setShowS3Config(open);
          if (open && s3.buckets.length === 0 && !s3.isLoadingBuckets) {
            s3.loadBuckets(s3.s3Region);
          }
        }}
        s3Bucket={s3.s3Bucket}
        s3Region={s3.s3Region}
        s3Folder={s3.s3Folder}
        buckets={s3.buckets}  
        isLoadingBuckets={s3.isLoadingBuckets}
        bucketError={s3.bucketError}
        onBucketChange={s3.handleBucketChange}
        onRegionChange={s3.handleRegionChange}
        onFolderChange={s3.setS3Folder}
        onLoadBuckets={() => s3.loadBuckets(s3.s3Region)}
        onSave={handleSaveS3ConfigAndUpload}
      />
    </div>
  );
}