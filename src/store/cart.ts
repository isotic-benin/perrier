"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ArticlePanier {
  produitId: string;
  nom: string;
  slug: string;
  image: string;
  variante: string;
  prixUnitaire: number;
  quantite: number;
  stock: number;
}

export const cleArticle = (a: {
  produitId: string;
  variante: string;
}): string => `${a.produitId}::${a.variante}`;

interface EtatPanier {
  articles: ArticlePanier[];
  ajouter: (article: Omit<ArticlePanier, "quantite"> & { quantite?: number }) => void;
  modifierQuantite: (produitId: string, variante: string, quantite: number) => void;
  retirer: (produitId: string, variante: string) => void;
  vider: () => void;
  remplacer: (articles: ArticlePanier[]) => void;
}

export const useCartStore = create<EtatPanier>()(
  persist(
    (set, get) => ({
      articles: [],

      ajouter: (article) => {
        const quantiteSouhaitee =
          (article.quantite ?? 1) +
          (get().articles.find(
            (a) =>
              a.produitId === article.produitId && a.variante === article.variante,
          )?.quantite ?? 0);
        const quantite = Math.min(quantiteSouhaitee, article.stock);

        set((etat) => {
          const existe = etat.articles.some(
            (a) =>
              a.produitId === article.produitId && a.variante === article.variante,
          );
          return {
            articles: existe
              ? etat.articles.map((a) =>
                  a.produitId === article.produitId &&
                  a.variante === article.variante
                    ? { ...a, quantite }
                    : a,
                )
              : [...etat.articles, { ...article, quantite }],
          };
        });
      },

      modifierQuantite: (produitId, variante, quantite) => {
        set((etat) => ({
          articles: etat.articles
            .map((a) =>
              a.produitId === produitId && a.variante === variante
                ? {
                    ...a,
                    quantite: Math.min(
                      Math.max(1, Math.floor(quantite)),
                      a.stock,
                    ),
                  }
                : a,
            )
            .filter((a) => a.quantite > 0),
        }));
      },

      retirer: (produitId, variante) => {
        set((etat) => ({
          articles: etat.articles.filter(
            (a) => a.produitId !== produitId || a.variante !== variante,
          ),
        }));
      },

      vider: () => set({ articles: [] }),

      remplacer: (articles) => set({ articles }),
    }),
    {
      name: "panier-boutique",
      partialize: (etat) => ({ articles: etat.articles }),
    },
  ),
);

export const calculerSousTotal = (articles: ArticlePanier[]): number =>
  articles.reduce((somme, a) => somme + a.prixUnitaire * a.quantite, 0);

export const nombreArticles = (articles: ArticlePanier[]): number =>
  articles.reduce((somme, a) => somme + a.quantite, 0);