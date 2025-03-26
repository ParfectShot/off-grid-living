import { defineTable } from "convex/server";
import { v } from "convex/values";

export const categories = defineTable({ name: v.string() });
