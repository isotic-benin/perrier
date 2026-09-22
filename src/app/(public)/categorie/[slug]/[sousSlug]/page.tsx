import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { FaCircle, FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { TriSelect } from "@/components/product/tri-select";
import { ProductGrid } from "@/components/product/product-grid";
import { Pagination } from "@/components/product/pagination";
import { FilAriane } from "@/components/shared/fil-ariane";
import { ProduitsFiltres } from "@/components/product/produits-filtres";
import { listeProduitsSchema } from "@/lib/zod-schemas/product";
import { ProduitVue, produireProduitVue } from "@/lib/produit-vue";
import { getSousCategorieParSlugs, getArbreCategories } from "@/lib/categories";
import { getProduits, getTypesLivraison } from "@/lib/produits";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; sousSlug: string }>;
}): Promise<Metadata> {
  const { slug, sousSlug } = await params;
  const resultat = await getSousCategorieParSlugs(slug, sousSlug);
  if (!resultat) return { title: "Catégorie introuvable" };
  const { sousCategorie } = resultat;
  return {
    title: sousCategorie.metaTitle || sousCategorie.nom,
    description:
      sousCategorie.metaDescription ||
      sousCategorie.description?.slice(0, 160),
    alternates: { canonical: `/categorie/${slug}/${sousSlug}` },
  };
}

export default async function SousCategoriePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; sousSlug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug, sousSlug } = await params;
  const resultat = await getSousCategorieParSlugs(slug, sousSlug);
  if (!resultat) notFound();

  const { parent, sousCategorie } = resultat;

  const brut = await searchParams;
  const entrees: Record<string, string> = {};
  Object.entries(brut).forEach(([cle, valeur]) => {
    if (typeof valeur === "string") entrees[cle] = valeur;
  });

  const validation = listeProduitsSchema.safeParse(entrees);
  const requete = {
    ...(validation.success
      ? validation.data
      : { page: 1, limite: 24, tri: "pertinence" as const }),
    categorieIds: [String(sousCategorie._id)],
  };

  const [resultatProduits, arbre, typesLivraison] = await Promise.all([
    getProduits(requete),
    getArbreCategories(),
    getTypesLivraison(),
  ]);

  const produits = resultatProduits.produits.map(produireProduitVue);
  const chemin = `/categorie/${slug}/${sousSlug}`;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
      <FilAriane
        items={[
          { libelle: "Produits", href: "/produits" },
          { libelle: parent.nom, href: `/categorie/${parent.slug}` },
          { libelle: sousCategorie.nom },
        ]}
      />

      {/* ═══ SUBCATEGORY HERO BANNER (Perrier Bois-style) ═══ */}
      <div className="mb-8 rounded-2xl border border-border bg-gradient-to-br from-accent via-card to-card p-6 shadow-[0_1px_2px_rgba(42,33,27,0.03)] sm:p-8">
        <div className="flex flex-col gap-1 mb-2">
          <Link href={`/categorie/${parent.slug}`} className="text-[12px] font-bold uppercase tracking-wider text-primary hover:underline w-fit">
            ← Retour à {parent.nom}
          </Link>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {sousCategorie.nom}
          </h1>
        </div>

        {sousCategorie.description && (
          <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground max-w-3xl">
            {sousCategorie.description}
          </p>
        )}
      </div>

      {/* ═══ MAIN LAYOUT: Sidebar + Content ═══ */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
        {/* LEFT SIDEBAR */}
        <div className="hidden lg:block">
          <div className="sticky top-[160px]">
            <ProduitsFiltres
              chemin={chemin}
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
            <p className="text-[13px] font-medium text-muted-foreground">
              <span className="font-bold text-foreground">{resultatProduits.total}</span> produit{resultatProduits.total > 1 ? "s" : ""} trouvé{resultatProduits.total > 1 ? "s" : ""}
            </p>
            <TriSelect chemin={chemin} params={entrees} />
          </div>

          <ProductGrid produits={produits} />

          <Pagination
            chemin={chemin}
            params={entrees}
            page={resultatProduits.page}
            pagesTotales={resultatProduits.pagesTotales}
          />
        </div>
      </div>
    </div>
  );
}