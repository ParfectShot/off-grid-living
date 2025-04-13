import { useState, useCallback } from 'react';
import { useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';
import { Id } from 'convex/_generated/dataModel';
import { ProcessedImage } from '~/types/s3-types'; // Assuming ProcessedImage is here

// Define the credit type to match Convex schema
interface ImageCredit {
    authorName: string;
    authorUrl: string;
    sourceName: string;
    sourceUrl: string;
}

// --- Custom Hook: Convex Storage ---
// Manages interaction with Convex for storing image metadata
export function useConvexImageStore() {
    const storeImageMutation = useMutation(api.images.storeImage);
    const [isStoring, setIsStoring] = useState(false);
    const [storeError, setStoreError] = useState<string | null>(null);

    const storeImageMetadata = useCallback(async (image: ProcessedImage): Promise<Id<"images"> | null> => {
        if (!image.s3Url) {
            const errorMsg = `Cannot store metadata in Convex for image '${image.originalName}' without a main S3 URL.`;
            console.error(errorMsg);
            setStoreError(errorMsg);
            return null;
        }

        setIsStoring(true);
        setStoreError(null);

        try {
            // Validate srcset data
            const validSrcset = image.srcset
                .filter(variant => variant.s3Url && variant.width)
                .map(variant => ({
                    width: variant.width,
                    url: variant.s3Url!,
                }));

            if (validSrcset.length === 0) {
                throw new Error(`No valid srcset variants found for ${image.originalName}`);
            }

            // Only include fields defined in the Convex mutation schema
            const imageForDb = {
                originalName: image.originalName,
                originalSize: image.originalSize,
                processedSize: image.processedSize,
                originalUrl: image.s3Url,
                srcset: validSrcset,
                contentType: image.contentType || 'application/octet-stream',
                fileExtension: image.fileExtension || image.originalName.split('.').pop() || '',
            };

            // Additional validation
            if (!imageForDb.originalUrl || !imageForDb.fileExtension) {
                throw new Error(`Missing required data for ${image.originalName}: originalUrl or fileExtension`);
            }

            console.log(`Storing image metadata in Convex:`, imageForDb);
            const convexId = await storeImageMutation(imageForDb);
            
            if (!convexId) {
                throw new Error(`Failed to get Convex ID for ${image.originalName}`);
            }

            console.log(`Successfully stored image ${image.originalName} with Convex ID: ${convexId}`);
            return convexId;
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : "Failed to store image metadata";
            console.error(`Convex storage error for ${image.originalName}:`, errorMsg);
            setStoreError(errorMsg);
            return null;
        } finally {
            setIsStoring(false);
        }
    }, [storeImageMutation]);

    return {
        storeImageMetadata,
        isStoring,
        storeError,
    };
}
