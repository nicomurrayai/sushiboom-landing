import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";

export const LACARTA_SLUG = "sushiboom-palermo";
export const LACARTA_MENU_URL = `https://www.lacartaa.com/${LACARTA_SLUG}`;
export const LACARTA_USER_ID = "user_3CRCBoPPGHLbGwE4rXqGcJPCk5H";

export type LacartaProduct = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  contentUrl: string;
  contentType: string;
  show?: boolean;
  tags?: string[] | null;
  thumbnail?: string | null;
  order?: number | null;
};

export type LacartaBusiness = {
  _id: string;
  name?: string | null;
  slug: string;
  phoneNumber?: string | null;
  instagramProfileUrl?: string | null;
  mapsUrl?: string | null;
  categoryOrder?: string[] | null;
};

export type LacartaMenuData = {
  business: LacartaBusiness;
  products: LacartaProduct[];
  daysLeft?: number;
  hasActiveSuscription?: boolean;
  hasProPlanActive?: boolean;
};

type MenuDataResult = {
  menuData: LacartaMenuData | null;
  error: string | null;
};

const getMenuDataBySlug = makeFunctionReference<
  "query",
  { slug: string },
  LacartaMenuData
>("businesses:getMenuDataBySlug");

export async function getLacartaMenuData(): Promise<MenuDataResult> {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!convexUrl) {
    return {
      menuData: null,
      error: "NEXT_PUBLIC_CONVEX_URL is not configured.",
    };
  }

  try {
    const convex = new ConvexHttpClient(convexUrl);
    const menuData = await convex.query(getMenuDataBySlug, {
      slug: LACARTA_SLUG,
    });

    return { menuData, error: null };
  } catch (error) {
    return {
      menuData: null,
      error: error instanceof Error ? error.message : "Unknown Convex error.",
    };
  }
}
