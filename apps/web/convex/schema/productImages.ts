import { defineTable } from "convex/server";
import { v } from "convex/values";

export const productImages = defineTable({
  alt: v.string(),
  displayOrder: v.float64(),
  isMain: v.boolean(),
  product: v.id("products"),
  url: v.string(),
});
