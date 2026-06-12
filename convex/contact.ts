import { v } from "convex/values";
import { mutation } from "./_generated/server";

const NAME_MAX_LENGTH = 80;
const EMAIL_MAX_LENGTH = 160;
const PHONE_MAX_LENGTH = 40;
const MESSAGE_MAX_LENGTH = 1200;

export const submitInquiry = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.string(),
    source: v.optional(v.string()),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const name = normalizeText(args.name, NAME_MAX_LENGTH);
    const email = normalizeText(args.email, EMAIL_MAX_LENGTH).toLowerCase();
    const phone = normalizeOptionalText(args.phone, PHONE_MAX_LENGTH);
    const message = normalizeText(args.message, MESSAGE_MAX_LENGTH);
    const source = normalizeText(args.source ?? "sushiboom-landing", 80);

    if (args.website && args.website.trim().length > 0) {
      return { ok: true };
    }

    if (name.length < 2) {
      throw new Error("INVALID_NAME");
    }

    if (!isValidEmail(email)) {
      throw new Error("INVALID_EMAIL");
    }

    if (message.length < 10) {
      throw new Error("INVALID_MESSAGE");
    }

    await ctx.db.insert("contactInquiries", {
      name,
      email,
      phone,
      message,
      source,
      status: "new",
      createdAt: Date.now(),
    });

    return { ok: true };
  },
});

function normalizeText(value: string, maxLength: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizeOptionalText(value: string | undefined, maxLength: number) {
  const normalized = normalizeText(value ?? "", maxLength);
  return normalized.length > 0 ? normalized : null;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
