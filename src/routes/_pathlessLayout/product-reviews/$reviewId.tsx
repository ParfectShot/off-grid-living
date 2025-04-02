import React from "react";
import { Link, createFileRoute, redirect, useParams } from "@tanstack/react-router";
import { ChevronRight, AlertTriangle, Clock, Sun, Zap, Shield } from "lucide-react"; // Keep icons used by page/subcomponents
import { api } from "~/convex/_generated/api";
import { Id } from "~/convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { Progress } from "~/components/ui/progress"; // Keep for ScoreItem if used

// Import extracted components
import { ImageGallery } from "~/features/product-reviews";
import { SpecsTable } from "~/features/product-reviews/components/SpecsTable";
import { ProductSummaryCard } from "~/features/product-reviews/components/ProductSummaryCard";


export const Route = createFileRoute('/_pathlessLayout/product-reviews/$reviewId')({
  // TODO: Add loader for pre-fetching data if needed
  // loader: ({ params: { reviewId }, context: { queryClient } }) => 
  //   queryClient.ensureQueryData(productReviewQueryOptions(reviewId)),
  component: ProductReviewDetailPageComponent, 
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
  // pendingComponent: () => <div>Loading review details...</div>,
  // errorComponent: ({ error }) => <div>Error loading review: {error.message}</div>,
});

// Helper component for score display (Can stay here or move to shared components)
interface ScoreItemProps {
    icon: React.ElementType;
    label: string;
    score: number;
}
const ScoreItem: React.FC<ScoreItemProps> = ({ icon: Icon, label, score }) => (
    <div className="text-center">
        <Icon className="h-6 w-6 mx-auto mb-1 text-primary" />
        <p className="text-sm font-medium">{label}</p>
        <p className="text-lg font-bold">{score}/100</p>
        <Progress value={score} className="h-1 mt-1"/>
    </div>
);


// Main Page Component
function ProductReviewDetailPageComponent() {
  const { reviewId } = useParams({ from: '/_pathlessLayout/product-reviews/$reviewId' });

  // Fetch data
  const { data: product, isError } = useSuspenseQuery(
    convexQuery(api.products.getByIdWithDetails, { id: reviewId as Id<"products"> })
  );

  // TODO: Fetch related products
  const relatedProducts: any[] = [];

  // Error State
  if (isError) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-semibold mb-2">Error Loading Product Review</h2>
        <p className="text-muted-foreground">Could not load the details for this product.</p>
        <Button asChild variant="outline" className="mt-4"><Link to="/product-reviews">Back to Reviews</Link></Button>
      </div>
    );
  }

  // Not Found State (Convex query might return null)
  if (!product) {
    return (
       <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
        <p className="text-muted-foreground">The product review could not be found.</p>
        <Button asChild variant="outline" className="mt-4"><Link to="/product-reviews">Back to Reviews</Link></Button>
      </div>
    );
  }

  // --- Render Product Details ---
  const primaryCategory = product.categories?.[0];

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="inline-block h-4 w-4 mx-1" />
          <Link to="/product-reviews" className="hover:text-foreground">Product Reviews</Link>
          {primaryCategory && (
             <>
               <ChevronRight className="inline-block h-4 w-4 mx-1" />
               {/* TODO: Dynamic category link */}
               <Link to={`/product-reviews`} className="hover:text-foreground">{primaryCategory.name}</Link>
             </>
           )}
          <ChevronRight className="inline-block h-4 w-4 mx-1" />
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Images & Tabs */}
          <div className="lg:col-span-2">
            <ImageGallery images={product.images ?? []} productName={product.name ?? undefined} />

            {/* Content Tabs */}
            <Tabs defaultValue="review" className="w-full">
               {/* TODO: Conditionally render tabs based on available data */}
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="review">Full Review</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="tests">Test Results</TabsTrigger>
              </TabsList>

              {/* Review Tab */}
              <TabsContent value="review">
                 <Card>
                   <CardHeader>
                     <CardTitle className="text-2xl">Our In-Depth Review</CardTitle>
                     {/* TODO: Review Meta (Date, Author) */}
                   </CardHeader>
                   <CardContent className="space-y-6">
                     {/* TODO: Review Verdict */}
                     {/* Product Description */}
                     {product.description && (
                       <div>
                         <h3 className="font-semibold text-lg mb-2">Product Overview</h3>
                         <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                       </div>
                     )}
                     {/* TODO: Pros/Cons */}
                     {/* TODO: Author Bio */}
                   </CardContent>
                 </Card>
              </TabsContent>

              {/* Specifications Tab */}
              <TabsContent value="specs">
                <Card>
                  <CardHeader><CardTitle>Technical Specifications</CardTitle></CardHeader>
                  <CardContent>
                    <SpecsTable
                        brand={product.brand}
                        categories={product.categories}
                        specs={product.specs}
                        attributes={product.attributes}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Test Results Tab */}
              <TabsContent value="tests">
                <Card>
                  <CardHeader>
                    <CardTitle>Lab Test Results</CardTitle>
                    <p className="text-sm text-muted-foreground pt-1">Independent testing results.</p>
                  </CardHeader>
                  <CardContent>
                    {/* TODO: Map actual test results */}
                    <p className="text-muted-foreground">No test results available yet.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Summary Card */}
          <div className="lg:col-span-1 space-y-6">
            <ProductSummaryCard product={product} />
          </div>
        </div>

        {/* Related Product Reviews Section */}
        {/* TODO: Fetch and display related products */}
        <section className="mt-12 lg:mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Product Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.length === 0 && (
               <p className="col-span-full text-muted-foreground">No related products found yet.</p>
            )}
            {/* Map related products here */}
          </div>
        </section>

      </div>
    </div>
  );
}
