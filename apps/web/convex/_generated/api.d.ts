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
import type * as categories from "../categories.js";
import type * as productAttributes from "../productAttributes.js";
import type * as productImages from "../productImages.js";
import type * as products from "../products.js";
import type * as productSpecs from "../productSpecs.js";
import type * as productVariants from "../productVariants.js";

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
  categories: typeof categories;
  productAttributes: typeof productAttributes;
  productImages: typeof productImages;
  products: typeof products;
  productSpecs: typeof productSpecs;
  productVariants: typeof productVariants;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
