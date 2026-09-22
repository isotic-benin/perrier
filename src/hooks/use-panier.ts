"use client";
import { useCallback } from "react";
import { useCartStore, type ArticlePanier } from "@/store/cart";

export function usePanier() {
  const articles = useCartStore((s) => s.articles);

  const ajouter = useCallback(
    (article: Omit<ArticlePanier, "quantite"> & { quantite?: number }) => {
      useCartStore.getState().ajouter(article);
    },
    [],
  );

  const modifierQuantite = useCallback(
    (produitId: string, variante: string, quantite: number) => {
      useCartStore.getState().modifierQuantite(produitId, variante, quantite);
    },
    [],
  );

  const retirer = useCallback(
    (produitId: string, variante: string) => {
      useCartStore.getState().retirer(produitId, variante);
    },
    [],
  );

  const vider = useCallback(() => {
    useCartStore.getState().vider();
  }, []);

  return { articles, ajouter, modifierQuantite, retirer, vider };
}