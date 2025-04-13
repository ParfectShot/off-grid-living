import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { Doc, Id } from "./_generated/dataModel";

export const getGuideCategories = query({
  handler: async (ctx) => {
    const categories = await ctx.db.query("guideCategories").collect();
    // Sort categories: those with 'order' first, sorted numerically, then those without 'order'
    categories.sort((a, b) => {
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
    return categories;
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

    // Sort sections: those with 'order' first, sorted numerically, then those without 'order'
    sections.sort((a, b) => {
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
      sections: sections, // Already sorted
      categories: categories.filter(Boolean) as NonNullable<typeof categories[number]>[],
      authors: authors.filter(Boolean) as NonNullable<typeof authors[number]>[]
    };
  },
});

export const getFeaturedGuides = query({
  handler: async (ctx) => {
    const guides = await ctx.db
      .query("guides")
      .withIndex("featured", q => q.eq("featured", true))
      .collect();

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

// New query for listing guides with pagination for management view
export const listGuidesForManagement = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const guidesResult = await ctx.db
      .query("guides")
      // Consider a default sort order, e.g., by title or lastUpdated
      .order("asc") // Example: sort by creation time or add specific index like title
      .paginate(args.paginationOpts);

    // Fetch minimal details needed for the management list
    const guidesWithMinimalDetails = guidesResult.page.map(guide => ({
      _id: guide._id,
      title: guide.title,
      slug: guide.slug,
      featured: guide.featured,
      lastUpdated: guide.lastUpdated,
      // Add other fields if necessary for the list view
    }));

    return {
      ...guidesResult,
      page: guidesWithMinimalDetails,
    };
  },
});

// --- NEW MUTATION --- 
export const updateGuideWithDetails = mutation({
  args: {
    guideId: v.id("guides"),
    // Guide fields to update (make optional with v.optional)
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    level: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    image: v.optional(v.string()),
    imageCreditAuthorName: v.optional(v.string()),
    imageCreditAuthorUrl: v.optional(v.string()),
    imageCreditSourceName: v.optional(v.string()),
    imageCreditSourceUrl: v.optional(v.string()),
    readTime: v.optional(v.string()),
    order: v.optional(v.number()),
    // Related data updates
    categoryIds: v.optional(v.array(v.id("guideCategories"))),
    primaryCategoryId: v.optional(v.union(v.id("guideCategories"), v.null())),
    sections: v.optional(v.array(v.object({
      _id: v.optional(v.id("guideSections")),
      sectionId: v.string(),
      title: v.string(),
      order: v.number(),
    }))),
    // Add author updates if needed
  },
  handler: async (ctx, args) => {
    const { guideId, categoryIds, primaryCategoryId, sections, ...guideUpdates } = args;

    // 1. Update the Guide document itself
    // Prepare imageCredit object if relevant fields are provided
    const imageCredit = (
      args.imageCreditAuthorName || args.imageCreditAuthorUrl || 
      args.imageCreditSourceName || args.imageCreditSourceUrl
    ) ? {
        authorName: args.imageCreditAuthorName ?? '',
        authorUrl: args.imageCreditAuthorUrl ?? '',
        sourceName: args.imageCreditSourceName ?? '',
        sourceUrl: args.imageCreditSourceUrl ?? '',
      } : undefined; // Set to undefined if no credit info provided

    // Construct the update payload, including new fields
    const guidePayload: Partial<Doc<"guides">> = {};
    if (guideUpdates.title !== undefined) guidePayload.title = guideUpdates.title;
    if (guideUpdates.slug !== undefined) guidePayload.slug = guideUpdates.slug;
    if (guideUpdates.description !== undefined) guidePayload.description = guideUpdates.description;
    if (guideUpdates.level !== undefined) guidePayload.level = guideUpdates.level;
    if (guideUpdates.featured !== undefined) guidePayload.featured = guideUpdates.featured;
    if (guideUpdates.image !== undefined) guidePayload.image = guideUpdates.image;
    if (guideUpdates.readTime !== undefined) guidePayload.readTime = guideUpdates.readTime;
    if (guideUpdates.order !== undefined) guidePayload.order = guideUpdates.order;
    if (imageCredit !== undefined) guidePayload.imageCredit = imageCredit;
    guidePayload.lastUpdated = new Date().toISOString();
    
    if (Object.keys(guidePayload).length > 1) {
       await ctx.db.patch(guideId, guidePayload);
    }

    // 2. Update Categories (guideToCategory links)
    if (categoryIds !== undefined) {
        // Find existing relationships for this guide
        const existingRelations = await ctx.db
            .query("guideToCategory")
            .withIndex("by_guideId", q => q.eq("guideId", guideId))
            .collect();

        const existingCategoryIds = new Set(existingRelations.map(r => r.categoryId));
        const newCategoryIds = new Set(categoryIds);

        // Delete relations for categories that are no longer selected
        for (const relation of existingRelations) {
            if (!newCategoryIds.has(relation.categoryId)) {
                await ctx.db.delete(relation._id);
            }
        }

        // Add relations for newly selected categories and update existing ones
        for (const catId of newCategoryIds) {
            const isPrimary = catId === primaryCategoryId;
            const existingRelation = existingRelations.find(r => r.categoryId === catId);
            
            if (existingRelation) {
                // Update existing relation if primary status changed
                if (existingRelation.isPrimary !== isPrimary) {
                    await ctx.db.patch(existingRelation._id, { isPrimary });
                }
            } else {
                // Insert new relation
                await ctx.db.insert("guideToCategory", { 
                    guideId: guideId,
                    categoryId: catId,
                    isPrimary: isPrimary ?? false
                 });
            }
        }
    }
    
    // 3. Update Sections (guideSections)
    if (sections !== undefined) {
        // Get existing sections for the guide
        const existingSections = await ctx.db
            .query("guideSections")
            .withIndex("by_guideId", q => q.eq("guideId", guideId))
            .collect();
        const existingSectionIds = new Set(existingSections.map(s => s._id));
        const incomingSectionIds = new Set(sections.filter(s => s._id).map(s => s._id as Id<"guideSections">));

        // Delete sections that are no longer present
        for (const existingSection of existingSections) {
            if (!incomingSectionIds.has(existingSection._id)) {
                await ctx.db.delete(existingSection._id);
            }
        }

        // Update existing sections and insert new ones
        for (const sectionData of sections) {
             const { _id, ...sectionUpdates } = sectionData;
             if (_id) {
                 // Update existing section
                if (existingSectionIds.has(_id)) {
                     await ctx.db.patch(_id, { 
                       guideId: guideId,
                       sectionId: sectionUpdates.sectionId,
                       title: sectionUpdates.title,
                       order: sectionUpdates.order
                     });
                 } // else: ID provided but doesn't exist/belong to this guide - skip or throw error?
             } else {
                 // Insert new section
                 await ctx.db.insert("guideSections", { 
                     guideId: guideId,
                     sectionId: sectionUpdates.sectionId,
                     title: sectionUpdates.title,
                     order: sectionUpdates.order
                 });
             }
        }
    }

    // 4. Add Author updates if necessary, similar logic to categories/sections

    return { success: true }; // Indicate success
  }
});

// --- NEW MUTATION FOR CREATION ---
export const createGuideWithDetails = mutation({
  args: {
    // Guide fields (most are required for creation)
    title: v.string(),
    slug: v.string(), // Consider adding uniqueness check if needed later
    description: v.string(),
    level: v.string(),
    featured: v.optional(v.boolean()),
    image: v.optional(v.string()),
    imageCreditAuthorName: v.optional(v.string()),
    imageCreditAuthorUrl: v.optional(v.string()),
    imageCreditSourceName: v.optional(v.string()),
    imageCreditSourceUrl: v.optional(v.string()),
    readTime: v.string(),
    order: v.optional(v.number()),
    isPublished: v.optional(v.boolean()),
    // Related data (required for linking)
    categoryIds: v.array(v.id("guideCategories")),
    primaryCategoryId: v.optional(v.union(v.id("guideCategories"), v.null())),
    sections: v.array(v.object({
      // No _id needed for creation
      sectionId: v.string(), // Unique ID within the guide (e.g., slug-like)
      title: v.string(),
      order: v.number(),
    })),
    // Add author data if needed (e.g., authorIds, primaryAuthorId)
  },
  handler: async (ctx, args) => {
    const { categoryIds, primaryCategoryId, sections, ...guideData } = args;

    // 1. Prepare imageCredit object
     const imageCredit = (
      args.imageCreditAuthorName || args.imageCreditAuthorUrl || 
      args.imageCreditSourceName || args.imageCreditSourceUrl
    ) ? {
        authorName: args.imageCreditAuthorName ?? '',
        authorUrl: args.imageCreditAuthorUrl ?? '',
        sourceName: args.imageCreditSourceName ?? '',
        sourceUrl: args.imageCreditSourceUrl ?? '',
      } : undefined;

    // 2. Insert the Guide document
    const guidePayload: Omit<Doc<"guides">, "_id" | "_creationTime"> = {
        title: guideData.title,
        slug: guideData.slug,
        description: guideData.description,
        level: guideData.level,
        featured: guideData.featured ?? false,
        lastUpdated: new Date().toISOString(),
        readTime: guideData.readTime,
        isPublished: guideData.isPublished ?? false,
        // Optional fields
        ...(guideData.image && { image: guideData.image }),
        ...(guideData.order && { order: guideData.order }),
        ...(imageCredit && { imageCredit: imageCredit }),
    };
    const guideId = await ctx.db.insert("guides", guidePayload);

    // 3. Insert Category Relationships (guideToCategory links)
    for (const catId of categoryIds) {
      // Clearer check for primary category
      const isCurrentCategoryPrimary = primaryCategoryId !== null && primaryCategoryId !== undefined && catId === primaryCategoryId;
      await ctx.db.insert("guideToCategory", {
        guideId: guideId,
        categoryId: catId,
        isPrimary: isCurrentCategoryPrimary, // Use the clearer boolean
      });
    }

    // 4. Insert Sections (guideSections)
    for (const sectionData of sections) {
      await ctx.db.insert("guideSections", {
        guideId: guideId,
        sectionId: sectionData.sectionId,
        title: sectionData.title,
        order: sectionData.order,
        // content: sectionData.content, // Ensure this remains removed/commented
      });
    }

    // 5. Insert Author relationships if necessary

    return { success: true, guideId: guideId }; // Return new guide ID
  },
});

// --- NEW MUTATION FOR CATEGORY CREATION ---
export const createGuideCategory = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    order: v.optional(v.number()),
    icon: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if category with this slug already exists
    const existing = await ctx.db
      .query("guideCategories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      console.log(`Category with slug "${args.slug}" already exists.`);
      return { success: false, categoryId: existing._id, message: "Category already exists" };
    }

    // Prepare payload for insertion
    const payload: Partial<Doc<"guideCategories">> = {
      title: args.title,
      slug: args.slug,
      icon: args.icon,
      // Only include description and order if they are provided
      description: args.description,
      ...(args.order !== undefined && { order: args.order }),
    };

    // Insert new category
    const categoryId = await ctx.db.insert("guideCategories", payload as any); // Use 'as any' cautiously or refine payload type

    return { success: true, categoryId: categoryId };
  },
});

