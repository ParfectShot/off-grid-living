import Sharp from 'sharp';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export type ImageVariant = {
  width: number;
  url: string;
  buffer: Buffer;
  contentType: string;
};

export type ProcessedImage = {
  id: string;
  originalName: string;
  originalSize: number;
  processedSize: number;
  originalUrl: string;
  originalBuffer: Buffer;
  contentType: string;
  fileExtension: string;
  srcset: ImageVariant[];
  uploaded: boolean;
};

// S3 Configuration
const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || '',
  },
});

const bucketName = import.meta.env.VITE_S3_BUCKET_NAME || '';

// Process image file into multiple responsive versions
export async function processImage(file: File): Promise<ProcessedImage> {
  // Read the file as ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();
  
  // Convert ArrayBuffer to Buffer
  const buffer = Buffer.from(arrayBuffer);
  
  // Use Sharp to analyze the image
  const sharpInstance = Sharp(buffer);
  const metadata = await sharpInstance.metadata();
  
  // Convert original buffer to WebP
  const originalWebPBuffer = await sharpInstance.webp().toBuffer();
  const originalWebPSize = originalWebPBuffer.length;

  // Generate responsive sizes - we'll create variants that maintain aspect ratio
  const originalWidth = metadata.width || 0;
  const variants = [320, 640, 768, 1024, 1280, 1536];
  
  // Only generate variants smaller than the original
  const validVariants = variants.filter(width => width <= originalWidth);
  if (!validVariants.includes(originalWidth) && originalWidth > 0) {
    validVariants.push(originalWidth);
  }
  
  // Sort variants by width
  validVariants.sort((a, b) => a - b);
  
  // Process each size variant
  const srcset: ImageVariant[] = [];
  let totalProcessedWebPSize = 0;

  for (const width of validVariants) {
    // Skip if we already have this width
    if (srcset.some(v => v.width === width)) continue;
    
    // Resize the image and convert to WebP
    const resizedWebPBuffer = await Sharp(buffer) // Start from original buffer for resizing
      .resize({ width, withoutEnlargement: true })
      .webp() // Convert to WebP
      .toBuffer();
    
    totalProcessedWebPSize += resizedWebPBuffer.length; // Accumulate WebP size

    // Create a temporary URL for client-side preview (using WebP)
    const blob = new Blob([resizedWebPBuffer], { type: 'image/webp' }); // Use image/webp type
    const url = URL.createObjectURL(blob);
    
    srcset.push({
      width,
      url, // Keep temp URL for preview
      buffer: resizedWebPBuffer, // Store the WebP buffer
      contentType: 'image/webp', // Set content type to WebP
    });
  }
  
  // Create a unique ID for this image
  const id = crypto.randomUUID();
  // Create temp URL for original WebP preview
  const originalWebPBlob = new Blob([originalWebPBuffer], { type: 'image/webp' });
  const originalUrl = URL.createObjectURL(originalWebPBlob); // Use WebP blob for preview URL
  
  // Get file extension (will be overridden)
  // const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
  
  return {
    id,
    originalName: file.name, // Keep original name
    originalSize: originalWebPSize, // Use original WebP size
    processedSize: totalProcessedWebPSize, // Use total variant WebP size
    originalUrl, // Use WebP preview URL
    originalBuffer: originalWebPBuffer, // Use original WebP buffer
    contentType: 'image/webp', // Set content type to WebP
    fileExtension: 'webp', // Set extension to webp
    srcset, // Contains WebP variants
    uploaded: false,
  };
}

// Upload image and its variants to S3
export async function uploadImageToS3(image: ProcessedImage): Promise<ProcessedImage> {
  // Base path in S3 bucket
  const basePath = `images/${image.id}`;
  
  // Upload the original image
  const originalKey = `${basePath}/original.${image.fileExtension}`;
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: originalKey,
      Body: image.originalBuffer,
      ContentType: image.contentType,
    })
  );
  
  // Generate public URL for the original image
  const originalUrl = `https://${bucketName}.s3.amazonaws.com/${originalKey}`;
  
  // Upload each variant and generate its public URL
  const srcset = await Promise.all(
    image.srcset.map(async (variant) => {
      const variantKey = `${basePath}/${variant.width}.${image.fileExtension}`;
      
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: variantKey,
          Body: variant.buffer,
          ContentType: variant.contentType,
        })
      );
      
      const variantUrl = `https://${bucketName}.s3.amazonaws.com/${variantKey}`;
      
      return {
        width: variant.width,
        url: variantUrl,
        buffer: variant.buffer,
        contentType: variant.contentType,
      };
    })
  );
  
  // Return the updated image with S3 URLs
  return {
    ...image,
    originalUrl,
    srcset,
    uploaded: true,
  };
} 