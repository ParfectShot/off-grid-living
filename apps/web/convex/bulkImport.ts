import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { guideCategories } from "../src/data/guides";

// Value validation schemas
const guideSectionSchema = v.object({
  id: v.string(),
  title: v.string(),
  order: v.optional(v.number())
});

const guideSchema = v.object({
  title: v.string(),
  description: v.string(),
  slug: v.string(),
  readTime: v.string(),
  level: v.string(),
  category: v.string(), // Add the category field to validation schema
  categorySlug: v.string(),
  lastUpdated: v.optional(v.string()),
  image: v.optional(v.string()),
  featured: v.optional(v.boolean()),
  sections: v.optional(v.array(guideSectionSchema)),
  content: v.optional(v.any()) // Handle the React content field
});

const guideCategorySchema = v.object({
  title: v.string(),
  description: v.string(),
  slug: v.string(),
  icon: v.string(),
  guides: v.array(guideSchema)
});

export const importGuideData = mutation({
  args: {
    categories: v.optional(v.array(guideCategorySchema))
  },
  handler: async (ctx, args) => {
    // Use provided categories or the default ones from src/data/guides.ts
    const categories = args.categories || guideCategories;
    
    // Clean up any existing data (optional - comment out if you want to keep existing data)
    const existingCategories = await ctx.db.query("guideCategories").collect();
    for (const category of existingCategories) {
      await ctx.db.delete(category._id);
    }
    
    const existingGuides = await ctx.db.query("guides").collect();
    for (const guide of existingGuides) {
      await ctx.db.delete(guide._id);
    }
    
    const existingGuideSections = await ctx.db.query("guideSections").collect();
    for (const section of existingGuideSections) {
      await ctx.db.delete(section._id);
    }
    
    const existingGuideToCategory = await ctx.db.query("guideToCategory").collect();
    for (const relation of existingGuideToCategory) {
      await ctx.db.delete(relation._id);
    }
    
    // Maps to store created IDs
    const categoryIdMap = new Map<string, string>();
    const guideIdMap = new Map<string, string>();
    
    // Import categories first
    for (const category of categories) {
      // Store guides before removing them from the category object
      const guides = [...category.guides];
      
      // Create category without guides field
      const { guides: _, ...categoryData } = category;
      const categoryId = await ctx.db.insert("guideCategories", categoryData);
      categoryIdMap.set(category.slug, categoryId);
      
      // Now process guides for this category
      for (const guide of guides) {
        // Store sections before removing them from the guide object
        const sections = guide.sections || [];
        
        // Create guide without sections, category, categorySlug and content fields
        const { 
          sections: __, 
          categorySlug, 
          category: ___, // Exclude the category string field
          content: ____, // Exclude React content
          ...guideData 
        } = guide;
        
        const guideId = await ctx.db.insert("guides", guideData);
        guideIdMap.set(guide.slug, guideId);
        
        // Create guide-to-category relationship
        await ctx.db.insert("guideToCategory", {
          guideId,
          categoryId,
          isPrimary: true // This is the primary category for the guide
        });
        
        // Create sections for this guide
        for (const [index, section] of sections.entries()) {
          await ctx.db.insert("guideSections", {
            guideId,
            sectionId: section.id,
            title: section.title,
            order: section.order !== undefined ? section.order : index
          });
        }
      }
    }
    
    return {
      success: true,
      stats: {
        categories: categories.length,
        guides: Array.from(guideIdMap.keys()).length,
        sections: (await ctx.db.query("guideSections").collect()).length
      }
    };
  }
});

// Mutation for importing individual guides
export const importGuide = mutation({
  args: {
    guide: guideSchema
  },
  handler: async (ctx, args) => {
    const { guide } = args;
    const { 
      sections, 
      categorySlug, 
      category, // Extract but don't use directly  
      content, // Extract React content
      ...guideData 
    } = guide;
    
    // Get the category ID
    const categoryDoc = await ctx.db
      .query("guideCategories")
      .withIndex("by_slug", q => q.eq("slug", categorySlug))
      .first();
    
    if (!categoryDoc) {
      throw new Error(`Category with slug "${categorySlug}" not found`);
    }
    
    // Insert the guide
    const guideId = await ctx.db.insert("guides", guideData);
    
    // Create guide-to-category relationship
    await ctx.db.insert("guideToCategory", {
      guideId,
      categoryId: categoryDoc._id,
      isPrimary: true
    });
    
    // Insert sections if provided
    if (sections && sections.length > 0) {
      for (const [index, section] of sections.entries()) {
        await ctx.db.insert("guideSections", {
          guideId,
          sectionId: section.id,
          title: section.title,
          order: section.order !== undefined ? section.order : index
        });
      }
    }
    
    return { 
      success: true, 
      guideId,
      message: `Guide "${guide.title}" imported successfully with ${sections?.length || 0} sections`
    };
  }
});
