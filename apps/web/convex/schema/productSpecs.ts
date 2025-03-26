import { defineTable } from "convex/server";
import { v } from "convex/values";

export const productSpecs = defineTable({
  category: v.string(),
  displayOrder: v.float64(),
  name: v.string(),
  product: v.id("products"),
  unit: v.optional(v.string()),
  value: v.string(),
});
