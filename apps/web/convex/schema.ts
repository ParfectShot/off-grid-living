import { defineSchema } from "convex/server";
import { brands } from "./schema/brands";
import { categories } from "./schema/categories";
import { productAttributes } from "./schema/productAttributes";
import { productImages } from "./schema/productImages";
import { products } from "./schema/products";
import { productSpecs } from "./schema/productSpecs";
import { productVariants } from "./schema/productVariants";
import { guides } from "./schema/guides";
import { guideSections } from "./schema/guideSections";
import { guideCategories } from "./schema/guideCategories";
import { guideToCategory } from "./schema/guideToCategory";
import { authors } from "./schema/authors";
import { guideToAuthor } from "./schema/guideToAuthor";

export default defineSchema({
  brands,
  categories,
  productAttributes,
  productImages,
  products,
  productSpecs,
  productVariants,
  guides,
  guideSections,
  guideCategories,
  guideToCategory,
  authors,
  guideToAuthor,
});