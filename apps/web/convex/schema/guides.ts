import { defineTable } from "convex/server";
import { v } from "convex/values";

export const guides = defineTable({
  title: v.string(),
  slug: v.string(), // Unique identifier for the guide URL (e.g., "getting-started")
  description: v.optional(v.string()),
  order: v.optional(v.number()), // For ordering guides on a listing page
  metaTitle: v.optional(v.string()), // SEO field
  metaDescription: v.optional(v.string()), // SEO field
}).index("by_slug", ["slug"]);
