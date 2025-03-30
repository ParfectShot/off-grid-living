import { defineTable } from "convex/server";
import { v } from "convex/values";

export const authors = defineTable({
  name: v.string(),
  bio: v.optional(v.string()),
  avatar: v.optional(v.string()),
  slug: v.string(),
}).index("by_slug", ["slug"]);
