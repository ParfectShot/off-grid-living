import { Id } from "../../../../convex/_generated/dataModel"; // Corrected path

// Type for the product list item (from listWithDetails query)
export type ProductListItem = {
  _id: Id<"products">;
  _creationTime: number;
  name: string;
  price: number;
  imageUrl?: string; // Main image URL
  brand?: string;
  category?: string;
};

// Type for the detailed product view (from getByIdWithDetails query)
export type ProductDetails = {
  _id: Id<"products">;
  _creationTime: number;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  regularPrice?: number;
  currency?: string;
  sku?: string;
  availability?: string;
  warranty?: string;
  weight?: number;
  weightUnit?: string;
  brand?: { _id: Id<"brands">; name: string } | null; // Full brand object
  category?: { _id: Id<"productCategories">; name: string } | null; // Full category object
  images: Array<{ 
    _id: Id<"productImages">;
    url: string; 
    alt?: string; 
    isMain?: boolean; 
    displayOrder?: number;
  }>;
  // TODO: Add types for specs and attributes when fetched
  // specs?: any[]; 
  // attributes?: any[];
};
