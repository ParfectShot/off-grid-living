import { defineTable } from "convex/server";
import { v } from "convex/values";

export const products = defineTable({
  availability: v.string(),
  brandName: v.id("brands"),
  categoryName: v.id("categories"),
  createdAt: v.string(),
  currency: v.string(),
  description: v.string(),
  name: v.string(),
  price: v.float64(),
  regularPrice: v.float64(),
  shortDescription: v.string(),
  sku: v.string(),
  updatedAt: v.string(),
  url: v.string(),
  warranty: v.optional(v.string()),
  weight: v.float64(),
  weightUnit: v.string(),
});
