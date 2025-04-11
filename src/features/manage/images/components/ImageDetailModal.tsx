import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Separator } from '~/components/ui/separator';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Card, CardContent } from '~/components/ui/card';
import { Copy, Trash2, Link, ExternalLink } from 'lucide-react';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { Doc } from '~/convex/_generated/dataModel';

interface ImageDetailModalProps {
  image: Doc<"images"> | null;
  open: boolean;
  onClose: () => void;
  onDelete: (imageId: string) => Promise<boolean>;
  isDeleting: boolean;
}

export function ImageDetailModal({ 
  image, 
  open, 
  onClose,
  onDelete,
  isDeleting
}: ImageDetailModalProps) {
  const [activeTab, setActiveTab] = useState('details');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  if (!image) return null;
  
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };
  
  const handleDelete = async () => {
    if (await onDelete(image._id)) {
      setShowDeleteConfirm(false);
      onClose();
    }
  };
  
  const variants = image.srcset || [];
  
  return (
    <>
      <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Image Details</DialogTitle>
            <DialogDescription>
              View and manage image information
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col md:flex-row gap-4 mt-4 h-full">
            <div className="w-full md:w-1/2">
              <AspectRatio ratio={1}>
                <img 
                  src={image.originalUrl} 
                  alt={image.alt || image.originalName} 
                  className="rounded-md object-cover w-full h-full"
                />
              </AspectRatio>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyUrl(image.originalUrl)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy URL
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.open(image.originalUrl, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Original
                </Button>
                
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isDeleting}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="variants">
                    Variants ({variants.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="h-[calc(100%-40px)]">
                  <ScrollArea className="h-[300px] mt-2">
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="originalName">File Name</Label>
                        <Input id="originalName" value={image.originalName} readOnly />
                      </div>
                      
                      <div>
                        <Label htmlFor="uploadDate">Upload Date</Label>
                        <Input id="uploadDate" value={image.uploadDate ? new Date(image.uploadDate).toLocaleString() : 'N/A'} readOnly />
                      </div>
                      
                      <div>
                        <Label htmlFor="fileSize">File Size</Label>
                        <Input id="fileSize" value={`${(image.originalSize / 1024 / 1024).toFixed(2)} MB`} readOnly />
                      </div>
                      
                      <div>
                        <Label htmlFor="processedSize">Processed Size</Label>
                        <Input id="processedSize" value={`${(image.processedSize / 1024 / 1024).toFixed(2)} MB`} readOnly />
                      </div>
                      
                      <div>
                        <Label htmlFor="contentType">Content Type</Label>
                        <Input id="contentType" value={image.contentType} readOnly />
                      </div>
                      
                      <div>
                        <Label htmlFor="alt">Alt Text</Label>
                        <Input id="alt" value={image.alt || ''} readOnly />
                      </div>
                      
                      {image.entityType && image.entityId && (
                        <div>
                          <Label htmlFor="entity">Linked To</Label>
                          <div className="flex items-center mt-1">
                            <Link className="w-4 h-4 mr-2" />
                            <span>
                              {image.entityType}: {image.entityId}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {image.credit && (
                        <div>
                          <Label className="block mb-1">Image Credits</Label>
                          <div className="text-sm">
                            <p>Author: {image.credit.authorName}</p>
                            {image.credit.authorUrl && (
                              <p>Author URL: {image.credit.authorUrl}</p>
                            )}
                            <p>Source: {image.credit.sourceName}</p>
                            {image.credit.sourceUrl && (
                              <p>Source URL: {image.credit.sourceUrl}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="variants" className="h-[calc(100%-40px)]">
                  {variants.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-gray-500">No image variants available</p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[300px] mt-2">
                      <div className="grid gap-4">
                        {variants.map((variant, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-medium">{variant.width}px width</h3>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleCopyUrl(variant.url)}
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="h-20">
                                <img 
                                  src={variant.url} 
                                  alt={`${image.alt || image.originalName} - ${variant.width}px`}
                                  className="h-full object-contain rounded-sm"
                                />
                              </div>
                              <p className="text-xs mt-2 truncate text-gray-500">{variant.url}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the image and remove it from servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 