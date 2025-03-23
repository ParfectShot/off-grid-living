# Project Structure Cleanup

This document provides a detailed plan for cleaning up the current project structure while preserving the essential TanStack Router and React Query setup.

## Files to Keep

1. **Router Configuration**
   - `apps/frontend/src/router.tsx` - Contains the TanStack router and React Query setup
   - `apps/frontend/src/routeTree.gen.tsx` - Generated route tree file

2. **Core Components**
   - `apps/frontend/src/components/DefaultCatchBoundary.tsx` - Error boundary component
   - `apps/frontend/src/components/NotFound.tsx` - 404 page component

## Files to Create/Modify

1. **Entry Point**
   - `apps/frontend/src/main.tsx` - Clean up and ensure it correctly initializes the router

2. **App Structure**
   - `apps/frontend/src/App.tsx` - Simplify to only include router provider
   - `apps/frontend/src/layouts/RootLayout.tsx` - Create a new root layout component

3. **Route Structure**
   - `apps/frontend/src/routes/__root.tsx` - Root route component
   - `apps/frontend/src/routes/index.tsx` - Home page route

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
  apps/
  ├── frontend/         # React frontend application
  │   ├── src/
  │   │   ├── components/     # Reusable UI components
  │   │   ├── layouts/        # Page layout components
  │   │   ├── routes/         # Route components
  │   │   ├── hooks/          # Custom React hooks
  │   │   ├── utils/          # Utility functions
  │   │   ├── types/          # TypeScript types/interfaces
  │   │   ├── services/       # API services
  │   │   ├── assets/         # Static assets
  │   │   ├── styles/         # Global styles
  │   │   ├── main.tsx        # Entry point
  │   │   ├── App.tsx         # Main App component
  │   │   ├── router.tsx      # Router configuration
  │   │   └── routeTree.gen.tsx # Generated route tree
  │   ├── package.json
  │   └── tsconfig.json
  ├── backend/          # NestJS backend application
  │   ├── src/
  │   │   ├── main.ts
  │   │   ├── app.module.ts
  │   │   ├── controllers/
  │   │   └── services/
  │   ├── package.json
  │   └── tsconfig.json
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

## Monorepo Configuration

1. **Root Configuration**
   - Create a `turbo.json` file at the root for Turborepo configuration
   - Set up root `package.json` with workspace configuration
   - Configure root-level scripts for managing all packages

2. **Frontend Configuration**
   - Update path references in TanStack Router setup
   - Configure build and dev scripts

3. **Backend Configuration**
   - Configure NestJS application
   - Set up API endpoints for the frontend
