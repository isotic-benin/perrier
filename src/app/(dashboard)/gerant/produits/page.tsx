import { requireGerant } from "@/lib/dal";
import { GestionProduits } from "@/components/dashboard/gestion-produits";

export default async function GerantProduitsPage() {
  await requireGerant();
  return <GestionProduits baseHref="/gerant/produits" />;
}