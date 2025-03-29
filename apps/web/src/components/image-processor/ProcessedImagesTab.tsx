import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { ProcessedImage } from "~/types/s3-types";
import { Maximize, X, Check } from "lucide-react";

interface ProcessedImagesTabProps {
  processedImages: ProcessedImage[];
  handleViewVariants: (image: ProcessedImage) => void;
  handleUploadToS3: () => void;
  handleDeleteImage: (imageId: string) => void;
  isUploading: boolean;
}

export function ProcessedImagesTab({
  processedImages,
  handleViewVariants,
  handleUploadToS3,
  handleDeleteImage,
  isUploading
}: ProcessedImagesTabProps) {
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (processedImages.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-500">No processed images yet. Upload and process images first.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Processed Images</h2>
        
        {/* S3 Upload button */}
        <Button 
          onClick={handleUploadToS3} 
          disabled={isUploading}
          className="flex items-center gap-2"
        >
          {isUploading ? 'Uploading to S3...' : 'Upload to S3'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {processedImages.map((image) => (
          <div key={image.id} className="border rounded p-4">
            <div 
              className="relative h-48 mb-2 cursor-pointer"
              onClick={() => handleViewVariants(image)}
            >
              <img
                src={image.originalUrl}
                alt={image.originalName}
                className="object-contain w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity">
                <Maximize className="text-white opacity-0 hover:opacity-100 drop-shadow-lg" />
              </div>
              {image.s3Url && (
                <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                  <Check className="h-3 w-3 mr-1" />
                  S3
                </div>
              )}
            </div>
            <div className="text-sm">
              <div><strong>Name:</strong> {image.originalName}</div>
              <div><strong>Original Size:</strong> {formatBytes(image.originalSize)}</div>
              <div><strong>Processed Size:</strong> {formatBytes(image.processedSize)}</div>
              <div><strong>Savings:</strong> {Math.round((1 - image.processedSize / image.originalSize) * 100)}%</div>
            </div>
            <div className="mt-2 flex justify-between">
              <Button
                variant="outline"
                size="sm" 
                onClick={() => handleViewVariants(image)}
                className="flex items-center gap-1"
              >
                <Maximize className="h-3 w-3" />
                View Variants
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleDeleteImage(image.id)}
                className="flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
} 