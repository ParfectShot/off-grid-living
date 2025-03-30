import React from "react"
import { Link } from "@tanstack/react-router"
import { Search, Grid3X3, List } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Slider } from "~/components/ui/slider"
import { Checkbox } from "~/components/ui/checkbox"
import { Separator } from "~/components/ui/separator"
import { api } from "~/convex/_generated/api"
import { convexQuery } from "@convex-dev/react-query"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Skeleton } from "~/components/ui/skeleton"

const ProductCard = ({ product, viewMode }: { 
  product: any, // Use 'any' temporarily, or let TS infer inside the map
  viewMode: "grid" | "list" 
}) => {
  // Determine image dimensions based on view mode
  const imageWidth = viewMode === 'list' ? 150 : 300;
  const imageHeight = viewMode === 'list' ? 150 : 200; // Adjusted height for grid

  return (
    <Card key={product._id} className={`${viewMode === 'list' ? 'flex flex-row items-start' : 'flex flex-col h-full'}`}>
      <div className={`${viewMode === 'list' ? 'w-1/3 flex-shrink-0' : ''} relative`}>
        <Link to="/product-reviews/$reviewId" params={{ reviewId: product._id }} className="block">
          {product.imageUrl ? (
            <img
              src={product.imageUrl} // Use the imageUrl from the query
              alt={product.name}
              width={imageWidth}
              height={imageHeight}
              className={`object-cover ${viewMode === 'list' ? 'rounded-l-lg h-full max-h-[150px]' : `w-full h-[${imageHeight}px] rounded-t-lg`}`}
              loading="lazy" // Add lazy loading
            />
          ) : (
            // Placeholder if no image URL is available
            <Skeleton className={`bg-muted ${viewMode === 'list' ? `h-[150px] w-[${imageWidth}px] rounded-l-lg` : `h-[${imageHeight}px] w-full rounded-t-lg`}`} />
          )}
        </Link>
        {/* Add badges if needed later - e.g., featured, subsidy */} 
      </div>

      <div className={`${viewMode === 'list' ? 'w-2/3' : 'flex-grow'} p-4 flex flex-col`}>
        <CardHeader className="p-0 mb-2">
          {/* Display Brand Name if available */}
          {product.brandName && (
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{product.brandName}</p>
          )}
          <CardTitle className={`text-lg font-semibold ${viewMode === 'grid' ? 'line-clamp-2 h-[3.2em] leading-tight' : ''}`}> {/* Adjust line clamping */} 
            <Link to="/product-reviews/$reviewId" params={{ reviewId: product._id }} className="hover:underline">
              {product.name}
            </Link>
          </CardTitle>
           {/* TODO: Add Rating display when review data is available */} 
           {/* <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
             <Star className="h-4 w-4 fill-primary text-primary" />
              <span>{product.rating.toFixed(1)}</span> 
              <span>({product.reviewCount} reviews)</span> 
           </div> */} 
        </CardHeader>
        <CardContent className="p-0 flex-grow">
           {/* TODO: Add Short Description if available and needed */} 
           {/* {viewMode === 'list' && product.shortDescription && (
                <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                    {product.shortDescription}
                </p>
           )} */} 
          <div className="flex items-baseline gap-2 mb-2">
            {/* Use price and currency from the query */} 
            {/* Need to check if product.price exists before calling toLocaleString */} 
            <span className="text-xl font-bold text-primary">{product.currency ?? ''}{(product.price ?? 0).toLocaleString("en-IN")}</span>
            {/* Use regularPrice from the query */} 
            {product.regularPrice != null && (
              <span className="text-sm text-muted-foreground line-through">{product.currency ?? ''}{(product.regularPrice ?? 0).toLocaleString("en-IN")}</span>
            )}
          </div>
          {/* TODO: Add Tags/Badges if needed */} 
          {/* <div className="flex flex-wrap gap-1 mb-2">
             {product.tags?.slice(0, 3).map(tag => (
               <Badge key={tag} variant="secondary">{tag}</Badge>
             ))} 
           </div> */} 

          {/* TODO: Add Mini Scores when review data is available */} 
          {/* <div className="flex gap-4 text-xs text-muted-foreground border-t pt-2 mt-2">
              <div className="flex items-center gap-1"><Award className="h-3 w-3"/> {product.performanceScore}/100 Perf.</div>
              <div className="flex items-center gap-1"><ThumbsUp className="h-3 w-3"/> {product.valueScore}/100 Value</div>
              <div className="flex items-center gap-1"><Star className="h-3 w-3"/> {product.qualityScore}/100 Quality</div>
           </div> */} 
        </CardContent>
         {/* Ensure Footer is at the bottom in grid view */} 
        <CardFooter className="p-0 mt-4 pt-4 border-t">
          <Link to="/product-reviews/$reviewId" params={{ reviewId: product._id }} className="w-full">
            <Button size="sm" className="w-full">
              Read Full Review
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
};

export function ProductReviewsListPage() {
  // TODO: Implement state for filters, sorting, and pagination cursor
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const paginationOptions = React.useMemo(() => ({ numItems: 9, cursor: null }), []); // Example: 9 items per page

  // Use the correct query: listForCards
  const { data: productsQueryResult, isLoading, isError } = useSuspenseQuery(
    convexQuery(api.products.listForCards, { paginationOpts: paginationOptions })
  );

  // Let TypeScript infer the type of products. Add null check for productsQueryResult
  const products = productsQueryResult?.page ?? []; 

  // TODO: Add error handling UI
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
        {/* Filters Section (Keep existing filters, logic needs implementation) */}
        <aside className="border-r pr-6 space-y-6">
          <h2 className="text-lg font-semibold">Filters</h2>
          {/* Search */}
          <div className="space-y-2">
            <label htmlFor="search" className="text-sm font-medium">
              Search Reviews
            </label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="search" placeholder="Search..." className="pl-8" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {/* TODO: Populate categories dynamically */} 
                <SelectItem value="solar-panels">Solar Panels</SelectItem>
                <SelectItem value="inverters">Inverters</SelectItem>
                <SelectItem value="batteries">Batteries</SelectItem>
              </SelectContent>
            </Select>
          </div>

           {/* Rating Filter */} 
           {/* <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <div className="flex flex-col space-y-1">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <div className="flex items-center">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                    {[...Array(5 - rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-muted stroke-muted-foreground" />
                    ))}
                     <span className="text-sm ml-1"> & Up</span>
                  </div>
                </label>
              ))}
            </div>
          </div> */}

           {/* Price Range Filter */} 
           <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Price Range ({(products && products.length > 0 && products[0]) ? products[0].currency : 'INR'}) {/* Dynamically show currency */}
            </label>
            <Slider
              id="price"
              min={0}
              max={500000} // Adjust max price as needed
              step={1000}
              defaultValue={[0, 500000]}
              className="py-2"
            />
             <div className="flex justify-between text-sm text-muted-foreground">
              <span>{(products && products.length > 0 && products[0]) ? products[0].currency : '₹'}0</span>
              <span>{(products && products.length > 0 && products[0]) ? products[0].currency : '₹'}500,000+</span>
            </div>
          </div>

           {/* Brand Filter */} 
           <div className="space-y-2">
            <label className="text-sm font-medium">Brand</label>
            <div className="flex flex-col space-y-1 max-h-40 overflow-y-auto">
              {/* TODO: Populate brands dynamically */} 
              {["WAAREE", "Luminous", "Tata Power", "Exide", "Havells"].map((brand) => (
                <label key={brand} className="flex items-center space-x-2">
                  <Checkbox id={`brand-${brand}`} />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>
           <Separator />
           <Button className="w-full">Apply Filters</Button>
           <Button variant="outline" className="w-full">Clear Filters</Button>
        </aside>

        {/* Product List Section */} 
        <main>
          <div className="flex items-center justify-between mb-6">
             {/* Display loading state or results count */} 
             {isLoading ? (
               <Skeleton className="h-5 w-24" />
             ) : (
               <p className="text-sm text-muted-foreground">Showing {products.length} results</p>
             )}
             {/* ...(keep sorting and view mode controls) */} 
            <div className="flex items-center gap-2">
              <Select defaultValue="featured">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                     {/* TODO: Implement sorting options based on available data */} 
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    {/* <SelectItem value="rating-desc">Rating: High to Low</SelectItem> */} 
                    {/* <SelectItem value="newest">Newest</SelectItem> */} 
                  </SelectContent>
              </Select>
              <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("grid")}> <Grid3X3 className="h-4 w-4" /> <span className="sr-only">Grid View</span> </Button>
              <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("list")}> <List className="h-4 w-4" /> <span className="sr-only">List View</span> </Button>
            </div>
          </div>

           {/* Product Grid/List */} 
           {isLoading ? (
             // Loading Skeleton UI
             <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
               {Array.from({ length: paginationOptions.numItems }).map((_, index) => (
                 <Skeleton key={index} className={`h-80 ${viewMode === 'list' ? 'h-40' : ''}`} /> // Adjust skeleton height
               ))}
             </div>
           ) : products && products.length > 0 ? (
             // Render actual products
             <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
               {products.map((product) => (
                 <ProductCard key={product._id} product={product} viewMode={viewMode} />
               ))}
             </div>
           ) : (
             // No products found message
             <div className="text-center py-12 text-muted-foreground">
               No products found matching your criteria.
             </div>
           )}

          {/* TODO: Add Pagination Controls */} 
          {/* Need to use productsQueryResult.isDone / productsQueryResult.continueCursor */} 
          {/* Example: <PaginationControls 
                      hasNextPage={!productsQueryResult?.isDone}
                      onNextPage={() => setCursor(productsQueryResult?.continueCursor)} 
                    /> */}
        </main>
      </div>
    </div>
  );
}
