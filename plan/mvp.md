# Off-Grid Living Website - MVP Plan

## Overview

This document outlines the Minimum Viable Product (MVP) for an off-grid living website focused on sustainability, renewable energy, and self-sufficient living. The website aims to provide valuable resources, tools, and content for individuals interested in off-grid lifestyle.

## Feature Priority

### Priority 1: Core Infrastructure & Homepage
- Responsive navigation & site framework ✅
- Home page with hero section and feature highlights ✅
- Basic routing structure ✅
- Mobile-friendly layout foundation ✅
- Footer with essential links ✅

### Priority 2: Calculator Tools
- Home load calculator ✅
  - Basic appliance inventory ✅
  - Power consumption calculation ✅
  - Daily/monthly estimates ✅
- Solar system calculator ⏳
  - Solar panel requirements based on load
  - Basic system sizing
  - Storage recommendations

### Priority 3: Content Pages
- Blog listing page with filtering
- Blog post detail pages
- Initial set of educational content
- Reviews page structure ✅
- Guides section with structured content paths ✅

### Priority 4: Engagement Features
- Newsletter subscription
- Comment functionality on blog posts
- Social sharing for calculator results
- Advanced filtering and search

## Core Pages

### 1. Home Page
- **Purpose**: Serve as the main entry point, introducing visitors to the concept of off-grid living
- **Key Components**:
  - Hero section with compelling imagery and primary CTA
  - Feature highlights for each main section of the website
  - Quick access to most popular calculators
  - Featured blog posts
  - Top product reviews
  - Newsletter subscription

### 2. Blogs Page
- **Purpose**: Educational content about off-grid living topics
- **Key Components**:
  - Category filtering (solar power, water systems, sustainable building, etc.)
  - Search functionality
  - Post listings with featured images, excerpts, and read time
  - Popular/trending posts section
  - Related posts recommendations

### 3. Calculators Page
- **Purpose**: Interactive tools to help users plan their off-grid systems
- **Key Components**:
  - **Home Load Calculator** ✅
    - Inventory of household appliances/devices ✅
    - Power consumption calculation ✅
    - Daily/monthly usage estimates ✅
    - Energy-saving recommendations ✅
  - **Solar System Calculator** ⏳
    - Solar panel requirements based on energy needs
    - Battery storage recommendations
    - Cost estimates
    - System sizing guidance
  - Results saving/sharing functionality ⏳

### 4. Reviews Page
- **Purpose**: Honest assessments of solar and off-grid products
- **Key Components**:
  - Categorized product listings ✅
  - Detailed product information ✅
    - Specifications ✅
    - Images ✅
    - Pricing ✅
    - Availability ✅
    - Warranty information ✅
  - Rating system
    - Efficiency
    - Durability
    - Value for money
    - Installation ease
  - Comparison features
  - User comments/experiences section
  - Product variants and attributes ✅

### 5. Guides Page ✅
- **Purpose**: Structured educational content to help users navigate off-grid living concepts
- **Key Components**:
  - **Getting Started Guide** ✅
    - What is off-grid living? ✅
    - Key considerations (Power needs, Water systems, Initial costs)
    - Step-by-step approach
    - Common questions
  - Clear navigation between guide sections ✅
  - Visual aids and diagrams ✅
  - Downloadable/printable versions ✅
  - Related calculators and tools ✅

## Technical Requirements

### 1. Frontend Framework & Styling
- **Framework**: React with TypeScript
- **Routing**: TanStack Router
- **Styling Recommendation**: 
  - Continue using Tailwind CSS for its utility-first approach and rapid development
  - Supplement with a component library (see recommendations below)

### 2. Component Library Options
1. **Tailwind UI + HeadlessUI** (Recommended)
   - Pros: Perfect integration with Tailwind, accessible, customizable
   - Cons: Requires more manual implementation than all-in-one libraries

2. **Chakra UI**
   - Pros: Accessible, themeable, works well with Tailwind
   - Cons: Some style conflicts may require resolution

3. **shadcn/ui**
   - Pros: Beautiful, customizable components built on Radix UI
   - Cons: Not a traditional library (copy-paste approach)

**Recommendation**: Keep Tailwind CSS and use shadcn/ui for component-based needs. This combination provides:
- Rapid development with Tailwind's utility classes
- High-quality, accessible components from shadcn/ui
- Maximum flexibility for custom styling
- Good performance characteristics

### 3. Data Management
- Use React Query for data fetching and caching ✅
- Implement form state management with React Hook Form
- Consider local storage for calculator inputs/results
- Using Convex for database and real-time data sync ✅

### 4. Backend Requirements
- Schema for product and review data ✅
- API endpoints for blog content
- Storage solution for calculator configurations
- Authentication for potential future community features

