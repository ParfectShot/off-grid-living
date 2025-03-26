import { defineTable } from "convex/server";
import { v } from "convex/values";

export const productVariants = defineTable({
  attributes: v.object({
    color: v.optional(v.string()),
    size: v.optional(v.string()),
  }),
  product: v.id("products"),
  sku: v.string(),
});
