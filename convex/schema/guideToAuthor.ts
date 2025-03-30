import { defineTable } from "convex/server";
import { v } from "convex/values";

export const guideToAuthor = defineTable({
  guideId: v.id("guides"),
  authorId: v.id("authors"),
  isPrimary: v.boolean(), // To indicate the primary author
}).index("by_guideId", ["guideId"])
  .index("by_authorId", ["authorId"]);
