import { defineTable } from "convex/server";
import { v } from "convex/values";

export const guideToCategory = defineTable({
  guideId: v.id("guides"),
  categoryId: v.id("guideCategories"),
}).index("by_guideId_categoryId", ["guideId", "categoryId"]);
