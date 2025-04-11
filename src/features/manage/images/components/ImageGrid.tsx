import React from 'react';
import { Image } from 'lucide-react';
import { Card, CardContent } from '~/components/ui/card';
import { Doc } from '~/convex/_generated/dataModel';
import { AspectRatio } from '~/components/ui/aspect-ratio';

interface ImageGridProps {
  images: Doc<"images">[] | undefined;
  onSelectImage: (image: Doc<"images">) => void;
  isLoading?: boolean;
}

export function ImageGrid({ images, onSelectImage, isLoading = false }: ImageGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <Card key={`skeleton-${index}`} className="overflow-hidden">
            <CardContent className="p-2 h-[200px] bg-gray-100 dark:bg-gray-800 animate-pulse">
              <div className="flex items-center justify-center h-full">
                <Image className="w-12 h-12 text-gray-300 dark:text-gray-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Image className="w-16 h-16 mb-4 text-gray-400" />
        <h3 className="text-lg font-medium">No images found</h3>
        <p className="text-sm text-gray-500 mt-2">Upload images using the process images page.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {images.map((image) => (
        <Card 
          key={image._id} 
          className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all duration-200"
          onClick={() => onSelectImage(image)}
        >
          <CardContent className="p-2">
            <AspectRatio ratio={1}>
              <div className="relative w-full h-full">
                <img 
                  src={image.originalUrl} 
                  alt={image.alt || image.originalName}
                  className="object-cover w-full h-full rounded-sm"
                  loading="lazy"
                />
              </div>
            </AspectRatio>
            <div className="mt-2 text-xs truncate" title={image.originalName}>
              {image.originalName}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 