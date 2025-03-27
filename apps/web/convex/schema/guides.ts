import { defineTable } from "convex/server";
import { v } from "convex/values";

export const guides = defineTable({
  title: v.string(),
  description: v.string(),
  slug: v.string(),
  readTime: v.string(),
  level: v.string(),
  lastUpdated: v.optional(v.string()),
  image: v.optional(v.string()),
  featured: v.optional(v.boolean()),
}).index("by_slug", ["slug"])
  .index("featured", ["featured"]);
