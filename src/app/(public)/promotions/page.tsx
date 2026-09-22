import type { Metadata } from "next";
import Link from "next/link";
import { getProduits, getTypesLivraison } from "@/lib/produits";
import { listeProduitsSchema } from "@/lib/zod-schemas/product";
import { produireProduitVue } from "@/lib/produit-vue";
import { ProductGrid } from "@/components/product/product-grid";
import { Pagination } from "@/components/product/pagination";
import { TriSelect } from "@/components/product/tri-select";
import { FilAriane } from "@/components/shared/fil-ariane";

export const metadata: Metadata = {
  title: "Promotions",
};

export default async function PromotionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const brut = await searchParams;
  const entrees: Record<string, string> = {};
  Object.entries(brut).forEach(([cle, valeur]) => {
    if (typeof valeur === "string") entrees[cle] = valeur;
  });

  entrees.enPromotion = "true";

  const validation = listeProduitsSchema.safeParse(entrees);
  const requete = validation.success
    ? validation.data
    : { page: 1, limite: 12, tri: "nouveaute" as const, enPromotion: "true" as const };

  const [resultat, typesLivraison] = await Promise.all([
    getProduits(requete),
    getTypesLivraison(),
  ]);

  const produits = resultat.produits.map(produireProduitVue);
  const chemin = "/promotions";

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <FilAriane items={[{ libelle: "Promotions" }]} />

      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Promotions</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        {resultat.total} produit{resultat.total > 1 ? "s" : ""} en promotion
      </p>

      {typesLivraison.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {typesLivraison.map(({ typeLivraison }) => {
            const labelsLivraison: Record<string, string> = { retrait: "Retrait", livraison_portail: "Livraison au portail", livraison_garage: "Livraison en garage" };
            return (
              <Link
                key={typeLivraison}
                href={entrees.typeLivraison === typeLivraison ? chemin : `${chemin}?typeLivraison=${encodeURIComponent(typeLivraison)}`}
                className={
                  entrees.typeLivraison === typeLivraison
                    ? "rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground"
                    : "rounded-full border px-3 py-1 text-sm hover:bg-muted"
                }
              >
                {labelsLivraison[typeLivraison] || typeLivraison}
              </Link>
            )
          })}
        </div>
      )}

      <div className="mb-4 flex justify-end">
        <TriSelect chemin={chemin} params={entrees} />
      </div>

      <ProductGrid produits={produits} videMessage="Aucune promotion en cours." />
      <Pagination
        chemin={chemin}
        params={entrees}
        page={resultat.page}
        pagesTotales={resultat.pagesTotales}
      />
    </div>
  );
}