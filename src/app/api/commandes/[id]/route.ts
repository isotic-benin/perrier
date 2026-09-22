import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
import { estObjectId } from "@/lib/slugify";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Non authentifié", 401);

  const { id } = await params;
  if (!estObjectId(id)) return apiErreur("Identifiant invalide", 400);

  await dbConnect();
  const commande = await Order.findById(id).lean();
  if (!commande) return apiErreur("Commande introuvable", 404);

  const autorise =
    user.role === ROLES.ADMIN ||
    user.role === ROLES.GERANT ||
    String(commande.clientId) === user.id;
  if (!autorise) return apiErreur("Accès refusé", 403);

  return apiSuccess(commande);
}