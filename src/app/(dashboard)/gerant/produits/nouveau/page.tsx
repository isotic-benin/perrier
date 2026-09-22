import { requireGerant } from "@/lib/dal";
import { FormulaireProduit } from "@/components/dashboard/formulaire-produit";

export default async function GerantNouveauProduitPage() {
  await requireGerant();
  return <FormulaireProduit titre="Nouveau produit" />;
}