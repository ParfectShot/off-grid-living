import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea"; // For description
import { Checkbox } from "~/components/ui/checkbox"; // For featured status
import { useMutation, useQuery } from 'convex/react';
import { api } from '~/../convex/_generated/api';
import { Doc, Id } from '~/../convex/_generated/dataModel';
// Import components for category and section management (to be created)
import { CategorySelector } from './CategorySelector';
// Import the new component
import { SectionManager } from './SectionManager';

// Type matching the data passed from ManageComponent, expanded for full guide data
type GuideFull = Doc<"guides"> & {
  categories?: (Doc<"guideCategories"> & { isPrimary?: boolean })[];
  sections?: Doc<"guideSections">[];
  authors?: (Doc<"authors"> & { isPrimary?: boolean })[];
};

// Ensure this prop type matches the data passed from GuideManagementTable via ManageComponent
type GuideEditModalProps = {
  guide: Pick<Doc<"guides">, '_id' | 'title' | 'slug'> | null; // Explicitly require _id, title, and slug
  isOpen: boolean;
  onClose: () => void;
};

// Ensure the section type used in state matches SectionManager's expected type
type ManagedSection = Partial<Pick<Doc<"guideSections">, '_id' | 'guideId'>> & {
  sectionId: string; 
  title: string;
  order: number;
};

