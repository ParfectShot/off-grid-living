import { S3Client, PutObjectCommand, ListBucketsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createServerFn } from "@tanstack/react-start";
import fs from 'fs';
import path from 'path';

// Type definitions
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

interface FolderInfo {
  name: string;
  prefix: string;
  path: string;
}

// Helper function to initialize S3 client
export function getS3Client(region: string = 'ap-south-1') {
  // Check for environment variables
  const accessKeyId = import.meta.env.VITE_VITE_AWS_ACCESS_KEY_ID;
  const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
  
  if (!accessKeyId || !secretAccessKey) {
    throw new Error('AWS credentials not found in environment variables');
  }
  
  return new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });
}

// Function to upload a single file to S3
export const uploadFileToS3 = createServerFn({ method: 'POST' })
  .validator((data: FileUploadParams) => data)
  .handler(async ({ data }) => {
    const { filePath, s3Key, contentType, bucket, region = 'us-east-1', folder = '' } = data;
    
    try {
      // Validate inputs
      if (!filePath || !s3Key || !bucket) {
        return {
          success: false,
          error: 'Missing required parameters: filePath, s3Key, or bucket'
        };
      }
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return {
          success: false,
          error: `File not found: ${filePath}`
        };
      }
      
      // Read file
      const fileContent = fs.readFileSync(filePath);
      
      // Create S3 client
      const s3Client = getS3Client(region);
      
      // Prepare full key with folder if specified
      const fullKey = folder ? `${folder.replace(/\/+$/, '')}/${s3Key}` : s3Key;
      
      // Use multipart upload for better performance and reliability
      const upload = new Upload({
        client: s3Client,
        params: {
          Bucket: bucket,
          Key: fullKey,
          Body: fileContent,
          ContentType: contentType
        }
      });
      
      // Execute upload
      const result = await upload.done();
      
      // Generate public URL
      const url = `https://${bucket}.s3.${region}.amazonaws.com/${fullKey}`;
      
      return {
        success: true,
        url,
        key: fullKey,
        etag: result.ETag,
        location: result.Location
      };
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  });

// Function to upload multiple files to S3
export const uploadFilesToS3 = createServerFn({ method: 'POST' })
  .validator((data: MultipleFilesUploadParams) => data)
  .handler(async ({ data }) => {
    const { files, bucket, region = 'us-east-1', folder = '' } = data;
    
    try {
      // Validate inputs
      if (!Array.isArray(files) || files.length === 0 || !bucket) {
        return {
          success: false,
          error: 'Missing required parameters: files array or bucket'
        };
      }
      
      // Upload each file and track results
      const results = [];
      let totalUploaded = 0;
      let totalFailed = 0;
      
      for (const file of files) {
        const result = await uploadFileToS3({
          data: {
            ...file,
            bucket,
            region,
            folder
          }
        });
        
        if (result.success) {
          totalUploaded++;
          results.push(result);
        } else {
          totalFailed++;
          results.push({
            ...result,
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

// Function to list available S3 buckets
export const listS3Buckets = createServerFn({ method: 'GET' })
  .validator((data?: BucketsListParams) => data || {})
  .handler(async ({ data }) => {
    const { region = 'us-east-1' } = data || {};
    
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

// Function to list folders in a bucket
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
      const folders: FolderInfo[] = response.CommonPrefixes?.map(prefix => {
        const prefixPath = prefix.Prefix || '';
        // Remove trailing slash and get folder name
        const folderName = prefixPath.replace(/\/$/, '').split('/').pop() || '';
        return {
          name: folderName,
          prefix: prefixPath,
          path: prefixPath
        };
      }) || [];
      
      // Add option to create new folder at current level
      folders.unshift({
        name: '(Current directory)',
        prefix: prefix,
        path: prefix
      });
      
      // If we're in a subfolder, add option to go up one level
      if (prefix) {
        const parentPrefix = prefix.split('/').slice(0, -1).join('/');
        folders.unshift({
          name: '.. (Parent directory)',
          prefix: parentPrefix,
          path: parentPrefix
        });
      }
      
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

// Add a new function to list images in an S3 bucket
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
      const folders: FolderInfo[] = response.CommonPrefixes?.map(prefix => {
        const prefixPath = prefix.Prefix || '';
        // Remove trailing slash and get folder name
        const folderName = prefixPath.replace(/\/$/, '').split('/').pop() || '';
        return {
          name: folderName,
          prefix: prefixPath,
          path: prefixPath
        };
      }) || [];
      
      // Add option to go up one level if we're in a subfolder
      if (prefix) {
        const parentPrefix = prefix.split('/').slice(0, -1).join('/');
        folders.unshift({
          name: '.. (Parent directory)',
          prefix: parentPrefix,
          path: parentPrefix
        });
      }

      // Extract images (Contents) - only process files with image extensions
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
      const images = response.Contents?.filter(item => {
        if (!item.Key) return false;
        
        // Skip folders - they appear as both CommonPrefixes and Contents with trailing slashes
        if (item.Key.endsWith('/')) return false;
        
        // Check if it's an image file
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

      // Group images by their pattern to find variants
      const groupedImages: Record<string, any[]> = {};
      
      images.forEach(image => {
        // Try to extract base filename (without size suffix)
        const match = image.name.match(/^(.+?)(?:_\d+)?(\.[^.]+)$/);
        
        if (match) {
          const [, baseName, extension] = match;
          const groupKey = `${baseName}${extension}`;
          
          if (!groupedImages[groupKey]) {
            groupedImages[groupKey] = [];
          }
          
          groupedImages[groupKey].push(image);
        } else {
          // If no pattern match, use the full name as key
          if (!groupedImages[image.name]) {
            groupedImages[image.name] = [];
          }
          
          groupedImages[image.name].push(image);
        }
      });
      
      // Process grouped images to find variants
      const processedImages = Object.entries(groupedImages).map(([groupKey, variants]) => {
        // Sort variants by size (if they have size in the filename)
        variants.sort((a, b) => {
          const aSize = parseInt((a.name.match(/_(\d+)\./) || [0, 0])[1]);
          const bSize = parseInt((b.name.match(/_(\d+)\./) || [0, 0])[1]);
          return aSize - bSize;
        });
        
        // Find the original image (typically without size suffix)
        const original = variants.find(img => !img.name.match(/_\d+\./)) || variants[0];
        
        // Find other variants
        const srcset = variants
          .filter(img => img !== original)
          .map(img => {
            // Extract size from filename (e.g., image_320.jpg -> 320)
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