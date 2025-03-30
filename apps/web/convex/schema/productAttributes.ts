import { defineTable } from "convex/server";
import { v } from "convex/values";

export const productAttributes = defineTable({
  productId: v.id("products"),
  name: v.string(),  // e.g., "Color", "Size", "Material"
  value: v.string(), // e.g., "Red", "Large", "Aluminum"
  // Consider adding an optional category if attributes are grouped
  // category: v.optional(v.string()),
})
.index("by_product", ["productId"]);
