import "server-only";
import { dbConnect } from "@/lib/db";
import Wishlist from "@/models/Wishlist";
import Product from "@/models/Product";
import { produireProduitVue } from "@/lib/produit-vue";

export async function getFavorisClient(clientId: string) {
  await dbConnect();
  const wishlist = await Wishlist.findOne({ clientId }).lean();
  const ids = wishlist?.produits?.map((p) => String(p)) ?? [];

  const produits = await Product.find({ _id: { $in: ids }, actif: true }).lean();

  return {
    produitIds: ids,
    produits: produits.map(produireProduitVue),
  };
}

export async function ajouterFavori(clientId: string, produitId: string) {
  await dbConnect();
  await Wishlist.findOneAndUpdate(
    { clientId },
    { $addToSet: { produits: produitId } },
    { upsert: true, setDefaultsOnInsert: true },
  );
}

export async function retirerFavori(clientId: string, produitId: string) {
  await dbConnect();
  await Wishlist.findOneAndUpdate(
    { clientId },
    { $pull: { produits: produitId } },
    { upsert: true, setDefaultsOnInsert: true },
  );
}