export function GuideEditModal({ guide: initialGuideData, isOpen, onClose }: GuideEditModalProps) {
  // State for the full guide data fetched inside the modal
  const [guideData, setGuideData] = useState<GuideFull | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [featured, setFeatured] = useState(false);
  const [readTime, setReadTime] = useState('');
  const [order, setOrder] = useState<number | undefined>(undefined);
  // State for selected categories and sections
  const [selectedCategories, setSelectedCategories] = useState<Id<"guideCategories">[]>([]);
  const [primaryCategory, setPrimaryCategory] = useState<Id<"guideCategories"> | null>(null);
  // Ensure sections state matches the expected structure for the mutation
  const [sections, setSections] = useState<ManagedSection[]>([]); // Use ManagedSection type
  const [isSubmitting, setIsSubmitting] = useState(false); // Add submitting state

  // Fetch full guide details using the slug from initialGuideData
  const fullGuide = useQuery(
    api.guides.getGuideBySlug,
    // Ensure initialGuideData and its slug are accessed safely
    initialGuideData?.slug ? { slug: initialGuideData.slug } : 'skip'
  );

  // Fetch all available categories for the selector
  const allCategories = useQuery(api.guides.getGuideCategories);

  // Use the mutation
  const updateGuide = useMutation(api.guides.updateGuideWithDetails);

  // Effect to populate form and state when full guide data is loaded
  useEffect(() => {
    if (fullGuide) {
      setGuideData(fullGuide as GuideFull); // Cast needed if return type isn't specific enough
      setTitle(fullGuide.title || '');
      setSlug(fullGuide.slug || '');
      setDescription(fullGuide.description || '');
      setLevel(fullGuide.level || '');
      setFeatured(fullGuide.featured || false);
      setReadTime(fullGuide.readTime || '');
      setOrder(fullGuide.order);

      // Populate categories
      const currentCategoryIds = fullGuide.categories?.map(cat => cat._id) || [];
      setSelectedCategories(currentCategoryIds);
      const primary = fullGuide.categories?.find(cat => cat.isPrimary);
      setPrimaryCategory(primary?._id || null);

      // Populate sections (ensure sorted)
      setSections(fullGuide.sections?.map(s => ({ 
          _id: s._id, // Include _id
          guideId: s.guideId, // Include guideId
          sectionId: s.sectionId || '', 
          title: s.title || '',       
          order: s.order ?? 0        
      })) || []);
    }
  }, [fullGuide]);

  // Reset state when modal closes or initial data changes
   useEffect(() => {
     if (!isOpen) {
       // Reset all states
       setGuideData(null);
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
       setIsSubmitting(false); // Reset submitting state
     }
   }, [isOpen]);

  const handleCategoryChange = (newSelectedIds: Id<"guideCategories">[], newPrimaryId: Id<"guideCategories"> | null) => {
    setSelectedCategories(newSelectedIds);
    setPrimaryCategory(newPrimaryId);
  };

  // Pass this down to SectionManager
  const handleSectionChange = (updatedSections: ManagedSection[]) => {
    setSections(updatedSections);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideData || isSubmitting) return;

    setIsSubmitting(true); // Set submitting state
    console.log("Submitting updates for guide:", guideData._id);

    try {
      // Prepare the section data for the mutation
      // Note: Need to ensure new sections get a valid `sectionId` before this point
      const sectionsPayload = sections.map(sec => ({
        _id: sec._id, // Will be undefined for new sections
        sectionId: sec.sectionId, // Make sure this is set correctly for new/existing
        title: sec.title,
        order: sec.order,
      }));

      // Convert order state to number or keep undefined
      const orderValue = order === undefined || isNaN(Number(order)) ? undefined : Number(order);

      await updateGuide({
        guideId: guideData._id,
        // Pass only updated basic fields
        title: title !== guideData.title ? title : undefined,
        slug: slug !== guideData.slug ? slug : undefined,
        description: description !== guideData.description ? description : undefined,
        level: level !== guideData.level ? level : undefined,
        featured: featured !== guideData.featured ? featured : undefined,
        readTime: readTime !== guideData.readTime ? readTime : undefined,
        order: orderValue !== guideData.order ? orderValue : undefined,
        // Pass category and section updates
        categoryIds: selectedCategories,
        primaryCategoryId: primaryCategory,
        sections: sectionsPayload, 
        // Add image/imageCredit fields if they are managed in this modal
      });

      console.log("Guide updated successfully");
      onClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Failed to update guide:", error);
      // TODO: Show error message to the user
    } finally {
      setIsSubmitting(false); // Reset submitting state regardless of outcome
    }
  };

  // Loading state while fetching data
  if (isOpen && initialGuideData && !guideData && !fullGuide) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loading Guide Data...</DialogTitle>
          </DialogHeader>
          <p>Loading...</p> 
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl"> {/* Wider modal */}
        <DialogHeader>
          <DialogTitle>Edit Guide: {guideData?.title}</DialogTitle>
        </DialogHeader>
        {/* Use grid layout for overall structure, make form scrollable */}
        <form id="guide-edit-form" onSubmit={handleSubmit} className="grid gap-6 py-4 max-h-[75vh] overflow-y-auto pr-4">
          
          {/* Basic Info Section */}
          <div className="space-y-4">
             <h3 className="text-lg font-medium border-b pb-2">Basic Information</h3>
             <div className="grid gap-3">
               <Label htmlFor="title">Title</Label>
               <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
             </div>
             <div className="grid gap-3">
               <Label htmlFor="slug">Slug</Label>
               <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
               {/* TODO: Add slug validation/generation helper? */}
             </div>
             <div className="grid gap-3">
               <Label htmlFor="description">Description</Label>
               <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
             </div>
             <div className="grid gap-3">
               <Label htmlFor="level">Level</Label>
               <Input id="level" value={level} onChange={(e) => setLevel(e.target.value)} placeholder="e.g., Beginner, Intermediate, Advanced"/>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-3">
                   <Label htmlFor="readTime">Read Time</Label>
                   <Input 
                      id="readTime"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
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
                <Checkbox id="featured" checked={featured} onCheckedChange={(checked) => setFeatured(Boolean(checked))} />
                <Label htmlFor="featured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Featured Guide
                </Label>
             </div>
          </div>

          {/* Category Management Section */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-medium">Categories</h3>
            {/* Use CategorySelector component */}
            <CategorySelector
              // Pass required props
              allCategories={allCategories || []} // Pass fetched categories (handle undefined)
              selectedCategories={selectedCategories}
              primaryCategory={primaryCategory}
              onChange={handleCategoryChange} // Pass the handler
            />
          </div>

          {/* Section Management Section */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-medium">Sections</h3>
            {/* Use SectionManager component */}
            <SectionManager
              // Pass required props
              sections={sections}
              onChange={handleSectionChange} // Pass the handler
            />
          </div>

          {/* Add Author/Image management sections if needed */}

        </form>
        <DialogFooter className="border-t pt-4 mt-4">
          <DialogClose asChild>
             <Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button>
          </DialogClose>
          <Button type="submit" form="guide-edit-form" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 