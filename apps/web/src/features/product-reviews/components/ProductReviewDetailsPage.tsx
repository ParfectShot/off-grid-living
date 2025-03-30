import React, { useState, useEffect } from "react"
import { Link, useParams } from "@tanstack/react-router"
import {
  Star,
  ChevronRight,
  Heart,
  Share2,
  Check,
  Shield,
  ThumbsUp,
  ThumbsDown,
  Sun,
  Battery,
  Zap,
  Clock,
  ExternalLink,
  AlertTriangle,
} from "lucide-react"

import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Progress } from "~/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Separator } from "~/components/ui/separator";
import { api } from "~/convex/_generated/api"
import { Id } from "~/convex/_generated/dataModel"
import { convexQuery } from "@convex-dev/react-query"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Skeleton } from "~/components/ui/skeleton"

// Helper component for score display
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

export function ProductReviewDetailsPage() {
  const { reviewId } = useParams({ from: '/_pathlessLayout/product-reviews/$reviewId' });

  // Use useSuspenseQuery to fetch product details
  // Ensure reviewId is a valid Id<"products"> before passing to the query
  const { data: product, isLoading, isError } = useSuspenseQuery(
    convexQuery(api.products.getByIdWithDetails, { id: reviewId as Id<"products"> })
  );

  // State for the selected image URL
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined>(undefined);

  // Effect to set the initial selected image once product data loads
  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      const mainImage = product.images.find(img => img.isMain);
      setSelectedImageUrl(mainImage?.originalUrl || product.images[0]?.originalUrl);
    }
  }, [product]);

  // TODO: Implement fetching related products (needs a new Convex query)
  // For now, use an empty array or placeholder
  const relatedProducts: any[] = []; 

  // --- Loading State --- 
  // useSuspenseQuery handles the loading state by suspending rendering
  // You might want a page-level skeleton if preferred over suspense boundary

  // --- Error State --- 
  if (isError) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-semibold mb-2">Error Loading Product Review</h2>
        <p className="text-muted-foreground">Could not load the details for this product. Please try again later.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/product-reviews">Back to Reviews</Link>
        </Button>
      </div>
    );
  }

  // --- Not Found State --- 
  if (!product) {
    // This case might be handled by useSuspenseQuery depending on Convex query behavior
    // If the query returns null for not found, handle it here.
    return (
       <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
        <p className="text-muted-foreground">The product review you are looking for does not exist.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/product-reviews">Back to Reviews</Link>
        </Button>
      </div>
    );
  }

  // --- Render Product Details --- 
  // Safely access properties now that product is guaranteed to exist
  const primaryCategory = product.categories?.[0]; // Get the first category for breadcrumbs, etc.

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
               {/* TODO: Make category link dynamic based on slug */} 
               <Link to={`/product-reviews`} className="hover:text-foreground"> 
                 {primaryCategory.name}
               </Link>
             </>
           )}
          <ChevronRight className="inline-block h-4 w-4 mx-1" />
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Images & Key Info */} 
          <div className="lg:col-span-2">
            {/* Product Images */} 
            <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 mb-6">
               <div className="flex flex-col gap-2 order-last md:order-first">
                 {/* Map over the fetched images array */}
                 {product.images?.map((image) => (
                   <button
                     key={image?.imageId || image?._id} // Use image ID from link or image doc
                     onClick={() => setSelectedImageUrl(image?.originalUrl)} // Use originalUrl from image doc
                     className={`border rounded-lg overflow-hidden ${selectedImageUrl === image?.originalUrl ? 'border-primary ring-2 ring-primary' : 'border-border'}`}
                   >
                     {image?.originalUrl ? (
                        <img
                         // Use originalUrl or a srcset URL if available
                         src={image.originalUrl} 
                         alt={image.alt || product.name}
                         width={80}
                         height={80}
                         className="object-cover aspect-square"
                         loading="lazy"
                       />
                     ) : (
                        <Skeleton className="h-[80px] w-[80px] bg-muted" />
                     )}
                   </button>
                 ))}
               </div>
               <div className="border rounded-lg overflow-hidden">
                 {selectedImageUrl ? (
                   <img
                     src={selectedImageUrl}
                     alt={product.name ?? 'Product image'}
                     width={600}
                     height={600}
                     className="object-contain w-full aspect-square"
                   />
                 ) : (
                    <Skeleton className="h-[600px] w-full bg-muted" />
                 )}
               </div>
             </div>

            {/* Review Content Tabs */}
            <Tabs defaultValue="review" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                 {/* TODO: Conditionally render tabs based on available data */} 
                <TabsTrigger value="review">Full Review</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="tests">Test Results</TabsTrigger> {/* TODO: Hide if no test results */} 
              </TabsList>

              {/* Full Review Tab */} 
              <TabsContent value="review">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Our In-Depth Review</CardTitle>
                     {/* TODO: Pull review-specific data (date, author) when available */} 
                     {/* <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Reviewed on: {product.reviewDate}</span>
                        </div>
                         <div className="flex items-center gap-1">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={product.authorImage} alt={product.reviewAuthor} />
                                <AvatarFallback>{...}</AvatarFallback>
                            </Avatar>
                            <span>By {product.reviewAuthor}</span>
                        </div>
                    </div> */} 
                  </CardHeader>
                  <CardContent className="space-y-6">
                     {/* TODO: Verdict Section - Needs review data */} 
                     {/* <div className="bg-muted/50 border p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">The Verdict: <span className="text-primary">{product.verdict}</span></h3>
                        <div className="flex justify-around items-center gap-4 mb-4">
                            <ScoreItem icon={Sun} label="Performance" score={product.performanceScore} />
                            <ScoreItem icon={Zap} label="Value" score={product.valueScore} />
                            <ScoreItem icon={Shield} label="Quality" score={product.qualityScore} />
                        </div>
                        <p className="text-sm text-muted-foreground">{product.description?.substring(0, 200)}...</p>
                    </div> */} 

                    {/* Full Description - Use description from product */} 
                    {product.description && (
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Product Overview</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                      </div>
                    )}

                    {/* TODO: Pros and Cons - Needs review data */} 
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> ... </div> */} 

                     {/* TODO: Author Section - Needs review data */} 
                     {/* <Separator />
                     <div className="flex items-start gap-4 pt-4"> ... </div> */} 
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Specifications Tab */}
              <TabsContent value="specs">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                     {product.specs && product.specs.length > 0 ? (
                       <Table>
                         <TableHeader>
                           <TableRow>
                             <TableHead className="w-[200px]">Specification</TableHead>
                             <TableHead>Details</TableHead>
                           </TableRow>
                         </TableHeader>
                         <TableBody>
                           {/* Display Brand from product.brand */}
                           {product.brand?.name && (
                             <TableRow>
                               <TableCell className="font-medium">Brand</TableCell>
                               <TableCell>{product.brand.name}</TableCell>
                             </TableRow>
                           )}
                            {/* Display Categories from product.categories */} 
                           {product.categories && product.categories.length > 0 && (
                             <TableRow>
                               <TableCell className="font-medium">Categories</TableCell>
                               <TableCell>{product.categories.map(cat => cat.name).join(', ')}</TableCell>
                             </TableRow>
                           )}
                           {/* Display Specs from product.specs */}
                           {product.specs.map((spec) => (
                             <TableRow key={spec._id}>
                               <TableCell className="font-medium capitalize">{spec.name?.replace(/_/g, ' ')}</TableCell>
                               <TableCell>{spec.value}</TableCell>
                             </TableRow>
                           ))}
                            {/* Display Attributes from product.attributes */} 
                           {product.attributes && product.attributes.map((attr) => (
                             <TableRow key={attr._id}>
                               <TableCell className="font-medium capitalize">{attr.name?.replace(/_/g, ' ')}</TableCell>
                               <TableCell>{attr.value}</TableCell>
                             </TableRow>
                           ))}
                         </TableBody>
                       </Table>
                     ) : (
                       <p className="text-muted-foreground">No specifications available.</p>
                     )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Test Results Tab */}
              {/* TODO: Add logic to display test results if available */} 
              <TabsContent value="tests">
                <Card>
                  <CardHeader>
                    <CardTitle>Lab Test Results</CardTitle>
                    <p className="text-sm text-muted-foreground pt-1">Our independent testing results.</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {/* Example structure - replace with actual data map */} 
                     {/* {product.testResults?.map((test, i) => ( ... )) } */}
                    <p className="text-muted-foreground">No test results available yet.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Summary & Purchase Options */} 
          <div className="lg:col-span-1 space-y-6">
            <Card className="sticky top-20"> { /* Sticky behavior */} 
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl">{product.name}</CardTitle>
                 {/* TODO: Add Rating display when available */} 
                 {/* <div className="flex items-center justify-between gap-2 pt-2"> ... </div> */} 
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-baseline gap-2">
                   {/* Display Price */} 
                   <span className="text-3xl font-bold text-primary">{product.currency ?? ''}{(product.price ?? 0).toLocaleString("en-IN")}</span>
                   {/* Display Regular Price */} 
                   {product.regularPrice != null && (
                     <span className="text-base text-muted-foreground line-through">{product.currency ?? ''}{(product.regularPrice).toLocaleString("en-IN")}</span>
                   )}
                 </div>

                 {/* Display Availability & Subsidy (if available on product) */} 
                <div className="flex items-center gap-2 text-sm">
                   {product.availability && (
                     <Badge variant={product.availability === "InStock" ? "default" : "destructive"} className={`${product.availability === "InStock" ? "bg-green-600" : ""}`}>
                       {product.availability === "InStock" ? "In Stock" : "Out of Stock"} {/* TODO: Improve availability mapping */} 
                     </Badge>
                   )}
                   {/* TODO: Check for subsidy info if added to product schema */} 
                   {/* {product.subsidy && ( <Badge>...</Badge> )} */} 
                 </div>

                 {/* Display Key Info: Brand, SKU */}
                 <div className="text-sm space-y-1">
                   {product.brand?.name && <p><strong>Brand:</strong> {product.brand.name}</p>}
                   {product.sku && <p><strong>SKU:</strong> {product.sku}</p>}
                   {/* TODO: Display relevant warranty info from specs/attributes if needed */} 
                 </div>
                 <Separator />

                 {/* TODO: Mini Verdict - Needs review data */} 
                 {/* <div className="space-y-2"> ... </div> */} 

              </CardContent>
              {/* TODO: Add Affiliate Links / Purchase options if available */} 
              {/* <CardFooter className="flex flex-col items-stretch gap-3">
                 ... (map affiliate links) ... 
              </CardFooter> */} 
            </Card>
          </div>
        </div>

        {/* Related Product Reviews Section */} 
        {/* TODO: Fetch and display related products */} 
        <section className="mt-12 lg:mt-16">
           <h2 className="text-2xl font-bold mb-6">Related Product Reviews</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {/* Map over relatedProducts when data is available */} 
             {relatedProducts.length === 0 && (
                <p className="col-span-full text-muted-foreground">No related products found yet.</p>
             )}
             {/* Example Card Structure (adapt to related product data) */}
             {/* {relatedProducts.map((related) => ( <Card key={related._id}> ... </Card> ))} */} 
           </div>
        </section>

      </div>
    </div>
  );
}

