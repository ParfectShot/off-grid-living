import { S3Client, PutObjectCommand, ListBucketsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createServerFn } from "@tanstack/react-start";
import fs from 'fs';
import path from 'path';

// Type definitions (these should be moved to a shared types file)
interface FileUploadParams {
  filePath: string;
  s3Key: string;
  contentType: string;
  bucket: string;
  region?: string;
  folder?: string;
}

interface MultipleFilesUploadParams {
  files: FileUploadParams[];
  bucket: string;
  region?: string;
  folder?: string;
}

interface BucketsListParams {
  region?: string;
}

interface FoldersListParams {
  bucket: string;
  prefix?: string;
  region?: string;
}

// Add these interfaces before the existing interfaces
interface S3ImageVariant {
  url: string;
  key: string;
  size: number;
  name: string;
  lastModified?: Date;
}

interface ProcessedS3Image {
  id: string;
  key: string;
  originalName: string;
  originalSize: number;
  originalUrl: string;
  lastModified?: Date;
  srcset: Array<{
    width: number;
    url: string;
    key: string;
    size: number;
  }>;
  folder: string;
  variants: number;
}

// Private helper function to initialize S3 client (not exposed to client)
function getS3Client(region: string = 'ap-south-1') {
  // Get credentials from server environment variables
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  
  if (!accessKeyId || !secretAccessKey) {
    throw new Error('AWS credentials not found in server environment variables');
  }
  
  return new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });
}

// Server function to list buckets
export const listS3Buckets = createServerFn({ method: 'GET' })
  .validator((data?: BucketsListParams) => data || {})
  .handler(async ({ data }) => {
    const { region = 'ap-south-1' } = data || {};
    
    try {
      const s3Client = getS3Client(region);
      const command = new ListBucketsCommand({});
      const response = await s3Client.send(command);
      
      return {
        success: true,
        buckets: response.Buckets?.map(bucket => ({
          name: bucket.Name,
          creationDate: bucket.CreationDate
        })) || []
      };
    } catch (error) {
      console.error('Error listing S3 buckets:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        buckets: []
      };
    }
  });

// Server function to list folders
export const listS3Folders = createServerFn({ method: 'GET' })
  .validator((data: FoldersListParams) => data)
  .handler(async ({ data }) => {
    const { bucket, prefix = '', region = 'us-east-1' } = data;
    
    try {
      if (!bucket) {
        return {
          success: false,
          error: 'Bucket name is required',
          folders: []
        };
      }
      
      const s3Client = getS3Client(region);
      const command = new ListObjectsV2Command({
        Bucket: bucket,
        Delimiter: '/',
        Prefix: prefix ? `${prefix}/` : ''
      });
      
      const response = await s3Client.send(command);
      
      // Extract folders (CommonPrefixes)
      const folders = response.CommonPrefixes?.map(prefix => {
        const prefixPath = prefix.Prefix || '';
        const folderName = prefixPath.replace(/\/$/, '').split('/').pop() || '';
        return {
          name: folderName,
          prefix: prefixPath,
          path: prefixPath
        };
      }) || [];
      
      // Add navigation options
      if (prefix) {
        const parentPrefix = prefix.split('/').slice(0, -1).join('/');
        folders.unshift({
          name: '.. (Parent directory)',
          prefix: parentPrefix,
          path: parentPrefix
        });
      }
      
      folders.unshift({
        name: '(Current directory)',
        prefix: prefix,
        path: prefix
      });
      
      return {
        success: true,
        folders,
        prefix
      };
    } catch (error) {
      console.error('Error listing S3 folders:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        folders: []
      };
    }
  });

