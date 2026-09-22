"use client";
import { useState } from "react";
import { STATUTS_COMMANDE } from "@/lib/constants";

const LIBELLES_STATUTS: Record<string, string> = {
  en_attente: "En attente",
  confirmee: "Confirmée",
  en_preparation: "En préparation",
  expediee: "Expédiée",
  livree: "Livrée",
  annulee: "Annulée",
};

export function ChangementStatut({
  commandeId,
  statutActuel,
}: {
  commandeId: string;
  statutActuel: string;
}) {
  const [statut, setStatut] = useState(statutActuel);
  const [commentaire, setCommentaire] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [message, setMessage] = useState<{
    type: "succes" | "erreur";
    texte: string;
  } | null>(null);

  const enregistrer = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnCours(true);
    setMessage(null);

    const res = await fetch(`/api/commandes/${commandeId}/statut`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut, commentaire }),
    });
    const donnees = await res.json().catch(() => null);

    if (!donnees?.succes) {
      setMessage({
        type: "erreur",
        texte: donnees?.erreur ?? "Une erreur est survenue.",
      });
      setEnCours(false);
      return;
    }

    setMessage({ type: "succes", texte: "Statut mis à jour." });
    setCommentaire("");
    setEnCours(false);
  };

  return (
    <form onSubmit={enregistrer} className="rounded-2xl border border-border bg-card p-4">
      <h2 className="mb-3 font-semibold">Modifier le statut</h2>
      <div className="flex flex-wrap gap-2">
        <select
          value={statut}
          onChange={(e) => setStatut(e.target.value)}
          className="rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
        >
          {STATUTS_COMMANDE.map((s) => (
            <option key={s} value={s}>
              {LIBELLES_STATUTS[s]}
            </option>
          ))}
        </select>
        <input
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
          placeholder="Commentaire (optionnel)"
          className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
        />
        <button
          type="submit"
          disabled={enCours}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-18px_rgba(178,107,30,0.9)] transition-colors hover:bg-[#8f5414] disabled:opacity-60"
        >
          {enCours ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>
      {message && (
        <p
          className={
            message.type === "succes"
              ? "mt-3 text-sm text-emerald-600"
              : "mt-3 text-sm text-destructive"
          }
        >
          {message.texte}
        </p>
      )}
    </form>
  );
}