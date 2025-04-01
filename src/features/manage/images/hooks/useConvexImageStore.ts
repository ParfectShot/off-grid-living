import { useState, useCallback } from 'react';
import { useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';
import { Id } from 'convex/_generated/dataModel';
import { ProcessedImage } from '~/types/s3-types'; // Assuming ProcessedImage is here

// --- Custom Hook: Convex Storage ---
// Manages interaction with Convex for storing image metadata
export function useConvexImageStore() {
    const storeImageMutation = useMutation(api.images.storeImage);
    const [isStoring, setIsStoring] = useState(false);
    const [storeError, setStoreError] = useState<string | null>(null);

    const storeImageMetadata = useCallback(async (image: ProcessedImage): Promise<Id<"images"> | null> => {
        // Check if the image has the main S3 URL, which indicates successful upload
        if (!image.s3Url) {
            const errorMsg = `Cannot store metadata in Convex for image '${image.originalName}' without a main S3 URL.`;
            console.error(errorMsg, image);
            setStoreError(errorMsg); // Set specific error
            return null;
        }

        setIsStoring(true);
        setStoreError(null);

        try {
             // Construct the object matching the 'images' table schema in Convex
             const imageForDb = {
               originalName: image.originalName,
               originalSize: image.originalSize,
               processedSize: image.processedSize,
               originalUrl: image.s3Url, // Use the main S3 URL (already validated)
               // Filter srcset to include only variants that also have an S3 URL and map to the required format
               srcset: image.srcset
                   .filter(v => !!v.s3Url) // Ensure variant has been uploaded successfully
                   .map(v => ({ width: v.width, url: v.s3Url! })), // Map to {width, url}, '!' is safe due to filter
               contentType: image.contentType || 'application/octet-stream', // Use determined or default content type
               fileExtension: image.fileExtension || '', // Use determined file extension
               // Add optional fields if they exist on the ProcessedImage object and are needed by schema
               // alt: image.alt || undefined, // Example: Use undefined if not present
               // credit: image.credit || undefined, // Example
             };

            // Validate essential fields before sending to Convex
            if (!imageForDb.originalUrl || !imageForDb.fileExtension) {
                throw new Error(`Missing essential data for Convex: originalUrl or fileExtension for ${image.originalName}`);
            }

            console.log(`Storing metadata for ${image.originalName} in Convex...`, imageForDb);
            const convexId = await storeImageMutation(imageForDb);
            console.log(`Successfully stored image ${image.originalName} with Convex ID: ${convexId}`);
            return convexId;
        } catch (err) {
            console.error(`Failed to store image ${image.originalName} in Convex:`, err);
            const errorMsg = err instanceof Error ? err.message : "Failed to store image metadata in Convex";
            setStoreError(errorMsg);
            return null;
        } finally {
            setIsStoring(false);
        }
    }, [storeImageMutation]); // Dependency: Convex mutation hook

    return {
        storeImageMetadata,
        isStoring, // Expose loading state for UI feedback
        storeError, // Expose error state for UI feedback
    };
}
