import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { ProcessedImage, S3Image } from "~/types/s3-types";
import { Copy } from "lucide-react";

interface ImageVariantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: ProcessedImage | S3Image | null;
  onCopyUrl: (url: string) => void;
}

export function ImageVariantModal({ open, onOpenChange, image, onCopyUrl }: ImageVariantModalProps) {
  if (!image) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl flex flex-col max-h-[90vh]">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Responsive Variants - {image.originalName}</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto pr-2 flex-grow my-4">
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="grid grid-cols-2 w-full sticky top-0 z-10 bg-background">
              <TabsTrigger value="gallery">Gallery View</TabsTrigger>
              <TabsTrigger value="details">Technical Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="gallery" className="pt-4 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {image.srcset.map((variant: { width: number; url: string; s3Url?: string; filePath?: string }, index: number) => (
                  <div 
                    key={index} 
                    className="border rounded-lg overflow-hidden flex flex-col"
                  >
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 text-sm font-medium">
                      Width: {variant.width}px
                    </div>
                    <div className="relative h-48 bg-white dark:bg-gray-900 flex items-center justify-center p-2">
                      <img
                        src={variant.url}
                        alt={`${image.originalName} at ${variant.width}px`}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center justify-between">
                        <a 
                          href={variant.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm truncate max-w-[80%]"
                        >
                          {variant.url}
                        </a>
                        <Button 
                          variant="ghost"
                          size="sm"
                          onClick={() => onCopyUrl(variant.url)}
                          className="h-6 px-1"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
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
  src="${image.originalUrl}"
  srcset="${image.srcset.map((v: { url: string; width: number }) => `${v.url} ${v.width}w`).join(', ')}"
  sizes="(max-width: 768px) 100vw, 768px"
  alt="${image.originalName}"
/>`}
                </pre>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Available Widths</h3>
                <ul className="list-disc pl-5">
                  {image.srcset.map((variant: { width: number; url: string }, index: number) => (
                    <li key={index} className="mb-2">
                      <div className="flex items-center justify-between">
                        <span>
                          {variant.width}px - <a 
                            href={variant.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Direct link
                          </a>
                        </span>
                        <Button 
                          variant="ghost"
                          size="sm"
                          onClick={() => onCopyUrl(variant.url)}
                          className="h-6 px-1"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
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
            onClick={() => onOpenChange(false)}
            className="mr-2"
          >
            Close
          </Button>
          <a 
            href={image.originalUrl} 
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
  );
}