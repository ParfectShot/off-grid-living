import { defineTable } from "convex/server";
import { v } from "convex/values";

export const authors = defineTable({
  name: v.string(),
  bio: v.optional(v.string()),
  // You might want to add other author-related fields like 'slug', 'imageUrl', etc.
}).index("by_name", ["name"]);
