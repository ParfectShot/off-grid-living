export interface FolderInfo {
  name: string;
  prefix: string;
  path: string;
}

export interface S3Image {
  id: string;
  key: string;
  originalName: string;
  originalSize: number;
  originalUrl: string;
  lastModified?: Date;
  srcset: Array<{ width: number; url: string; key: string; size: number }>;
  folder: string;
  variants: number;
}

export interface ProcessedImage {
  id: string;
  originalName: string;
  originalSize: number;
  processedSize: number;
  originalUrl: string;
  originalFilePath?: string;
  srcset: Array<{ 
    width: number; 
    url: string;
    filePath?: string;
  }>;
  contentType: string;
  fileExtension?: string;
  s3Url?: string;
}

export interface FileUploadParams {
  filePath: string;
  s3Key: string;
  contentType: string;
  bucket: string;
  region?: string;
  folder?: string;
} 