## Design Elements

### 1. Color Palette
- Primary: `#3a7e4f` (Forest Green)
- Secondary: `#7bb989` (Sage Green)
- Accent: `#dfbb5a` (Harvest Gold)
- Text: `#333333` (Dark Gray)
- Background: `#f8f8f8` (Off-White)
- Highlights: `#e36414` (Pumpkin) for CTAs and important elements

### 2. Typography
- Headings: System font stack with slightly increased weight
- Body: Clean, readable sans-serif
- Consider variable fonts for performance

### 3. Imagery
- High-quality photos of:
  - Off-grid homes and cabins
  - Solar panel installations
  - Sustainable living practices
  - Natural landscapes
- Infographics for educational content
- Icons for features and categories

## Implementation Phases

### Phase 1: Core Structure (Weeks 1-2) ✅
- Set up project architecture
- Implement responsive layout components 
- Create navigation and footer
- Build home page structure

### Phase 2: Calculator Tools (Weeks 3-4)
- Develop home load calculator ✅
- Implement solar system calculator ⏳
- Create results visualization components ✅

### Phase 3: Content Pages (Weeks 5-6)
- Build blog listing and detail pages
- Implement reviews system
- Create content management interface
- Develop structured guides framework ✅

### Phase 4: Enhancement & Polish (Weeks 7-8)
- Add search functionality
- Implement filtering systems
- Optimize for performance
- Add animations and transitions

## Development Roadmap

| Week | Focus | Key Deliverables |
|------|-------|------------------|
| 1 | Project Setup | Repository setup, folder structure, base components ✅ |
| 2 | Homepage | Navigation, hero section, responsive layout ✅ |
| 3 | Load Calculator | Interface, calculation logic, basic styling ✅ |
| 4 | Solar Calculator | Interface, calculation logic, results display |
| 5 | Blog System | Listing page, category filters, detail view ✅ |
| 6 | Guides System | Getting started guide, navigation structure, content formatting ✅ |
| 7 | Reviews System | Product listing, rating components, detail pages |
| 8 | Refinement | Search functionality, UX improvements |
| 9 | Finalization | Performance optimization, testing, deployment |

## Page Structure Details

### Home Page Layout
1. **Navigation Bar**
   - Logo/brand
   - Main navigation links
   - Mobile-responsive menu

2. **Hero Section**
   - Headline: "Your Journey to Self-Sufficient Living Starts Here"
   - Subheading: Brief value proposition
   - CTA button: "Explore Our Calculators" or "Read Our Getting Started Guide"
   - Background: High-quality image of off-grid home with solar panels

3. **Features Section**
   - 3-4 cards highlighting main site sections
   - Icons and brief descriptions
   - Links to respective sections

4. **Calculators Showcase**
   - Preview of calculator tools
   - Brief explanation of benefits
   - Direct links to each calculator

5. **Guides Showcase**
   - Featured guides with descriptive icons
   - Brief description of guide benefits
   - "Get Started" CTAs for each guide

6. **Blog Posts Preview**
   - 3 latest/featured posts
   - Thumbnail, title, excerpt
   - "View All Posts" link

7. **Product Reviews Preview**
   - Featured product reviews
   - Rating indicators
   - Category links

8. **Newsletter Section**
   - Brief pitch
   - Email input
   - Subscription button
   - Privacy assurance

9. **Footer**
   - Secondary navigation
   - Social links
   - Contact information
   - Copyright

## Database Models

We've implemented the following models in our Convex schema:

1. **Products** - Core product information ✅
2. **Product Variants** - Size, color variations ✅
3. **Product Attributes** - Key-value product features ✅
4. **Product Specs** - Technical specifications ✅
5. **Product Images** - Photo galleries ✅
6. **Brands** - Brand information ✅
7. **Categories** - Product categorization ✅

Plans for additional models:
- Blog Posts
- Calculator Configurations
- User Profiles
- Reviews
- Guides

## Next Steps

1. Finalize technology decisions (component library) ✅
2. Create detailed wireframes for each page ✅
3. Develop core layout components ✅
4. Implement calculator logic ✅ (Home Load Calculator)
5. Begin content creation for blog posts

## Technical Considerations

1. **SEO Requirements**
   - Semantic HTML structure
   - Metadata management
   - Image optimization
   - Performance metrics

2. **Accessibility**
   - WCAG 2.1 AA compliance
   - Keyboard navigation
   - Screen reader compatibility
   - Sufficient color contrast

3. **Performance Targets**
   - First Contentful Paint < 1.8s
   - Largest Contentful Paint < 2.5s
   - Total Blocking Time < 200ms
   - Cumulative Layout Shift < 0.1
