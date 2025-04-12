# Off-Grid Living Application - Frontend Technical Documentation

**Version:** 1.1
**Date:** April 12, 2025
**Status:** Draft

## 1. Overview

This document provides a technical overview of the frontend architecture, structure, and key implementation details for the Off-Grid Living web application. It serves as a reference for developers working on the project. The frontend is built primarily with React, TypeScript, TanStack Router, Convex, and uses Clerk for authentication.

## 2. Technology Stack

* **Core Framework:** React (v18+)
* **Language:** TypeScript
* **Routing:** TanStack Router (File-based routing)
* **Authentication:** Clerk (Handles user management, login/signup UI, session management)
* **Data Fetching & Server State:** React Query, Convex Client
* **Backend/Database:** Convex
* **Styling:** Tailwind CSS
* **UI Components:** shadcn/ui (built on Radix UI), supplemented with custom components.
* **State Management (Local):** Standard React state (useState, useReducer), Context API where appropriate. `useLocalStorage` hook for persistence. Clerk handles auth state.
* **Form Management:** React Hook Form (planned/implied for complex forms like calculators)

## 3. Project Structure (`apps/web/src/`)

The frontend codebase is organized as follows:

```
apps/web/
├── src/
│   ├── routes/             # File-based routes managed by TanStack Router
│   │   ├── __root.tsx      # Root layout component
│   │   ├── _pathlessLayout.tsx # Optional layout without path segment
│   │   ├── index.tsx       # Home page route (/)
│   │   ├── guides/         # Guides section routes
│   │   ├── calculators/    # Calculators section routes
│   │   ├── blogs/          # Blog section routes
│   │   └── (auth)/         # Authentication routes (handled largely by Clerk components/redirects)
│   ├── components/         # Reusable React components
│   │   ├── ui/             # Base UI elements (buttons, inputs - likely from shadcn/ui)
│   │   ├── layout/         # Page layout components (Header, Footer, Sidebar)
│   │   ├── guides/         # Components specific to the Guides feature
│   │   ├── calculators/    # Components specific to the Calculators feature
│   │   └── shared/         # Components shared across multiple features (SEO, Spinners)
│   ├── styles/             # Global styles, Tailwind configuration extensions
│   ├── utils/              # Utility functions (non-React specific)
│   │   ├── api/            # API client setup, endpoint definitions (if needed beyond Convex)
│   │   ├── formatting/     # Data formatting helpers (numbers, dates, strings)
│   │   ├── validation/     # Validation schemas and rules
│   │   └── helpers/        # General helper functions (math, array, object)
│   ├── lib/                # External libraries integration or configuration (e.g., Clerk setup)
│   ├── hooks/              # Custom React Hooks
│   │   ├── api/            # Hooks for data fetching (wrapping Convex queries)
│   │   ├── ui/             # Hooks related to UI logic (theming, media queries)
│   │   ├── form/           # Hooks related to form handling
│   │   └── shared/         # General-purpose hooks (debounce, localStorage)
│   ├── convex/             # Convex backend functions, schema, etc.
│   │   ├── _generated/     # Auto-generated Convex types and API helpers
│   │   ├── schema/         # Database schema definitions
│   │   ├── queries/        # Convex query functions (protected using Clerk auth)
│   │   ├── mutations/      # Convex mutation functions (protected using Clerk auth)
│   │   ├── auth.config.js  # Clerk configuration for Convex backend
│   │   ├── utils/          # Shared utilities for Convex functions
│   │   └── http/           # Convex HTTP endpoint definitions (e.g., webhooks)
│   └── data/               # Static data, types, constants, content
│       ├── types/          # TypeScript type definitions for data structures
│       ├── constants/      # Application constants (routes, config)
│       ├── guides/         # Static content/data for guides (if not fully DB driven)
│       ├── calculators/    # Configuration data for calculators
│       └── content/        # Other static content (metadata, navigation links)
```
*(Note: `src/routes/auth/` directory might be minimal or replaced by Clerk's provided components and routing logic integrated into layouts/root)*

## 4. Routing

* **Implementation:** TanStack Router is used, leveraging its file-based routing capabilities within the `src/routes/` directory. Clerk integrates to handle authentication checks and redirects for protected routes.
* **Structure:** Routes mirror the URL structure. Protected routes (like `/dashboard`) will check authentication status via Clerk before rendering.
* **Layouts:** Root layout (`__root.tsx`) likely contains Clerk providers and logic to manage user sessions and display appropriate UI (e.g., user menus).
* **Dynamic Routes:** Parameters are defined using the `$` prefix (e.g., `$slug`).
* **Implemented Routes:**
    * `/` (Home) ✅
    * `/guides`, `/guides/[category]`, `/guides/[category]/[slug]` ✅
    * `/calculators`, `/calculators/home-load` ✅
    * `/calculators/solar-system` (Route exists, page content pending ⏳)
    * `/blogs`, `/blogs/[id]` (Routes likely exist ✅)
    * Authentication routes (Login, Signup, Profile Management) handled by Clerk ✅
    * Protected routes (e.g., `/dashboard`) structure exists and uses Clerk for protection ✅
* **Pending/Planned:**
    * Refine dashboard/protected route access control based on user roles/permissions if needed.
    * Finalize route-level data loading patterns integrated with auth checks.

## 5. State Management

* **Server State:** Managed primarily via Convex queries and mutations, integrated with React Query for client-side caching, background updates, and optimistic updates where applicable. Custom hooks in `src/hooks/api/` abstract Convex calls.
* **Authentication State:** Managed via Clerk's frontend SDK (`@clerk/clerk-react`) and its hooks (`useAuth`, `useUser`). Provides user information, session status, and methods for login/logout.
* **Local/UI State:** Handled using standard React hooks (`useState`, `useReducer`). React Context API may be used for non-auth global UI state.
* **Persistence:** `useLocalStorage` hook (`src/hooks/shared/`) used for persisting simple non-sensitive state. Clerk handles session persistence securely.
* **Caching:** Leveraging React Query's caching mechanisms for server state. Specific caching strategies to be defined.

## 6. Component Architecture

* **Hierarchy:** Components are organized by feature (`guides`, `calculators`) or scope (`ui`, `layout`, `shared`). Clerk components (`<SignInButton>`, `<UserButton>`, etc.) are integrated into the layout/relevant pages.
* **Reusability:** Emphasis on creating reusable components.
* **Naming Conventions:** Established (PascalCase for components). ✅
* **Guides:** Specific patterns like progressive disclosure are implemented. ✅
* **Pending/Planned:**
    * Formalizing a shared component library structure.
    * Defining clear boundaries and props contracts.

## 7. Styling

* **Framework:** Tailwind CSS is the primary styling approach.
* **Component Library:** shadcn/ui provides pre-built components. Clerk components can often be styled to match the application theme.
* **Custom CSS:** Minimal custom CSS expected.

## 8. Data Fetching & Backend (Convex)

* **Schema:** Defined in `src/convex/schema/`.
* **Operations:** Queries (`src/convex/queries/`) and Mutations (`src/convex/mutations/`) define backend logic.
* **Security:** Convex functions (queries, mutations) are secured using Clerk authentication integration via `auth.config.js` and helper functions within Convex actions/mutations to verify authenticated users. ✅
* **Client Interaction:** Convex client library used on the frontend, often wrapped in React Query hooks (`src/hooks/api/`). Authentication state from Clerk determines if requests can be made/what data is returned.
* **Types:** Convex generates types (`src/convex/_generated/`) ensuring end-to-end type safety.

## 9. Assets & Content

* **Images:** Handled as previously described (dashboard/S3).
* **Static Content:** Managed within `src/data/content/`.
* **Guide Content:** Mix of static/dynamic content. Access to certain guides could potentially be restricted based on auth status.

## 10. Testing (Planned)

* **Strategy:** A comprehensive testing strategy is planned. Testing authenticated states will require mocking Clerk providers/hooks or using specific testing strategies recommended by Clerk.
* **Levels:** Component, Integration, UI/End-to-End.
* **Coverage:** Test coverage requirements to be established.

## 11. Performance Optimization (Planned)

* **Strategies:** Code Splitting, Lazy Loading.
* **Monitoring:** Performance monitoring tools to be set up.
* **Benchmarks:** Performance targets need corresponding benchmarks and monitoring.

## 12. Implementation Roadmap Summary

* **Phase 1 (Foundation):** Completed ✅
* **Phase 2 (Feature Implementation):** In Progress (Forms, interactive elements, guide components, Auth UI/Logic implemented ✅; Dashboard views pending).
* **Phase 3 (Refinement):** Partially Started (Responsive design ✅; Advanced UI, loading states pending).
* **Phase 4 (Finalization):** Pending (Testing, bug fixing, polishing).

## 13. Open Questions / Future Considerations

* Finalize local state management patterns beyond basic hooks.
* Define specific React Query caching strategies.
* Set up and implement the full testing strategy (frameworks, coverage, auth mocking).
* Implement performance monitoring and optimize against benchmarks.
* Complete remaining feature implementations (Solar Calculator logic, Blog features, Reviews system).
* Define specific role-based access control if needed beyond simple authentication.
