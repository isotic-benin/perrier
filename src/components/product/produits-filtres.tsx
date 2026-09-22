import Link from "next/link";
import { FaXmark, FaChevronRight, FaMinus } from "react-icons/fa6";
import type { CategorieArbre } from "@/lib/categories";
import { construireURL } from "@/lib/url";

interface Props {
  chemin: string;
  params: Record<string, string | undefined>;
  categories: CategorieArbre[];
  typesLivraison: Array<{ typeLivraison: string; nombre: number }>;
}

const labelsLivraison: Record<string, string> = {
  retrait: "Retrait",
  livraison_portail: "Livraison au portail",
  livraison_garage: "Livraison au garage"
};

export function ProduitsFiltres({ chemin, params, categories, typesLivraison }: Props) {
  const aUnFiltre =
    params.typeLivraison !== undefined ||
    params.prixMin !== undefined ||
    params.prixMax !== undefined ||
    params.noteMin !== undefined ||
    params.enPromotion !== undefined ||
    params.enStock !== undefined ||
    params.recherche !== undefined;

  const lienCat = (slug: string) => `/categorie/${slug}`;

  // Helper to determine if a category/subcategory is the current one path-wise
  const isPathActive = (slug: string) => chemin.includes(`/categorie/${slug}`);

  return (
    <aside className="space-y-6">
      {aUnFiltre && (
        <Link
          href={chemin}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-destructive transition-colors hover:text-[#8f2620]"
        >
          <FaXmark className="size-4" /> Réinitialiser les filtres
        </Link>
      )}

      {/* ═══ CATEGORIES TREE ═══ */}
      <div>
        <h2 className="mb-3 border-b border-border pb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-foreground">
          Catégories
        </h2>
        <ul className="space-y-1.5 mt-4">
          <li className="mb-2">
            <Link
              href="/produits"
              className={`text-[14px] transition-colors ${chemin === "/produits" ? "font-bold text-[#b26b1e]" : "text-[#1c1917] hover:text-[#b26b1e] font-medium"}`}
            >
              Tous les produits
            </Link>
          </li>
          {categories.map((cat) => {
            const catActive = isPathActive(cat.slug);
            return (
              <li key={cat._id} className="pt-1">
                <Link
                  href={lienCat(cat.slug)}
                  className={`flex items-start gap-2 text-[14px] transition-colors ${catActive ? "font-bold text-[#b26b1e]" : "text-[#1c1917] font-medium hover:text-[#b26b1e]"}`}
                >
                  <FaMinus className={`size-3 mt-1 shrink-0 ${catActive ? "text-[#b26b1e]" : "text-[#d6cbbb]"}`} />
                  {cat.nom}
                </Link>

                {/* Subcategories */}
                {cat.sousCategories.length > 0 && catActive && (
                  <ul className="mb-2 ml-5 mt-2 space-y-2 border-l-2 border-border pl-4">
                    {cat.sousCategories.map((sous) => {
                      const sousActive = isPathActive(sous.slug);
                      return (
                        <li key={sous._id}>
                          <Link
                            href={lienCat(`${cat.slug}/${sous.slug}`)}
                            className={`flex items-start gap-1.5 text-[14px] transition-colors ${sousActive ? "font-bold text-[#b26b1e]" : "text-[#7c7469] hover:text-[#2a211b]"}`}
                          >
                            <FaChevronRight className={`size-3 mt-0.5 shrink-0 ${sousActive ? "opacity-100" : "opacity-0"}`} />
                            {sous.nom}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* ═══ TYPE DE LIVRAISON ═══ */}
      {typesLivraison.length > 0 && (
        <div>
          <h2 className="mb-3 border-b border-border pb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-foreground">
            Mode de livraison
          </h2>
          <ul className="space-y-2 mt-4 text-[14px]">
            {typesLivraison.map(({ typeLivraison }) => (
              <li key={typeLivraison}>
                <Link
                  href={construireURL(chemin, params, {
                    typeLivraison,
                    page: undefined,
                  })}
                  className={
                    params.typeLivraison === typeLivraison
                      ? "flex items-center gap-2 font-bold text-primary"
                      : "flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  }
                >
                  <div className={`size-4 rounded-md border ${params.typeLivraison === typeLivraison ? 'border-primary bg-primary' : 'border-input'} flex items-center justify-center`}>
                    {params.typeLivraison === typeLivraison && <FaXmark className="size-2.5 text-white" />}
                  </div>
                  {labelsLivraison[typeLivraison] || typeLivraison}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ═══ PRIX ═══ */}
      <div>
        <h2 className="mb-3 border-b border-border pb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-foreground">
          Prix
        </h2>
        <form
          action={chemin}
          method="get"
          className="flex items-center gap-2 mt-4"
        >
          <input
            type="number"
            name="prixMin"
            min="0"
            defaultValue={params.prixMin ?? ""}
            placeholder="Min€"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-[14px] outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
            aria-label="Prix minimum"
          />
          <span className="text-muted-foreground">-</span>
          <input
            type="number"
            name="prixMax"
            min="0"
            defaultValue={params.prixMax ?? ""}
            placeholder="Max€"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-[14px] outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
            aria-label="Prix maximum"
          />
          <button
            type="submit"
            className="h-10 shrink-0 rounded-full bg-primary px-4 text-[13px] font-bold uppercase text-primary-foreground shadow-[0_14px_30px_-18px_rgba(178,107,30,0.9)] transition-colors hover:bg-[#8f5414]"
          >
            Go
          </button>
        </form>
      </div>

      {/* ═══ DISPONIBILITÉ ═══ */}
      <div>
        <h2 className="mb-3 border-b border-border pb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-foreground">
          Disponibilité
        </h2>
        <ul className="space-y-2 mt-4 text-[14px]">
          <li>
            <Link
              href={construireURL(chemin, params, {
                enStock: params.enStock === "true" ? undefined : "true",
                page: undefined,
              })}
              className={
                params.enStock === "true"
                  ? "flex items-center gap-2 font-bold text-primary"
                  : "flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              <div className={`size-4 rounded-md border ${params.enStock === 'true' ? 'border-primary bg-primary' : 'border-input'} flex items-center justify-center`}>
                {params.enStock === 'true' && <FaXmark className="size-2.5 text-white" />}
              </div>
              En stock
            </Link>
          </li>
          <li>
            <Link
              href={construireURL(chemin, params, {
                enPromotion: params.enPromotion === "true" ? undefined : "true",
                page: undefined,
              })}
              className={
                params.enPromotion === "true"
                  ? "flex items-center gap-2 font-bold text-primary"
                  : "flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              <div className={`size-4 rounded-md border ${params.enPromotion === 'true' ? 'border-primary bg-primary' : 'border-input'} flex items-center justify-center`}>
                {params.enPromotion === 'true' && <FaXmark className="size-2.5 text-white" />}
              </div>
              En promotion
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}