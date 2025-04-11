import { useState, useCallback } from 'react';
import { FolderInfo, S3Image, ProcessedImage, VariantS3Result, DeleteFilesResult } from '~/types/s3-types'; // Assuming types are here
import { listS3Buckets, listS3Folders, listS3Images, uploadFilesToS3 } from '~/lib/s3-client';
import { deleteServerFiles } from '~/lib/server-helpers'; // Import for cleanup


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
  const [uploadProgress, setUploadProgress] = useState(0); // Can be simple 0/100 or more granular if API supports it
  const [uploadError, setUploadError] = useState<string | null>(null);

  // --- S3 Config Logic ---
  const loadBuckets = useCallback(async (region: string) => {
    setIsLoadingBuckets(true);
    setBucketError(null);
    setBuckets([]); // Clear existing buckets before loading
    try {
      const result = await listS3Buckets({ data: { region } });
      if (result.success && result.buckets) {
        const validBuckets = (result.buckets || [])
          .filter(bucket => typeof bucket.name === 'string' && bucket.name.trim() !== '')
          .map(bucket => ({ name: bucket.name as string, creationDate: bucket.creationDate }));
        setBuckets(validBuckets);
        // Auto-select first bucket only if no bucket is currently selected
        if (validBuckets.length > 0 && !s3Bucket) {
           const firstBucket = validBuckets[0].name;
           setS3Bucket(firstBucket);
           loadFolders(firstBucket, '', region);
           // Optionally load folders for the auto-selected bucket immediately
           // loadFolders(firstBucket, '', region); // Be mindful of calling loadFolders here
        } else if (validBuckets.length === 0) {
            setS3Bucket(''); // Clear selection if no buckets found
        }
      } else {
        setBucketError(result.error || 'Failed to load buckets');
        setS3Bucket(''); // Clear selection on error
      }
    } catch (error) {
      console.error('Error loading buckets:', error);
      setBucketError(error instanceof Error ? error.message : 'Unknown error');
      setS3Bucket(''); // Clear selection on error
    } finally {
      setIsLoadingBuckets(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Removed s3Bucket dependency to prevent loop when auto-selecting

  const loadFolders = useCallback(async (bucket: string, prefix = '', region: string) => {
    if (!bucket) {
        setFolders([]); // Clear folders if no bucket
        return;
    }
    setIsLoadingFolders(true);
    setFolders([]); // Clear previous folders
    try {
      // Use listS3Folders for config browsing
      const result = await listS3Folders({ data: { bucket, prefix, region } });
      if (result.success && result.folders) {
        setFolders(result.folders || []);
        setConfigCurrentPrefix(result.prefix || ''); // Update prefix for config modal browsing
      } else {
        console.error('Error loading folders for config:', result.error);
        // Optionally set a folder error state
      }
    } catch (error) {
      console.error('Error loading folders for config:', error);
      // Optionally set a folder error state
    } finally {
      setIsLoadingFolders(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Dependencies: listS3Folders (assumed stable)


  const handleBucketChange = useCallback((newBucket: string) => {
      setS3Bucket(newBucket);
      setS3Folder(''); // Reset target folder when bucket changes
      setConfigCurrentPrefix(''); // Reset browsing prefix in config
      setFolders([]); // Clear old folders
      if (newBucket) {
          loadFolders(newBucket, '', s3Region); // Load root folders for the new bucket
      }
  }, [s3Region, loadFolders]); // Dependencies

   const handleRegionChange = useCallback((newRegion: string) => {
       setS3Region(newRegion);
       // Reset bucket and folders as they are region-specific
       setS3Bucket('');
       setS3Folder('');
       setConfigCurrentPrefix('');
       setBuckets([]);
       setFolders([]);
       // Trigger loading buckets for the new region
       loadBuckets(newRegion);
   }, [loadBuckets]); // Dependency

  // Handler for selecting a folder *within the config dialog* to browse deeper
  const handleBrowseConfigFolder = useCallback((folderInfo: FolderInfo) => {
      setConfigCurrentPrefix(folderInfo.prefix);
      loadFolders(s3Bucket, folderInfo.prefix, s3Region);
  }, [s3Bucket, s3Region, loadFolders]);

  // Handler for setting the *target upload folder* based on the current config prefix
  const handleSetTargetFolder = useCallback(() => {
      setS3Folder(configCurrentPrefix); // Set the target upload folder
      setShowS3Config(false); // Optionally close config after setting
  }, [configCurrentPrefix]);


  // --- S3 Browser Logic ---
  const loadBrowserList = useCallback(async (bucket: string, prefix = '', region: string) => {
    if (!bucket) {
        setBrowserListError("S3 Bucket not configured.");
        setBrowserFolderList([]);
        setBrowserImageList([]);
        // Optionally open config if trying to browse without a bucket set
        // setShowS3Config(true);
        // if (buckets.length === 0) loadBuckets(region);
        return;
    }
    setIsLoadingBrowserList(true);
    setBrowserListError(null);
    setBrowserFolderList([]); // Clear existing lists
    setBrowserImageList([]);
    try {
      console.log('Loading S3 Browser List:', { bucket, prefix, region });
      // Use listS3Images for the main browser view
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buckets]); // Removed loadBuckets dependency

  const handleBrowserFolderClick = useCallback((folder: FolderInfo) => {
      // Remove trailing slash if it exists
      const prefix = folder.prefix.endsWith('/') ? folder.prefix.slice(0, -1) : folder.prefix;
      loadBrowserList(s3Bucket, prefix, s3Region);
  }, [s3Bucket, s3Region, loadBrowserList]); // Dependencies

  // --- S3 Upload Logic ---
  // Define the expected structure for the upload payload items more explicitly
  interface FileUploadPayload {
    filePath: string;
    s3Key: string;
    contentType: string;
    bucket: string;
    // Optional metadata if your API supports it
    // metadata?: Record<string, string>;
  }
  // Define the expected return structure from uploadProcessedImages more clearly
  interface UploadResult {
      success: boolean;
      uploadedImageIds: string[];
      // Map image ID to its S3 URLs (original and variants)
      s3UrlUpdates?: Map<string, { originalS3Url: string; variantS3Urls: Map<number, string> }>;
      error?: string;
  }


  const uploadProcessedImages = useCallback(async (imagesToUpload: ProcessedImage[]): Promise<UploadResult> => {
    const validImages = imagesToUpload.filter(img => !img.s3Url); // Only upload images without an s3Url

    if (validImages.length === 0) {
      // Set an info message rather than error if nothing needs uploading
      // setUploadError('No new images selected for upload');
      console.log('No new images selected for upload');
      return { success: true, uploadedImageIds: [] }; // Success, but nothing done
    }
    if (!s3Bucket) {
      setUploadError('S3 bucket not configured');
      setShowS3Config(true); // Prompt user to configure
      if (buckets.length === 0 && !isLoadingBuckets) loadBuckets(s3Region); // Load buckets if config is opened
      return { success: false, uploadedImageIds: [], error: 'S3 bucket not configured' };
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadProgress(0); // Reset progress

    const filesToUploadPayload: FileUploadPayload[] = [];
    const filesToDeleteLocally: string[] = []; // Server paths to delete after successful upload
    // No need for imageIdMap here, we process results later

    validImages.forEach(image => {
        // Add original file path for deletion (if it exists)
        if (image.originalFilePath) filesToDeleteLocally.push(image.originalFilePath);

        // Get filename without extension for use in S3 keys
        const filenameWithoutExt = image.originalName.substring(0, image.originalName.lastIndexOf('.'));
        const sanitizedFilename = filenameWithoutExt.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();

        // Prepare original file for upload (if path and extension exist)
        if (image.originalFilePath && image.fileExtension) {
            // Ensure s3Folder ends with a slash if it's not empty
            const folderPrefix = s3Folder ? (s3Folder.endsWith('/') ? s3Folder : `${s3Folder}/`) : '';
            filesToUploadPayload.push({
                filePath: image.originalFilePath, // Absolute server path
                s3Key: `${folderPrefix}${sanitizedFilename}.${image.fileExtension}`, // Use sanitized original filename
                contentType: image.contentType || 'application/octet-stream', // Provide default content type
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
    });

    if (filesToUploadPayload.length === 0) {
      setUploadError('No valid file paths found for upload in selected images.');
      setIsUploading(false);
      return { success: false, uploadedImageIds: [], error: 'No valid files found for upload.' };
    }

    try {
      // Simulate progress (replace with actual progress if API provides it)
      setUploadProgress(50);

      console.log("Uploading to S3:", { bucket: s3Bucket, region: s3Region, folder: s3Folder, count: filesToUploadPayload.length });
      console.log("Files:", filesToUploadPayload.map(f => f.s3Key)); // Log keys being uploaded

      const uploadResult = await uploadFilesToS3({
        // Pass folder separately if the API expects it, otherwise it's included in s3Key
        data: { files: filesToUploadPayload, bucket: s3Bucket, region: s3Region /*, folder: s3Folder */ }
      });

      setUploadProgress(100);

      if (uploadResult.success && uploadResult.results) {
        // --- Post-Upload Processing ---
        const successfullyUploadedImageIds = new Set<string>();
        // Map: imageId -> { originalUrl, map: variantWidth -> variantUrl }
        const s3UrlUpdates = new Map<string, { originalS3Url: string; variantS3Urls: Map<number, string> }>();

        // Process results to gather S3 URLs
        uploadResult.results.forEach((r: VariantS3Result) => {
            // Ensure result is successful and has key/url
            if (r.success && r.key && r.url) {
                // Find the matching image and variant based on the S3 key
                let matchingImage: ProcessedImage | undefined;
                let isOriginal = false;
                let variantWidth: number | undefined;

                // Extract the filename from the S3 key
                const keyParts = r.key.split('/');
                const filename = keyParts[keyParts.length - 1]; // Get the last part (filename)
                
                if (!filename) {
                    console.warn("Invalid S3 key format:", r.key);
                    return;
                }

                // Check if this is a variant (contains a dash followed by numbers before extension)
                const variantMatch = filename.match(/-(\d+)\.[^.]+$/);
                if (variantMatch) {
                    // This is a variant
                    variantWidth = parseInt(variantMatch[1], 10);
                    isOriginal = false;
                    
                    // Find the matching image by comparing sanitized filenames
                    const filenameWithoutVariant = filename.substring(0, filename.lastIndexOf('-'));
                    matchingImage = validImages.find(img => {
                        const imgFilenameWithoutExt = img.originalName.substring(0, img.originalName.lastIndexOf('.'));
                        const sanitizedImgFilename = imgFilenameWithoutExt.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();
                        return sanitizedImgFilename === filenameWithoutVariant;
                    });
                } else {
                    // This is an original
                    isOriginal = true;
                    
                    // Find the matching image by comparing sanitized filenames
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

                    // Initialize map entry for this imageId if it doesn't exist
                    if (!s3UrlUpdates.has(imageId)) {
                        // Find the original ProcessedImage to potentially pre-populate existing s3Urls
                        const initialVariantUrls = new Map<number, string>();
                        matchingImage.srcset.forEach(v => { if(v.s3Url) initialVariantUrls.set(v.width, v.s3Url) });

                        s3UrlUpdates.set(imageId, {
                            originalS3Url: matchingImage.s3Url || '', // Use existing if available
                            variantS3Urls: initialVariantUrls
                        });
                    }

                    // Get the update object for this imageId
                    const update = s3UrlUpdates.get(imageId)!; // '!' is safe due to the check above

                    // Store the S3 URL
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
                // Potentially collect failed keys/errors to report
            }
        });

        // --- Clean up local files asynchronously ---
        if (filesToDeleteLocally.length > 0) {
          console.log(`Attempting to delete ${filesToDeleteLocally.length} local files post-upload...`);
          deleteServerFiles({ data: { filePaths: filesToDeleteLocally } })
            .then((deleteResult: DeleteFilesResult) => { // Ensure correct type hint
              if (deleteResult.success) {
                console.log(`Successfully deleted ${deleteResult.deletedCount} temporary files.`);
              } else {
                console.error(`Failed to delete temporary files:`, deleteResult.error || deleteResult.errors);
              }
            })
            .catch((err: Error) => console.error('Error calling deleteServerFiles:', err));
        }

        // Return success, the IDs of images that had at least one successful part uploaded, and the URL map
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
      setTimeout(() => setUploadProgress(0), 1000); // Reset progress visually
    }
  }, [s3Bucket, s3Region, s3Folder, buckets, isLoadingBuckets, loadBuckets]); // Dependencies

  return {
    // S3 Config State & Setters
    s3Bucket, setS3Bucket,
    s3Region, setS3Region,
    s3Folder, setS3Folder, // The target upload folder prefix
    configCurrentPrefix, // For displaying the path being browsed in the config dialog

    // S3 Config UI State & Actions
    showS3Config, setShowS3Config,
    buckets, // List of available buckets
    folders, // List of folders for the current configCurrentPrefix
    isLoadingBuckets,
    isLoadingFolders,
    bucketError,
    loadBuckets, // Function to trigger loading buckets
    loadFolders, // Function to trigger loading folders (for config browsing)
    handleBucketChange, // Handler for dropdown
    handleRegionChange, // Handler for dropdown
    handleBrowseConfigFolder, // Handler for navigating folders *within* the config dialog
    handleSetTargetFolder, // Handler to set s3Folder based on configCurrentPrefix

    // S3 Browser State & Actions
    browserCurrentPrefix, // Read-only for UI (current path in S3 browser)
    browserFolderList,    // Folders in the current S3 browser path
    browserImageList,     // Images in the current S3 browser path
    isLoadingBrowserList,
    browserListError,
    loadBrowserList, // Function to trigger loading/refreshing the S3 browser view
    handleBrowserFolderClick, // Handler for navigation in the S3 browser view

    // Upload State & Actions
    isUploading,
    uploadProgress,
    uploadError,
    uploadProcessedImages, // Function to trigger upload
  };
}