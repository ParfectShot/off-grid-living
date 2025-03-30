// Placeholder for api functions

import { api } from "../../../../convex/_generated/api"; // Corrected path
import { Id } from "../../../../convex/_generated/dataModel"; // Corrected path
import { useQuery, usePaginatedQuery } from "convex/react";

// Hook to fetch the list of products with details using pagination
export function useProductReviewsList(paginationOpts: { numItems: number }) {
    return usePaginatedQuery(
        api.products.listWithDetails,
        {},
        { initialNumItems: paginationOpts.numItems }
    );
}

// Hook to fetch details for a single product by its ID
export function useProductReviewDetails(productId: Id<"products"> | undefined) {
    return useQuery(
        api.products.getByIdWithDetails,
        productId ? { id: productId } : "skip",
    );
}
