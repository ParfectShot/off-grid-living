import { useState, useCallback } from 'react';
import { FolderInfo, S3Image, ProcessedImage, VariantS3Result, DeleteFilesResult } from '~/types/s3-types';
import { listS3Buckets, listS3Folders, listS3Images, uploadFilesToS3 } from '~/lib/server/s3-server';
import { deleteServerFiles } from '~/lib/server-helpers';

// --- Custom Hook: S3 Management ---
// Manages S3 configuration, browsing, and upload logic
export function useS3Management() {
  // S3 Config State
  const [s3Bucket, setS3Bucket] = useState<string>('');
  const [s3Region, setS3Region] = useState<string>('ap-south-1'); // Default region
  const [s3Folder, setS3Folder] = useState<string>(''); // Target upload folder prefix
  const [configCurrentPrefix, setConfigCurrentPrefix] = useState<string>(''); // For browsing folders in config modal

  // S3 Config UI State
  const [showS3Config, setShowS3Config] = useState(false);
  const [buckets, setBuckets] = useState<Array<{ name: string, creationDate?: Date }>>([]);
  const [folders, setFolders] = useState<FolderInfo[]>([]);
  const [isLoadingBuckets, setIsLoadingBuckets] = useState(false);
  const [isLoadingFolders, setIsLoadingFolders] = useState(false);
  const [bucketError, setBucketError] = useState<string | null>(null);

  // S3 Browser State
  const [browserCurrentPrefix, setBrowserCurrentPrefix] = useState<string>('');
  const [browserFolderList, setBrowserFolderList] = useState<FolderInfo[]>([]);
  const [browserImageList, setBrowserImageList] = useState<S3Image[]>([]);
  const [isLoadingBrowserList, setIsLoadingBrowserList] = useState(false);
  const [browserListError, setBrowserListError] = useState<string | null>(null);

  // Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // --- S3 Config Logic ---
  const loadBuckets = useCallback(async (region: string) => {
    setIsLoadingBuckets(true);
    setBucketError(null);
    setBuckets([]);
    try {
      const result = await listS3Buckets({ data: { region } });
      if (result.success && result.buckets) {
        const validBuckets = (result.buckets || [])
          .filter(bucket => typeof bucket.name === 'string' && bucket.name.trim() !== '')
          .map(bucket => ({ name: bucket.name as string, creationDate: bucket.creationDate }));
        setBuckets(validBuckets);
        if (validBuckets.length > 0 && !s3Bucket) {
          const firstBucket = validBuckets[0].name;
          setS3Bucket(firstBucket);
          loadFolders(firstBucket, '', region);
        } else if (validBuckets.length === 0) {
          setS3Bucket('');
        }
      } else {
        setBucketError(result.error || 'Failed to load buckets');
        setS3Bucket('');
      }
    } catch (error) {
      console.error('Error loading buckets:', error);
      setBucketError(error instanceof Error ? error.message : 'Unknown error');
      setS3Bucket('');
    } finally {
      setIsLoadingBuckets(false);
    }
  }, []);

  const loadFolders = useCallback(async (bucket: string, prefix = '', region: string) => {
    if (!bucket) {
      setFolders([]);
      return;
    }
    setIsLoadingFolders(true);
    setFolders([]);
    try {
      const result = await listS3Folders({ data: { bucket, prefix, region } });
      if (result.success && result.folders) {
        setFolders(result.folders || []);
        setConfigCurrentPrefix(result.prefix || '');
      } else {
        console.error('Error loading folders for config:', result.error);
      }
    } catch (error) {
      console.error('Error loading folders for config:', error);
    } finally {
      setIsLoadingFolders(false);
    }
  }, []);

  const handleBucketChange = useCallback((newBucket: string) => {
    setS3Bucket(newBucket);
    setS3Folder('');
    setConfigCurrentPrefix('');
    setFolders([]);
    if (newBucket) {
      loadFolders(newBucket, '', s3Region);
    }
  }, [s3Region, loadFolders]);

  const handleRegionChange = useCallback((newRegion: string) => {
    setS3Region(newRegion);
    setS3Bucket('');
    setS3Folder('');
    setConfigCurrentPrefix('');
    setBuckets([]);
    setFolders([]);
    loadBuckets(newRegion);
  }, [loadBuckets]);

  const handleBrowseConfigFolder = useCallback((folderInfo: FolderInfo) => {
    setConfigCurrentPrefix(folderInfo.prefix);
    loadFolders(s3Bucket, folderInfo.prefix, s3Region);
  }, [s3Bucket, s3Region, loadFolders]);

  const handleSetTargetFolder = useCallback(() => {
    setS3Folder(configCurrentPrefix);
    setShowS3Config(false);
  }, [configCurrentPrefix]);

  // --- S3 Browser Logic ---
  const loadBrowserList = useCallback(async (bucket: string, prefix = '', region: string) => {
    if (!bucket) {
      setBrowserListError("S3 Bucket not configured.");
      setBrowserFolderList([]);
      setBrowserImageList([]);
      return;
    }
    setIsLoadingBrowserList(true);
    setBrowserListError(null);
    setBrowserFolderList([]);
    setBrowserImageList([]);
    try {
      console.log('Loading S3 Browser List:', { bucket, prefix, region });
      const result = await listS3Images({ data: { bucket, prefix, region } });
      if (result.success) {
        console.log('S3 Browser List Result:', result);
        setBrowserFolderList(result.folders || []);
        setBrowserImageList(result.images || []);
        setBrowserCurrentPrefix(result.prefix || '');
      } else {
        setBrowserListError(result.error || 'Failed to load S3 content');
      }
    } catch (error) {
      console.error('Error loading S3 content:', error);
      setBrowserListError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsLoadingBrowserList(false);
    }
  }, []);

  const handleBrowserFolderClick = useCallback((folder: FolderInfo) => {
    const prefix = folder.prefix.endsWith('/') ? folder.prefix.slice(0, -1) : folder.prefix;
    loadBrowserList(s3Bucket, prefix, s3Region);
  }, [s3Bucket, s3Region, loadBrowserList]);

  // --- S3 Upload Logic ---
  const uploadProcessedImages = useCallback(async (imagesToUpload: ProcessedImage[]): Promise<{
    success: boolean;
    uploadedImageIds: string[];
    s3UrlUpdates?: Map<string, { originalS3Url: string; variantS3Urls: Map<number, string> }>;
    error?: string;
  }> => {
    const validImages = imagesToUpload.filter(img => !img.s3Url);

    if (validImages.length === 0) {
      console.log('No new images selected for upload');
      return { success: true, uploadedImageIds: [] };
    }
    if (!s3Bucket) {
      setUploadError('S3 bucket not configured');
      setShowS3Config(true);
      if (buckets.length === 0 && !isLoadingBuckets) loadBuckets(s3Region);
      return { success: false, uploadedImageIds: [], error: 'S3 bucket not configured' };
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadProgress(0);

    const filesToUploadPayload = [];
    const filesToDeleteLocally = [];
    const successfullyUploadedImageIds = new Set<string>();
    const s3UrlUpdates = new Map<string, { originalS3Url: string; variantS3Urls: Map<number, string> }>();

    for (const image of validImages) {
      if (image.originalFilePath) filesToDeleteLocally.push(image.originalFilePath);

      const filenameWithoutExt = image.originalName.substring(0, image.originalName.lastIndexOf('.'));
      const sanitizedFilename = filenameWithoutExt.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();

      if (image.originalFilePath && image.fileExtension) {
        const folderPrefix = s3Folder ? (s3Folder.endsWith('/') ? s3Folder : `${s3Folder}/`) : '';
        filesToUploadPayload.push({
          filePath: image.originalFilePath,
          s3Key: `${folderPrefix}${sanitizedFilename}.${image.fileExtension}`,
          contentType: image.contentType || 'application/octet-stream',
          bucket: s3Bucket,
        });
      }

      image.srcset.forEach(variant => {
        if (variant.filePath && image.fileExtension) {
          filesToDeleteLocally.push(variant.filePath);
          const folderPrefix = s3Folder ? (s3Folder.endsWith('/') ? s3Folder : `${s3Folder}/`) : '';
          filesToUploadPayload.push({
            filePath: variant.filePath,
            s3Key: `${folderPrefix}${sanitizedFilename}-${variant.width}.${variant.fileExtension}`,
            contentType: variant.contentType || 'application/octet-stream',
            bucket: s3Bucket,
          });
        }
      });
    }

    if (filesToUploadPayload.length === 0) {
      setUploadError('No valid file paths found for upload in selected images.');
      setIsUploading(false);
      return { success: false, uploadedImageIds: [], error: 'No valid files found for upload.' };
    }

    try {
      setUploadProgress(50);

      console.log("Uploading to S3:", { bucket: s3Bucket, region: s3Region, folder: s3Folder, count: filesToUploadPayload.length });
      console.log("Files:", filesToUploadPayload.map(f => f.s3Key));

      const uploadResult = await uploadFilesToS3({
        data: { files: filesToUploadPayload, bucket: s3Bucket, region: s3Region }
      });

      setUploadProgress(100);

      if (uploadResult.success && uploadResult.results) {
        uploadResult.results.forEach((r: VariantS3Result) => {
          if (r.success && r.key && r.url) {
            let matchingImage: ProcessedImage | undefined;
            let isOriginal = false;
            let variantWidth: number | undefined;

            const keyParts = r.key.split('/');
            const filename = keyParts[keyParts.length - 1];

            if (!filename) {
              console.warn("Invalid S3 key format:", r.key);
              return;
            }

            const variantMatch = filename.match(/-(\d+)\.[^.]+$/);
            if (variantMatch) {
              variantWidth = parseInt(variantMatch[1], 10);
              isOriginal = false;

              const filenameWithoutVariant = filename.substring(0, filename.lastIndexOf('-'));
              matchingImage = validImages.find(img => {
                const imgFilenameWithoutExt = img.originalName.substring(0, img.originalName.lastIndexOf('.'));
                const sanitizedImgFilename = imgFilenameWithoutExt.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();
                return sanitizedImgFilename === filenameWithoutVariant;
              });
            } else {
              isOriginal = true;

              const filenameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
              matchingImage = validImages.find(img => {
                const imgFilenameWithoutExt = img.originalName.substring(0, img.originalName.lastIndexOf('.'));
                const sanitizedImgFilename = imgFilenameWithoutExt.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();
                return sanitizedImgFilename === filenameWithoutExt;
              });
            }

            if (matchingImage) {
              const imageId = matchingImage.id;
              successfullyUploadedImageIds.add(imageId);

              if (!s3UrlUpdates.has(imageId)) {
                const initialVariantUrls = new Map<number, string>();
                matchingImage.srcset.forEach(v => { if(v.s3Url) initialVariantUrls.set(v.width, v.s3Url) });

                s3UrlUpdates.set(imageId, {
                  originalS3Url: matchingImage.s3Url || '',
                  variantS3Urls: initialVariantUrls
                });
              }

              const update = s3UrlUpdates.get(imageId)!;

              if (isOriginal) {
                update.originalS3Url = r.url;
              } else if (variantWidth !== undefined && !isNaN(variantWidth)) {
                update.variantS3Urls.set(variantWidth, r.url);
              }
            } else {
              console.warn("Could not associate S3 result key with an uploaded image:", r.key);
            }
          } else if (!r.success) {
            console.error("S3 upload failed for key:", r.key, "Error:", r.error);
          }
        });

        if (filesToDeleteLocally.length > 0) {
          console.log(`Attempting to delete ${filesToDeleteLocally.length} local files post-upload...`);
          deleteServerFiles({ data: { filePaths: filesToDeleteLocally } })
            .then((deleteResult: DeleteFilesResult) => {
              if (deleteResult.success) {
                console.log(`Successfully deleted ${deleteResult.deletedCount} temporary files.`);
              } else {
                console.error(`Failed to delete temporary files:`, deleteResult.error || deleteResult.errors);
              }
            })
            .catch((err: Error) => console.error('Error calling deleteServerFiles:', err));
        }

        return { success: true, uploadedImageIds: Array.from(successfullyUploadedImageIds), s3UrlUpdates };
      } else {
        setUploadError(`Upload to S3 failed. ${uploadResult.totalFailed || 0} files failed. Error: ${uploadResult.error || 'Unknown S3 upload error'}`);
        return { success: false, uploadedImageIds: [], error: uploadResult.error || 'Unknown S3 upload error' };
      }
    } catch (error) {
      console.error('Error uploading to S3:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to upload to S3';
      setUploadError(errorMsg);
      return { success: false, uploadedImageIds: [], error: errorMsg };
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  }, [s3Bucket, s3Region, s3Folder, buckets, isLoadingBuckets, loadBuckets]);

  return {
    // S3 Config State & Setters
    s3Bucket, setS3Bucket,
    s3Region, setS3Region,
    s3Folder, setS3Folder,
    configCurrentPrefix,

    // S3 Config UI State & Actions
    showS3Config, setShowS3Config,
    buckets,
    folders,
    isLoadingBuckets,
    isLoadingFolders,
    bucketError,
    loadBuckets,
    loadFolders,
    handleBucketChange,
    handleRegionChange,
    handleBrowseConfigFolder,
    handleSetTargetFolder,

    // S3 Browser State & Actions
    browserCurrentPrefix,
    browserFolderList,
    browserImageList,
    isLoadingBrowserList,
    browserListError,
    loadBrowserList,
    handleBrowserFolderClick,

    // Upload State & Actions
    isUploading,
    uploadProgress,
    uploadError,
    uploadProcessedImages,
  };
}