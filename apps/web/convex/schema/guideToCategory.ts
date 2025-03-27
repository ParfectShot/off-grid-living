import { defineTable } from "convex/server";
import { v } from "convex/values";

export const guideToCategory = defineTable({
  guideId: v.id("guides"),
  categoryId: v.id("guideCategories"),
  isPrimary: v.boolean(), // To indicate the primary category
}).index("by_guideId", ["guideId"])
  .index("by_categoryId", ["categoryId"])
  .index("by_guide_and_category", ["guideId", "categoryId"]);
