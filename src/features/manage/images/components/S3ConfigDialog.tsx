import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/components/ui/dialog";
import { RefreshCw, CloudUpload } from "lucide-react";

interface S3ConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  s3Bucket: string;
  s3Region: string;
  s3Folder: string;
  buckets: Array<{ name: string; creationDate?: Date }>;
  isLoadingBuckets: boolean;
  bucketError: string | null;
  onBucketChange: (bucket: string) => void;
  onRegionChange: (region: string) => void;
  onFolderChange: (folder: string) => void;
  onLoadBuckets: () => void;
  onSave: () => void;
}

export function S3ConfigDialog({
  open,
  onOpenChange,
  s3Bucket,
  s3Region,
  s3Folder,
  buckets,
  isLoadingBuckets,
  bucketError,
  onBucketChange,
  onRegionChange,
  onFolderChange,
  onLoadBuckets,
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
              Note: Make sure VITE_VITE_AWS_ACCESS_KEY_ID and VITE_AWS_SECRET_ACCESS_KEY environment variables are set on your server
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
          
          <div className="grid w-full items-center gap-2">
            <label htmlFor="targetFolder" className="text-sm font-medium">Target Folder</label>
            <input
              id="targetFolder"
              type="text"
              value={s3Folder}
              onChange={(e) => onFolderChange(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="folder/subfolder"
            />
            <p className="text-xs text-gray-500">
              Leave empty to upload to bucket root, or enter a path like "folder/subfolder"
            </p>
          </div>
        </div>
        
        <DialogFooter className="flex-shrink-0 border-t pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            onClick={onSave}
            disabled={!s3Bucket || isLoadingBuckets}
          >
            <CloudUpload className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 