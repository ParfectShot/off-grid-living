import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import { useMutation, useQuery } from 'convex/react';
import { api } from '~/../convex/_generated/api';
import { Doc, Id } from '~/../convex/_generated/dataModel';
import { CategorySelector } from './CategorySelector';
import { SectionManager } from './SectionManager';
import { Search } from 'lucide-react';
import { ImageGrid } from '../../images/components/ImageGrid';
import { toast } from 'sonner';

type GuideCreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (guideId: Id<"guides">) => void;
};

// Ensure the section type matches SectionManager's expected type
type ManagedSection = {
  sectionId: string;
  title: string;
  order: number;
};

export function GuideCreateModal({ isOpen, onClose, onSuccess }: GuideCreateModalProps) {
  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [featured, setFeatured] = useState(false);
  const [readTime, setReadTime] = useState('');
  const [order, setOrder] = useState<number | undefined>(undefined);
  const [selectedCategories, setSelectedCategories] = useState<Id<"guideCategories">[]>([]);
  const [primaryCategory, setPrimaryCategory] = useState<Id<"guideCategories"> | null>(null);
  const [sections, setSections] = useState<ManagedSection[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Image search and selection state
  const [imageSearchTerm, setImageSearchTerm] = useState('');
  const [selectedImageId, setSelectedImageId] = useState<Id<"images"> | null>(null);

  // Fetch all available categories for the selector
  const allCategories = useQuery(api.guides.getGuideCategories);

  // Fetch all images
  const allImages = useQuery(api.images.getAllImages);

  // Use the mutations
  const createGuide = useMutation(api.guides.createGuideWithDetails);
  const linkImage = useMutation(api.imageToEntity.linkImageToEntity);

  // Filter images based on search term
  const filteredImages = React.useMemo(() => {
    if (!allImages) return [];
    return allImages.filter((image) =>
      image.originalName.toLowerCase().includes(imageSearchTerm.toLowerCase())
    );
  }, [allImages, imageSearchTerm]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setSlug('');
      setDescription('');
      setLevel('');
      setFeatured(false);
      setReadTime('');
      setOrder(undefined);
      setSelectedCategories([]);
      setPrimaryCategory(null);
      setSections([]);
      setIsSubmitting(false);
      setImageSearchTerm('');
      setSelectedImageId(null);
    }
  }, [isOpen]);

  const handleCategoryChange = (newSelectedIds: Id<"guideCategories">[], newPrimaryId: Id<"guideCategories"> | null) => {
    setSelectedCategories(newSelectedIds);
    setPrimaryCategory(newPrimaryId);
  };

  const handleSectionChange = (updatedSections: ManagedSection[]) => {
    setSections(updatedSections);
  };

  const handleImageSelect = (image: Doc<"images">) => {
    setSelectedImageId(selectedImageId === image._id ? null : image._id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Basic validation
    if (!title || !slug || !description || !level || !readTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the guide
      const result = await createGuide({
        title,
        slug,
        description,
        level,
        featured,
        readTime,
        order: order === undefined ? undefined : Number(order),
        categoryIds: selectedCategories,
        primaryCategoryId: primaryCategory,
        sections: sections.map(sec => ({
          sectionId: sec.sectionId,
          title: sec.title,
          order: sec.order,
        })),
      });

      if (result.success && selectedImageId) {
        // Link the selected image if one was chosen
        await linkImage({
          imageId: selectedImageId,
          entityId: result.guideId,
          entityType: "guides",
          isPrimary: true
        });
      }

      toast.success('Guide created successfully');
      if (onSuccess && result.success) {
        onSuccess(result.guideId);
      }
      onClose();
    } catch (error) {
      console.error("Failed to create guide:", error);
      toast.error('Failed to create guide');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New Guide</DialogTitle>
        </DialogHeader>
        <form id="guide-create-form" onSubmit={handleSubmit} className="grid gap-6 py-4 max-h-[75vh] overflow-y-auto pr-4">
          
          {/* Image Selection Section */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-medium">Featured Image</h3>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search images..."
                  className="pl-8"
                  value={imageSearchTerm}
                  onChange={(e) => setImageSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setImageSearchTerm('')}
                title="Clear search"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="border rounded-lg p-4 max-h-[300px] overflow-y-auto">
              <ImageGrid
                images={filteredImages}
                onSelectImage={handleImageSelect}
                isLoading={!allImages}
                selectedImageId={selectedImageId}
              />
            </div>
          </div>

          {/* Basic Info Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Basic Information</h3>
            <div className="grid gap-3">
              <Label htmlFor="title">Title *</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                required 
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="slug">Slug *</Label>
              <Input 
                id="slug" 
                value={slug} 
                onChange={(e) => setSlug(e.target.value)}
                required 
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description *</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4} 
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="level">Level *</Label>
              <Input 
                id="level" 
                value={level} 
                onChange={(e) => setLevel(e.target.value)}
                required
                placeholder="e.g., Beginner, Intermediate, Advanced"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="readTime">Read Time *</Label>
                <Input 
                  id="readTime"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  required
                  placeholder="e.g., 5 min read"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="order">Display Order</Label>
                <Input 
                  id="order"
                  type="number"
                  value={order ?? ''}
                  onChange={(e) => setOrder(e.target.value === '' ? undefined : parseInt(e.target.value, 10))}
                  placeholder="Optional numeric order"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="featured" 
                checked={featured} 
                onCheckedChange={(checked) => setFeatured(Boolean(checked))} 
              />
              <Label htmlFor="featured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Featured Guide
              </Label>
            </div>
          </div>

          {/* Category Management Section */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-medium">Categories</h3>
            <CategorySelector
              allCategories={allCategories || []}
              selectedCategories={selectedCategories}
              primaryCategory={primaryCategory}
              onChange={handleCategoryChange}
            />
          </div>

          {/* Section Management Section */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-medium">Sections</h3>
            <SectionManager
              sections={sections}
              onChange={handleSectionChange}
            />
          </div>
        </form>
        <DialogFooter className="border-t pt-4 mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button>
          </DialogClose>
          <Button type="submit" form="guide-create-form" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Guide"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 