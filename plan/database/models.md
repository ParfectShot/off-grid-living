# Off-Grid Living - Database Models

## Overview
This document outlines the database models for the Off-Grid Living platform. We're using Convex as our backend database service, which provides real-time data synchronization and a simple type-safe API.

## Current Schema Implementation Status

| Model | Status | Description |
|-------|--------|-------------|
| Products | ✅ | Core product data model |
| Product Variants | ✅ | Product variations (size, color, etc.) |
| Product Attributes | ✅ | Key-value attributes for products |
| Product Specs | ✅ | Technical specifications for products |
| Product Images | ✅ | Image galleries for products |
| Brands | ✅ | Brand information |
| Categories | ✅ | Product categorization |
| Blog Posts | ⏳ | Content management for articles |
| Calculator Configs | ⏳ | Saved configurations for calculators |
| User Profiles | ⏳ | User information and preferences |
| Reviews | ⏳ | Product reviews and ratings |
| Guides | ⏳ | Structured educational content |

## Current Schema Details

### Products
The central entity representing items that can be reviewed and recommended.

| Field | Type | Description |
|-------|------|-------------|
| name | string | Product name |
| description | string | Full product description |
| shortDescription | string | Brief summary for listings |
| price | number | Current price |
| regularPrice | number | Original/non-sale price |
| currency | string | Price currency code |
| sku | string | Stock keeping unit |
| brandName | reference | Reference to brand |
| categoryName | reference | Reference to category |
| availability | string | In stock, backorder, etc. |
| weight | number | Product weight |
| weightUnit | string | Unit of weight measure |
| url | string | External product URL |
| warranty | string (optional) | Warranty information |
| createdAt | string | Creation timestamp |
| updatedAt | string | Last update timestamp |

### Product Variants
Product variations based on attributes like size, color, etc.

| Field | Type | Description |
|-------|------|-------------|
| product | reference | Reference to parent product |
| sku | string | Variant-specific SKU |
| attributes | object | Key-value attributes (color, size) |

### Product Attributes
Key-value pairs for product features.

| Field | Type | Description |
|-------|------|-------------|
| product | reference | Reference to product |
| name | string | Attribute name |
| value | string | Attribute value |
| displayOrder | number | Order for display |

### Product Specs
Technical specifications for products.

| Field | Type | Description |
|-------|------|-------------|
| product | reference | Reference to product |
| category | string | Spec category/grouping |
| name | string | Specification name |
| value | string | Specification value |
| unit | string (optional) | Unit of measure |
| displayOrder | number | Order for display |

### Product Images
Image galleries for products.

| Field | Type | Description |
|-------|------|-------------|
| product | reference | Reference to product |
| url | string | Image URL |
| alt | string | Alt text |
| isMain | boolean | Primary product image |
| displayOrder | number | Order for display |

### Brands
Brand information for products.

| Field | Type | Description |
|-------|------|-------------|
| name | string | Brand name |

### Categories
Product categorization.

| Field | Type | Description |
|-------|------|-------------|
| name | string | Category name |

## Planned Schema Extensions

### Blog Posts
```
{
  title: string,
  slug: string,
  author: reference to users,
  content: string,
  excerpt: string,
  publishDate: string,
  status: string,
  categories: array of strings,
  tags: array of strings,
  featuredImage: string,
  metaTitle: string,
  metaDescription: string
}
```

### Reviews
```
{
  product: reference to products,
  user: reference to users,
  rating: number,
  title: string,
  content: string,
  pros: array of strings,
  cons: array of strings,
  datePosted: string,
  helpfulVotes: number,
  verifiedPurchase: boolean,
  categoryRatings: object (efficiency, durability, value, ease)
}
```

### Calculator Configs
```
{
  user: reference to users (optional),
  calculatorType: string,
  name: string,
  config: object,
  results: object,
  createdAt: string,
  public: boolean
}
```

### Guides
```
{
  title: string,
  slug: string,
  content: string,
  order: number,
  parentGuide: reference to guides (optional),
  level: number,
  publishDate: string,
  lastUpdated: string,
  relatedProducts: array of references to products,
  relatedCalculators: array of strings
}
```

## Relationships

1. **Products** have many:
   - Product Variants
   - Product Attributes
   - Product Specs
   - Product Images
   - Reviews

2. **Products** belong to:
   - Brand
   - Category

3. **Guides** can have:
   - Parent Guides (hierarchical structure)
   - Related Products
   - Related Calculators

## Next Steps

1. Implement the Blog Posts schema
2. Develop the Reviews system
3. Create the Calculator Configs model for saving user calculations
4. Build the hierarchical Guides structure
5. Develop user authentication and profiles

## Implementation Timeline

| Model | Target Implementation | Priority |
|-------|----------------------|----------|
| Blog Posts | Week 5 | High |
| Reviews | Week 7 | Medium |
| Calculator Configs | Week 4 | High |
| User Profiles | Week 6 | Medium |
| Guides | Week 6 | High |
