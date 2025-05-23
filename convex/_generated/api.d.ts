/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as brands from "../brands.js";
import type * as guides from "../guides.js";
import type * as images from "../images.js";
import type * as imageToEntity from "../imageToEntity.js";
import type * as newsletter from "../newsletter.js";
import type * as productAttributes from "../productAttributes.js";
import type * as productImages from "../productImages.js";
import type * as products from "../products.js";
import type * as productSpecs from "../productSpecs.js";
import type * as productVariants from "../productVariants.js";
import type * as schema_authors from "../schema/authors.js";
import type * as schema_brands from "../schema/brands.js";
import type * as schema_guideCategories from "../schema/guideCategories.js";
import type * as schema_guides from "../schema/guides.js";
import type * as schema_guideSections from "../schema/guideSections.js";
import type * as schema_guideToAuthor from "../schema/guideToAuthor.js";
import type * as schema_guideToCategory from "../schema/guideToCategory.js";
import type * as schema_images from "../schema/images.js";
import type * as schema_imageToEntity from "../schema/imageToEntity.js";
import type * as schema_newsletter from "../schema/newsletter.js";
import type * as schema_productAttributes from "../schema/productAttributes.js";
import type * as schema_productCategories from "../schema/productCategories.js";
import type * as schema_productImages from "../schema/productImages.js";
import type * as schema_products from "../schema/products.js";
import type * as schema_productSpecs from "../schema/productSpecs.js";
import type * as schema_productVariants from "../schema/productVariants.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  brands: typeof brands;
  guides: typeof guides;
  images: typeof images;
  imageToEntity: typeof imageToEntity;
  newsletter: typeof newsletter;
  productAttributes: typeof productAttributes;
  productImages: typeof productImages;
  products: typeof products;
  productSpecs: typeof productSpecs;
  productVariants: typeof productVariants;
  "schema/authors": typeof schema_authors;
  "schema/brands": typeof schema_brands;
  "schema/guideCategories": typeof schema_guideCategories;
  "schema/guides": typeof schema_guides;
  "schema/guideSections": typeof schema_guideSections;
  "schema/guideToAuthor": typeof schema_guideToAuthor;
  "schema/guideToCategory": typeof schema_guideToCategory;
  "schema/images": typeof schema_images;
  "schema/imageToEntity": typeof schema_imageToEntity;
  "schema/newsletter": typeof schema_newsletter;
  "schema/productAttributes": typeof schema_productAttributes;
  "schema/productCategories": typeof schema_productCategories;
  "schema/productImages": typeof schema_productImages;
  "schema/products": typeof schema_products;
  "schema/productSpecs": typeof schema_productSpecs;
  "schema/productVariants": typeof schema_productVariants;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
