import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Copy, Eye, Link, Trash2, Check, Import } from "lucide-react";
import { toast } from "sonner";
import { S3Image } from "../types";
import { useMutation } from "convex/react";
import { api } from "~/convex/_generated/api";

interface S3ImagesProps {
  images: S3Image[];
  onDeleteImage?: (imageId: string) => Promise<void>;
}

export function S3Images({ images, onDeleteImage }: S3ImagesProps) {
  const [previewImage, setPreviewImage] = useState<S3Image | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [originalImageId, setOriginalImageId] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);

  // Convex mutations
  const storeImage = useMutation(api.images.storeImage);

  const handlePreview = (image: S3Image) => {
    setPreviewImage(image);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Image URL copied to clipboard");
  };

  const handleCopyHtml = (image: S3Image) => {
    const html = `<img
  src="${image.originalUrl}"
  srcset="${image.srcset.map((v) => `${v.url} ${v.width}w`).join(", ")}"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="${image.originalName}"
/>`;
    navigator.clipboard.writeText(html);
    toast.success("Image HTML with srcset copied to clipboard");
  };

  const handleDelete = async (imageId: string) => {
    if (onDeleteImage) {
      try {
        setIsDeleting(true);
        await onDeleteImage(imageId);
        toast.success("Image deleted successfully");
      } catch (error) {
        toast.error("Failed to delete image");
        console.error(error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const toggleImageSelection = (imageId: string) => {
    const newSelection = new Set(selectedImages);
    if (newSelection.has(imageId)) {
      newSelection.delete(imageId);
    } else {
      newSelection.add(imageId);
    }
    setSelectedImages(newSelection);
  };

  const handleImportToConvex = async () => {
    if (!originalImageId) {
      toast.error('Please select an original image');
      return;
    }

    setIsImporting(true);
    const selectedImagesList = images.filter(img => selectedImages.has(img.id));
    const originalImage = selectedImagesList.find(img => img.id === originalImageId);
    const variantImages = selectedImagesList.filter(img => img.id !== originalImageId);
    
    if (!originalImage) {
      toast.error('Original image not found in selection');
      setIsImporting(false);
      return;
    }

    // Helper function to extract width from URL
    const getWidthFromUrl = (url: string): number | null => {
      const match = url.match(/-(\d+)\.[^.]+$/);
      return match ? parseInt(match[1], 10) : null;
    };
    
    try {
      // Create a single image entry with variants
      await storeImage({
        originalName: originalImage.originalName,
        originalSize: originalImage.originalSize,
        processedSize: originalImage.originalSize,
        originalUrl: originalImage.originalUrl,
        srcset: variantImages.map(variant => {
          const width = getWidthFromUrl(variant.originalUrl);
          if (!width) {
            console.warn(`Could not extract width from URL: ${variant.originalUrl}`);
            return null;
          }
          return {
            url: variant.originalUrl,
            width,
          };
        }).filter((v): v is { url: string; width: number } => v !== null),
        contentType: `image/${originalImage.originalName.split('.').pop() || 'jpeg'}`,
        fileExtension: originalImage.originalName.split('.').pop() || 'jpg',
        alt: originalImage.originalName.split('.')[0],
      });
      
      toast.success('Successfully imported image with variants');
      setSelectedImages(new Set());
      setOriginalImageId(null);
      setShowImportDialog(false);
    } catch (error) {
      console.error('Error importing images:', error);
      toast.error('Failed to import image');
    } finally {
      setIsImporting(false);
    }
  };

  // Helper functions
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Filter images based on search term
  const filteredImages = images.filter((image) =>
    image.originalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">S3 Uploaded Images ({images.length})</h3>
          {selectedImages.size > 0 && (
            <Button
              variant="default"
              size="sm"
              onClick={() => setShowImportDialog(true)}
              disabled={isImporting}
              className="flex items-center gap-2"
            >
              <Import className="h-4 w-4" />
              {isImporting ? 'Importing...' : `Import ${selectedImages.size} Images`}
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <div className="border rounded-md p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="px-2"
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="px-2"
            >
              List
            </Button>
          </div>
        </div>
      </div>

      {filteredImages.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <p className="text-gray-500">No images found</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <Card key={image.id} className={`overflow-hidden ${selectedImages.has(image.id) ? 'ring-2 ring-primary' : ''}`}>
              <div className="relative aspect-square">
                <img
                  src={image.originalUrl}
                  alt={image.originalName}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePreview(image)}
                    className="mr-2"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleCopyUrl(image.originalUrl)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    variant={selectedImages.has(image.id) ? "default" : "secondary"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleImageSelection(image.id);
                    }}
                  >
                    <Check className={`h-4 w-4 ${selectedImages.has(image.id) ? 'opacity-100' : 'opacity-50'}`} />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="text-sm font-medium truncate" title={image.originalName}>
                  {image.originalName}
                </p>
                <p className="text-xs text-gray-500">
                  {formatBytes(image.originalSize)} • {image.srcset.length} variants
                </p>
              </CardContent>
              <CardFooter className="p-3 pt-0 flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={() => handleCopyHtml(image)}
                >
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  HTML
                </Button>
                {onDeleteImage && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(image.id)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    Delete
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 divide-y">
            {filteredImages.map((image) => (
              <div key={image.id} className="p-4 flex items-center gap-4">
                <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={image.originalUrl}
                    alt={image.originalName}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-medium truncate" title={image.originalName}>
                    {image.originalName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatBytes(image.originalSize)} • {image.srcset.length} variants
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => handlePreview(image)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyUrl(image.originalUrl)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleCopyHtml(image)}>
                    <Link className="h-4 w-4" />
                  </Button>
                  {onDeleteImage && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDelete(image.id)}
                      disabled={isDeleting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Dialog open={previewImage !== null} onOpenChange={closePreview}>
        {previewImage && (
          <DialogContent className="max-w-4xl w-[90vw] overflow-hidden">
            <DialogHeader>
              <DialogTitle>{previewImage.originalName}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <Tabs defaultValue="preview">
                <TabsList className="w-full grid grid-cols-2 mb-4">
                  <TabsTrigger value="preview">Image Preview</TabsTrigger>
                  <TabsTrigger value="code">HTML & URLs</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="space-y-4">
                  <div className="aspect-video relative rounded-lg overflow-hidden border">
                    <img
                      src={previewImage.originalUrl}
                      alt={previewImage.originalName}
                      className="object-contain w-full h-full"
                    />
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Srcset Variants</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {previewImage.srcset.map((variant, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="aspect-square relative">
                            <img
                              src={variant.url}
                              alt={`${previewImage.originalName} - ${variant.width}px`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <CardFooter className="p-2 text-xs">Width: {variant.width}px</CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="code" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="original-url">Original URL</Label>
                    <div className="flex">
                      <Input
                        id="original-url"
                        value={previewImage.originalUrl}
                        readOnly
                        className="rounded-r-none"
                      />
                      <Button
                        className="rounded-l-none"
                        onClick={() => handleCopyUrl(previewImage.originalUrl)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">HTML Srcset</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyHtml(previewImage)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy HTML
                      </Button>
                    </div>
                    <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
                      {`<img
  src="${previewImage.originalUrl}"
  srcset="${previewImage.srcset.map((v) => `${v.url} ${v.width}w`).join(",\n         ")}"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="${previewImage.originalName}"
/>`}
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <Label>Variant URLs</Label>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      {previewImage.srcset.map((variant, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="text-sm font-medium w-16">{variant.width}px:</div>
                          <Input value={variant.url} readOnly className="text-xs h-8" />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleCopyUrl(variant.url)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Images</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Select Original Image</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Choose which image will be the original. Other selected images will become its variants.
              </p>
              <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
                {Array.from(selectedImages).map(imageId => {
                  const image = images.find(img => img.id === imageId);
                  if (!image) return null;
                  
                  return (
                    <div 
                      key={imageId}
                      className={`relative border rounded-lg p-2 cursor-pointer ${
                        originalImageId === imageId ? 'border-primary ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setOriginalImageId(imageId)}
                    >
                      <img
                        src={image.originalUrl}
                        alt={image.originalName}
                        className="w-full h-32 object-cover rounded"
                      />
                      <p className="text-sm mt-2 truncate">{image.originalName}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowImportDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleImportToConvex}
                disabled={!originalImageId || isImporting}
              >
                {isImporting ? 'Importing...' : 'Import Images'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 