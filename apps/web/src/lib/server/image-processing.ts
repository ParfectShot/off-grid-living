import { createServerFn } from '@tanstack/react-start';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Ensure uploads directory exists
const ensureUploadsDir = async () => {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    await fs.promises.mkdir(uploadsDir, { recursive: true });
  }
  
  // Also ensure we have a variants directory
  const variantsDir = path.join(uploadsDir, 'variants');
  if (!fs.existsSync(variantsDir)) {
    await fs.promises.mkdir(variantsDir, { recursive: true });
  }
  
  return { uploadsDir, variantsDir };
};

// Helper to save a file from a buffer
const saveFile = async (buffer: Buffer, filename: string, dirPath: string) => {
  const filePath = path.join(dirPath, filename);
  await fs.promises.writeFile(filePath, buffer);
  return filePath;
};

// Generate a URL for a file
const getFileUrl = (filePath: string) => {
  // Convert the absolute file path to a URL relative to public directory
  const relativePath = filePath.split('/public/')[1] || filePath.split('\\public\\')[1];
  return `/${relativePath.replace(/\\/g, '/')}`;
};

// Generate upload ID and URL
export const generateUploadUrl = createServerFn({ method: 'POST' })
  .validator((data: { contentType: string }) => {
    if (!data.contentType) {
      throw new Error('Content type is required');
    }
    return data;
  })
  .handler(async ({ data }) => {
    // Generate a random ID for the file
    const storageId = uuidv4();
    
    return {
      storageId,
      url: `/api/upload-image?id=${storageId}` // This would be the endpoint if we used an API route
    };
  });

// Store image in a temporary location on server from Base64 data
export const storeImage = createServerFn({ method: 'POST' })
  .validator((data: { 
    storageId: string; 
    fileName: string; 
    contentType: string; 
    fileData: string; // base64 encoded 
  }) => {
    if (!data.storageId || !data.fileName || !data.contentType || !data.fileData) {
      throw new Error('Missing required fields for image storage');
    }
    return data;
  })
  .handler(async ({ data }) => {
    const { storageId, fileName, contentType, fileData } = data;
    const { uploadsDir } = await ensureUploadsDir();
    
    // Create a new filename with the storage ID
    const fileExtension = path.extname(fileName);
    const filename = `${storageId}${fileExtension}`;
    const filePath = path.join(uploadsDir, filename);
    
    // Convert base64 to buffer and save
    const base64Data = fileData.replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    await fs.promises.writeFile(filePath, buffer);
    
    // Return the file info
    return {
      id: storageId,
      filePath,
      url: getFileUrl(filePath),
      contentType,
      size: buffer.length
    };
  });

// Import Sharp dynamically to avoid SSR issues
const getSharp = async () => {
  // Use dynamic import for Sharp to avoid issues with SSR
  return await import('sharp');
};

// Process an uploaded image with Sharp
export const processImage = createServerFn({ method: 'POST' })
  .validator((data: { 
    storageId: string; 
    originalName: string; 
    contentType: string; 
  }) => {
    if (!data.storageId || !data.originalName || !data.contentType) {
      throw new Error('Missing required fields for image processing');
    }
    return data;
  })
  .handler(async ({ data }) => {
    const { storageId, originalName, contentType } = data;
    const { uploadsDir, variantsDir } = await ensureUploadsDir();
    
    // Get file extension
    const fileExtension = path.extname(originalName);
    const filename = `${storageId}${fileExtension}`;
    const filePath = path.join(uploadsDir, filename);
    
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error('Image not found');
    }
    
    // Import Sharp
    const { default: Sharp } = await getSharp();
    
    // Read the original image
    const originalBuffer = await fs.promises.readFile(filePath);
    const originalSize = originalBuffer.length;
    
    // Get image metadata
    const metadata = await Sharp(originalBuffer).metadata();
    const originalWidth = metadata.width || 0;
    
    // Define responsive image sizes
    const variants = [320, 640, 768, 1024, 1280, 1536];
    
    // Only generate variants smaller than the original
    const validVariants = variants.filter(width => width <= originalWidth);
    if (!validVariants.includes(originalWidth) && originalWidth > 0) {
      validVariants.push(originalWidth);
    }
    
    // Sort variants by width
    validVariants.sort((a, b) => a - b);
    
    // Process each size variant
    const srcset = [];
    let totalProcessedSize = 0;
    
    for (const width of validVariants) {
      // Resize the image maintaining aspect ratio
      const resizedBuffer = await Sharp(originalBuffer)
        .resize({ width, withoutEnlargement: true })
        .toBuffer();
      
      // Save the variant
      const variantFilename = `${storageId}_${width}${fileExtension}`;
      const variantPath = await saveFile(resizedBuffer, variantFilename, variantsDir);
      const variantUrl = getFileUrl(variantPath);
      
      srcset.push({
        width,
        url: variantUrl
      });
      
      totalProcessedSize += resizedBuffer.length;
    }
    
    // Get URL for the original image
    const originalUrl = getFileUrl(filePath);
    
    // Return the processed image data
    return {
      _id: storageId,
      originalName,
      originalSize,
      processedSize: totalProcessedSize,
      originalUrl,
      srcset,
      contentType,
      fileExtension: fileExtension.slice(1) // Remove the dot
    };
  }); 