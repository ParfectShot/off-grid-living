import React, { useState, useEffect } from 'react';
import { Skeleton } from '~/components/ui/skeleton';
import { Id } from '~/convex/_generated/dataModel';

// Type for a single image object expected from the parent
// Corresponds to the structure within product.images from getByIdWithDetails
export interface GalleryImage {
    _id?: Id<"images">;
    imageId?: Id<"images">; // From linking table
    originalUrl?: string | null;
    alt?: string | null;
    isMain?: boolean | null;
    // Add other fields like srcset if needed
}

interface ImageGalleryProps {
    images: GalleryImage[];
    productName?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images = [], productName = 'Product' }) => {
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined | null>(null);

    useEffect(() => {
        if (images.length > 0) {
            const mainImage = images.find(img => img.isMain);
            setSelectedImageUrl(mainImage?.originalUrl || images[0]?.originalUrl);
        } else {
            setSelectedImageUrl(undefined); // Handle case with no images
        }
    }, [images]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 mb-6">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 order-last md:order-first">
                {images.map((image) => (
                    <button
                        key={image?.imageId || image?._id}
                        onClick={() => setSelectedImageUrl(image?.originalUrl)}
                        className={`border rounded-lg overflow-hidden ${selectedImageUrl === image?.originalUrl ? 'border-primary ring-2 ring-primary' : 'border-border'}`}
                        aria-label={`View image ${image.alt || 'thumbnail'}`}
                    >
                        {image?.originalUrl ? (
                            <img
                                src={image.originalUrl}
                                alt={image.alt || `${productName} thumbnail`}
                                width={80}
                                height={80}
                                className="object-cover aspect-square"
                                loading="lazy"
                            />
                        ) : (
                            <Skeleton className="h-[80px] w-[80px] bg-muted" />
                        )}
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="border rounded-lg overflow-hidden aspect-square flex items-center justify-center bg-muted">
                {selectedImageUrl === null ? ( // Still figuring out initial state
                     <Skeleton className="h-full w-full" />
                ) : selectedImageUrl ? (
                    <img
                        src={selectedImageUrl}
                        alt={`${productName} main image`}
                        width={600}
                        height={600}
                        className="object-contain w-full h-full max-h-[600px]" // Constrain height
                    />
                ) : (
                    // Placeholder if no images or selected URL is invalid
                     <Skeleton className="h-full w-full" />
                )}
            </div>
        </div>
    );
}; 