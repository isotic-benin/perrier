import Link from "next/link";
import { FaChevronDown, FaMagnifyingGlass, FaLock, FaUser, FaTree } from "react-icons/fa6";
import { getSession } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { getArbreCategories } from "@/lib/categories";
import { Button } from "@/components/ui/button";
import { DeconnexionButton } from "./deconnexion-button";
import { LienPanier } from "@/components/panier/lien-panier";
import { DepotHeaderLink } from "./depot-header-link";

export async function Header() {
  const session = await getSession();
  const user = session?.user;
  const categories = await getArbreCategories();

  const lienCompte = user?.role === ROLES.GERANT ? "/gerant" : "/admin";

  return (
    <header className="w-full sticky top-0 z-50">
      {/* ═══ TIER 1 — Promo Banner ═══ */}
      <div className="w-full bg-secondary text-secondary-foreground">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-2.5 text-[12px] font-semibold tracking-[0.08em] uppercase sm:px-6">
          <p className="hidden sm:block text-secondary-foreground/70">
            Les meilleurs prix du moment —{" "}
            <span className="text-[#d99a2b]">Promo</span>
          </p>
          <div className="flex items-center gap-6 mx-auto sm:mx-0">
            <Link
              href="/produits"
              className="flex items-center gap-1.5 text-[#e0a95a] font-bold hover:text-[#f0c07a] transition-colors"
            >
              En profiter →
            </Link>
            <DepotHeaderLink />
          </div>
        </div>
      </div>

      {/* ═══ TIER 2 — Main Bar ═══ */}
      <div className="w-full border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          {/* LOGO */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Perrier Bois"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_14px_28px_-16px_rgba(178,107,30,0.9)] transition-transform group-hover:-rotate-6">
              <FaTree className="size-[18px]" />
            </span>
            <span className="font-heading text-[26px] font-bold leading-none tracking-[-0.02em] text-foreground">
              Perrier<span className="text-primary">Bois</span>
            </span>
          </Link>

          {/* SEARCH (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form action="/recherche" method="get" className="flex w-full">
              <div className="relative flex w-full items-center">
                <input
                  type="search"
                  name="recherche"
                  placeholder="Rechercher un produit..."
                  aria-label="Rechercher un produit"
                  className="h-11 w-full rounded-full border border-border bg-card pl-5 pr-14 text-[14px] text-foreground placeholder:text-muted-foreground/70 shadow-[inset_0_1px_2px_rgba(42,33,27,0.04)] transition-all focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                />
                <button
                  type="submit"
                  aria-label="Rechercher un produit"
                  className="absolute right-1.5 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-[#8f5414]"
                >
                  <FaMagnifyingGlass className="size-[15px]" />
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {user ? (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="hidden sm:inline-flex items-center gap-2 rounded-full text-foreground/80 hover:bg-accent hover:text-foreground"
                >
                  <Link href={lienCompte}>
                    <FaUser className="size-[15px]" />
                    {user.name?.split(" ")[0] ?? "Mon compte"}
                  </Link>
                </Button>
                <DeconnexionButton />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden sm:inline-flex items-center gap-2 rounded-full text-foreground/80 hover:bg-accent hover:text-foreground"
              >
                <Link href="/admin/login">
                  <FaLock className="size-[15px]" />
                  Administration
                </Link>
              </Button>
            )}

            <span className="mx-1 hidden h-6 w-px bg-border sm:block" />
            <LienPanier />
          </div>
        </div>

        {/* SEARCH (Mobile) */}
        <div className="px-4 pb-3.5 md:hidden">
          <form action="/recherche" method="get" className="flex w-full">
            <div className="relative flex w-full items-center">
              <input
                type="search"
                name="recherche"
                placeholder="Rechercher..."
                className="h-11 w-full rounded-full border border-border bg-card pl-4 pr-14 text-[14px] placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
              />
              <button
                type="submit"
                aria-label="Rechercher un produit"
                className="absolute right-1.5 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <FaMagnifyingGlass className="size-[15px]" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ═══ TIER 3 — Category Nav ═══ */}
      <div className="w-full border-b border-border bg-card/70 backdrop-blur-xl">
        <nav className="mx-auto max-w-[1400px] overflow-x-auto no-scrollbar xl:overflow-visible">
          <ul className="flex w-full items-center justify-between gap-0 px-4 text-[13.5px] font-semibold text-foreground/80 whitespace-nowrap sm:px-6">
            <li>
              <Link
                href="/produits"
                className="inline-flex h-[48px] items-center px-4 text-foreground/70 transition-colors hover:text-primary"
              >
                Tous les produits
              </Link>
            </li>
            {categories.slice(0, 3).map((cat) => (
              <li key={cat._id} className="relative group">
                <Link
                  href={`/categorie/${cat.slug}`}
                  className="inline-flex h-[48px] items-center gap-1.5 px-4 text-foreground/70 transition-colors hover:text-primary"
                >
                  {cat.nom}
                  {cat.sousCategories.length > 0 && (
                    <FaChevronDown className="size-3 text-muted-foreground/60 transition-colors group-hover:text-primary" />
                  )}
                </Link>
                {cat.sousCategories.length > 0 && (
                  <div className="invisible absolute left-0 top-full z-50 min-w-[260px] translate-y-2 rounded-2xl border border-border bg-card p-2 opacity-0 shadow-[0_24px_60px_-24px_rgba(42,33,27,0.4)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <ul>
                      {cat.sousCategories.map((sous) => (
                        <li key={sous._id}>
                          <Link
                            href={`/categorie/${cat.slug}/${sous.slug}`}
                            className="block rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-foreground/75 transition-colors hover:bg-accent hover:text-primary"
                          >
                            {sous.nom}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
            {categories.length > 3 && (
              <li className="relative group">
                <button
                  type="button"
                  className="inline-flex h-[48px] items-center gap-1.5 px-2 text-[13.5px] font-semibold text-foreground/70 transition-colors hover:text-primary xl:px-4"
                >
                  Plus
                  <FaChevronDown className="size-3 text-muted-foreground/60 transition-colors group-hover:text-primary" />
                </button>
                <div
                  className="invisible absolute top-full z-50 min-w-[280px] translate-y-2 rounded-2xl border border-border bg-card p-2 opacity-0 shadow-[0_24px_60px_-24px_rgba(42,33,27,0.4)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ left: "0" }}
                >
                  <ul>
                    {categories.slice(3).map((cat) => (
                      <li key={cat._id} className="relative group/sub">
                        <Link
                          href={`/categorie/${cat.slug}`}
                          className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-foreground/75 transition-colors hover:bg-accent hover:text-primary"
                        >
                          {cat.nom}
                          {cat.sousCategories.length > 0 && (
                            <FaChevronDown className="size-3 -rotate-90 text-muted-foreground/60" />
                          )}
                        </Link>
                        {cat.sousCategories.length > 0 && (
                          <div className="invisible absolute left-full top-0 z-50 min-w-[240px] translate-y-1 rounded-2xl border border-border bg-card p-2 opacity-0 shadow-[0_24px_60px_-24px_rgba(42,33,27,0.4)] transition-all duration-200 group-hover/sub:visible group-hover/sub:translate-y-0 group-hover/sub:opacity-100">
                            <ul>
                              {cat.sousCategories.map((sous) => (
                                <li key={sous._id}>
                                  <Link
                                    href={`/categorie/${cat.slug}/${sous.slug}`}
                                    className="block rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-foreground/75 transition-colors hover:bg-accent hover:text-primary"
                                  >
                                    {sous.nom}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )}
            <li>
              <Link
                href="/promotions"
                className="inline-flex h-[48px] items-center px-2 font-bold text-primary transition-colors hover:text-[#8f5414] xl:px-4"
              >
                Promotions
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="inline-flex h-[48px] items-center px-2 text-foreground/70 transition-colors hover:text-primary xl:px-4"
              >
                Infos &amp; FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="inline-flex h-[48px] items-center px-2 text-foreground/70 transition-colors hover:text-primary xl:px-4"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
