# Blog Page Implementation Plan

This document outlines the implementation plan for the Off-Grid Living blog section.

## Blog Listing Page Structure

### 1. Hero Section
- Title "Off-Grid Living Blog"
- Subtitle with description
- Background with light green tint

### 2. Featured Articles Section
- Highlighted featured blog posts (3 maximum)
- Badge indicating "Featured" status
- Image, category, read time, title, excerpt
- "Read More" link to the full article

### 3. Search and Filter Bar
- Search input with icon
- Category dropdown filter

### 4. Category Tabs
- Tabs for all categories
- "All" tab as default
- Dynamic tabs based on available blog categories

### 5. Blog Post Grid
- Card-based layout for blog posts
- 3 columns on desktop, 2 on tablet, 1 on mobile
- Each card includes:
  - Feature image
  - Category badge
  - Read time indicator
  - Title
  - Short excerpt (truncated)
  - Publication date
  - Read more link

### 6. Tags Section
- Display of popular/all tags
- Clickable tags for filtering

### 7. Pagination
- Page navigation controls
- Previous/Next buttons
- Page numbers

### 8. Newsletter Section
- Email subscription form
- Description about newsletter benefits
- Terms and privacy policy links

## Blog Detail Page Structure

### 1. Navigation
- "Back to Blogs" link to return to blog listing
- Navigation between previous/next posts

### 2. Article Header
- Category badge
- Post title
- Metadata (date, read time, comment count, likes)
- Featured image

### 3. Author Section
- Author avatar
- Author name
- Author bio/credentials

### 4. Social Sharing
- Share buttons for social platforms (Facebook, Twitter, LinkedIn)
- Save/bookmark functionality

### 5. Article Content
- Rich text content with proper formatting
- Section headers
- Lists
- Blockquotes
- Images and captions

### 6. Article Tags
- List of related topics for categorization
- Clickable tags for related content

### 7. Post Actions
- Like article
- Share article
- Save article

### 8. Comments Section
- Comment count
- Comment submission form
- Existing comments display
- Reply functionality
- Comment likes
- Load more comments button

### 9. Related Articles
- Grid of related posts
- Thumbnails, titles, and metadata
- Links to related content

### 10. Newsletter CTA
- Contextual subscription box
- Email input
- Subscribe button

### 11. Post Navigation
- Previous/Next article links
- Preview of post titles

## Data Structure

```typescript
interface BlogPost {
  id: number | string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Full content for individual blog pages
  date: string;
  category: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  featuredImage: string; // Main image path for the blog post
  images?: string[]; // Additional images for the article content
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  comments?: number;
  likes?: number;
  relatedPosts?: (number | string)[]; // IDs of related posts
}

interface Comment {
  id: number | string;
  postId: number | string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}
```

## Implementation Phases

### Phase 1: Basic Structure
- [x] Create route structure for blog pages
- [x] Implement blog listing page hero section
- [x] Create card component for blog posts
- [x] Implement featured posts section
- [x] Build basic grid layout for all posts
- [x] Add newsletter section

### Phase 2: Filtering and Search
- [ ] Implement category tabs with filtering
- [ ] Build search functionality
- [ ] Add tag filtering
- [ ] Implement mobile-responsive filters

### Phase 3: Blog Detail Page
- [x] Create blog detail page layout
- [x] Implement article header and metadata
- [x] Build author section
- [x] Create social sharing functionality
- [x] Develop the content renderer with proper styling
- [x] Implement post navigation (prev/next)
- [x] Create related posts section

### Phase 4: Interactions & Comments
- [ ] Build comments section UI
- [ ] Implement comment submission
- [ ] Create comment display with replies
- [ ] Add like/save functionality for posts
- [ ] Implement share functionality

### Phase 5: Data Integration
- [x] Create mock data for development
- [ ] Set up API endpoints for blog posts
- [ ] Integrate data fetching for listing and detail pages
- [ ] Implement pagination logic
- [ ] Connect comment system to backend

### Phase 6: Performance & SEO
- [ ] Implement SEO metadata for blog pages
- [ ] Add structured data for articles
- [x] Organize images in proper directory structure
- [x] Implement image lazy loading
- [ ] Optimize images with responsive sizing
- [ ] Implement client-side caching
- [ ] Add analytics tracking

## UI Components Needed

### Blog Listing Components
1. **BlogCard** - Reusable component for displaying blog post previews
2. **CategoryBadge** - For displaying categories
3. **TagBadge** - For displaying and filtering tags
4. **SearchBar** - For searching blog content
5. **Pagination** - For navigating between pages
6. **NewsletterForm** - For handling subscriptions
7. **TabSystem** - For category navigation
8. **BlogLayout** - Main layout for the blog section

### Blog Detail Components
1. **AuthorCard** - Display author information
2. **SocialShareButtons** - For sharing content
3. **ContentRenderer** - For rendering rich text blog content
4. **CommentForm** - For submitting comments
5. **CommentList** - For displaying existing comments
6. **CommentCard** - For individual comment display
7. **RelatedPostsGrid** - For showing related content
8. **ArticleNavigation** - For navigating between articles
9. **TagsList** - For displaying article tags

## Responsive Considerations

- Desktop: 3-column grid for blog posts, full-width article content
- Tablet: 2-column grid, responsive article layout
- Mobile: 1-column grid, simplified filters, stacked article components
- Mobile menu implementation for navigation
- Ensure readable typography on all devices
- Properly sized images for different screen widths

## SEO Considerations

- Implement proper metadata for blog list and individual posts
- Add structured data for blog posts (Article schema)
- Ensure proper heading hierarchy (h1, h2, h3)
- Optimize images with appropriate alt text
- Create sitemap including all blog posts
- Implement canonical URLs
- Add OpenGraph and Twitter card metadata for sharing

## Accessibility Requirements

- Ensure proper contrast ratios for text
- Add proper ARIA labels to interactive elements
- Ensure keyboard navigation works for all interactive elements
- Test with screen readers
- Provide text alternatives for images
- Ensure proper focus management

## Performance Optimizations

- Implement image lazy loading
- Consider pagination or infinite scroll for large blog lists
- Optimize images for different screen sizes
- Cache blog post data where appropriate
- Use route-based code splitting for detail pages
- Minimize layout shifts during page load

## Image Management

### Directory Structure
```
/public/assets/
├── blog/
│   ├── featured/       # Featured blog post images (1200x630px)
│   └── posts/          # Content images for blog posts (800x600px)
├── products/
│   ├── reviews/        # Product review images
│   └── gallery/        # Product gallery images
├── icons/              # Site-wide icons
└── common/             # Common images like logos
```

### Image Components
- **ResponsiveImage**: For optimized, responsive image loading
- **Image**: Base component with lazy loading for all images
- **BlogHeroImage**: Specialized component for blog hero sections

### Image Best Practices
1. Use WebP format when available for better performance
2. Implement proper image sizing for different viewports
3. Use lazy loading for all images below the fold
4. Include meaningful alt text for accessibility
5. Follow consistent naming convention: `category-name-descriptor.jpg`


## Next Steps

1. Create basic route and component structure
2. Implement static UI with mock data for blog listing
3. Build blog detail page with mock content
4. Implement content rendering with proper styling
5. Build comment system UI components
6. Connect to actual data source
7. Optimize for performance and SEO
8. Optimize image loading and responsive image implementation
