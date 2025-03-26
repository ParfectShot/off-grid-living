import { defineTable } from "convex/server";
import { v } from "convex/values";

export const brands = defineTable({ name: v.string() });
