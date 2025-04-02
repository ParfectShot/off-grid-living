import React from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Grid3X3, List } from "lucide-react";
import { api } from "~/convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Skeleton } from "~/components/ui/skeleton";
import { ProductCard, ProductCardPropsData } from "~/features/product-reviews/components/ProductCard";
import { FiltersSidebar } from "~/features/product-reviews/components/FiltersSidebar";

// TODO: Add loaders for data fetching (e.g., prefetch reviews)
// import { queryOptions } from '@tanstack/react-query';
// import { fetchProductReviews } from '~/features/product-reviews/api'; 

// export const productReviewsQueryOptions = queryOptions({
//   queryKey: ['productReviews', 'list'], 
//   queryFn: () => fetchProductReviews(), // Replace with your actual fetch function
// })

export const Route = createFileRoute('/_pathlessLayout/product-reviews/')({
  // TODO: Add loader for pre-fetching data if needed
  // loader: ({ context: { queryClient } }) => 
  //   queryClient.ensureQueryData(productReviewsQueryOptions),
  component: ProductReviewsIndexPage,
  head: () => {
    return {
      meta: [
        {
          name: 'robots',
          content: 'noindex',
        },
      ],
    }
  },
  loader: async (opts) => {
    const products = await opts.context.queryClient.ensureQueryData(convexQuery(api.products.listForCards, { paginationOpts: { numItems: 9, cursor: null } }));
    return products;
  },
  beforeLoad: async ({location}) => {
    if (process.env.NODE_ENV !== "development") {
      throw redirect({
        to: '/guides',
        search: {
          redirect: location.href,
        },
      })
    }
  }
  // TODO: Add pending/error components
  // pendingComponent: () => <div>Loading reviews...</div>,
  // errorComponent: ({ error }) => <div>Error loading reviews: {error.message}</div>,
});

// Main Page Component
function ProductReviewsIndexPage() {
  // TODO: Implement state for filters, sorting, and pagination cursor
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const paginationOptions = React.useMemo(() => ({ numItems: 9, cursor: null }), []); // Example

  // Fetch data using useSuspenseQuery
  const { data: productsQueryResult, isLoading, isError } = useSuspenseQuery(
    convexQuery(api.products.listForCards, { paginationOpts: paginationOptions })
  );

  // Data derived from query result
  const products: ProductCardPropsData[] = (productsQueryResult?.page as ProductCardPropsData[]) ?? [];
  const currencyCode = products.length > 0 ? products[0].currency : 'INR';
  const currencySymbol = products.length > 0 ? (products[0].currency === 'INR' ? '₹' : products[0].currency) : '₹';

  // TODO: Add proper error handling UI
  if (isError) {
    return <div className="container mx-auto px-4 md:px-6 py-8">Error loading products.</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Product Reviews</h1>
        <p className="text-muted-foreground mt-1">
          In-depth reviews of off-grid and solar products.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        {/* Filters Sidebar */}
        <FiltersSidebar currencyCode={currencyCode} currencySymbol={currencySymbol} />

        {/* Main Content Area */}
        <main>
          {/* Header Row: Count, Sort, View Toggle */}
          <div className="flex items-center justify-between mb-6">
            {isLoading ? (
              <Skeleton className="h-5 w-24" />
            ) : (
              <p className="text-sm text-muted-foreground">Showing {products.length} results</p> // TODO: Show total count when pagination is implemented
            )}
            <div className="flex items-center gap-2">
              {/* TODO: Implement sorting */}
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  {/* <SelectItem value="rating-desc">Rating: High to Low</SelectItem> */}
                  {/* <SelectItem value="newest">Newest</SelectItem> */}
                </SelectContent>
              </Select>
              <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("grid")}>
                <Grid3X3 className="h-4 w-4" />
                <span className="sr-only">Grid View</span>
              </Button>
              <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("list")}>
                <List className="h-4 w-4" />
                <span className="sr-only">List View</span>
              </Button>
            </div>
          </div>

          {/* Product Grid/List */}
          {isLoading ? (
            // Loading Skeleton
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {Array.from({ length: paginationOptions.numItems }).map((_, index) => (
                <Skeleton key={index} className={`h-80 ${viewMode === 'list' ? 'h-40' : ''}`} />
              ))}
            </div>
          ) : products.length > 0 ? (
            // Render Products
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            // No products found
            <div className="text-center py-12 text-muted-foreground">
              No products found matching your criteria.
            </div>
          )}

          {/* TODO: Add Pagination Controls */}
          {/* Needs state for cursor and logic to load more */}
        </main>
      </div>
    </div>
  );
}
