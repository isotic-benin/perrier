import type { Metadata } from "next";
import { requireAdmin } from "@/lib/dal";
import { GestionProduits } from "@/components/dashboard/gestion-produits";

export const metadata: Metadata = {
  title: "Produits",
};

export default async function AdminProduitsPage() {
  await requireAdmin();
  return <GestionProduits baseHref="/admin/produits" />;
}