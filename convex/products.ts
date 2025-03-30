import { query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { Doc, Id } from "./_generated/dataModel";

// Query to list products with minimal details for the listing page
// Fetches basic product info, brand name, first category name, and main image URL
export const listForCards = query({
  args: { paginationOpts: paginationOptsValidator }, // Add pagination
  handler: async (ctx, args) => {
    // 1. Fetch paginated products
    const productsResult = await ctx.db
      .query("products")
      // Define the desired order, e.g., by creation time or name
      // .order("desc") // Example: default order
      .paginate(args.paginationOpts);

    // 2. Fetch related data efficiently for the current page
    const productsWithDetails = await Promise.all(
      productsResult.page.map(async (product) => {
        // Fetch Brand
        const brand = product.brandId ? await ctx.db.get(product.brandId) : null;

        // Fetch First Category Name (if needed for display)
        let categoryName: string | undefined = undefined;
        if (product.categoryIds && product.categoryIds.length > 0) {
          const firstCategoryId = product.categoryIds[0];
          const category = await ctx.db.get(firstCategoryId);
          categoryName = category?.name;
        }

        // Fetch Main Image URL (using the linking table and then the images table)
        let mainImageUrl: string | undefined = product.mainImageUrl; // Use denormalized URL if available
        if (!mainImageUrl) {
          const mainProductImageLink = await ctx.db
            .query("productImages")
            .withIndex("by_product_main", (q) =>
              q.eq("productId", product._id).eq("isMain", true)
            )
            .first();

          if (mainProductImageLink) {
            const imageDoc = await ctx.db.get(mainProductImageLink.imageId);
            mainImageUrl = imageDoc?.originalUrl; // Or a specific size URL from srcset if needed
          }
        }

        return {
          // Select only the fields needed for the list view card
          _id: product._id,
          name: product.name,
          price: product.price,
          currency: product.currency,
          regularPrice: product.regularPrice,
          // Return brand name and first category name
          brandName: brand?.name,
          categoryName: categoryName,
          // Return the main image URL
          imageUrl: mainImageUrl,
          // Include other minimal fields if necessary for cards
          // shortDescription: product.shortDescription,
          // availability: product.availability,
        };
      }),
    );

    // 3. Return paginated result with enriched product data
    return {
      ...productsResult,
      page: productsWithDetails,
    };
  },
});


// --- Helper function to get full image details ---
async function getFullImagesForProduct(ctx: QueryCtx, productId: Id<"products">) {
  const productImageLinks = await ctx.db
    .query("productImages")
    .withIndex("by_product_order", (q: any) => q.eq("productId", productId))
    .order("asc") // Order by displayOrder
    .collect();

  const imageIds = productImageLinks.map((link: Doc<"productImages">) => link.imageId);
  const imageDocs = await Promise.all(imageIds.map((id: Id<"images">) => ctx.db.get(id)));

  // Combine link info (like isMain) with image data
  return productImageLinks.map((link: Doc<"productImages">, index: number) => ({
    ...imageDocs[index], // Spread the image document properties (url, alt, srcset etc.)
    isMain: link.isMain,
    displayOrder: link.displayOrder,
    _id: imageDocs[index]?._id, // Ensure the image ID is present
    imageId: imageDocs[index]?._id, // Redundant but keeps consistency if needed
  })).filter((img: any) => img._id); // Filter out potential nulls if an image wasn't found
}

// Query to get a single product by ID with ALL details for the detail page
export const getByIdWithDetails = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    // 1. Fetch the main product document
    const product = await ctx.db.get(args.id);
    if (!product) {
      return null; // Or throw an error
    }

    // 2. Fetch related data in parallel
    const [
        brand,
        categoryDocs, // Fetch all category documents
        images,
        attributes,
        specs,
        variants
    ] = await Promise.all([
        // Fetch Brand
        product.brandId ? ctx.db.get(product.brandId) : null,
        // Fetch Categories
        Promise.all((product.categoryIds).map((catId: Id<"productCategories">) => ctx.db.get(catId))),
        // Fetch Images using the helper function
        getFullImagesForProduct(ctx, product._id),
        // Fetch Attributes
        ctx.db.query("productAttributes")
            .withIndex("by_product", (q) => q.eq("productId", product._id))
            .collect(),
        // Fetch Specs
        ctx.db.query("productSpecs")
            .withIndex("by_product", (q) => q.eq("productId", product._id))
            .order("asc") // Optional: order by displayOrder if needed
            .collect(),
        // Fetch Variants
        ctx.db.query("productVariants")
            .withIndex("by_product", (q) => q.eq("productId", product._id))
            .collect(),
    ]);

    // Filter out null categories (if any ID was invalid)
    const categories = categoryDocs.filter((cat: any): cat is Doc<"productCategories"> => cat !== null);


    // 3. Combine and return all data
    return {
      ...product, // Spread all base product fields
      brand: brand, // Full brand document
      categories: categories, // Array of full category documents
      images: images, // Array of full image documents with link info
      attributes: attributes, // Array of attribute documents
      specs: specs, // Array of spec documents
      variants: variants, // Array of variant documents
    };
  },
});

// Remove or comment out the old 'get' and 'listWithDetails' if no longer needed
// export const get = query({ ... });
// export const listWithDetails = query({ ... });
// ... existing code ...
// Original 'get' query (can be kept or removed)
// export const get = query({
//   args: {},
//   handler: async (ctx) => {
//     return await ctx.db.query("products").collect();
//   },
// });

// Query to list products with basic details for the listing page
// export const listWithDetails = query({
// ... (old implementation)
// });

// Query to get a single product by ID with all details for the detail page
// export const getByIdWithDetails = query({
// ... (old implementation)
// });
// ... existing code ...