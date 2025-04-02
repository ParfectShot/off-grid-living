import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { ProcessedImage, S3Image } from "~/types/s3-types";
import { Maximize, X, Check, Edit2, Save } from "lucide-react";

interface ProcessedImagesTabProps {
  processedImages: ProcessedImage[];
  handleViewVariants: (image: ProcessedImage | S3Image) => void;
  handleUploadToS3: () => void;
  handleDeleteImage: (imageId: string) => void;
  isUploading: boolean;
  isStoring?: boolean;
  storeError?: string | null;
  readOnly?: boolean;
}

export function ProcessedImagesTab({
  processedImages,
  handleViewVariants,
  handleUploadToS3,
  handleDeleteImage,
  isUploading,
  isStoring,
  storeError,
  readOnly = false
}: ProcessedImagesTabProps) {
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [editedFilenames, setEditedFilenames] = useState<Record<string, string>>({});

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const startEditingFilename = (image: ProcessedImage) => {
    const imageId = image.id;
    setEditingImageId(imageId);
    setEditedFilenames({
      ...editedFilenames,
      [imageId]: editedFilenames[imageId] || image.originalName
    });
  };

  const saveFilename = (image: ProcessedImage) => {
    // Update the image's filename in the state
    const imageId = image.id;
    const newName = editedFilenames[imageId];
    
    // Update the actual image object's originalName
    if (newName && newName !== image.originalName) {
      image.originalName = newName;
      console.log(`Changed filename for image ${imageId} from "${image.originalName}" to "${newName}"`);
    }
    
    // Stop editing mode
    setEditingImageId(null);
  };

  const handleFilenameChange = (imageId: string, newName: string) => {
    setEditedFilenames({
      ...editedFilenames,
      [imageId]: newName
    });
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
      <div className={`flex justify-between items-center mb-4 ${readOnly ? 'justify-center' : 'justify-between'}`}>
        <h2 className="text-2xl font-bold">Processed Images</h2>
        
        {!readOnly && (
          <Button 
            onClick={handleUploadToS3} 
            disabled={isUploading || isStoring || editingImageId !== null}
            className="flex items-center gap-2"
          >
            {isUploading ? 'Uploading...' : (isStoring ? 'Storing...' : 'Upload to S3')}
          </Button>
        )}
      </div>
      
      {!readOnly && storeError && (
        <div className="text-red-500 mb-4">Error storing metadata: {storeError}</div>
      )}

      {editingImageId !== null && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4 text-sm text-yellow-800">
          Please save your filename changes before uploading to S3.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {processedImages.map((image) => (
          <div key={image.id} className="border rounded p-4">
            <div 
              className="relative h-48 mb-2 cursor-pointer bg-gray-100 flex items-center justify-center"
              onClick={() => handleViewVariants(image)}
            >
              <img
                src={image.originalUrl}
                alt={editedFilenames[image.id] || image.originalName}
                className="object-contain w-full h-full max-h-48"
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
              {!readOnly && editingImageId === image.id ? (
                <div className="flex items-center mb-2">
                  <Input
                    value={editedFilenames[image.id]}
                    onChange={(e) => handleFilenameChange(image.id, e.target.value)}
                    className="text-sm h-8"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => saveFilename(image)}
                    className="ml-1 h-8 w-8 p-0"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between mb-2">
                  <div><strong>Name:</strong> {editedFilenames[image.id] || image.originalName}</div>
                  {!readOnly && !image.s3Url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditingFilename(image)}
                      className="ml-1 h-6 w-6 p-0"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              )}
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
              {!readOnly && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteImage(image.id)}
                  className="flex items-center gap-1"
                >
                  <X className="h-3 w-3" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}