import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ProcessedImage } from '~/types/s3-types'; // Assuming ProcessedImage is here
import { ensureDirectory, saveServerFile, processServerImage, deleteServerFiles } from '~/lib/server-helpers';

// Helper to convert a file to Base64 (could be moved to a utils file)
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// --- Custom Hook: Image Processing ---
// Manages local file processing state and logic
export function useImageProcessing() {
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingError, setProcessingError] = useState<string | null>(null);

  const processFiles = useCallback(async (files: File[]): Promise<ProcessedImage[] | null> => {
    if (files.length === 0) {
      setProcessingError('Please select at least one image');
      return null; // Indicate failure or no action
    }

    setIsProcessing(true);
    setProcessingError(null);
    setProcessingProgress(0);
    const newlyProcessed: ProcessedImage[] = [];
    const filesToDeleteLocally: string[] = []; // Track files created during processing

    try {
      // Ensure directories (Consider doing this once on server startup if possible)
      await ensureDirectory({ data: { dirPath: 'public/uploads' } });
      await ensureDirectory({ data: { dirPath: 'public/uploads/variants' } });

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProcessingProgress(Math.round(((i + 1) / files.length) * 100));

        const fileData = await fileToBase64(file);
        const imageId = uuidv4();
        const fileExtension = file.name.split('.').pop() || '';
        const filename = `${imageId}.${fileExtension}`;
        const originalFilePathServer = `public/uploads/${filename}`; // Path on the server

        // Save original
        const saveResult = await saveServerFile({
          data: { filePath: originalFilePathServer, fileContent: fileData, contentType: file.type }
        });
        // Ensure saveResult.path is defined before pushing
        if (saveResult.path) {
            filesToDeleteLocally.push(saveResult.path); // Add original server path for potential cleanup
        } else {
            console.warn("saveServerFile did not return a path for", filename);
            // Handle error appropriately - maybe throw or set an error state
        }


        // Process variants
        const variants = [320, 640, 768, 1024, 1280];
        const srcset: ProcessedImage['srcset'] = [];
        let totalProcessedSize = 0;
        let webpContentType = file.type;
        let webpFileExtension = fileExtension;

        for (const width of variants) {
          const variantFilenameStem = `${imageId}_${width}`;
          // Let processServerImage determine the final extension (e.g., .webp)
          // Pass the original extension for reference if needed by the server function
          const outputDir = 'public/uploads/variants';

          const processResult = await processServerImage({
            data: {
              inputPath: saveResult.path!, // Assuming path is guaranteed if no error thrown above
              outputDir: outputDir,
              // Construct filename based on stem and determined extension (could be webp)
              outputFilename: variantFilenameStem + '.' + webpFileExtension,
              width
            }
          });

           // Update content type/extension based on the actual processed file
           // Ensure processResult has these fields defined
           if (variants.indexOf(width) === 0 && processResult.contentType && processResult.fileExtension) {
             webpContentType = processResult.contentType;
             webpFileExtension = processResult.fileExtension;
           }

          // Ensure processResult has required fields before pushing
          if (processResult.url && processResult.outputPath && typeof processResult.size === 'number') {
            srcset.push({
              width,
              url: processResult.url, // Relative URL for client preview
              filePath: processResult.outputPath, // Absolute server path for upload/deletion
              s3Url: undefined // Initialize s3Url
            });
             filesToDeleteLocally.push(processResult.outputPath); // Add variant server path
             totalProcessedSize += processResult.size;
          } else {
             console.warn("processServerImage did not return expected fields for width", width, processResult);
             // Handle error appropriately
          }
        }

        // Ensure saveResult has required fields
         if (saveResult.url && saveResult.path && typeof saveResult.size === 'number') {
             newlyProcessed.push({
               id: imageId,
               originalName: file.name,
               originalSize: saveResult.size,
               processedSize: totalProcessedSize,
               originalUrl: saveResult.url, // Relative URL for client preview
               originalFilePath: saveResult.path, // Absolute server path
               srcset,
               contentType: webpContentType,
               fileExtension: webpFileExtension,
               s3Url: undefined // Initialize s3Url
             });
         } else {
             console.warn("saveServerFile did not return expected fields for original image", saveResult);
             // Handle error appropriately
         }

      }

      setProcessedImages(prev => [...prev, ...newlyProcessed]);
      return newlyProcessed; // Return the successfully processed images

    } catch (error) {
      console.error('Error processing images:', error);
      setProcessingError(error instanceof Error ? error.message : 'Failed to process images');
      // Attempt cleanup on error
       if (filesToDeleteLocally.length > 0) {
           console.warn("Attempting to clean up local files after processing error...");
           // Use await here if you want cleanup to finish before returning null,
           // otherwise, let it run in the background.
           await deleteServerFiles({ data: { filePaths: filesToDeleteLocally } })
              .then(result => {
                  // Check if result.errors exists and has items
                  if (!result.success) console.error("Error during cleanup:", result.errors ? JSON.stringify(result.errors) : 'Unknown cleanup error');
                  else console.log("Cleanup successful:", result.deletedCount, "files");
              })
              .catch(cleanupErr => console.error("Exception during cleanup:", cleanupErr));
       }
      return null; // Indicate failure
    } finally {
      setIsProcessing(false);
      // Reset progress after a short delay
      setTimeout(() => setProcessingProgress(0), 1000);
    }
  }, []); // Dependencies: server functions (assumed stable)

  const removeProcessedImage = useCallback((imageId: string) => {
      // Important: Also trigger deletion of local files if they haven't been uploaded yet
      const imageToRemove = processedImages.find(img => img.id === imageId);
      if (imageToRemove && !imageToRemove.s3Url) {
          const pathsToDelete = [
              imageToRemove.originalFilePath,
              ...imageToRemove.srcset.map(v => v.filePath)
          ].filter((p): p is string => !!p); // Filter out undefined/null paths

          if (pathsToDelete.length > 0) {
              deleteServerFiles({ data: { filePaths: pathsToDelete } })
                  .then(result => {
                      // Check if result.errors exists and has items
                      if (!result.success) console.error("Failed to delete local files for removed image:", result.errors ? JSON.stringify(result.errors) : 'Unknown deletion error');
                      else console.log(`Cleaned up ${result.deletedCount} local files for removed image ${imageId}`);
                  })
                  .catch(err => console.error("Error calling deleteServerFiles for removed image:", err));
          }
      }
      setProcessedImages(prev => prev.filter(img => img.id !== imageId));
  }, [processedImages]); // Dependency: processedImages

  const updateProcessedImageS3Urls = useCallback((imageId: string, originalS3Url: string, variantS3Urls: Map<number, string>) => {
      setProcessedImages(prev => prev.map(img => {
          if (img.id === imageId) {
              return {
                  ...img,
                  s3Url: originalS3Url,
                  srcset: img.srcset.map(variant => ({
                      ...variant,
                      // Update S3 URL if found in the map, otherwise keep existing (if any)
                      s3Url: variantS3Urls.get(variant.width) ?? variant.s3Url
                  }))
              };
          }
          return img;
      }));
  }, []); // No dependencies needed

  return {
    processedImages,
    isProcessing,
    processingProgress,
    processingError,
    processFiles,
    removeProcessedImage,
    updateProcessedImageS3Urls,
    setProcessedImages // Expose setter if needed for direct manipulation (e.g., after upload)
  };
}
