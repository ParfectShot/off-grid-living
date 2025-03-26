# Adding New Guides to the Off-Grid Living Platform

This document explains how to add new guides to the platform in a structured, maintainable way.

## Guide Implementation Steps

### 1. Create the Guide Content Component

Create a new file in `src/components/guides/` with your guide content:

```tsx
// src/components/guides/your-new-guide.tsx
import React from 'react';
import { Link } from "@tanstack/react-router";
// Import necessary UI components

export const YourNewGuideContent = () => {
  return (
    <section className="space-y-6 mb-10">
      {/* Your guide content here */}
    </section>
  );
};
```

### 2. Register the Guide in the Guide Registry

Add your guide to the registry in `src/data/guide-registry.tsx`:

```tsx
import { YourNewGuideContent } from '../components/guides/your-new-guide';

// Add to lazy imports:
const YourNewGuideContent = lazy(() => import('../components/guides/your-new-guide')
  .then(module => ({ default: module.YourNewGuideContent })));

// Add to registry mapping:
export const guideContentRegistry: Record<string, GuideContentComponent> = {
  // ...existing guides
  "your-new-guide-slug": YourNewGuideContent,
};
```

### 3. Add Guide Metadata to the Guides Data

Update the appropriate category in `src/data/guides.ts`:

```typescript
// In the appropriate category's guides array:
{
  title: "Your New Guide Title",
  description: "A brief description of your guide",
  slug: "your-new-guide-slug",
  categorySlug: "category-slug",
  category: "Category Name",
  readTime: "10 min read",
  level: "Beginner", // or Intermediate, Advanced
  lastUpdated: "April 15, 2023",
  image: "/assets/guides/category/your-guide-image.jpeg",
  sections: [
    { id: "section1", title: "Section 1 Title" },
    { id: "section2", title: "Section 2 Title" },
    // Add all sections for sidebar navigation
  ],
}
```

### 4. Add Guide Images (if applicable)

Place your guide images in the appropriate directory:
`/public/assets/guides/[category-slug]/`

### 5. Testing

1. Verify the guide appears in the category listing
2. Check that the guide content loads correctly
3. Test that navigation between guides works as expected
4. Ensure that all sections can be navigated via the sidebar

## Guide Content Best Practices

1. **Structure:** Include a clear introduction, well-defined sections, and a conclusion
2. **Components:** Use the same UI components as existing guides for consistency
3. **Images:** Optimize images for web (compress, appropriate dimensions)
4. **Accessibility:** Use proper heading levels and provide alt text for images
5. **Links:** Include relevant internal links to other guides and calculators
6. **CTAs:** End with clear calls to action for next steps

## Common Issues

- If your guide is not appearing, check that the slug in the registry matches the slug in the guides data
- If sections aren't showing in the sidebar, verify that the section IDs in the guide data match the IDs in your content
- If images aren't displaying, check the path and ensure the files are in the correct location
