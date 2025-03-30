import { defineTable } from "convex/server";
import { v } from "convex/values";

export const productCategories = defineTable({
  name: v.string(),
  slug: v.optional(v.string()), // For URL-friendly identifiers
  description: v.optional(v.string()),
  parentCategory: v.optional(v.id("productCategories")), // For nested categories
  // Add other relevant fields like image URL if needed
  // imageUrl: v.optional(v.string()),
})
.index("by_slug", ["slug"]); // Index for fetching by slug
