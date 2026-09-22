import type { NextRequest } from "next/server";
import { apiSuccess } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim().slice(0, 100);

  if (!q) {
    return apiSuccess({ produits: [], categories: [] });
  }

  await dbConnect();

  const [produits, categories] = await Promise.all([
    Product.find({ $text: { $search: q }, actif: true })
      .select("nom slug prix prixPromo images enPromotion typeLivraison")
      .limit(8)
      .lean(),
    Category.find({ nom: { $regex: q, $options: "i" }, active: true })
      .select("nom slug image")
      .limit(5)
      .lean(),
  ]);

  return apiSuccess({ produits, categories });
}