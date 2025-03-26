import { defineTable } from "convex/server";
import { v } from "convex/values";

export const guideCategories = defineTable({
  name: v.string(),
  slug: v.string(),
}).index("by_slug", ["slug"]);
