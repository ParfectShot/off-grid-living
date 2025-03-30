import { defineTable } from "convex/server";
import { v } from "convex/values";

export const guideCategories = defineTable({
  title: v.string(),
  description: v.string(),
  slug: v.string(),
  icon: v.string(),
}).index("by_slug", ["slug"]);
