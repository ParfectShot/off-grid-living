import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Mutation to subscribe a user to the newsletter
export const subscribe = mutation({
  args: { 
    email: v.string(),
    source: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    // Check if this email is already subscribed
    const existingSubscription = await ctx.db
      .query("newsletter")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    
    if (existingSubscription) {
      // If already subscribed, just return the existing ID
      return { id: existingSubscription._id, alreadySubscribed: true };
    }
    
    // Create a new subscription
    const id = await ctx.db.insert("newsletter", {
      email: args.email,
      subscribedAt: Date.now(),
      status: "active",
      source: args.source || "website",
    });
    
    return { id, alreadySubscribed: false };
  },
});
