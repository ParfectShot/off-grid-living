import { ChangeEvent } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

interface UploadTabProps {
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
  handleProcessImages: () => void;
  isProcessing: boolean;
  uploadProgress: number;
  uploadError: string | null;
}

export function UploadTab({
  selectedFiles,
  setSelectedFiles,
  handleProcessImages,
  isProcessing,
  uploadProgress,
  uploadError
}: UploadTabProps) {
  const handleFilesSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(Array.from(files));
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Images</h2>
      
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
  );
} 