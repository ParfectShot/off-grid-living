import { defineTable } from "convex/server";
import { v } from "convex/values";

export const newsletter = defineTable({
  email: v.string(),
  subscribedAt: v.number(), // Timestamp
  status: v.string(), // "active", "unsubscribed", etc.
  source: v.optional(v.string()), // Where the subscription came from
}).index("by_email", ["email"]);
