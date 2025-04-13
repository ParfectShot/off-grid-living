import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Get all entities linked to an image
export const getEntitiesByImage = query({
  args: { imageId: v.id("images") },
  handler: async (ctx, args) => {
    const links = await ctx.db
      .query("imageToEntity")
      .withIndex("by_image", (q) => q.eq("imageId", args.imageId))
      .collect();
    return links;
  },
});

// Get all images linked to an entity
export const getImagesByEntity = query({
  args: {
    entityType: v.string(),
    entityId: v.string(),
  },
  handler: async (ctx, args) => {
    const links = await ctx.db
      .query("imageToEntity")
      .withIndex("by_entity", (q) =>
        q.eq("entityType", args.entityType).eq("entityId", args.entityId)
      )
      .collect();

    // Fetch the actual images
    const images = await Promise.all(
      links.map(async (link) => {
        const image = await ctx.db.get(link.imageId);
        return {
          ...image,
          linkId: link._id,
          isPrimary: link.isPrimary,
          order: link.order,
        };
      })
    );

    return images;
  },
});

// Get the primary image for an entity
export const getPrimaryImageForEntity = query({
  args: {
    entityType: v.string(),
    entityId: v.string(),
  },
  handler: async (ctx, args) => {
    const link = await ctx.db
      .query("imageToEntity")
      .withIndex("by_entity_primary", (q) =>
        q
          .eq("entityType", args.entityType)
          .eq("entityId", args.entityId)
          .eq("isPrimary", true)
      )
      .first();

    if (!link) return null;

    const image = await ctx.db.get(link.imageId);
    return image ? { ...image, linkId: link._id, isPrimary: true } : null;
  },
});

// Link an image to an entity
export const linkImageToEntity = mutation({
  args: {
    imageId: v.id("images"),
    entityId: v.string(),
    entityType: v.string(),
    isPrimary: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Check if this link already exists
    const existingLink = await ctx.db
      .query("imageToEntity")
      .withIndex("by_entity", (q) =>
        q
          .eq("entityType", args.entityType)
          .eq("entityId", args.entityId)
          .eq("imageId", args.imageId)
      )
      .first();

    if (existingLink) {
      return existingLink._id;
    }

    // If this is marked as primary, unset any existing primary image
    if (args.isPrimary) {
      const existingPrimary = await ctx.db
        .query("imageToEntity")
        .withIndex("by_entity_primary", (q) =>
          q
            .eq("entityType", args.entityType)
            .eq("entityId", args.entityId)
            .eq("isPrimary", true)
        )
        .first();

      if (existingPrimary) {
        await ctx.db.patch(existingPrimary._id, { isPrimary: false });
      }
    }

    // Create the new link
    const linkId = await ctx.db.insert("imageToEntity", {
      imageId: args.imageId,
      entityId: args.entityId,
      entityType: args.entityType,
      isPrimary: args.isPrimary ?? false,
      order: args.order,
    });

    return linkId;
  },
});

// Update image link properties
export const updateImageLink = mutation({
  args: {
    linkId: v.id("imageToEntity"),
    isPrimary: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const link = await ctx.db.get(args.linkId);
    if (!link) throw new Error("Image link not found");

    // If setting as primary, unset existing primary
    if (args.isPrimary) {
      const existingPrimary = await ctx.db
        .query("imageToEntity")
        .withIndex("by_entity_primary", (q) =>
          q
            .eq("entityType", link.entityType)
            .eq("entityId", link.entityId)
            .eq("isPrimary", true)
        )
        .first();

      if (existingPrimary && existingPrimary._id !== args.linkId) {
        await ctx.db.patch(existingPrimary._id, { isPrimary: false });
      }
    }

    await ctx.db.patch(args.linkId, {
      ...(args.isPrimary !== undefined && { isPrimary: args.isPrimary }),
      ...(args.order !== undefined && { order: args.order }),
    });

    return true;
  },
});

// Remove a link between an image and an entity
export const unlinkImageFromEntity = mutation({
  args: {
    linkId: v.id("imageToEntity"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.linkId);
    return true;
  },
}); 