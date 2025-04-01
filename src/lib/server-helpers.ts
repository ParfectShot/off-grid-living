import * as fs from 'fs';
import * as path from 'path';
import { createServerFn } from '@tanstack/react-start';

// This is a server-only function to load Sharp dynamically
export const getSharpModule = async () => {
  try {
    return await import('sharp');
  } catch (error) {
    console.error('Failed to load Sharp:', error);
    throw new Error('Sharp image processing library could not be loaded');
  }
};

// Create server directory helper
export const ensureDirectory = createServerFn({ method: 'POST' })
  .validator((data: { dirPath: string }) => {
    if (!data.dirPath) {
      throw new Error('Directory path is required');
    }
    return data;
  })
  .handler(async ({ data }) => {
    const { dirPath } = data;
    const fullPath = path.join(process.cwd(), dirPath);
    
    if (!fs.existsSync(fullPath)) {
      await fs.promises.mkdir(fullPath, { recursive: true });
    }
    
    return { created: true, path: fullPath };
  });

// Save a file on the server
export const saveServerFile = createServerFn({ method: 'POST' })
  .validator((data: { 
    filePath: string;
    fileContent: string; // base64 encoded
    contentType: string;
  }) => {
    if (!data.filePath || !data.fileContent) {
      throw new Error('File path and content are required');
    }
    return data;
  })
  .handler(async ({ data }) => {
    const { filePath, fileContent, contentType } = data;
    const fullPath = path.join(process.cwd(), filePath);
    
    // Make sure the directory exists
    const dirPath = path.dirname(fullPath);
    if (!fs.existsSync(dirPath)) {
      await fs.promises.mkdir(dirPath, { recursive: true });
    }
    
    // Convert base64 to buffer and save
    const base64Data = fileContent.replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    await fs.promises.writeFile(fullPath, buffer);
    
    return { 
      saved: true, 
      path: fullPath,
      size: buffer.length,
      url: filePath.replace(/^public/, '')
    };
  });

// Process an image using Sharp
export const processServerImage = createServerFn({ method: 'POST' })
  .validator((data: { 
    inputPath: string;
    outputDir: string;
    outputFilename: string;
    width: number;
  }) => {
    if (!data.inputPath || !data.outputDir || !data.outputFilename) {
      throw new Error('Input path, output directory and filename are required');
    }
    return data;
  })
  .handler(async ({ data }) => {
    const { inputPath, outputDir, outputFilename, width } = data;
    const fullInputPath = inputPath;
    const fullOutputDir = path.join(process.cwd(), outputDir);
    
    // Make sure the output directory exists
    if (!fs.existsSync(fullOutputDir)) {
      await fs.promises.mkdir(fullOutputDir, { recursive: true });
    }
    
    // Check if input file exists using the correct absolute path
    if (!fs.existsSync(fullInputPath)) {
      console.error(`Input file not found at path: ${fullInputPath}. CWD: ${process.cwd()}`);
      throw new Error(`Input file not found: ${fullInputPath}`);
    }
    
    // Load Sharp
    const { default: Sharp } = await getSharpModule();
    
    // Modify filename for WebP extension
    const webpFilename = outputFilename.replace(/\.[^/.]+$/, "") + ".webp";
    const outputPath = path.join(fullOutputDir, webpFilename);
    const inputBuffer = await fs.promises.readFile(fullInputPath);
    
    // Resize and convert to WebP
    const outputBuffer = await Sharp(inputBuffer)
      .resize({ width, withoutEnlargement: true })
      .webp()
      .toBuffer();
    
    await fs.promises.writeFile(outputPath, outputBuffer);
    
    // Construct the relative URL for the WebP file
    const webpUrl = path.join(outputDir, webpFilename).replace(/^public/, '').replace(/\\/g, '/');

    return {
      processed: true,
      inputPath: fullInputPath,
      outputPath,
      size: outputBuffer.length,
      url: webpUrl,
      contentType: 'image/webp',
      fileExtension: 'webp'
    };
  });

// Delete multiple files from the server filesystem
export const deleteServerFiles = createServerFn({ method: 'POST' })
  .validator((data: { filePaths: string[] }) => {
    if (!Array.isArray(data.filePaths)) {
      throw new Error('filePaths must be an array of strings');
    }
    return data;
  })
  .handler(async ({ data }) => {
    const { filePaths } = data;
    let deletedCount = 0;
    let errors: { path: string; error: string }[] = [];

    for (const filePath of filePaths) {
      try {
        // Basic check to prevent deleting outside intended directories (optional but recommended)
        const resolvedPath = path.resolve(filePath);
        if (!resolvedPath.startsWith(path.resolve(process.cwd(), 'public', 'uploads'))) {
           console.warn(`Skipping deletion of potentially unsafe path: ${filePath}`);
           errors.push({ path: filePath, error: 'Attempted to delete outside allowed directory' });
           continue;
        }

        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
          deletedCount++;
        } else {
          // Optionally log if file didn't exist, maybe it was already cleaned up
          console.log(`File not found for deletion, skipping: ${filePath}`);
        }
      } catch (error) {
        console.error(`Failed to delete file ${filePath}:`, error);
        errors.push({ path: filePath, error: error instanceof Error ? error.message : 'Unknown error' });
      }
    }

    return {
      success: errors.length === 0,
      deletedCount,
      errors,
    };
  }); 