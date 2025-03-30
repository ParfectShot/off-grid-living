import React from 'react';
import { Heart, Share2, Check, Star } from "lucide-react"; // Include icons used here or potentially needed
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Doc } from '~/convex/_generated/dataModel';

interface ProductSummaryCardProps {
    product: {
        _id: Id<"products">;
        name?: string | null;
        price?: number | null;
        currency?: string | null;
        regularPrice?: number | null;
        availability?: string | null;
        sku?: string | null;
        brand?: Doc<"brands"> | null;
         // Add review-specific fields later if needed (rating, reviewCount, verdict, scores)
         // rating?: number | null;
         // reviewCount?: number | null;
         // verdict?: string | null;
         // performanceScore?: number | null;
         // valueScore?: number | null;
         // qualityScore?: number | null;
         // Add affiliate links if needed
    };
}

export const ProductSummaryCard: React.FC<ProductSummaryCardProps> = ({ product }) => {
    return (
        <Card className="sticky top-20">
            <CardHeader>
                <CardTitle className="text-xl lg:text-2xl">{product.name}</CardTitle>
                {/* TODO: Add Rating/Review Count */}
                {/* <div className="flex items-center justify-between gap-2 pt-2">
                   <div className="flex items-center gap-1">
                     <Star className="h-5 w-5 fill-primary text-primary" />
                     <span className="font-semibold">{product.rating?.toFixed(1)}</span>
                     <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
                   </div>
                   <div className="flex gap-1">
                     <Button variant="ghost" size="icon"><Heart className="h-5 w-5"/><span className="sr-only">Wishlist</span></Button>
                     <Button variant="ghost" size="icon"><Share2 className="h-5 w-5"/><span className="sr-only">Share</span></Button>
                   </div>
                 </div> */}
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Price */}
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">{product.currency ?? ''}{(product.price ?? 0).toLocaleString("en-IN")}</span>
                    {product.regularPrice != null && (
                        <span className="text-base text-muted-foreground line-through">{product.currency ?? ''}{(product.regularPrice).toLocaleString("en-IN")}</span>
                    )}
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2 text-sm">
                    {product.availability && (
                        <Badge variant={product.availability === "InStock" ? "default" : "destructive"} className={`${product.availability === "InStock" ? "bg-green-600" : ""}`}>
                            {product.availability === "InStock" ? "In Stock" : "Out of Stock"} {/* TODO: Improve availability mapping */}
                        </Badge>
                    )}
                    {/* TODO: Subsidy Badge */}
                </div>

                {/* Key Info */}
                <div className="text-sm space-y-1">
                    {product.brand?.name && <p><strong>Brand:</strong> {product.brand.name}</p>}
                    {product.sku && <p><strong>SKU:</strong> {product.sku}</p>}
                    {/* TODO: Warranty Info */}
                </div>
                <Separator />

                {/* TODO: Mini Verdict */}
            </CardContent>
            {/* TODO: Affiliate Links Footer */}
            {/* <CardFooter className="flex flex-col items-stretch gap-3"> ... </CardFooter> */}
        </Card>
    );
}; 