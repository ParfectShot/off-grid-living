import React, { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Doc, Id } from '~/../convex/_generated/dataModel';
import { Trash2, GripVertical, PlusCircle } from 'lucide-react'; // Icons

// Type for a section being managed (matches mutation structure)
type ManagedSection = Partial<Pick<Doc<"guideSections">, '_id' | 'guideId'>> & {
  sectionId: string; 
  title: string;
  order: number;
};

type SectionManagerProps = {
  sections: ManagedSection[];
  onChange: (updatedSections: ManagedSection[]) => void;
};

export function SectionManager({ sections, onChange }: SectionManagerProps) {
  const [newSectionId, setNewSectionId] = useState('');
  const [newSectionTitle, setNewSectionTitle] = useState('');

  // ---- Handlers (to be implemented) ----

  const handleAddSection = () => {
    if (!newSectionId.trim() || !newSectionTitle.trim()) {
      // TODO: Add user feedback (e.g., toast notification)
      console.warn("Section ID and Title are required.");
      return;
    }
    // TODO: Check for duplicate sectionId?
    
    const newSection: ManagedSection = {
      sectionId: newSectionId.trim(), // Use the manual input
      title: newSectionTitle.trim(),
      order: (sections.length > 0 ? Math.max(...sections.map(s => s.order)) : 0) + 1, // Append to end
    };
    onChange([...sections, newSection]);
    // Reset input fields
    setNewSectionId('');
    setNewSectionTitle('');
  };

  const handleUpdateSection = (index: number, field: keyof ManagedSection, value: string | number) => {
    const updatedSections = [...sections];
    // Type assertion needed as field could be 'order' (number)
    (updatedSections[index] as any)[field] = value;
    onChange(updatedSections);
  };

  const handleDeleteSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    // Re-calculate order based on new array positions
    const reorderedSections = updatedSections.map((section, idx) => ({ ...section, order: idx + 1 }));
    onChange(reorderedSections);
  };

  const handleReorderSections = (newOrderedSections: ManagedSection[]) => {
     // Re-calculate order based on new array positions
     const reorderedSections = newOrderedSections.map((section, idx) => ({ ...section, order: idx + 1 }));
     onChange(reorderedSections);
   };

  // ---- Render Logic ----
  return (
    <div className="space-y-4">
      {/* List Existing Sections */}
      <div className="space-y-3">
        {sections.length === 0 && <p className="text-sm text-muted-foreground">No sections defined yet.</p>}
        {/* Placeholder for draggable list - requires a library like react-beautiful-dnd or dnd-kit */}
        {sections.map((section, index) => (
          <div key={section._id ?? `new-${index}`} className="flex items-center gap-2 border p-3 rounded-md bg-muted/50">
            <Button variant="ghost" size="sm" className="cursor-grab p-1">
               <GripVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
            <div className="flex-grow grid grid-cols-2 gap-2">
               <div>
                  <Label htmlFor={`section-id-${index}`} className="text-xs font-medium">Section ID</Label>
                  <Input 
                     id={`section-id-${index}`}
                     value={section.sectionId}
                     onChange={(e) => handleUpdateSection(index, 'sectionId', e.target.value)}
                     className="h-8 text-sm"
                     placeholder="e.g., introduction"
                     // Consider making this read-only after creation?
                  />
               </div>
               <div>
                  <Label htmlFor={`section-title-${index}`} className="text-xs font-medium">Title</Label>
                   <Input 
                     id={`section-title-${index}`}
                     value={section.title}
                     onChange={(e) => handleUpdateSection(index, 'title', e.target.value)}
                     className="h-8 text-sm"
                     placeholder="Section Title"
                  />
                </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => handleDeleteSection(index)} className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
         {/* Drag-and-drop placeholder: Need library integration */}
         {sections.length > 0 && <p className="text-xs text-muted-foreground pt-2">Drag sections using the handle to reorder. Order saves automatically.</p> }
      </div>

      {/* Add New Section Form */}
      <div className="border-t pt-4 mt-4 space-y-3">
         <h4 className="font-medium">Add New Section</h4>
         <div className="flex gap-2 items-end">
            <div className="flex-grow">
               <Label htmlFor="new-section-id">Section ID</Label>
               <Input 
                  id="new-section-id"
                  value={newSectionId}
                  onChange={(e) => setNewSectionId(e.target.value)}
                  placeholder="Unique ID (e.g., key-features)"
                  className="h-9"
               />
             </div>
             <div className="flex-grow">
               <Label htmlFor="new-section-title">Title</Label>
               <Input 
                  id="new-section-title"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  placeholder="Section Title"
                  className="h-9"
               />
             </div>
            <Button onClick={handleAddSection} variant="outline" size="icon" className="shrink-0">
               <PlusCircle className="h-5 w-5" />
            </Button>
         </div>
      </div>
    </div>
  );
} 