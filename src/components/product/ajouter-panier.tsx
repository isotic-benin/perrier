"use client";

import { FaCircle, FaPlus, FaCartShopping, FaMinus } from "react-icons/fa6";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { usePanier } from "@/hooks/use-panier";

interface Props {
  produitId: string;
  nom: string;
  slug: string;
  image: string;
  variante?: string;
  prixUnitaire: number;
  stock: number;
}

export function AjouterAuPanier({
  produitId,
  nom,
  slug,
  image,
  variante = "",
  prixUnitaire,
  stock,
}: Props) {
  const [quantite, setQuantite] = useState(1);
  const [enCours, setEnCours] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { ajouter } = usePanier();

  const indisponible = stock <= 0;

  const diminuer = () => setQuantite((q) => Math.max(1, q - 1));
  const augmenter = () => setQuantite((q) => Math.min(stock, q + 1));

  const ajouterAuPanier = async () => {
    setEnCours(true);
    setMessage(null);
    await ajouter({
      produitId,
      nom,
      slug,
      image,
      variante,
      prixUnitaire,
      quantite,
      stock,
    });
    setMessage("Ajouté au panier !");
    setEnCours(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-md border">
          <button
            type="button"
            onClick={diminuer}
            aria-label="Diminuer la quantité"
            className="px-3 py-2 hover:bg-muted disabled:opacity-40"
            disabled={quantite <= 1}
          >
            <FaMinus className="size-4" />
          </button>
          <span className="w-10 text-center text-sm font-medium">{quantite}</span>
          <button
            type="button"
            onClick={augmenter}
            aria-label="Augmenter la quantité"
            className="px-3 py-2 hover:bg-muted disabled:opacity-40"
            disabled={indisponible || quantite >= stock}
          >
            <FaPlus className="size-4" />
          </button>
        </div>

        <Button
          onClick={ajouterAuPanier}
          disabled={indisponible || enCours}
          className="flex-1"
        >
          <FaCartShopping className="size-4" />
          {indisponible
            ? "Rupture de stock"
            : enCours
              ? "Ajout en cours…"
              : "Ajouter au panier"}
        </Button>
      </div>
      {message && <p className="text-sm font-medium text-emerald-600">{message}</p>}
    </div>
  );
}