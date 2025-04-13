import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all images
export const getAllImages = query({
  args: {},
  handler: async (ctx) => {
    const images = await ctx.db.query("images").collect();
    return images;
  },
});

// Get images by entity
export const getImagesByEntity = query({
  args: {
    entityType: v.string(),
    entityId: v.string(),
  },
  handler: async (ctx, args) => {
    const images = await ctx.db
      .query("images")
      .withIndex("by_entity", (q) => 
        q.eq("entityType", args.entityType).eq("entityId", args.entityId)
      )
      .collect();
    return images;
  },
});

// Store an image record
export const storeImage = mutation({
  args: {
    originalName: v.string(),
    originalSize: v.number(),
    processedSize: v.number(),
    originalUrl: v.string(),
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
    contentType: v.string(),
    fileExtension: v.string(),
    entityId: v.optional(v.string()),
    entityType: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const imageId = await ctx.db.insert("images", {
      ...args,
      uploadDate: new Date().toISOString(),
    });
    return imageId;
  },
});

// Link an image to an entity
export const linkImageToEntity = mutation({
  args: {
    imageId: v.id("images"),
    entityId: v.string(),
    entityType: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.imageId, {
      entityId: args.entityId,
      entityType: args.entityType,
    });
    return true;
  },
});

// Delete an image
export const deleteImage = mutation({
  args: {
    imageId: v.id("images"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.imageId);
    return true;
  },
});

// Update image credits
export const updateImageCredits = mutation({
  args: {
    imageId: v.id("images"),
    credit: v.object({
      authorName: v.string(),
      authorUrl: v.optional(v.string()),
      sourceName: v.string(),
      sourceUrl: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.imageId, {
      credit: args.credit,
    });
    return true;
  },
}); 