// --- NEW MUTATION FOR DELETION ---
export const deleteGuide = mutation({
  args: { guideId: v.id("guides") },
  handler: async (ctx, args) => {
    // 1. Delete all guide-to-category relationships
    const guideToCategories = await ctx.db
      .query("guideToCategory")
      .withIndex("by_guideId", q => q.eq("guideId", args.guideId))
      .collect();
    
    for (const relation of guideToCategories) {
      await ctx.db.delete(relation._id);
    }

    // 2. Delete all guide sections
    const guideSections = await ctx.db
      .query("guideSections")
      .withIndex("by_guideId", q => q.eq("guideId", args.guideId))
      .collect();
    
    for (const section of guideSections) {
      await ctx.db.delete(section._id);
    }

    // 3. Delete all guide-to-author relationships if they exist
    const guideToAuthors = await ctx.db
      .query("guideToAuthor")
      .withIndex("by_guideId", q => q.eq("guideId", args.guideId))
      .collect();
    
    for (const relation of guideToAuthors) {
      await ctx.db.delete(relation._id);
    }

    // 4. Delete all image relationships
    const imageLinks = await ctx.db
      .query("imageToEntity")
      .withIndex("by_entity", q => 
        q.eq("entityType", "guides").eq("entityId", args.guideId)
      )
      .collect();
    
    for (const link of imageLinks) {
      await ctx.db.delete(link._id);
    }

    // 5. Finally delete the guide itself
    await ctx.db.delete(args.guideId);

    return { success: true };
  },
});
