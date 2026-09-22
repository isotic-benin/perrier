import type { Metadata } from "next";
import Link from "next/link";
import { FaSliders } from "react-icons/fa6";
import { getProduits, getTypesLivraison } from "@/lib/produits";
import { getArbreCategories, getCategorieParSlug } from "@/lib/categories";
import { listeProduitsSchema } from "@/lib/zod-schemas/product";
import { produireProduitVue } from "@/lib/produit-vue";
import { ProductGrid } from "@/components/product/product-grid";
import { ProduitsFiltres } from "@/components/product/produits-filtres";
import { Pagination } from "@/components/product/pagination";
import { TriSelect } from "@/components/product/tri-select";
import { FilAriane } from "@/components/shared/fil-ariane";
import { estObjectId } from "@/lib/slugify";

export const metadata: Metadata = {
  title: "Tous les produits",
};

export default async function ProduitsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const brut = await searchParams;
  const entrees: Record<string, string> = {};
  Object.entries(brut).forEach(([cle, valeur]) => {
    if (typeof valeur === "string") entrees[cle] = valeur;
  });

  if (entrees.categorie && !estObjectId(entrees.categorie)) {
    const categorie = await getCategorieParSlug(entrees.categorie);
    if (categorie) entrees.categorie = String(categorie._id);
    else delete entrees.categorie;
  }

  const validation = listeProduitsSchema.safeParse(entrees);
  const requete = validation.success ? validation.data : { page: 1, limite: 12, tri: "pertinence" as const };

  const [resultat, arbre, typesLivraison] = await Promise.all([
    getProduits(requete),
    getArbreCategories(),
    getTypesLivraison(),
  ]);

  const produits = resultat.produits.map(produireProduitVue);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
      <FilAriane items={[{ libelle: "Produits" }]} />

      {/* ═══ PAGE HEADER ═══ */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Tous les produits
        </h1>
        <p className="mt-1 text-[14px] text-muted-foreground">
          Découvrez notre gamme complète de bois de chauffage de qualité premium
        </p>
      </div>

      {/* ═══ MAIN LAYOUT: Sidebar + Content ═══ */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
        {/* LEFT SIDEBAR */}
        <div className="hidden lg:block">
          <div className="sticky top-[160px] space-y-0">
            <ProduitsFiltres
              chemin="/produits"
              params={entrees}
              categories={arbre}
              typesLivraison={typesLivraison}
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          {/* Sort Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-3.5 shadow-[0_1px_2px_rgba(42,33,27,0.03)]">
            <p className="text-[13px] text-muted-foreground font-medium">
              <span className="text-foreground font-bold">{resultat.total}</span> produit{resultat.total > 1 ? "s" : ""} trouvé{resultat.total > 1 ? "s" : ""}
            </p>
            <TriSelect chemin="/produits" params={entrees} />
          </div>

          {/* Product Grid */}
          <ProductGrid produits={produits} />

          {/* Pagination */}
          <Pagination
            chemin="/produits"
            params={entrees}
            page={resultat.page}
            pagesTotales={resultat.pagesTotales}
          />
        </div>
      </div>
    </div>
  );
}