import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ensureDirectory, saveServerFile, processServerImage, deleteServerFiles } from '~/lib/server-helpers';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs';
import { uploadFilesToS3, listS3Buckets, listS3Folders, listS3Images } from '~/lib/s3-client';
import { Search } from 'lucide-react';
import { ProcessedImage, S3Image, FolderInfo } from '~/types/s3-types';
import { 
  UploadTab, 
  ProcessedImagesTab,
  ImageVariantModal,
} from '~/features/manage/images/components';
import { S3BrowserView } from '~/features/manage/images/components/S3BrowserView';
import { S3ConfigDialog } from '~/features/manage/images/components/S3ConfigDialog';
import { useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';
import { Id } from 'convex/_generated/dataModel';

export const Route = createFileRoute('/dashboard/images/')({
  component: ImagesPage,
});

// Define the structure for variant results from S3 upload
interface VariantS3Result {
  key?: string;
  url?: string;
  success: boolean;
  error?: string;
  width?: number; // Add width if needed for mapping
}

// Define the structure for the result of deleteServerFiles
interface DeleteFilesResult {
  success: boolean;
  deletedCount: number;
  error?: string; // Assuming a single error message for simplicity, adjust if needed
  errors?: { path: string; error: string }[];
}

function ImagesPage() {
  // State for managing files and UI state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [s3Images, setS3Images] = useState<ProcessedImage[]>([]);
  const [activeTab, setActiveTab] = useState("upload");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ProcessedImage | null>(null);
  
  // S3 configuration state
  const [showS3Config, setShowS3Config] = useState(false);
  const [s3Bucket, setS3Bucket] = useState('');
  const [s3Region, setS3Region] = useState('ap-south-1');
  const [s3Folder, setS3Folder] = useState('');
  const [currentPrefix, setCurrentPrefix] = useState('');
  const [buckets, setBuckets] = useState<Array<{ name: string, creationDate?: Date }>>([]);
  const [folders, setFolders] = useState<FolderInfo[]>([]);
  const [isLoadingBuckets, setIsLoadingBuckets] = useState(false);
  const [isLoadingFolders, setIsLoadingFolders] = useState(false);
  const [bucketError, setBucketError] = useState<string | null>(null);

  // Add S3 browsing state
  const [s3CurrentPrefix, setS3CurrentPrefix] = useState('');
  const [s3FolderList, setS3FolderList] = useState<FolderInfo[]>([]);
  const [s3ImageList, setS3ImageList] = useState<S3Image[]>([]);
  const [isLoadingS3List, setIsLoadingS3List] = useState(false);
  const [s3ListError, setS3ListError] = useState<string | null>(null);

  // Use the Convex mutation hook
  const storeImageMutation = useMutation(api.images.storeImage);

  // Helper to convert a file to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Handle file selection
  const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(Array.from(files));
      setUploadError(null);
    }
  };

  // Effect to track uploaded images
  useEffect(() => {
    const uploaded = processedImages.filter(img => img.s3Url);
    setS3Images(uploaded);
  }, [processedImages]);

  // Process selected images on the server using Tanstack's server functions
  const handleProcessImages = async () => {
    if (selectedFiles.length === 0) {
      setUploadError('Please select at least one image');
      return;
    }

    setIsProcessing(true);
    setUploadError(null);
    const processed: ProcessedImage[] = [];

    try {
      // First, ensure the upload directories exist
      await ensureDirectory({ data: { dirPath: 'public/uploads' } });
      await ensureDirectory({ data: { dirPath: 'public/uploads/variants' } });

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileProgress = i / selectedFiles.length;
        setUploadProgress(Math.round(fileProgress * 100));

        // Convert file to base64
        const fileData = await fileToBase64(file);
        
        // Generate a unique ID for the file
        const imageId = uuidv4();
        const fileExtension = file.name.split('.').pop() || '';
        const filename = `${imageId}.${fileExtension}`;

        // Save the original file on the server
        const saveResult = await saveServerFile({
          data: {
            filePath: `public/uploads/${filename}`,
            fileContent: fileData,
            contentType: file.type
          }
        });

        // Define responsive image sizes
        const variants = [320, 640, 768, 1024, 1280];
        const srcset = [];
        let totalProcessedSize = 0;
        let webpContentType = file.type; // Default to original, overwrite with WebP type
        let webpFileExtension = fileExtension; // Default to original, overwrite with WebP extension

        // Process each size variant
        for (const width of variants) {
          // Use imageId and width for a unique variant filename stem
          const variantFilenameStem = `${imageId}_${width}`;
          
          const processResult = await processServerImage({
            data: {
              inputPath: saveResult.path, // Use the absolute path from saveResult
              outputDir: 'public/uploads/variants',
              // Pass the stem, processServerImage will add .webp
              outputFilename: variantFilenameStem + '.' + fileExtension, 
              width
            }
          });
          
          // Update content type and extension based on the first processed variant
          if (variants.indexOf(width) === 0) {
            webpContentType = processResult.contentType;
            webpFileExtension = processResult.fileExtension;
          }

          srcset.push({
            width,
            url: processResult.url, // Relative URL for client use
            filePath: processResult.outputPath // Absolute server path for deletion
          });
          
          totalProcessedSize += processResult.size;
        }

        // Add the processed image to our result
        processed.push({
          id: imageId,
          originalName: file.name,
          originalSize: saveResult.size, // Use size from saved original file
          processedSize: totalProcessedSize,
          originalUrl: saveResult.url, // Relative URL for client use
          originalFilePath: saveResult.path, // Absolute server path for deletion
          srcset, // Now contains filePaths
          contentType: webpContentType, // Use WebP content type
          fileExtension: webpFileExtension // Use WebP file extension
        });
      }

      setProcessedImages(prev => [...prev, ...processed]);
      setSelectedFiles([]);
      setUploadProgress(100);
    } catch (error) {
      console.error('Error processing images:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to process images');
    } finally {
      setIsProcessing(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Handle opening the modal to view image variants
  const handleViewVariants = (image: ProcessedImage) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  // Copy URL to clipboard
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    // Could add toast/notification here
  };

  // Load available S3 buckets
  const loadS3Buckets = async () => {
    setIsLoadingBuckets(true);
    setBucketError(null);
    
    try {
      const result = await listS3Buckets({
        data: { region: s3Region }
      });
      if (result.success) {
        // Ensure buckets have required fields before setting state
        const validBuckets = result.buckets
          .filter(bucket => typeof bucket.name === 'string' && bucket.name.trim() !== '')
          .map(bucket => ({
            name: bucket.name as string, // We filtered out undefined/empty names
            creationDate: bucket.creationDate
          }));
        
        setBuckets(validBuckets);
        
        if (validBuckets.length > 0 && !s3Bucket) {
          const firstBucketName = validBuckets[0].name;
          setS3Bucket(firstBucketName);
          loadS3Folders(firstBucketName);
        } else if (s3Bucket) {
          loadS3Folders(s3Bucket);
        }
      } else {
        setBucketError(result.error || 'Failed to load buckets');
      }
    } catch (error) {
      console.error('Error loading buckets:', error);
      setBucketError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsLoadingBuckets(false);
    }
  };

  // Load available folders in the selected bucket
  const loadS3Folders = async (bucket: string, prefix = '') => {
    if (!bucket) return;
    
    setIsLoadingFolders(true);
    
    try {
      const result = await listS3Folders({
        data: {
          bucket,
          prefix,
          region: s3Region
        }
      });
      
      if (result.success) {
        setFolders(result.folders || []);
        setCurrentPrefix(result.prefix || '');
      } else {
        console.error('Error loading folders:', result.error);
      }
    } catch (error) {
      console.error('Error loading folders:', error);
    } finally {
      setIsLoadingFolders(false);
    }
  };

  // Handle bucket selection change
  const handleBucketChange = (bucketName: string) => {
    setS3Bucket(bucketName);
    setS3Folder('');
    setCurrentPrefix('');
    loadS3Folders(bucketName);
  };

  // Handle folder navigation
  const handleFolderSelect = (folderInfo: FolderInfo) => {
    setCurrentPrefix(folderInfo.prefix);
    setS3Folder(folderInfo.prefix);
    loadS3Folders(s3Bucket, folderInfo.prefix);
  };

  // Handle uploading images to S3
  const handleUploadToS3 = async () => {
    if (processedImages.length === 0) {
      setUploadError('No processed images to upload');
      return;
    }

    if (!s3Bucket) {
      setShowS3Config(true);
      loadS3Buckets();
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadProgress(0);

    // Collect file paths to delete after successful upload
    const filesToDelete: string[] = [];

    try {
      // Prepare files for upload
      const filesToUpload = processedImages.flatMap(image => {
        // Skip already uploaded images
        if (image.s3Url) return [];
        
        // Add original file path to delete list
        if (image.originalFilePath) filesToDelete.push(image.originalFilePath);

        // Add original file for upload
        const files = [{
          filePath: image.originalFilePath || '', // Use absolute path
          s3Key: `images/original/${image.id}.${image.fileExtension}`,
          contentType: image.contentType,
          bucket: s3Bucket || '' // Ensure bucket is not null
        }];

        // Add variants
        image.srcset.forEach(variant => {
          // Add variant file path to delete list
          if (variant.filePath) filesToDelete.push(variant.filePath);
          files.push({
            filePath: variant.filePath || '', // Use absolute path
            s3Key: `images/variants/${image.id}_${variant.width}.${image.fileExtension}`,
            contentType: image.contentType,
            bucket: s3Bucket || '' // Ensure bucket is not null
          });
        });

        return files;
      });

      // Filter out any entries with empty filePaths (shouldn't happen but safety check)
      const validFilesToUpload = filesToUpload.filter(f => f.filePath);

      if (validFilesToUpload.length === 0) {
        setUploadError('No new images to upload or file paths missing.');
        setIsUploading(false);
        return;
      }

      // Upload to S3
      const uploadResult = await uploadFilesToS3({
        data: {
          files: validFilesToUpload,
          bucket: s3Bucket || '', // Pass validated bucket
          region: s3Region,
          folder: s3Folder
        }
      });

      if (uploadResult.success && uploadResult.results) {
        // Map S3 results back to processedImages state and prepare data for Convex
        const updatedImages = processedImages.map(image => {
          // Find S3 result for the original image
          const originalS3Result = uploadResult.results.find((r: any) => 
            r.key && r.key.includes(`images/original/${image.id}.`)
          );

          // Find S3 results for variants
          const variantS3Results = uploadResult.results.filter((r: any) => 
            r.key && r.key.includes(`images/variants/${image.id}_`)
          );

          // If original upload was successful, update image and prepare for DB
          if (originalS3Result?.success && originalS3Result.url) {
            const updatedSrcset = image.srcset.map(variant => {
              const variantS3 = variantS3Results.find((r: VariantS3Result) => 
                r.key && r.key.includes(`_${variant.width}.${image.fileExtension}`)
              );
              return {
                ...variant,
                s3Url: variantS3?.success ? variantS3.url : undefined
              };
            });

            const imageForDb = {
              originalName: image.originalName,
              originalSize: image.originalSize,
              processedSize: image.processedSize,
              originalUrl: originalS3Result.url, // S3 URL
              srcset: updatedSrcset.map(v => ({ width: v.width, url: v.s3Url || '' })).filter(v => v.url), // S3 URLs for srcset
              contentType: image.contentType,
              fileExtension: image.fileExtension || '',
              // Add optional fields if needed (alt, credit, entityId, entityType)
            };
            
            // Call Convex mutation with the hook
            storeImageMutation(imageForDb) // Pass args directly
              .then((imageId: Id<"images">) => console.log(`Stored image ${image.originalName} with Convex ID: ${imageId}`))
              .catch((err: Error) => console.error(`Failed to store image ${image.originalName} in Convex:`, err));

            return {
              ...image,
              s3Url: originalS3Result.url, 
              srcset: updatedSrcset.map(v => ({ width: v.width, url: v.url, filePath: v.filePath, s3Url: v.s3Url })) // Keep filePath too
            };
          }
          
          return image; // Return unchanged image if upload failed
        });

        setProcessedImages(updatedImages);
        setUploadError(null);
        
        // Call server function to delete temporary files (don't wait)
        if (filesToDelete.length > 0) {
          deleteServerFiles({ data: { filePaths: filesToDelete } })
            .then((deleteResult: DeleteFilesResult) => {
              if (deleteResult.success) {
                console.log(`Successfully deleted ${deleteResult.deletedCount} temporary files.`);
              } else {
                console.error(`Failed to delete temporary files:`, deleteResult.error || deleteResult.errors);
              }
            })
            .catch((err: Error) => console.error('Error calling deleteServerFiles:', err));
        }

        // Switch to S3 tab after successful upload
        setActiveTab("s3");

      } else {
        setUploadError(`Upload to S3 failed. ${uploadResult.totalFailed || 0} files failed. Error: ${uploadResult.error}`);
      }
    } catch (error) {
      console.error('Error uploading to S3:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload to S3');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Handle deleting a processed image (placeholder)
  const handleDeleteImage = async (imageId: string): Promise<void> => {
    // In a real implementation, you would call a server function to delete the image
    setProcessedImages(prev => prev.filter(img => img.id !== imageId));
  };

  // Load S3 images when the tab changes to s3 OR prefix changes
  useEffect(() => {
    if (activeTab === 's3' && s3Bucket) {
      loadS3ImageList(s3Bucket, s3CurrentPrefix);
    }
  }, [activeTab, s3Bucket, s3CurrentPrefix]);

  // Load S3 image list for a bucket and prefix
  const loadS3ImageList = async (bucket: string, prefix = '') => {
    if (!bucket) {
      setShowS3Config(true);
      loadS3Buckets();
      return;
    }
    
    setIsLoadingS3List(true);
    setS3ListError(null);
    
    try {
      const result = await listS3Images({
        data: {
          bucket,
          prefix,
          region: s3Region
        }
      });
      
      if (result.success) {
        setS3FolderList(result.folders || []);
        setS3ImageList(result.images || []);
        setS3CurrentPrefix(result.prefix || '');
      } else {
        setS3ListError(result.error || 'Failed to load S3 images');
      }
    } catch (error) {
      console.error('Error loading S3 images:', error);
      setS3ListError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsLoadingS3List(false);
    }
  };

  // Handle navigation to a folder
  const handleS3FolderClick = (folder: FolderInfo) => {
    loadS3ImageList(s3Bucket, folder.prefix);
  };

  // View S3 image details
  const handleViewS3Image = (image: S3Image) => {
    // Convert S3Image to ProcessedImage format for the modal
    const processedImage: ProcessedImage = {
      id: image.id,
      originalName: image.originalName,
      originalSize: image.originalSize,
      processedSize: image.originalSize, // Same size for now
      originalUrl: image.originalUrl,
      srcset: image.srcset.map(v => ({
        width: v.width,
        url: v.url
      })),
      contentType: 'image/' + image.originalName.split('.').pop() || 'jpeg',
      s3Url: image.originalUrl
    };
    
    setSelectedImage(processedImage);
    setModalOpen(true);
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Image Processing</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload & Process</TabsTrigger>
          <TabsTrigger value="processed">Processed Images</TabsTrigger>
          <TabsTrigger value="s3" className="relative">
            S3 Browser
            {s3ImageList.length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {s3ImageList.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-6">
          <UploadTab
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            handleProcessImages={handleProcessImages}
            isProcessing={isProcessing}
            uploadProgress={uploadProgress}
            uploadError={uploadError}
          />
        </TabsContent>
        
        <TabsContent value="processed" className="mt-6">
          <ProcessedImagesTab
            processedImages={processedImages}
            handleViewVariants={handleViewVariants}
            handleUploadToS3={handleUploadToS3}
            handleDeleteImage={handleDeleteImage}
            isUploading={isUploading}
          />
        </TabsContent>
        
        <TabsContent value="s3" className="mt-6">
          <div className="relative w-full mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full border rounded-md"
            />
          </div>
          
          <S3BrowserView
            s3Bucket={s3Bucket}
            s3CurrentPrefix={s3CurrentPrefix}
            s3FolderList={s3FolderList}
            s3ImageList={s3ImageList}
            isLoadingS3List={isLoadingS3List}
            s3ListError={s3ListError}
            searchTerm={searchTerm}
            onFolderClick={handleS3FolderClick}
            onImageView={handleViewS3Image}
            onConfigureS3={() => setShowS3Config(true)}
            onRefresh={() => loadS3ImageList(s3Bucket, s3CurrentPrefix)}
            onCopyUrl={handleCopyUrl}
          />
        </TabsContent>
      </Tabs>
      
      {/* Image Variants Modal */}
      <ImageVariantModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        image={selectedImage}
      />
      
      {/* S3 Configuration Dialog */}
      <S3ConfigDialog
        open={showS3Config}
        onOpenChange={(open: boolean) => {
          setShowS3Config(open);
          if (open && buckets.length === 0) {
            loadS3Buckets();
          }
        }}
        s3Bucket={s3Bucket}
        s3Region={s3Region}
        s3Folder={s3Folder}
        currentPrefix={currentPrefix}
        buckets={buckets}
        folders={folders}
        isLoadingBuckets={isLoadingBuckets}
        isLoadingFolders={isLoadingFolders}
        bucketError={bucketError}
        onBucketChange={handleBucketChange}
        onRegionChange={setS3Region}
        onFolderChange={setS3Folder}
        onFolderSelect={handleFolderSelect}
        onLoadBuckets={loadS3Buckets}
        onSaveAndUpload={() => {
          setShowS3Config(false);
          handleUploadToS3();
        }}
      />
    </div>
  );
} 