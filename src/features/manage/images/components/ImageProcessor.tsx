import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { generateUploadId, processImage, storeImage } from "~/lib/image-processing";

// Define interface for processed images
interface ProcessedImage {
  _id: string;
  originalName: string;
  originalSize: number;
  processedSize: number;
  originalUrl: string;
  srcset: Array<{ width: number; url: string }>;
  contentType: string;
  fileExtension: string;
}

export function ImageProcessor() {
  // State for managing files and UI state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  // Process selected images on the server
  const handleProcessImages = async () => {
    if (selectedFiles.length === 0) {
      setUploadError('Please select at least one image');
      return;
    }

    setIsProcessing(true);
    setUploadError(null);
    const processed: ProcessedImage[] = [];

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileProgress = i / selectedFiles.length;
        setUploadProgress(Math.round(fileProgress * 100));

        // Convert file to base64
        const fileData = await fileToBase64(file);

        // Get an upload ID
        const uploadData = await generateUploadId(file.type);
        
        // Store the image on the server
        await storeImage(
          uploadData.storageId,
          file.name,
          file.type,
          fileData
        );

        // Process the image on the server
        const processedImage = await processImage(
          uploadData.storageId,
          file.name,
          file.type
        );

        processed.push(processedImage);
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

  // Handle deleting a processed image (placeholder)
  const handleDeleteImage = async (imageId: string): Promise<void> => {
    // In a real implementation, you would call a server function to delete the image
    setProcessedImages(prev => prev.filter(img => img._id !== imageId));
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Image Processor</h2>
        
        {/* File input */}
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesSelected}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
        
        {/* Selected files preview */}
        {selectedFiles.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Selected Files</h3>
            <ul className="list-disc pl-5">
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name} ({Math.round(file.size / 1024)} KB)</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Process button */}
        <Button 
          onClick={handleProcessImages} 
          disabled={isProcessing || selectedFiles.length === 0}
          className="mb-4"
        >
          {isProcessing ? 'Processing...' : 'Process Images'}
        </Button>
        
        {/* Progress bar */}
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
        
        {/* Error message */}
        {uploadError && (
          <div className="text-red-500 mb-4">{uploadError}</div>
        )}
      </Card>
      
      {/* Processed images */}
      {processedImages.length > 0 && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Processed Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {processedImages.map((image) => (
              <div key={image._id} className="border rounded p-4">
                <div className="relative h-48 mb-2">
                  <img
                    src={image.originalUrl}
                    alt={image.originalName}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="text-sm">
                  <div><strong>Name:</strong> {image.originalName}</div>
                  <div><strong>Original Size:</strong> {Math.round(image.originalSize / 1024)} KB</div>
                  <div><strong>Processed Size:</strong> {Math.round(image.processedSize / 1024)} KB</div>
                  <div><strong>Savings:</strong> {Math.round((1 - image.processedSize / image.originalSize) * 100)}%</div>
                </div>
                <div className="mt-2">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteImage(image._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}