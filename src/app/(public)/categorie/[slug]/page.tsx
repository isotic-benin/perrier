import { FaCircle, FaArrowRight } from "react-icons/fa6";
import { notFound } from "next/navigation";
import Link from "next/link";
import { type Metadata } from "next";
import { TriSelect } from "@/components/product/tri-select";
import { ProductGrid } from "@/components/product/product-grid";
import { Pagination } from "@/components/product/pagination";
import { FilAriane } from "@/components/shared/fil-ariane";
import { ProduitsFiltres } from "@/components/product/produits-filtres";
import Category from "@/models/Category";
import { listeProduitsSchema } from "@/lib/zod-schemas/product";
import { ProduitVue, produireProduitVue } from "@/lib/produit-vue";
import { getCategorieParSlug, getArbreCategories } from "@/lib/categories";
import { getProduits, getTypesLivraison } from "@/lib/produits";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categorie = await getCategorieParSlug(slug);
  if (!categorie) return { title: "Catégorie introuvable" };
  const description =
    categorie.metaDescription || categorie.description?.slice(0, 160);
  return {
    title: categorie.metaTitle || categorie.nom,
    description,
    alternates: { canonical: `/categorie/${slug}` },
  };
}

export default async function CategoriePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const categorie = await getCategorieParSlug(slug);
  if (!categorie) notFound();

  const sousCategories = await Category.find({
    parentId: categorie._id,
    active: true,
  })
    .select("_id slug nom")
    .sort({ ordre: 1, nom: 1 })
    .lean();

  const categorieIds = [
    String(categorie._id),
    ...sousCategories.map((s) => String(s._id)),
  ];

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
    categorieIds,
  };

  const [resultat, arbre, typesLivraison] = await Promise.all([
    getProduits(requete),
    getArbreCategories(),
    getTypesLivraison(),
  ]);

  const produits = resultat.produits.map(produireProduitVue);
  const chemin = `/categorie/${slug}`;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "/" },
              {
                "@type": "ListItem",
                position: 2,
                name: "Produits",
                item: "/produits",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: categorie.nom,
              },
            ],
          }),
        }}
      />
      <FilAriane
        items={[{ libelle: "Produits", href: "/produits" }, { libelle: categorie.nom }]}
      />

      {/* ═══ CATEGORY HERO BANNER (Perrier Bois-style) ═══ */}
      <div className="mb-8 rounded-2xl border border-border bg-gradient-to-br from-accent via-card to-card p-6 shadow-[0_1px_2px_rgba(42,33,27,0.03)] sm:p-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          {categorie.nom}
        </h1>
        {categorie.description && (
          <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">
            {categorie.description}
          </p>
        )}

        {/* Sous-catégories pills (Perrier Bois shows these as inline links) */}
        {sousCategories.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {sousCategories.map((sous) => (
              <Link
                key={String(sous._id)}
                href={`/categorie/${slug}/${sous.slug}`}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-4 py-1.5 text-[13px] font-medium text-muted-foreground transition-all hover:border-primary/40 hover:bg-accent hover:text-primary"
              >
                {sous.nom}
                <FaArrowRight className="size-3 opacity-0 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
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
              <span className="font-bold text-foreground">{resultat.total}</span> produit{resultat.total > 1 ? "s" : ""} trouvé{resultat.total > 1 ? "s" : ""}
            </p>
            <TriSelect chemin={chemin} params={entrees} />
          </div>

          {/* Product Grid */}
          <ProductGrid produits={produits} />

          {/* Pagination */}
          <Pagination
            chemin={chemin}
            params={entrees}
            page={resultat.page}
            pagesTotales={resultat.pagesTotales}
          />
        </div>
      </div>
    </div>
  );
}