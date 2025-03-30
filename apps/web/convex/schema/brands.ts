import { defineTable } from "convex/server";
import { v } from "convex/values";

export const brands = defineTable({
  name: v.string(),
  slug: v.optional(v.string()), // For URL-friendly identifiers
  logoUrl: v.optional(v.string()),
  description: v.optional(v.string()),
  website: v.optional(v.string()),
  // Add other relevant fields like country of origin, etc.
})
.index("by_slug", ["slug"]);