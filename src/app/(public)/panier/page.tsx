"use client";
import { FaArrowRight, FaMinus, FaPlus, FaCartShopping, FaTrashCan, FaImage } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

import { usePanier } from "@/hooks/use-panier";
import { calculerSousTotal, nombreArticles } from "@/store/cart";
import { formaterPrix } from "@/lib/format";
import { SEUIL_LIVRAISON_GRATUITE } from "@/lib/livraison";

export default function PanierPage() {
  const { articles, modifierQuantite, retirer } = usePanier();

  const sousTotal = calculerSousTotal(articles);
  const totalArticles = nombreArticles(articles);
  const restePourGratuit = Math.max(0, SEUIL_LIVRAISON_GRATUITE - sousTotal);

  if (articles.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-accent">
          <FaCartShopping className="size-8 text-primary" />
        </div>
        <h1 className="mb-2 text-3xl font-bold">Votre panier est vide</h1>
        <p className="mb-8 text-muted-foreground">
          Parcourez notre catalogue et ajoutez vos produits préférés.
        </p>
        <Link
          href="/produits"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-18px_rgba(178,107,30,0.9)] transition-colors hover:bg-[#8f5414]"
        >
          Découvrir les produits <FaArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Mon panier</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <ul className="space-y-3">
          {articles.map((article) => (
            <li
              key={`${article.produitId}-${article.variante}`}
              className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-[0_1px_2px_rgba(42,33,27,0.03)] transition-shadow hover:shadow-[0_18px_40px_-30px_rgba(42,33,27,0.4)]"
            >
              <Link
                href={`/produits/${article.slug}`}
                className="relative block h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted"
              >
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.nom}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-2xl text-muted-foreground">
                    🛍️
                  </span>
                )}
              </Link>

              <div className="flex flex-1 flex-col gap-1">
                <Link
                  href={`/produits/${article.slug}`}
                  className="line-clamp-2 font-semibold transition-colors hover:text-primary"
                >
                  {article.nom}
                </Link>
                {article.variante && (
                  <p className="text-xs text-muted-foreground">
                    {article.variante}
                  </p>
                )}
                <p className="text-sm font-semibold">
                  {formaterPrix(article.prixUnitaire)}
                </p>

                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center rounded-full border border-border bg-background p-0.5">
                    <button
                      type="button"
                      aria-label="Diminuer"
                      className="flex size-7 items-center justify-center rounded-full transition-colors hover:bg-accent disabled:opacity-40"
                      onClick={() =>
                        modifierQuantite(
                          article.produitId,
                          article.variante,
                          article.quantite - 1,
                        )
                      }
                      disabled={article.quantite <= 1}
                    >
                      <FaMinus className="size-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {article.quantite}
                    </span>
                    <button
                      type="button"
                      aria-label="Augmenter"
                      className="flex size-7 items-center justify-center rounded-full transition-colors hover:bg-accent disabled:opacity-40"
                      onClick={() =>
                        modifierQuantite(
                          article.produitId,
                          article.variante,
                          article.quantite + 1,
                        )
                      }
                      disabled={article.quantite >= article.stock}
                    >
                      <FaPlus className="size-3" />
                    </button>
                  </div>

                  <button
                    type="button"
                    aria-label="Retirer du panier"
                    className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    onClick={() =>
                      retirer(article.produitId, article.variante)
                    }
                  >
                    <FaTrashCan className="size-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="sticky top-[130px] h-fit rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(42,33,27,0.03)]">
          <h2 className="mb-4 text-lg font-semibold">Récapitulatif</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Articles ({totalArticles})</dt>
              <dd className="font-medium">{formaterPrix(sousTotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Livraison</dt>
              <dd className="text-muted-foreground">
                Calculée à l'étape suivante
              </dd>
            </div>
          </dl>

          {restePourGratuit > 0 && (
            <p className="mt-4 rounded-xl bg-accent px-3.5 py-2.5 text-xs text-muted-foreground">
              Plus que <strong className="text-foreground">{formaterPrix(restePourGratuit)}</strong> pour la
              livraison gratuite.
            </p>
          )}

          <Link
            href="/commande"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-18px_rgba(178,107,30,0.9)] transition-colors hover:bg-[#8f5414]"
          >
            Passer à la caisse <FaArrowRight className="size-4" />
          </Link>
          <Link
            href="/produits"
            className="mt-3 block text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Continuer mes achats
          </Link>
        </aside>
      </div>
    </div>
  );
}