# Project Structure Cleanup

This document provides a detailed plan for cleaning up the current project structure while preserving the essential TanStack Router and React Query setup.

## Files to Keep

1. **Router Configuration**
   - `src/router.tsx` - Contains the TanStack router and React Query setup
   - `src/routeTree.gen.tsx` - Generated route tree file

2. **Core Components**
   - `src/components/DefaultCatchBoundary.tsx` - Error boundary component
   - `src/components/NotFound.tsx` - 404 page component

## Files to Create/Modify

1. **Entry Point**
   - `src/main.tsx` - Clean up and ensure it correctly initializes the router

2. **App Structure**
   - `src/App.tsx` - Simplify to only include router provider
   - `src/layouts/RootLayout.tsx` - Create a new root layout component

3. **Route Structure**
   - `src/routes/__root.tsx` - Root route component
   - `src/routes/index.tsx` - Home page route

## Files to Remove

1. **Boilerplate Files**
   - Any demo or example components not related to core functionality
   - Unused assets or styles
   - Default React templates or example code

## Implementation Checklist

- [x] Backup the current project (recommended)
- [x] Review all files in the `src` directory and categorize them
- [x] Keep essential router and query related files intact
- [x] Create the basic folder structure:
  ```
  src/
  ├── components/     # Reusable UI components
  ├── layouts/        # Page layout components
  ├── routes/         # Route components
  ├── hooks/          # Custom React hooks
  ├── utils/          # Utility functions
  ├── types/          # TypeScript types/interfaces
  ├── services/       # API services
  ├── assets/         # Static assets
  ├── styles/         # Global styles
  ├── main.tsx        # Entry point
  ├── App.tsx         # Main App component
  ├── router.tsx      # Router configuration
  └── routeTree.gen.tsx # Generated route tree
  ```
- [x] Remove any unnecessary files
- [x] Test the application to ensure it still works after cleanup

## Clean Code Base Goals

After cleanup, the project should:

1. Contain only the essential files needed for the application
2. Have a clear and logical folder structure
3. Maintain the TanStack Router and React Query functionality
4. Be ready for implementing the core features of the Off-Grid Living application

## Next Steps

After completing the cleanup:
1. Mark the first step in the initialization plan as complete ✅
2. Move on to defining core features (step 2 in the plan)
3. Begin implementing the basic application structure

## Implementation Notes

- Created a minimal but functional layout system with `RootLayout.tsx`
- Set up the basic route structure with `__root.tsx` and `index.tsx`
- Added a clean CSS file with variables for consistent theming
- Simplified the App component to only handle the router provider
- Established a clean entry point in `main.tsx`
- Removed unnecessary example routes (posts, users, etc.) from the root component
