import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { 
  CloudUpload, RefreshCw, Search, Copy, Folder, 
  FolderOpen, FileImage, Calendar, FileBox, Eye, 
  ExternalLink 
} from "lucide-react";
import { S3Image } from "~/types/s3-types";
import { FolderInfo } from "~/types/s3-types";

interface S3BrowserViewProps {
  s3Bucket: string;
  s3CurrentPrefix: string;
  s3FolderList: FolderInfo[];
  s3ImageList: S3Image[];
  isLoadingS3List: boolean;
  s3ListError: string | null;
  searchTerm: string;
  onFolderClick: (folder: FolderInfo) => void;
  onImageView: (image: S3Image) => void;
  onConfigureS3: () => void;
  onRefresh: () => void;
  onCopyUrl: (url: string) => void;
}

export function S3BrowserView({
  s3Bucket,
  s3CurrentPrefix,
  s3FolderList,
  s3ImageList,
  isLoadingS3List,
  s3ListError,
  searchTerm,
  onFolderClick,
  onImageView,
  onConfigureS3,
  onRefresh,
  onCopyUrl
}: S3BrowserViewProps) {
  // Format functions
  const formatDate = (date?: Date) => {
    if (!date) return 'Unknown';
    return new Date(date).toLocaleString();
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Filter images based on search term
  const filteredImages = s3ImageList.filter(image => 
    searchTerm === '' || image.originalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-1">S3 Browser</h2>
          {s3Bucket ? (
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium mr-1">Bucket:</span> {s3Bucket}
              <span className="mx-2">•</span>
              <span className="font-medium mr-1">Path:</span> {s3CurrentPrefix || '/ (root)'}
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              No bucket selected. Configure S3 settings first.
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={onRefresh}
            disabled={isLoadingS3List || !s3Bucket}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <RefreshCw className={`h-4 w-4 ${isLoadingS3List ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            onClick={onConfigureS3}
            size="sm"
            className="flex items-center gap-1"
          >
            <CloudUpload className="h-4 w-4" />
            Configure S3
          </Button>
        </div>
      </div>
      
      {/* Error message */}
      {s3ListError && (
        <div className="text-red-500 p-3 bg-red-50 rounded-md mb-4">
          {s3ListError}
        </div>
      )}
      
      {!s3Bucket ? (
        <div className="text-center py-12">
          <CloudUpload className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-500">No S3 bucket configured</p>
          <p className="text-gray-400 text-sm mt-1">Configure S3 settings to browse images</p>
          <Button onClick={onConfigureS3} className="mt-4">
            Configure S3
          </Button>
        </div>
      ) : isLoadingS3List ? (
        <div className="text-center py-12">
          <RefreshCw className="mx-auto h-12 w-12 text-gray-300 mb-3 animate-spin" />
          <p className="text-gray-500">Loading content from S3...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Folder navigation */}
          {s3FolderList.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-3 border-b">
                <h3 className="font-medium flex items-center">
                  <FolderOpen className="h-4 w-4 mr-2 text-amber-500" />
                  Folders
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 p-2">
                {s3FolderList.map((folder) => (
                  <div 
                    key={folder.prefix}
                    onClick={() => onFolderClick(folder)}
                    className="p-3 rounded-md hover:bg-gray-100 flex items-center cursor-pointer"
                  >
                    <Folder className="h-5 w-5 mr-2 text-amber-500 flex-shrink-0" />
                    <span className="truncate">{folder.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Images list */}
          {filteredImages.length === 0 ? (
            <div className="text-center py-8 border rounded-lg">
              <FileImage className="mx-auto h-10 w-10 text-gray-300 mb-2" />
              <p className="text-gray-500">No images found in this location</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-3 border-b">
                <h3 className="font-medium flex items-center">
                  <FileImage className="h-4 w-4 mr-2 text-blue-500" />
                  Images ({filteredImages.length})
                </h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variants</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredImages.map((image) => (
                      <tr key={image.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileBox className="h-5 w-5 mr-2 text-gray-400" />
                            <span className="font-medium">{image.originalName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatBytes(image.originalSize)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {image.variants}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                            {formatDate(image.lastModified)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8"
                              onClick={() => onImageView(image)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8"
                              onClick={() => onCopyUrl(image.originalUrl)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <a 
                              href={image.originalUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center h-8 px-3 py-1 bg-transparent hover:bg-gray-100 border border-transparent rounded"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
} 