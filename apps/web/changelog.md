### [0.0.3]
1. **Created Feature-Based Directory Structure**
   - Created `/features` directory with subdirectories for each major feature:
     - `/features/blogs`
     - `/features/calculators`
     - `/features/guides`
     - `/features/images`
   - Each feature directory follows a consistent structure:
     - `/components` - UI components specific to the feature
     - `/hooks` - Custom React hooks for the feature
     - `/types` - TypeScript interfaces and types
     - `/utils` - Utility functions
     - `/api` - API integrations (Convex queries/mutations)

2. **Moved Components to Feature Directories**
   - Relocated image-processing components to `/features/images/components`
   - Relocated S3-browser components to `/features/images/components`
   - Relocated guide components to `/features/guides/components`

3. **Created Index Files for Each Feature Directory**
   - Added barrel export files (index.ts) for easier imports
   - Organized types for each feature

4. **Updated Route Structure**
   - Organized dashboard routes for consistency
   - Maintained compatibility with TanStack Router

### [0.0.2]
- Added Blog Page
- Added Blog Detail Page
- Added Blog Post Data Structure
- Added Comment Data Structure
- Added Blog Post Navigation
- Added Blog Post Comments
- Added Blog Post Likes
- Added Blog Post Related Posts
- Added Blog Post Author
- Added Blog Post Tags
- Added Blog Post Social Sharing
- Added Blog Post Save/Bookmark
- Added Blog Post Newsletter CTA

### [0.0.1]
- Intial App Setup
- Home Page Added
- Responsie Layout
- Mobile Menu
- Theme Toggle