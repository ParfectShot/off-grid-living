import { defineTable } from "convex/server";
import { v } from "convex/values";

export const guideSections = defineTable({
  guideId: v.id("guides"), // Foreign key linking to the guides table
  title: v.string(),
  slug: v.string(), // Unique identifier for the section within the guide (e.g., "what-is-off-grid-living")
  content: v.string(), // The main content of the guide section (likely Markdown or HTML)
  order: v.number(), // For ordering sections within a guide
  image: v.optional(v.string()), // For multimedia content
  videoUrl: v.optional(v.string()), // For multimedia content
}).index("by_guideId_order", ["guideId", "order"])
  .index("by_guideId_slug", ["guideId", "slug"]);
