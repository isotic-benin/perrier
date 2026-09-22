"use client";

import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

interface DeleteProduitButtonProps {
  produitId: string;
  nomProduit: string;
}

export function DeleteProduitButton({ produitId, nomProduit }: DeleteProduitButtonProps) {
  const [enCours, setEnCours] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Supprimer « ${nomProduit} » ?`)) return;
    setEnCours(true);
    try {
      const res = await fetch(`/api/produits/${produitId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.succes) {
        window.location.reload();
      }
    } catch {
      alert("Erreur lors de la suppression");
    } finally {
      setEnCours(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={enCours}
      className="rounded-full border border-border px-2.5 py-1 text-xs text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-60"
    >
      {enCours ? (
        <>
          <FaTrashCan className="size-3 animate-spin mr-1" /> Suppression…
        </>
      ) : (
        "Supprimer"
      )}
    </button>
  );
}