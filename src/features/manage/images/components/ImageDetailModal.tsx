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
import { ScrollArea } from '~/components/ui/scroll-area';
import { Card, CardContent } from '~/components/ui/card';
import { Copy, Trash2, Link as LinkIcon, ExternalLink, Save, Star, StarOff } from 'lucide-react';
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
import { Doc, Id } from '~/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { api } from '~/convex/_generated/api';
import { toast } from 'sonner';

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
  const [isSaving, setIsSaving] = useState(false);
  
  // Credit form state
  const [creditForm, setCreditForm] = useState({
    authorName: '',
    authorUrl: '',
    sourceName: '',
    sourceUrl: '',
  });

  // Get linked entities
  const linkedEntities = useQuery(
    api.imageToEntity.getEntitiesByImage,
    image ? { imageId: image._id } : "skip"
  );

  // Mutations
  const updateCredits = useMutation(api.images.updateImageCredits);
  const updateImageLink = useMutation(api.imageToEntity.updateImageLink);
  const unlinkImage = useMutation(api.imageToEntity.unlinkImageFromEntity);
  
  // Initialize form when image changes
  React.useEffect(() => {
    if (image && image.credit) {
      setCreditForm({
        authorName: image.credit.authorName || '',
        authorUrl: image.credit.authorUrl || '',
        sourceName: image.credit.sourceName || '',
        sourceUrl: image.credit.sourceUrl || '',
      });
    } else {
      setCreditForm({
        authorName: '',
        authorUrl: '',
        sourceName: '',
        sourceUrl: '',
      });
    }
  }, [image]);

  if (!image) return null;
  
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };
  
  const handleDelete = async () => {
    if (await onDelete(image._id)) {
      setShowDeleteConfirm(false);
      onClose();
    }
  };

  const handleCreditChange = (field: keyof typeof creditForm) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCreditForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSaveCredits = async () => {
    try {
      setIsSaving(true);
      await updateCredits({
        imageId: image._id,
        credit: {
          authorName: creditForm.authorName,
          authorUrl: creditForm.authorUrl || undefined,
          sourceName: creditForm.sourceName,
          sourceUrl: creditForm.sourceUrl || undefined,
        },
      });
      toast.success('Image credits updated successfully');
    } catch (error) {
      toast.error('Failed to update image credits');
      console.error('Error updating credits:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePrimary = async (linkId: Id<"imageToEntity">, isPrimary: boolean) => {
    try {
      await updateImageLink({
        linkId,
        isPrimary: !isPrimary,
      });
      toast.success('Image link updated successfully');
    } catch (error) {
      toast.error('Failed to update image link');
      console.error('Error updating link:', error);
    }
  };

  const handleUnlink = async (linkId: Id<"imageToEntity">, entityType: string) => {
    try {
      await unlinkImage({ linkId });
      toast.success(`Image unlinked from ${entityType}`);
    } catch (error) {
      toast.error('Failed to unlink image');
      console.error('Error unlinking:', error);
    }
  };
  
  const variants = image.srcset || [];
  
  return (
    <>
      <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-11/12 md:max-w-11/12 max-h-10/12 overflow-auto">
          <DialogHeader>
            <DialogTitle>Image Details</DialogTitle>
            <DialogDescription>
              View and manage image information
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col md:flex-row gap-4 mt-4 h-full">
            <div className="w-full md:w-1/4">
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

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Linked To</h3>
                {linkedEntities && linkedEntities.length > 0 ? (
                  <div className="space-y-2">
                    {linkedEntities.map((link) => (
                      <div 
                        key={link._id} 
                        className="flex items-center justify-between p-2 bg-muted rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <LinkIcon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            {link.entityType}: {link.entityId}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleTogglePrimary(link._id, link.isPrimary)}
                            title={link.isPrimary ? "Remove as primary" : "Set as primary"}
                          >
                            {link.isPrimary ? (
                              <Star className="w-4 h-4 text-yellow-500" />
                            ) : (
                              <StarOff className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleUnlink(link._id, link.entityType)}
                            title="Unlink"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Not linked to any entities
                  </p>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-3/4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="variants">
                    Variants ({variants.length})
                  </TabsTrigger>
                  <TabsTrigger value="credits">Credits</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="h-[calc(100%-40px)]">
                  <ScrollArea className="h-[300px] mt-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <div className='grid w-full items-center gap-1.5'>
                        <Label htmlFor="originalName">File Name</Label>
                        <Input id="originalName" disabled value={image.originalName} readOnly />
                      </div>
                      
                      <div className='grid w-full items-center gap-1.5'>
                        <Label htmlFor="uploadDate">Upload Date</Label>
                        <Input id="uploadDate" disabled value={image.uploadDate ? new Date(image.uploadDate).toLocaleString() : 'N/A'} readOnly />
                      </div>
                      
                      <div className='grid w-full items-center gap-1.5'>
                        <Label htmlFor="fileSize">File Size</Label>
                        <Input id="fileSize" disabled value={`${(image.originalSize / 1024 / 1024).toFixed(2)} MB`} readOnly />
                      </div>
                      
                      <div className='grid w-full items-center gap-1.5'>
                        <Label htmlFor="processedSize">Processed Size</Label>
                        <Input id="processedSize" disabled value={`${(image.processedSize / 1024 / 1024).toFixed(2)} MB`} readOnly />
                      </div>
                      
                      <div className='grid w-full items-center gap-1.5'>
                        <Label htmlFor="contentType">Content Type</Label>
                        <Input id="contentType" disabled value={image.contentType} readOnly />
                      </div>
                      
                      <div className='grid w-full items-center gap-1.5'>
                        <Label htmlFor="alt">Alt Text</Label>
                        <Input id="alt" disabled value={image.alt || ''} readOnly />
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="variants">
                  {variants.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-gray-500">No image variants available</p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[300px] mt-2">
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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

                <TabsContent value="credits">
                  <ScrollArea className="h-[300px] mt-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <div className='grid w-full items-center gap-1.5'>
                        <Label htmlFor="authorName">Author Name*</Label>
                        <Input 
                          id="authorName" 
                          placeholder='Enter author name' 
                          value={creditForm.authorName}
                          onChange={handleCreditChange('authorName')}
                        />
                      </div>
                      <div className='grid w-full items-center gap-1.5'>
                        <Label htmlFor="authorUrl">Author URL</Label>
                        <Input 
                          id="authorUrl" 
                          placeholder='Enter author URL' 
                          value={creditForm.authorUrl}
                          onChange={handleCreditChange('authorUrl')}
                        />
                      </div>
                      <div className='grid w-full items-center gap-1.5'>
                        <Label htmlFor="sourceName">Source Name*</Label>
                        <Input 
                          id="sourceName" 
                          placeholder='Enter source name' 
                          value={creditForm.sourceName}
                          onChange={handleCreditChange('sourceName')}
                        />
                      </div>
                      <div className='grid w-full items-center gap-1.5'>
                        <Label htmlFor="sourceUrl">Source URL</Label>
                        <Input 
                          id="sourceUrl" 
                          placeholder='Enter source URL' 
                          value={creditForm.sourceUrl}
                          onChange={handleCreditChange('sourceUrl')}
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button 
                        onClick={handleSaveCredits}
                        disabled={isSaving || !creditForm.authorName || !creditForm.sourceName}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? 'Saving...' : 'Save Credits'}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      * Required fields
                    </p>
                  </ScrollArea>
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