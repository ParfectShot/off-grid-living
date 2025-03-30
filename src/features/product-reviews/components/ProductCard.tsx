import React from "react";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react"; // Assuming Star might be used later for ratings
import { Id } from "~/convex/_generated/dataModel";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Badge } from "~/components/ui/badge"; // Keep badge import if needed later

// Type definition for the expected product data in the card
// Matches the output of the `listForCards` query
export type ProductCardPropsData = {
  _id: Id<"products">;
  name: string;
  price: number;
  currency: string;
  regularPrice?: number | null;
  brandName?: string | null;
  categoryName?: string | null; // Optional: If you want to display category
  imageUrl?: string | null;
  // Add other minimal fields if necessary (e.g., rating, reviewCount later)
};

interface ProductCardProps {
  product: ProductCardPropsData;
  viewMode: "grid" | "list";
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  const imageWidth = viewMode === 'list' ? 150 : 300;
  const imageHeight = viewMode === 'list' ? 150 : 200; // Adjusted height for grid

  return (
    <Card key={product._id} className={`${viewMode === 'list' ? 'flex flex-row items-start' : 'flex flex-col h-full'}`}>
      <div className={`${viewMode === 'list' ? 'w-1/3 flex-shrink-0' : ''} relative`}>
        <Link to="/product-reviews/$reviewId" params={{ reviewId: product._id }} className="block">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              width={imageWidth}
              height={imageHeight}
              className={`object-cover ${viewMode === 'list' ? 'rounded-l-lg h-full max-h-[150px]' : `w-full h-[${imageHeight}px] rounded-t-lg`}`}
              loading="lazy"
            />
          ) : (
            <Skeleton className={`bg-muted ${viewMode === 'list' ? `h-[150px] w-[${imageWidth}px] rounded-l-lg` : `h-[${imageHeight}px] w-full rounded-t-lg`}`} />
          )}
        </Link>
        {/* TODO: Add badges if needed later - e.g., featured, subsidy */}
      </div>

      <div className={`${viewMode === 'list' ? 'w-2/3' : 'flex-grow'} p-4 flex flex-col`}>
        <CardHeader className="p-0 mb-2">
          {product.brandName && (
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{product.brandName}</p>
          )}
          <CardTitle className={`text-base md:text-lg font-semibold ${viewMode === 'grid' ? 'line-clamp-2 h-[2.8em] md:h-[3.2em] leading-tight' : ''}`}>
            <Link to="/product-reviews/$reviewId" params={{ reviewId: product._id }} className="hover:underline">
              {product.name}
            </Link>
          </CardTitle>
          {/* TODO: Add Rating display */}
        </CardHeader>
        <CardContent className="p-0 flex-grow">
          {/* TODO: Add Short Description */}
          <div className="flex items-baseline gap-2 mb-2 mt-1">
            <span className="text-lg md:text-xl font-bold text-primary">{product.currency ?? ''}{(product.price ?? 0).toLocaleString("en-IN")}</span>
            {product.regularPrice != null && (
              <span className="text-xs md:text-sm text-muted-foreground line-through">{product.currency ?? ''}{(product.regularPrice ?? 0).toLocaleString("en-IN")}</span>
            )}
          </div>
          {/* TODO: Add Tags/Badges */}
          {/* TODO: Add Mini Scores */}
        </CardContent>
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