// Server function to list images
export const listS3Images = createServerFn({ method: 'GET' })
  .validator((data: { bucket: string, prefix?: string, region?: string }) => data)
  .handler(async ({ data }) => {
    const { bucket, prefix = '', region = 'us-east-1' } = data;
    
    try {
      if (!bucket) {
        return {
          success: false,
          error: 'Bucket name is required',
          folders: [],
          images: []
        };
      }
      
      const s3Client = getS3Client(region);
      const command = new ListObjectsV2Command({
        Bucket: bucket,
        Delimiter: '/',
        Prefix: prefix ? `${prefix}/` : ''
      });
      
      const response = await s3Client.send(command);
      
      // Extract folders (CommonPrefixes)
      const folders = response.CommonPrefixes?.map(prefix => {
        const prefixPath = prefix.Prefix || '';
        const folderName = prefixPath.replace(/\/$/, '').split('/').pop() || '';
        return {
          name: folderName,
          prefix: prefixPath,
          path: prefixPath
        };
      }) || [];
      
      if (prefix) {
        const parentPrefix = prefix.split('/').slice(0, -1).join('/');
        folders.unshift({
          name: '.. (Parent directory)',
          prefix: parentPrefix,
          path: parentPrefix
        });
      }

      // Extract images
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
      const images = response.Contents?.filter(item => {
        if (!item.Key) return false;
        if (item.Key.endsWith('/')) return false;
        const extension = item.Key.toLowerCase().split('.').pop();
        return extension && imageExtensions.includes(`.${extension}`);
      }).map(item => {
        const key = item.Key || '';
        const name = key.split('/').pop() || '';
        const size = item.Size || 0;
        const lastModified = item.LastModified;
        const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
        
        return {
          key,
          name,
          size,
          lastModified,
          url
        };
      }) || [];

      // Group images by pattern
      const groupedImages: Record<string, S3ImageVariant[]> = {};
      images.forEach(image => {
        const match = image.name.match(/^(.+?)(?:_\d+)?(\.[^.]+)$/);
        if (match) {
          const [, baseName, extension] = match;
          const groupKey = `${baseName}${extension}`;
          if (!groupedImages[groupKey]) {
            groupedImages[groupKey] = [];
          }
          groupedImages[groupKey].push(image);
        } else {
          if (!groupedImages[image.name]) {
            groupedImages[image.name] = [];
          }
          groupedImages[image.name].push(image);
        }
      });

      // Process grouped images
      const processedImages: ProcessedS3Image[] = Object.entries(groupedImages).map(([groupKey, variants]) => {
        variants.sort((a, b) => {
          const aSize = parseInt((a.name.match(/_(\d+)\./) || [0, 0])[1].toString());
          const bSize = parseInt((b.name.match(/_(\d+)\./) || [0, 0])[1].toString());
          return aSize - bSize;
        });
        
        const original = variants.find(img => !img.name.match(/_\d+\./)) || variants[0];
        const srcset = variants
          .filter(img => img !== original)
          .map(img => {
            const sizeMatch = img.name.match(/_(\d+)\./);
            const width = sizeMatch ? parseInt(sizeMatch[1]) : 0;
            return {
              width,
              url: img.url,
              key: img.key,
              size: img.size
            };
          });
        
        return {
          id: original.key.replace(/\//g, '-'),
          key: original.key,
          originalName: original.name,
          originalSize: original.size,
          originalUrl: original.url,
          lastModified: original.lastModified,
          srcset,
          folder: prefix,
          variants: variants.length
        };
      });
      
      return {
        success: true,
        folders,
        images: processedImages,
        prefix
      };
    } catch (error) {
      console.error('Error listing S3 images:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        folders: [],
        images: []
      };
    }
  });

// Server function to upload files
export const uploadFilesToS3 = createServerFn({ method: 'POST' })
  .validator((data: MultipleFilesUploadParams) => data)
  .handler(async ({ data }) => {
    const { files, bucket, region = 'us-east-1', folder = '' } = data;
    
    try {
      if (!Array.isArray(files) || files.length === 0 || !bucket) {
        return {
          success: false,
          error: 'Missing required parameters: files array or bucket'
        };
      }
      
      const s3Client = getS3Client(region);
      const results = [];
      let totalUploaded = 0;
      let totalFailed = 0;
      
      for (const file of files) {
        try {
          if (!fs.existsSync(file.filePath)) {
            totalFailed++;
            results.push({
              success: false,
              error: `File not found: ${file.filePath}`,
              filePath: file.filePath,
              s3Key: file.s3Key
            });
            continue;
          }
          
          const fileContent = fs.readFileSync(file.filePath);
          const fullKey = folder ? `${folder.replace(/\/+$/, '')}/${file.s3Key}` : file.s3Key;
          
          const upload = new Upload({
            client: s3Client,
            params: {
              Bucket: bucket,
              Key: fullKey,
              Body: fileContent,
              ContentType: file.contentType
            }
          });
          
          const result = await upload.done();
          const url = `https://${bucket}.s3.${region}.amazonaws.com/${fullKey}`;
          
          totalUploaded++;
          results.push({
            success: true,
            url,
            key: fullKey,
            etag: result.ETag,
            location: result.Location
          });
        } catch (error) {
          totalFailed++;
          results.push({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            filePath: file.filePath,
            s3Key: file.s3Key
          });
        }
      }
      
      return {
        success: totalFailed === 0,
        results,
        totalUploaded,
        totalFailed
      };
    } catch (error) {
      console.error('Error uploading files to S3:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }); 