import { defineTable } from "convex/server";
import { v } from "convex/values";

// Defines a link between a product and an image in the `images` table
export const productImages = defineTable({
  productId: v.id("products"),
  imageId: v.id("images"),
  isMain: v.optional(v.boolean()), // Flag for the primary product image
  displayOrder: v.optional(v.number()), // Control display order in galleries
})
// Index for efficiently querying images by product
.index("by_product_image", ["productId", "imageId"])
// Index for finding the main image or ordering images for a product
.index("by_product_order", ["productId", "displayOrder"]) 
// Index for quickly finding the main image
.index("by_product_main", ["productId", "isMain"]);