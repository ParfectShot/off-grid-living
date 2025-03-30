import { defineTable } from "convex/server";
import { v } from "convex/values";

export const productVariants = defineTable({
  productId: v.id("products"), // The base product this is a variant of
  // Variant-specific properties (override or add to base product)
  name: v.optional(v.string()), // e.g., "Product Name - Red, Large"
  sku: v.optional(v.string()),
  price: v.optional(v.number()),
  regularPrice: v.optional(v.number()),
  availability: v.optional(v.string()),
  // Attributes defining this variant
  attributes: v.array(v.object({ name: v.string(), value: v.string() })), // e.g., [{ name: "Color", value: "Red" }, { name: "Size", value: "Large" }]
  // Could potentially link to a specific image ID from `images`
  imageId: v.optional(v.id("images")),
})
.index("by_product", ["productId"]);
