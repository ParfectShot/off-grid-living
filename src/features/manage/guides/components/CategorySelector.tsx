import React from 'react';
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Doc, Id } from '~/../convex/_generated/dataModel';

type CategorySelectorProps = {
  allCategories: Doc<"guideCategories">[];
  selectedCategories: Id<"guideCategories">[];
  primaryCategory: Id<"guideCategories"> | null;
  onChange: (selectedIds: Id<"guideCategories">[], primaryId: Id<"guideCategories"> | null) => void;
};

export function CategorySelector({ 
  allCategories, 
  selectedCategories, 
  primaryCategory, 
  onChange 
}: CategorySelectorProps) {

  const handleCheckedChange = (categoryId: Id<"guideCategories">, checked: boolean | string) => {
    let newSelectedIds;
    if (checked) {
      newSelectedIds = [...selectedCategories, categoryId];
    } else {
      newSelectedIds = selectedCategories.filter(id => id !== categoryId);
    }
    // If the primary category was unchecked, reset primary
    const newPrimaryId = newSelectedIds.includes(primaryCategory!) ? primaryCategory : null;
    onChange(newSelectedIds, newPrimaryId);
  };

  const handlePrimaryChange = (newPrimaryIdValue: string) => {
    // Only allow setting primary if it's one of the selected categories
    const newPrimaryId = newPrimaryIdValue as Id<"guideCategories">;
    if (selectedCategories.includes(newPrimaryId)) {
      onChange(selectedCategories, newPrimaryId);
    } else {
       // Optional: Provide feedback or prevent setting primary if not selected
       console.warn("Cannot set primary category that is not selected.");
       // Alternatively, automatically select it:
       // const newSelectedIds = [...selectedCategories, newPrimaryId];
       // onChange(newSelectedIds, newPrimaryId);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Select all relevant categories and choose one primary category.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Selection Checkboxes */}
        <div className="space-y-2 border p-4 rounded-md">
          <h4 className="font-medium mb-2">Available Categories</h4>
          {allCategories.length === 0 && <p className="text-sm text-muted-foreground">No categories found.</p>}
          {allCategories.map((category) => (
            <div key={category._id} className="flex items-center space-x-2">
              <Checkbox 
                id={`cat-${category._id}`}
                checked={selectedCategories.includes(category._id)}
                onCheckedChange={(checked) => handleCheckedChange(category._id, checked)}
              />
              <Label htmlFor={`cat-${category._id}`}>{category.title}</Label>
            </div>
          ))}
        </div>

        {/* Primary Category Selection Radio */}
        <div className="space-y-2 border p-4 rounded-md">
          <h4 className="font-medium mb-2">Set Primary Category</h4>
          {selectedCategories.length === 0 ? (
             <p className="text-sm text-muted-foreground">Select at least one category first.</p>
          ) : (
            <RadioGroup 
              value={primaryCategory ?? undefined} 
              onValueChange={handlePrimaryChange}
            >
              {allCategories
                .filter(category => selectedCategories.includes(category._id)) // Only show selected categories as options
                .map((category) => (
                  <div key={`primary-${category._id}`} className="flex items-center space-x-2">
                    <RadioGroupItem value={category._id} id={`primary-${category._id}`} />
                    <Label htmlFor={`primary-${category._id}`}>{category.title}</Label>
                  </div>
              ))}
            </RadioGroup>
          )}
        </div>
      </div>
    </div>
  );
} 