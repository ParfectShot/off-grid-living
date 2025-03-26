import { defineTable } from "convex/server";
import { v } from "convex/values";

export const productAttributes = defineTable({
  displayOrder: v.float64(),
  name: v.string(),
  product: v.id("products"),
  value: v.string(),
});
