import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { v4 as uuidv4 } from 'uuid';
import { ensureDirectory, saveServerFile, processServerImage } from '../../lib/server-helpers';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from '../../components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { uploadFilesToS3, listS3Buckets, listS3Folders } from '../../lib/s3-client';
import { Upload, CloudUpload, Maximize, X, ExternalLink, RefreshCw, Search, Copy, Check } from 'lucide-react';

// Define interface for processed images
interface ProcessedImage {
  id: string;
  originalName: string;
  originalSize: number;
  processedSize: number;
  originalUrl: string;
  srcset: Array<{ width: number; url: string }>;
  contentType: string;
  fileExtension?: string;
  s3Url?: string; // URL after uploading to S3
}

export const Route = createFileRoute('/dashboard/images')({
  component: ImagesPage,
  head: () => ({
    meta: [
      {
        name: "robots",
        content: "noindex, nofollow",
      },
    ],
  }),
});

function ImagesPage() {
  // State for managing files and UI state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [s3Images, setS3Images] = useState<ProcessedImage[]>([]);
  const [activeTab, setActiveTab] = useState("upload");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ProcessedImage | null>(null);
  
  // S3 configuration state
  const [showS3Config, setShowS3Config] = useState(false);
  const [s3Bucket, setS3Bucket] = useState('');
  const [s3Region, setS3Region] = useState('us-east-1');
  const [s3Folder, setS3Folder] = useState('');
  const [currentPrefix, setCurrentPrefix] = useState('');
  const [buckets, setBuckets] = useState<Array<{ name: string, creationDate?: Date }>>([]);
  const [folders, setFolders] = useState<Array<{ name: string, prefix: string, path: string }>>([]);
  const [isLoadingBuckets, setIsLoadingBuckets] = useState(false);
  const [isLoadingFolders, setIsLoadingFolders] = useState(false);
  const [bucketError, setBucketError] = useState<string | null>(null);

  // Helper to convert a file to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Handle file selection
  const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(Array.from(files));
      setUploadError(null);
    }
  };

  // Effect to track uploaded images
  useEffect(() => {
    const uploaded = processedImages.filter(img => img.s3Url);
    setS3Images(uploaded);
  }, [processedImages]);

  // Process selected images on the server using Tanstack's server functions
  const handleProcessImages = async () => {
    if (selectedFiles.length === 0) {
      setUploadError('Please select at least one image');
      return;
    }

    setIsProcessing(true);
    setUploadError(null);
    const processed: ProcessedImage[] = [];

    try {
      // First, ensure the upload directories exist
      await ensureDirectory({ data: { dirPath: 'public/uploads' } });
      await ensureDirectory({ data: { dirPath: 'public/uploads/variants' } });

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileProgress = i / selectedFiles.length;
        setUploadProgress(Math.round(fileProgress * 100));

        // Convert file to base64
        const fileData = await fileToBase64(file);
        
        // Generate a unique ID for the file
        const imageId = uuidv4();
        const fileExtension = file.name.split('.').pop() || '';
        const filename = `${imageId}.${fileExtension}`;

        // Save the original file on the server
        const saveResult = await saveServerFile({
          data: {
            filePath: `public/uploads/${filename}`,
            fileContent: fileData,
            contentType: file.type
          }
        });

        // Define responsive image sizes
        const variants = [320, 640, 768, 1024, 1280];
        const srcset = [];
        let totalProcessedSize = 0;

        // Process each size variant
        for (const width of variants) {
          const variantFilename = `${imageId}_${width}.${fileExtension}`;
          
          const processResult = await processServerImage({
            data: {
              inputPath: `public/uploads/${filename}`,
              outputDir: 'public/uploads/variants',
              outputFilename: variantFilename,
              width
            }
          });
          
          srcset.push({
            width,
            url: processResult.url
          });
          
          totalProcessedSize += processResult.size;
        }

        // Add the processed image to our result
        processed.push({
          id: imageId,
          originalName: file.name,
          originalSize: file.size,
          processedSize: totalProcessedSize,
          originalUrl: saveResult.url,
          srcset,
          contentType: file.type,
          fileExtension
        });
      }

      setProcessedImages(prev => [...prev, ...processed]);
      setSelectedFiles([]);
      setUploadProgress(100);
    } catch (error) {
      console.error('Error processing images:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to process images');
    } finally {
      setIsProcessing(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Handle opening the modal to view image variants
  const handleViewVariants = (image: ProcessedImage) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  // Copy URL to clipboard
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    // Could add toast/notification here
  };

  // Load available S3 buckets
  const loadS3Buckets = async () => {
    setIsLoadingBuckets(true);
    setBucketError(null);
    
    try {
      const result = await listS3Buckets({
        data: { region: s3Region }
      });
      if (result.success) {
        // Ensure buckets have required fields before setting state
        const validBuckets = result.buckets
          .filter(bucket => typeof bucket.name === 'string' && bucket.name.trim() !== '')
          .map(bucket => ({
            name: bucket.name as string, // We filtered out undefined/empty names
            creationDate: bucket.creationDate
          }));
        
        setBuckets(validBuckets);
        
        if (validBuckets.length > 0 && !s3Bucket) {
          const firstBucketName = validBuckets[0].name;
          setS3Bucket(firstBucketName);
          loadS3Folders(firstBucketName);
        } else if (s3Bucket) {
          loadS3Folders(s3Bucket);
        }
      } else {
        setBucketError(result.error || 'Failed to load buckets');
      }
    } catch (error) {
      console.error('Error loading buckets:', error);
      setBucketError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsLoadingBuckets(false);
    }
  };

  // Load available folders in the selected bucket
  const loadS3Folders = async (bucket: string, prefix = '') => {
    if (!bucket) return;
    
    setIsLoadingFolders(true);
    
    try {
      const result = await listS3Folders({
        data: {
          bucket,
          prefix,
          region: s3Region
        }
      });
      
      if (result.success) {
        setFolders(result.folders || []);
        setCurrentPrefix(result.prefix || '');
      } else {
        console.error('Error loading folders:', result.error);
      }
    } catch (error) {
      console.error('Error loading folders:', error);
    } finally {
      setIsLoadingFolders(false);
    }
  };

  // Handle bucket selection change
  const handleBucketChange = (bucketName: string) => {
    setS3Bucket(bucketName);
    setS3Folder('');
    setCurrentPrefix('');
    loadS3Folders(bucketName);
  };

  // Handle folder navigation
  const handleFolderSelect = (folderInfo: { name: string, prefix: string, path: string }) => {
    setCurrentPrefix(folderInfo.prefix);
    setS3Folder(folderInfo.prefix);
    loadS3Folders(s3Bucket, folderInfo.prefix);
  };

  // Handle uploading images to S3
  const handleUploadToS3 = async () => {
    if (processedImages.length === 0) {
      setUploadError('No processed images to upload');
      return;
    }

    if (!s3Bucket) {
      setShowS3Config(true);
      loadS3Buckets();
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadProgress(0);

    try {
      // Prepare files for upload
      const filesToUpload = processedImages.flatMap(image => {
        // Skip already uploaded images
        if (image.s3Url) return [];
        
        // Add original file
        const files = [{
          filePath: `public${image.originalUrl}`,
          s3Key: `images/original/${image.id}.${image.fileExtension}`,
          contentType: image.contentType,
          bucket: s3Bucket
        }];

        // Add variants
        image.srcset.forEach(variant => {
          files.push({
            filePath: `public${variant.url}`,
            s3Key: `images/variants/${image.id}_${variant.width}.${image.fileExtension}`,
            contentType: image.contentType,
            bucket: s3Bucket
          });
        });

        return files;
      });

      if (filesToUpload.length === 0) {
        setUploadError('No new images to upload');
        setIsUploading(false);
        return;
      }

      // Upload to S3
      const result = await uploadFilesToS3({
        data: {
          files: filesToUpload,
          bucket: s3Bucket,
          region: s3Region,
          folder: s3Folder
        }
      });

      if (result.success && result.results) {
        // Update processed images with S3 URLs
        setProcessedImages(prev => {
          return prev.map(image => {
            // Find the result for this image
            const originalS3Result = result.results.find(r => 
              r.key && r.key.includes(`/${image.id}.${image.fileExtension}`)
            );
            
            if (originalS3Result && originalS3Result.url) {
              return {
                ...image,
                s3Url: originalS3Result.url
              };
            }
            
            return image;
          });
        });

        setUploadError(null);
        
        // Switch to S3 tab after successful upload
        setActiveTab("s3");
      } else {
        setUploadError(`Uploaded ${result.totalUploaded || 0} files, but ${result.totalFailed || 0} failed.`);
      }
    } catch (error) {
      console.error('Error uploading to S3:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload to S3');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Handle deleting a processed image (placeholder)
  const handleDeleteImage = async (imageId: string) => {
    // In a real implementation, you would call a server function to delete the image
    setProcessedImages(prev => prev.filter(img => img.id !== imageId));
    return "Deleted";
  };

  // Filter S3 images based on search term
  const filteredS3Images = s3Images.filter(image => 
    image.originalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Image Processing</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload & Process</TabsTrigger>
          <TabsTrigger value="processed">Processed Images</TabsTrigger>
          <TabsTrigger value="s3" className="relative">
            S3 Images
            {s3Images.length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {s3Images.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Upload Images</h2>
            
            {/* File input */}
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFilesSelected}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
            
            {/* Selected files preview */}
            {selectedFiles.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Selected Files</h3>
                <ul className="list-disc pl-5">
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name} ({Math.round(file.size / 1024)} KB)</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Process button */}
            <Button 
              onClick={handleProcessImages} 
              disabled={isProcessing || selectedFiles.length === 0}
              className="mb-4"
            >
              {isProcessing ? 'Processing...' : 'Process Images'}
            </Button>
            
            {/* Progress bar */}
            {uploadProgress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
            
            {/* Error message */}
            {uploadError && (
              <div className="text-red-500 mb-4">{uploadError}</div>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="processed" className="mt-6">
          {processedImages.length > 0 ? (
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Processed Images</h2>
                
                {/* S3 Upload button */}
                <Button 
                  onClick={handleUploadToS3} 
                  disabled={isUploading}
                  className="flex items-center gap-2"
                >
                  {isUploading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CloudUpload className="h-4 w-4" />}
                  {isUploading ? 'Uploading to S3...' : 'Upload to S3'}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {processedImages.map((image) => (
                  <div key={image.id} className="border rounded p-4">
                    <div 
                      className="relative h-48 mb-2 cursor-pointer"
                      onClick={() => handleViewVariants(image)}
                    >
                      <img
                        src={image.originalUrl}
                        alt={image.originalName}
                        className="object-contain w-full h-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity">
                        <Maximize className="text-white opacity-0 hover:opacity-100 drop-shadow-lg" />
                      </div>
                      {image.s3Url && (
                        <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                          <Check className="h-3 w-3 mr-1" />
                          S3
                        </div>
                      )}
                    </div>
                    <div className="text-sm">
                      <div><strong>Name:</strong> {image.originalName}</div>
                      <div><strong>Original Size:</strong> {Math.round(image.originalSize / 1024)} KB</div>
                      <div><strong>Processed Size:</strong> {Math.round(image.processedSize / 1024)} KB</div>
                      <div><strong>Savings:</strong> {Math.round((1 - image.processedSize / image.originalSize) * 100)}%</div>
                      
                      {image.s3Url && (
                        <div className="mt-1">
                          <a 
                            href={image.s3Url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            S3 URL
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 flex justify-between">
                      <Button
                        variant="outline"
                        size="sm" 
                        onClick={() => handleViewVariants(image)}
                        className="flex items-center gap-1"
                      >
                        <Maximize className="h-3 w-3" />
                        View Variants
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteImage(image.id)}
                        className="flex items-center gap-1"
                      >
                        <X className="h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Card className="p-6 text-center">
              <p className="text-gray-500">No processed images yet. Upload and process images first.</p>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="s3" className="mt-6">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold">S3 Uploaded Images</h2>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full border rounded-md"
                />
              </div>
            </div>
            
            {filteredS3Images.length === 0 ? (
              <div className="text-center py-12">
                <CloudUpload className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500">No images uploaded to S3 yet</p>
                <p className="text-gray-400 text-sm mt-1">Process images and use the "Upload to S3" button</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredS3Images.map((image) => (
                    <div key={image.id} className="border rounded-lg overflow-hidden flex flex-col">
                      <div className="p-3 bg-gray-50 border-b">
                        <h3 className="font-medium text-sm truncate" title={image.originalName}>
                          {image.originalName}
                        </h3>
                      </div>
                      <div 
                        className="h-40 flex items-center justify-center p-2 cursor-pointer"
                        onClick={() => handleViewVariants(image)}
                      >
                        <img
                          src={image.originalUrl}
                          alt={image.originalName}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{image.srcset.length} variants</span>
                          <span>{Math.round((1 - image.processedSize / image.originalSize) * 100)}% smaller</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full flex-1 h-8 text-xs"
                            onClick={() => handleViewVariants(image)}
                          >
                            <Maximize className="h-3 w-3 mr-1" />
                            Variants
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full flex-1 h-8 text-xs"
                            onClick={() => handleCopyUrl(image.s3Url || '')}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy URL
                          </Button>
                        </div>
                        <a 
                          href={image.s3Url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block text-blue-600 hover:underline text-xs"
                        >
                          <ExternalLink className="h-3 w-3 inline-block mr-1" />
                          Open in new tab
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Image Variants Modal - Using existing Dialog component */}
      {selectedImage && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-4xl flex flex-col max-h-[90vh]">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle>Responsive Variants - {selectedImage.originalName}</DialogTitle>
            </DialogHeader>
            
            <div className="overflow-y-auto pr-2 flex-grow my-4">
              <Tabs defaultValue="gallery" className="w-full">
                <TabsList className="grid grid-cols-2 w-full sticky top-0 z-10 bg-background">
                  <TabsTrigger value="gallery">Gallery View</TabsTrigger>
                  <TabsTrigger value="details">Technical Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="gallery" className="pt-4 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {selectedImage.srcset.map((variant) => (
                      <div 
                        key={variant.width} 
                        className="border rounded-lg overflow-hidden flex flex-col"
                      >
                        <div className="p-2 bg-gray-100 dark:bg-gray-800 text-sm font-medium">
                          Width: {variant.width}px
                        </div>
                        <div className="relative h-48 bg-white dark:bg-gray-900 flex items-center justify-center p-2">
                          <img
                            src={variant.url}
                            alt={`${selectedImage.originalName} at ${variant.width}px`}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="p-2 bg-gray-50 dark:bg-gray-800">
                          <a 
                            href={variant.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            View Full Size
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="pt-4 space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">HTML Responsive Image Code</h3>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                      {`<img
  src="${selectedImage.originalUrl}"
  srcset="${selectedImage.srcset.map(v => `${v.url} ${v.width}w`).join(', ')}"
  sizes="(max-width: 768px) 100vw, 768px"
  alt="${selectedImage.originalName}"
/>`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Available Widths</h3>
                    <ul className="list-disc pl-5">
                      {selectedImage.srcset.map((variant) => (
                        <li key={variant.width}>
                          {variant.width}px - <a 
                            href={variant.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Direct link
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <DialogFooter className="flex-shrink-0 border-t pt-4">
              <Button 
                variant="outline" 
                onClick={() => setModalOpen(false)}
                className="mr-2"
              >
                Close
              </Button>
              <a 
                href={selectedImage.originalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button>
                  View Original Image
                </Button>
              </a>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* S3 Configuration Dialog */}
      <Dialog open={showS3Config} onOpenChange={(open) => {
        setShowS3Config(open);
        if (open && buckets.length === 0) {
          loadS3Buckets();
        }
      }}>
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
                  onChange={(e) => setS3Region(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="us-east-1"
                />
                <Button 
                  onClick={loadS3Buckets}
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
                onChange={(e) => handleBucketChange(e.target.value)}
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
                          onClick={() => handleFolderSelect(folder)}
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
                onChange={(e) => setS3Folder(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="folder/subfolder"
              />
              <p className="text-xs text-gray-500">
                Leave empty to upload to bucket root
              </p>
            </div>
          </div>
          
          <DialogFooter className="flex-shrink-0 border-t pt-4">
            <Button variant="outline" onClick={() => setShowS3Config(false)}>Cancel</Button>
            <Button 
              onClick={() => {
                setShowS3Config(false);
                handleUploadToS3();
              }}
              disabled={!s3Bucket || isLoadingBuckets || isLoadingFolders}
            >
              Save & Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 