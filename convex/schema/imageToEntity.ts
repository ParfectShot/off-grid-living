import { defineTable } from "convex/server";
import { v } from "convex/values";

export const imageToEntity = defineTable({
  imageId: v.id("images"),
  entityId: v.string(),
  entityType: v.string(), // e.g., "guides", "products", etc.
  isPrimary: v.boolean(), // Whether this is the primary image for the entity
  order: v.optional(v.number()), // Optional ordering for multiple images
})
// Index to quickly find images for an entity
.index("by_entity", ["entityType", "entityId", "imageId"])
// Index to find all entities using an image
.index("by_image", ["imageId"])
// Index to find primary images
.index("by_entity_primary", ["entityType", "entityId", "isPrimary"]); 