import { defineTable } from "convex/server";
import { v } from "convex/values";

export const guideSections = defineTable({
  guideId: v.id("guides"),
  sectionId: v.string(), // The section ID like "introduction", "benefits", etc.
  title: v.string(),
  order: v.optional(v.number()), // For ordering sections
}).index("by_guideId", ["guideId"])
  .index("by_guide_and_sectionId", ["guideId", "sectionId"])
  .index("order", ["order"]);
