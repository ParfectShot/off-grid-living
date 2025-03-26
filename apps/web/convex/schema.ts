import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...
  brands: defineTable({ name: v.string() }),
  categories: defineTable({ name: v.string() }),
  productAttributes: defineTable({
    displayOrder: v.float64(),
    name: v.string(),
    product: v.id("products"),
    value: v.string(),
  }),
  productImages: defineTable({
    alt: v.string(),
    displayOrder: v.float64(),
    isMain: v.boolean(),
    product: v.id("products"),
    url: v.string(),
  }),
  products: defineTable({
    availability: v.string(),
    brandName: v.id("brands"),
    categoryName: v.id("categories"),
    createdAt: v.string(),
    currency: v.string(),
    description: v.string(),
    name: v.string(),
    price: v.float64(),
    regularPrice: v.float64(),
    shortDescription: v.string(),
    sku: v.string(),
    updatedAt: v.string(),
    url: v.string(),
    warranty: v.optional(v.string()),
    weight: v.float64(),
    weightUnit: v.string(),
  }),
  productSpecs: defineTable({
    category: v.string(),
    displayOrder: v.float64(),
    name: v.string(),
    product: v.id("products"),
    unit: v.optional(v.string()),
    value: v.string(),
  }),
  productVariants: defineTable({
    attributes: v.object({
      color: v.optional(v.string()),
      size: v.optional(v.string()),
    }),
    product: v.id("products"),
    sku: v.string(),
  }),
});