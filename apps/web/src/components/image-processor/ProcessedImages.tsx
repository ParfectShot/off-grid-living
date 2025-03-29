import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardFooter } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { CloudUpload, Eye, Check } from "lucide-react";
import { ProcessedImage } from "../../lib/services/image-service";

interface ProcessedImagesProps {
  images: ProcessedImage[];
  onUploadToS3: (imageIds: string[]) => Promise<void>;
  isUploading: boolean;
}

export function ProcessedImages({ images, onUploadToS3, isUploading }: ProcessedImagesProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<ProcessedImage | null>(null);

  const handleSelectAll = () => {
    if (selectedImages.length === images.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(images.map((img) => img.id));
    }
  };

  const handleSelectImage = (id: string) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imgId) => imgId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const handleUploadSelected = async () => {
    if (selectedImages.length > 0) {
      await onUploadToS3(selectedImages);
    }
  };

  const handlePreview = (image: ProcessedImage) => {
    setPreviewImage(image);
  };

  const closePreview = () => {
    setPreviewImage(null);
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

  const compressionRate = (original: number, processed: number) => {
    const rate = ((original - processed) / original) * 100;
    return `${rate.toFixed(1)}%`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Processed Images ({images.length})</h3>
        <Button
          onClick={handleUploadSelected}
          disabled={selectedImages.length === 0 || isUploading}
          className="flex items-center gap-2"
        >
          <CloudUpload className="h-4 w-4" />
          {isUploading ? "Uploading..." : "Upload Selected to S3"}
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedImages.length === images.length && images.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Preview</TableHead>
              <TableHead>File Name</TableHead>
              <TableHead>Original Size</TableHead>
              <TableHead>Processed Size</TableHead>
              <TableHead>Compression</TableHead>
              <TableHead>Srcset Sizes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {images.map((image) => (
              <TableRow key={image.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedImages.includes(image.id)}
                    onCheckedChange={() => handleSelectImage(image.id)}
                    aria-label={`Select ${image.originalName}`}
                    disabled={image.uploaded || isUploading}
                  />
                </TableCell>
                <TableCell>
                  <div className="relative h-12 w-12 rounded overflow-hidden">
                    <img
                      src={image.originalUrl}
                      alt={image.originalName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{image.originalName}</TableCell>
                <TableCell>{formatBytes(image.originalSize)}</TableCell>
                <TableCell>{formatBytes(image.processedSize)}</TableCell>
                <TableCell>{compressionRate(image.originalSize, image.processedSize)}</TableCell>
                <TableCell>{image.srcset.length} variants</TableCell>
                <TableCell>
                  {image.uploaded ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Check className="mr-1 h-3 w-3" />
                      Uploaded
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Processed
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => handlePreview(image)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={previewImage !== null} onOpenChange={closePreview}>
        {previewImage && (
          <DialogContent className="max-w-4xl w-[90vw] overflow-hidden">
            <DialogHeader>
              <DialogTitle>{previewImage.originalName}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
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

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">HTML Srcset</h4>
                <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
                  {`<img
src="${previewImage.originalUrl}"
srcset="${previewImage.srcset.map((v) => `${v.url} ${v.width}w`).join(",\n       ")}"
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
alt="${previewImage.originalName}"
/>`}
                </pre>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
} 