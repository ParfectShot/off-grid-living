import { query } from "./_generated/server";
import { v } from "convex/values";

export const getGuideCategories = query({
  handler: async (ctx) => {
    return await ctx.db.query("guideCategories").collect();
  },
});

export const getGuidesByCategory = query({
  args: { categoryId: v.id("guideCategories") },
  handler: async (ctx, args) => {
    // Get all guide IDs related to this category
    const guideToCategoryRows = await ctx.db
      .query("guideToCategory")
      .withIndex("by_categoryId", q => q.eq("categoryId", args.categoryId))
      .collect();
    
    // Then fetch the full guide details for each
    const guideIds = guideToCategoryRows.map(row => row.guideId);
    
    if (guideIds.length === 0) return [];
    
    const guidesData = await Promise.all(
      guideIds.map(async guideId => {
        const guide = await ctx.db.get(guideId);
        return guide;
      })
    );
    
    const guides = guidesData.filter(Boolean) as NonNullable<typeof guidesData[number]>[]; // Filter out any null values

    // Sort guides: those with 'order' first, sorted numerically, then those without 'order'
    guides.sort((a, b) => {
      const orderA = a.order;
      const orderB = b.order;
      
      if (orderA !== undefined && orderB !== undefined) {
        return orderA - orderB; // Both defined, sort numerically
      } else if (orderA !== undefined) {
        return -1; // Only A is defined, A comes first
      } else if (orderB !== undefined) {
        return 1; // Only B is defined, B comes first
      } else {
        return 0; // Neither is defined, keep original relative order
      }
    });

    return guides;
  },
});

export const getGuideByCategorySlug = query({
  args: { categorySlug: v.string() },
  handler: async (ctx, args) => {
    // First find the category by slug
    const category = await ctx.db
      .query("guideCategories")
      .withIndex("by_slug", q => q.eq("slug", args.categorySlug))
      .first();
    
    if (!category) return [];
    
    // Then find all guide-to-category relations for this category
    const guideToCategoryRows = await ctx.db
      .query("guideToCategory")
      .withIndex("by_categoryId", q => q.eq("categoryId", category._id))
      .collect();
    
    // Then fetch the full guide details for each
    const guidesData = await Promise.all(
      guideToCategoryRows.map(async row => {
        const guide = await ctx.db.get(row.guideId);
        return guide;
      })
    );

    const guides = guidesData.filter(Boolean) as NonNullable<typeof guidesData[number]>[]; // Filter out any null values

    // Sort guides: those with 'order' first, sorted numerically, then those without 'order'
    guides.sort((a, b) => {
      const orderA = a.order;
      const orderB = b.order;
      
      if (orderA !== undefined && orderB !== undefined) {
        return orderA - orderB; // Both defined, sort numerically
      } else if (orderA !== undefined) {
        return -1; // Only A is defined, A comes first
      } else if (orderB !== undefined) {
        return 1; // Only B is defined, B comes first
      } else {
        return 0; // Neither is defined, keep original relative order
      }
    });
    
    return guides;
  },
});

export const getGuideBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const guide = await ctx.db
      .query("guides")
      .withIndex("by_slug", q => q.eq("slug", args.slug))
      .first();
    
    if (!guide) return null;
    
    // Get guide sections
    const sections = await ctx.db
      .query("guideSections")
      .withIndex("by_guideId", q => q.eq("guideId", guide._id))
      .collect();
    
    // Get guide categories
    const guideToCategories = await ctx.db
      .query("guideToCategory")
      .withIndex("by_guideId", q => q.eq("guideId", guide._id))
      .collect();
    
    const categories = await Promise.all(
      guideToCategories.map(async relation => {
        const category = await ctx.db.get(relation.categoryId);
        return category ? {
          ...category,
          isPrimary: relation.isPrimary
        } : null;
      })
    );
    
    // Get guide authors if any
    const guideToAuthors = await ctx.db
      .query("guideToAuthor")
      .withIndex("by_guideId", q => q.eq("guideId", guide._id))
      .collect();
    
    const authors = await Promise.all(
      guideToAuthors.map(async relation => {
        const author = await ctx.db.get(relation.authorId);
        return author ? {
          ...author,
          isPrimary: relation.isPrimary
        } : null;
      })
    );
    
    return { 
      ...guide, 
      sections: sections.sort((a, b) => a.order - b.order),
      categories: categories.filter(Boolean) as NonNullable<typeof categories[number]>[],
      authors: authors.filter(Boolean) as NonNullable<typeof authors[number]>[]
    };
  },
});

export const getFeaturedGuides = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("guides")
      .withIndex("featured", q => q.eq("featured", true))
      .collect();
  },
});

// Get all guides (useful for search or complete listing)
export const getAllGuides = query({
  handler: async (ctx) => {
    return await ctx.db.query("guides").collect();
  },
});

// New function to get a single category by slug
export const getGuideCategoryBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("guideCategories")
      .withIndex("by_slug", q => q.eq("slug", args.slug))
      .first();
  },
});
