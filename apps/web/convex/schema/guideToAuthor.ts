import { defineTable } from "convex/server";
import { v } from "convex/values";

export const guideToAuthor = defineTable({
  guideId: v.id("guides"),
  authorId: v.id("authors"),
}).index("by_guideId_authorId", ["guideId", "authorId"]);
