"use client";
import { FaCircle, FaStar, FaXmark, FaCheck } from "react-icons/fa6";
import { useState, useEffect } from "react";


interface AvisAdmin {
  _id: string;
  note: number;
  commentaire: string;
  statut: "en_attente" | "approuve" | "rejete";
  achatVerifie: boolean;
  dateCreation: string;
  reponseAdmin: string;
  produit: { nom: string; slug: string } | null;
  auteur: string;
}

const LIBELLES_STATUTS: Record<string, string> = {
  en_attente: "En attente",
  approuve: "Publié",
  rejete: "Rejeté",
};

export function GestionAvis() {
  const [avisListe, setAvisListe] = useState<AvisAdmin[]>([]);
  const [chargement, setChargement] = useState(true);
  const [reponses, setReponses] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{
    type: "succes" | "erreur";
    texte: string;
  } | null>(null);

  useEffect(() => {
    let annule = false;
    (async () => {
      const res = await fetch("/api/avis?tous=1", { cache: "no-store" });
      const donnees = await res.json();
      if (annule || !donnees.succes) return;
      setAvisListe(donnees.donnees.avis);
      setChargement(false);
    })();
    return () => {
      annule = true;
    };
  }, []);

  const moderer = async (
    id: string,
    statut: AvisAdmin["statut"],
    reponseAdmin?: string,
  ) => {
    setMessage(null);
    const res = await fetch(`/api/avis/${id}/moderer`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        statut,
        reponseAdmin: reponseAdmin ?? "",
      }),
    });
    const donnees = await res.json().catch(() => null);
    if (!donnees?.succes) {
      setMessage({
        type: "erreur",
        texte: donnees?.erreur ?? "Une erreur est survenue.",
      });
      return;
    }
    setAvisListe((liste) =>
      liste.map((a) =>
        a._id === id
          ? { ...a, statut, reponseAdmin: reponseAdmin ?? a.reponseAdmin }
          : a,
      ),
    );
    setMessage({ type: "succes", texte: "Avis mis à jour." });
  };

  if (chargement) {
    return <p className="text-muted-foreground">Chargement des avis…</p>;
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Avis clients</h1>

      {message && (
        <p
          className={
            message.type === "succes"
              ? "mb-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
              : "mb-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
          }
        >
          {message.texte}
        </p>
      )}

      {avisListe.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Aucun avis.
        </p>
      ) : (
        <ul className="space-y-3">
          {avisListe.map((avis) => (
            <li key={avis._id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium">{avis.auteur}</p>
                  <p className="text-xs text-muted-foreground">
                    {avis.produit?.nom ?? "Produit"} ·{" "}
                    {new Date(avis.dateCreation).toLocaleDateString("fr-FR")}
                    {avis.achatVerifie && (
                      <span className="ml-1 rounded-full bg-emerald-50 px-1 py-0.5 text-emerald-700">
                        Achat vérifié
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <FaStar
                        key={n}
                        className={
                          n <= avis.note
                            ? "size-4 fill-amber-400 text-amber-400"
                            : "size-4 text-muted-foreground"
                        }
                      />
                    ))}
                  </span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                    {LIBELLES_STATUTS[avis.statut]}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {avis.commentaire}
              </p>

              {avis.statut === "approuve" && (
                <div className="mt-3 border-t pt-3">
                  <textarea
                    placeholder="Réponse publique de la boutique…"
                    value={reponses[avis._id] ?? avis.reponseAdmin ?? ""}
                    onChange={(e) =>
                      setReponses((r) => ({ ...r, [avis._id]: e.target.value }))
                    }
                    rows={2}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      void moderer(
                        avis._id,
                        "approuve",
                        reponses[avis._id] ?? "",
                      )
                    }
                    className="mt-2 rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
                  >
                    Enregistrer la réponse
                  </button>
                </div>
              )}

              {avis.statut !== "approuve" && (
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => void moderer(avis._id, "approuve")}
                    className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
                  >
                    <FaCheck className="size-4" />
                    Approuver
                  </button>
                  <button
                    type="button"
                    onClick={() => void moderer(avis._id, "rejete")}
                    className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
                  >
                    <FaXmark className="size-4" />
                    Rejeter
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}