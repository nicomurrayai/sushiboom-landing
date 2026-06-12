import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  contactInquiries: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.union(v.string(), v.null()),
    message: v.string(),
    source: v.string(),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("archived"),
    ),
    createdAt: v.number(),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_status_and_createdAt", ["status", "createdAt"])
    .index("by_email", ["email"]),
});
