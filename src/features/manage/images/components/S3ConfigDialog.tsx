import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/components/ui/dialog";
import { RefreshCw, CloudUpload } from "lucide-react";
import { FolderInfo } from "~/types/s3-types";

interface S3ConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  s3Bucket: string;
  s3Region: string;
  s3Folder: string;
  currentPrefix: string;
  buckets: Array<{ name: string; creationDate?: Date }>;
  folders: FolderInfo[];
  isLoadingBuckets: boolean;
  isLoadingFolders: boolean;
  bucketError: string | null;
  onBucketChange: (bucket: string) => void;
  onRegionChange: (region: string) => void;
  onFolderChange: (folder: string) => void;
  onFolderSelect: (folder: FolderInfo) => void;
  onLoadBuckets: () => void;
  onSetTargetFolder: () => void;
  onSave: () => void;
}

export function S3ConfigDialog({
  open,
  onOpenChange,
  s3Bucket,
  s3Region,
  s3Folder,
  currentPrefix,
  buckets,
  folders,
  isLoadingBuckets,
  isLoadingFolders,
  bucketError,
  onBucketChange,
  onRegionChange,
  onFolderChange,
  onFolderSelect,
  onLoadBuckets,
  onSetTargetFolder,
  onSave
}: S3ConfigDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg flex flex-col max-h-[90vh]">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>S3 Upload Configuration</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4 overflow-y-auto flex-grow">
          <div className="grid w-full items-center gap-2">
            <label htmlFor="s3Region" className="text-sm font-medium">AWS Region</label>
            <div className="flex gap-2">
              <input
                id="s3Region"
                type="text"
                value={s3Region}
                onChange={(e) => onRegionChange(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="us-east-1"
              />
              <Button 
                onClick={onLoadBuckets}
                disabled={isLoadingBuckets}
                className="whitespace-nowrap"
              >
                {isLoadingBuckets ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  'Load Buckets'
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Note: Make sure VITE_AWS_ACCESS_KEY_ID and VITE_AWS_SECRET_ACCESS_KEY environment variables are set on your server
            </p>
          </div>
          
          {bucketError && (
            <div className="text-red-500 text-sm p-2 border border-red-200 bg-red-50 rounded-md">
              {bucketError}
            </div>
          )}
          
          <div className="grid w-full items-center gap-2">
            <label htmlFor="s3Bucket" className="text-sm font-medium">S3 Bucket</label>
            <select
              id="s3Bucket"
              value={s3Bucket}
              onChange={(e) => onBucketChange(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              disabled={isLoadingBuckets || buckets.length === 0}
            >
              {buckets.length === 0 ? (
                <option value="">No buckets available</option>
              ) : (
                buckets.map((bucket) => (
                  <option key={bucket.name} value={bucket.name}>
                    {bucket.name}
                  </option>
                ))
              )}
            </select>
          </div>
          
          {s3Bucket && (
            <div className="grid w-full items-center gap-2">
              <label className="text-sm font-medium">Target Folder</label>
              <div className="border rounded-md p-2 max-h-40 overflow-y-auto">
                <div className="text-xs text-gray-500 mb-2">
                  Current path: {currentPrefix || '/ (root)'}
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={onSetTargetFolder}
                  className="mb-2 text-xs h-7"
                  disabled={!currentPrefix}
                >
                  Use Current Path as Target
                </Button>
                
                {isLoadingFolders ? (
                  <div className="flex justify-center p-4">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  </div>
                ) : folders.length === 0 ? (
                  <div className="text-sm text-gray-500 p-2">No folders found</div>
                ) : (
                  <div className="space-y-1">
                    {folders.map((folder) => (
                      <div 
                        key={folder.prefix}
                        onClick={() => onFolderSelect(folder)}
                        className={`p-2 rounded-md cursor-pointer hover:bg-gray-100 text-sm flex items-center ${folder.prefix === currentPrefix ? 'bg-blue-50 text-blue-600' : ''}`}
                      >
                        {folder.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="grid w-full items-center gap-2">
            <label htmlFor="customFolder" className="text-sm font-medium">Or enter a custom folder path</label>
            <input
              id="customFolder"
              type="text"
              value={s3Folder}
              onChange={(e) => onFolderChange(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="folder/subfolder"
            />
            <p className="text-xs text-gray-500">
              Leave empty to upload to bucket root
            </p>
          </div>
        </div>
        
        <DialogFooter className="flex-shrink-0 border-t pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            onClick={onSave}
            disabled={!s3Bucket || isLoadingBuckets || isLoadingFolders}
          >
            <CloudUpload className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 