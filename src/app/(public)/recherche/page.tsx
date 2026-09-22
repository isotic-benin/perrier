import type { Metadata } from "next";
import { getProduits } from "@/lib/produits";
import { listeProduitsSchema } from "@/lib/zod-schemas/product";
import { produireProduitVue } from "@/lib/produit-vue";
import { ProductGrid } from "@/components/product/product-grid";
import { Pagination } from "@/components/product/pagination";
import { TriSelect } from "@/components/product/tri-select";
import { FilAriane } from "@/components/shared/fil-ariane";

export const metadata: Metadata = {
  title: "Recherche",
};

export default async function RecherchePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const brut = await searchParams;
  const entrees: Record<string, string> = {};
  Object.entries(brut).forEach(([cle, valeur]) => {
    if (typeof valeur === "string") entrees[cle] = valeur;
  });

  const q = entrees.recherche?.trim() ?? "";
  const validation = listeProduitsSchema.safeParse(entrees);
  const requete = validation.success
    ? validation.data
    : { page: 1, limite: 24, tri: "pertinence" as const };

  const resultat = await getProduits(requete);
  const produits = resultat.produits.map(produireProduitVue);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <FilAriane items={[{ libelle: "Recherche" }]} />

      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
        Résultats pour « {q || "…"} »
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">
        {resultat.total} résultat{resultat.total > 1 ? "s" : ""}
      </p>

      {q && (
        <>
          <div className="mb-4 flex justify-end">
            <TriSelect chemin="/recherche" params={entrees} />
          </div>
          <ProductGrid produits={produits} videMessage="Aucun produit ne correspond à votre recherche." />
          <Pagination
            chemin="/recherche"
            params={entrees}
            page={resultat.page}
            pagesTotales={resultat.pagesTotales}
          />
        </>
      )}
    </div>
  );
}