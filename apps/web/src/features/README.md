# Feature-Based Folder Structure

This project has been restructured to use a feature-based organization, which offers several benefits:

## Structure Overview

```
src/
├── routes/                   # Required TanStack Router location
│   ├── __root.tsx
│   ├── _pathlessLayout/
│   │   ├── index.tsx
│   │   ├── blogs/
│   │   │   ├── index.tsx
│   │   │   └── $id.tsx
│   │   ├── guides/
│   │   │   ├── index.tsx
│   │   │   ├── $category/
│   │   │       ├── index.tsx
│   │   │       └── $slug.tsx
│   │   └── calculators/
│   │       ├── index.tsx
│   │       ├── solar-system/
│   │       │   └── index.tsx
│   │       └── home-load/
│   │           └── index.tsx
│   ├── dashboard/
│   │   ├── index.tsx
│   │   ├── images/
│   │   │   ├── index.tsx
│   │   │   └── $imageId.tsx
│   │   └── guides/
│   │       ├── index.tsx
│   │       └── $guideId.tsx
│   └── api/
│
├── features/                 # Feature-based organization for everything else
│   ├── blogs/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── api/
│   │   └── index.ts
│   │
│   ├── calculators/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── api/
│   │   └── index.ts
│   │
│   ├── images/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── api/
│   │   └── index.ts
│   │
│   └── guides/
│       ├── components/
│       ├── hooks/
│       ├── types/
│       ├── utils/
│       ├── api/
│       └── index.ts
```

## Benefits

1. **Colocation**: All related code for a feature is located together, making it easier to navigate and maintain.
2. **Modularity**: Each feature is self-contained with its own components, hooks, types, and utilities.
3. **Scalability**: New features can be added without affecting existing code.
4. **Reusability**: Components and hooks can be shared across features when needed.
5. **Clear Boundaries**: The separation between routes and features provides a clear mental model.

## Guidelines for Development

1. Place all route components in the `routes/` directory following TanStack Router conventions.
2. Place all feature-specific code in the appropriate feature directory.
3. Use barrel exports (`index.ts` files) to simplify imports.
4. Keep shared components in `src/components/ui` or similar shared locations.
5. Feature-specific API calls should be placed in the feature's `api/` directory. 