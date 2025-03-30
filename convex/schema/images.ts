import { defineTable } from "convex/server";
import { v } from "convex/values";

export const images = defineTable({
  // Basic info
  originalName: v.string(),
  originalSize: v.number(), // Size in bytes
  contentType: v.string(), // e.g., 'image/jpeg'
  fileExtension: v.string(), // e.g., 'jpg'
  uploadDate: v.string(), // ISO 8601 timestamp

  // Processed info
  processedSize: v.number(), // Size after compression/resizing
  originalUrl: v.string(), // URL to the originally uploaded image (e.g., in S3)
  srcset: v.optional(v.array(v.object({ // Optional: For responsive images
    width: v.number(),
    url: v.string(),
  }))),

  // Metadata
  alt: v.optional(v.string()), // Alt text for accessibility
  credit: v.optional(v.object({ // Optional: Image source credits
    authorName: v.string(),
    authorUrl: v.optional(v.string()),
    sourceName: v.string(),
    sourceUrl: v.optional(v.string()),
  })),

  // Entity linking (Optional but useful for generic image table)
  // These are optional because an image might be uploaded before being linked,
  // or might be used in multiple places (though linking table is often better for many-to-many)
  entityId: v.optional(v.string()), // The ID of the entity this image is related to (e.g., productId)
  entityType: v.optional(v.string()), // The type of the entity (e.g., "products", "blogPosts")

})
// Index to quickly find images linked to a specific entity
.index("by_entity", ["entityType", "entityId"]); 