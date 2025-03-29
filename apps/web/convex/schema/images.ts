import { defineTable } from "convex/server";
import { v } from "convex/values";

export const images = defineTable({
  originalName: v.string(),
  originalSize: v.number(),
  processedSize: v.number(),
  originalUrl: v.string(),
  entityId: v.optional(v.string()), // Reference to an entity (guide, product, etc.)
  entityType: v.optional(v.string()), // Type of entity this image is linked to
  srcset: v.array(v.object({
    width: v.number(),
    url: v.string(),
  })),
  alt: v.optional(v.string()),
  credit: v.optional(v.object({
    authorName: v.string(),
    authorUrl: v.string(),
    sourceName: v.string(),
    sourceUrl: v.string(),
  })),
  contentType: v.string(), // MIME type
  fileExtension: v.string(),
  uploadDate: v.string(),
}).index("by_entity", ["entityType", "entityId"]); 