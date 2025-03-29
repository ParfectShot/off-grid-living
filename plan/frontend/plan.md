# Off-Grid Living Application - Frontend Plan

## Overview
This document outlines the frontend implementation plan for the Off-Grid Living application. The frontend is built using React with TanStack Router and React Query.

## UI/UX Design Approach
- [x] Decide on a component library or custom design system
- [ ] Establish design principles and guidelines
- [ ] Create wireframes for key screens
- [ ] Define responsive design strategy

## State Management Strategy
- [ ] Determine how to leverage React Query for server state
- [ ] Plan local state management approach
- [ ] Define caching strategies
- [ ] Create a data fetching pattern to follow

## Routing Structure
- [x] Map out application routes
  - Home (/) ✅
  - Blogs (/blogs, /blogs/[id]) ✅
  - Calculators (/calculators, /calculators/[type]) ✅
      - Calculators Index (/calculators) ✅
      - Home Load Calculator (/calculators/home-load) ✅
      - Solar System Calculator (/calculators/solar-system) ⏳
  - Reviews (/reviews, /reviews/[id])
  - Guides (/guides, /guides/[path]) ✅
      - Guides Index (/guides) ✅
      - Guide Categories (/guides/[category]) ✅
      - Individual guides (/guides/[category]/[slug]) ✅
- [x] Define route parameters and dynamic routes
- [ ] Plan for protected/authenticated routes
- [ ] Establish route-level data loading patterns

## Frontend Testing Strategy
- [ ] Set up component testing framework
- [ ] Plan for integration tests
- [ ] Implement UI testing approach
- [ ] Establish test coverage requirements

## Component Architecture
- [ ] Define component hierarchy
- [ ] Plan for component reusability
- [x] Establish naming conventions
- [ ] Create shared component library
- [x] Design progressive disclosure patterns for guides ✅

## Performance Optimization
- [ ] Plan for code splitting
- [ ] Implement lazy loading strategy
- [ ] Set up performance monitoring
- [ ] Define performance benchmarks

## Images and Assets
- [ ] Organize asset directory structure
- [ ] Create placeholder images for development
- [ ] Find/create high-quality images for:
  - [ ] Home page sections
  - [ ] Calculator preview cards (home load & solar system calculators)
  - [ ] Blog posts
  - [ ] Product reviews

## Implementation Roadmap

1. **Phase 1: Foundation**
   - Set up project structure ✅
   - Implement core layouts ✅
   - Create basic UI components ✅

2. **Phase 2: Feature Implementation**
   - Build authentication UI
   - Implement dashboard views
   - Create forms and interactive elements ✅ (Calculator forms, Guides sections)
   - Develop structured guide components ✅

3. **Phase 3: Refinement**
   - Add advanced UI features
   - Implement responsive design ✅ (Home Load Calculator mobile view, Guides pages)
   - Optimize loading states

4. **Phase 4: Finalization**
   - Conduct UI testing
   - Fix visual bugs
   - Polish user experience


## App Structure
apps/web/
├── src/
│   ├── routes/
|      ├── __root.tsx              # Root layout
|      ├── _pathlessLayout.tsx     # Pathless layout
|      ├── index.tsx              # Home page
|      ├── guides/
|      │   ├── index.tsx          # Guides listing
|      │   ├── $category/
|      │   │   ├── index.tsx      # Category listing
|      │   │   └── $slug.tsx      # Individual guide
|      ├── calculators/
|      │   ├── index.tsx          # Calculator listing
|      │   ├── home-load/
|      │   │   └── index.tsx      # Home load calculator
|      │   └── solar-system/
|      │       └── index.tsx      # Solar system calculator
|      ├── blogs/
|      │   ├── index.tsx          # Blog listing
|      │   └── $id.tsx            # Individual blog
|      └── auth/
|         ├── login.tsx
|         └── register.tsx   
│   ├── components/
|      ├── ui/                    # Base UI components
|      │   plan/frontend/ui-components.md  # UI components listed here
|      ├── layout/               # Layout components
|      │   ├── header/
|      │   │   ├── index.tsx
|      │   │   ├── nav.tsx
|      │   │   └── user-menu.tsx
|      │   ├── footer/
|      │   └── sidebar/
|      ├── guides/              # Guide-specific components
|      │   ├── guide-card.tsx
|      │   ├── guide-navigation.tsx
|      │   └── guide-content.tsx
|      ├── calculators/         # Calculator components
|      │   ├── calculator-form.tsx
|      │   ├── result-display.tsx
|      │   └── input-field.tsx
|      └── shared/             # Shared components
|         ├── seo.tsx
|         ├── loading-spinner.tsx
|         └── error-boundary.tsx
│   ├── styles/             # CSS and styling
│   ├── utils/
|      ├── api/           # API utilities
|      │   ├── client.ts
|      │   └── endpoints.ts
|      ├── formatting/    # Formatting utilities
|      │   ├── number.ts
|      │   ├── date.ts
|      │   └── string.ts
|      ├── validation/    # Validation utilities
|      │   ├── schema.ts
|      │   └── rules.ts
|      └── helpers/       # General helpers
|         ├── math.ts
|         ├── array.ts
|         └── object.ts
│   ├── lib/                # Library code
│   ├── hooks/
|      ├── api/            # API related hooks
|      │   ├── useGuides.ts
|      │   ├── useProducts.ts
|      │   └── useCategories.ts
|      ├── ui/            # UI related hooks
|      │   ├── useTheme.ts
|      │   ├── useMediaQuery.ts
|      │   └── useElementSize.ts
|      ├── form/          # Form related hooks
|      │   ├── useCalculatorForm.ts
|      │   └── useValidation.ts
|      └── shared/        # Shared hooks
|         ├── useDebounce.ts
|         └── useLocalStorage.ts
│   ├── convex/
|      ├── _generated/        # Generated types and APIs
|      │   ├── api.d.ts
|      │   ├── dataModel.d.ts
|      │   └── server.d.ts
|      ├── schema/           # Database schema
|      │   ├── guides.ts
|      │   ├── products.ts
|      │   ├── categories.ts
|      │   ├── authors.ts
|      │   └── index.ts
|      ├── queries/          # Query operations
|      │   ├── guides/
|      │   │   ├── getGuideBySlug.ts
|      │   │   └── listGuides.ts
|      │   └── products/
|      │       ├── getProduct.ts
|      │       └── listProducts.ts
|      ├── mutations/        # Mutation operations
|      │   ├── guides/
|      │   │   ├── createGuide.ts
|      │   │   └── updateGuide.ts
|      │   └── products/
|      │       ├── createProduct.ts
|      │       └── updateProduct.ts
|      ├── utils/           # Shared utilities
|      │   ├── validation.ts
|      │   └── transforms.ts
|      └── http/           # HTTP endpoints
|         └── webhooks.ts
│   └── data/
|      ├── types/              # Type definitions
|      │   ├── guides.ts
|      │   ├── calculators.ts
|      │   └── blog.ts
|      ├── constants/         # Constants and enums
|      │   ├── routes.ts
|      │   ├── categories.ts
|      │   └── config.ts
|      ├── guides/           # Guide content
|      │   ├── index.ts
|      │   ├── getting-started/
|      │   └── advanced/
|      ├── calculators/      # Calculator configurations
|      │   ├── home-load.ts
|      │   └── solar-system.ts
|      └── content/         # Static content
|         ├── meta.ts
|         └── navigation.ts
