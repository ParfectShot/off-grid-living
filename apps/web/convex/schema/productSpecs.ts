import { defineTable } from "convex/server";
import { v } from "convex/values";

export const productSpecs = defineTable({
  productId: v.id("products"),
  category: v.optional(v.string()), // e.g., "physical", "electrical", "warranty"
  name: v.string(),               // e.g., "weight", "voltage", "warranty_period"
  value: v.string(),              // e.g., "225 KGS", "12V", "30 Years Power Output"
  displayOrder: v.optional(v.number()), // For controlling display order
})
.index("by_product", ["productId"]);
