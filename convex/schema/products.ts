import { defineTable } from "convex/server";
import { v } from "convex/values";

export const products = defineTable({
  // Basic product info (same as before)
  name: v.string(),
  price: v.number(),
  currency: v.string(),
  brandId: v.id("brands"),
  categoryIds: v.array(v.id("productCategories")),
  categoryName: v.optional(v.string()),
  description: v.optional(v.string()),
  shortDescription: v.optional(v.string()),
  
  // Main image URL - quick access to primary image
  mainImageUrl: v.optional(v.string()),
  
  // Rest remains the same
  sku: v.optional(v.string()),
  url: v.optional(v.string()),
  availability: v.optional(v.string()),
  regularPrice: v.optional(v.number()),
  sourceWebsite: v.string(),
  sourceId: v.optional(v.string()),
  scrapedAt: v.number(),
  updatedAt: v.optional(v.number()),
  metadata: v.object({
    raw: v.any(),
  }),
})
