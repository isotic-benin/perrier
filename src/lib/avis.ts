import "server-only";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/db";
import Review from "@/models/Review";
import Product from "@/models/Product";
import Order from "@/models/Order";

export async function recalculerNoteProduit(produitId: string) {
  await dbConnect();

  const stats = await Review.aggregate([
    {
      $match: {
        produitId: new mongoose.Types.ObjectId(produitId),
        statut: "approuve",
      },
    },
    { $group: { _id: null, moyenne: { $avg: "$note" }, nombre: { $sum: 1 } } },
  ]);

  const s = stats[0];
  const moyenne = s ? Math.round(s.moyenne * 10) / 10 : 0;
  const nombre = s?.nombre ?? 0;

  await Product.updateOne(
    { _id: produitId },
    { noteMoyenne: moyenne, nombreAvis: nombre },
  );

  return { moyenne, nombre };
}

export async function aEnAchete(
  clientId: string,
  produitId: string,
): Promise<boolean> {
  await dbConnect();
  const resultat = await Order.exists({
    clientId,
    "articles.produitId": new mongoose.Types.ObjectId(produitId),
    statutCommande: { $in: ["confirmee", "en_preparation", "expediee", "livree"] },
  });
  return Boolean(resultat);
}