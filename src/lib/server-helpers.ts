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
    const fullInputPath = path.join(process.cwd(), inputPath);
    const fullOutputDir = path.join(process.cwd(), outputDir);
    
    // Make sure the output directory exists
    if (!fs.existsSync(fullOutputDir)) {
      await fs.promises.mkdir(fullOutputDir, { recursive: true });
    }
    
    // Check if input file exists
    if (!fs.existsSync(fullInputPath)) {
      throw new Error('Input file not found');
    }
    
    // Load Sharp
    const { default: Sharp } = await getSharpModule();
    
    // Process the image
    const outputPath = path.join(fullOutputDir, outputFilename);
    const inputBuffer = await fs.promises.readFile(fullInputPath);
    
    const outputBuffer = await Sharp(inputBuffer)
      .resize({ width, withoutEnlargement: true })
      .toBuffer();
    
    await fs.promises.writeFile(outputPath, outputBuffer);
    
    return {
      processed: true,
      inputPath: fullInputPath,
      outputPath,
      size: outputBuffer.length,
      url: path.join(outputDir, outputFilename).replace(/^public/, '').replace(/\\/g, '/')
    };
  }); 