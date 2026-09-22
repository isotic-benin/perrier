"use client";
import { FaCircle, FaPenToSquare, FaTrashCan, FaSpinner } from "react-icons/fa6";
import { useState, useEffect } from "react";


interface Faq {
  _id: string;
  question: string;
  reponse: string;
  categorie: string;
  ordre: number;
  actif: boolean;
}

interface Formulaire {
  question: string;
  reponse: string;
  categorie: string;
  ordre: number;
  actif: boolean;
}

const FORMULAIRE_VIDE: Formulaire = {
  question: "",
  reponse: "",
  categorie: "Allgemein",
  ordre: 0,
  actif: true,
};

const champClasse =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15";

export function GestionFaq() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [formulaire, setFormulaire] = useState<Formulaire>(FORMULAIRE_VIDE);
  const [edition, setEdition] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);
  const [message, setMessage] = useState<{
    type: "succes" | "erreur";
    texte: string;
  } | null>(null);

  const charger = async () => {
    const res = await fetch("/api/faq?tous=1", { cache: "no-store" });
    const donnees = await res.json();
    if (!donnees.succes) return;
    setFaqs(donnees.donnees.faqs);
  };

  useEffect(() => {
    let annule = false;
    (async () => {
      const res = await fetch("/api/faq?tous=1", { cache: "no-store" });
      const donnees = await res.json();
      if (annule || !donnees.succes) return;
      setFaqs(donnees.donnees.faqs);
    })();
    return () => {
      annule = true;
    };
  }, []);

  const editer = (faq: Faq) => {
    setEdition(faq._id);
    setFormulaire({
      question: faq.question,
      reponse: faq.reponse,
      categorie: faq.categorie,
      ordre: faq.ordre,
      actif: faq.actif,
    });
    setMessage(null);
  };

  const reinitialiser = () => {
    setEdition(null);
    setFormulaire(FORMULAIRE_VIDE);
    setMessage(null);
  };

  const enregistrer = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnCours(true);
    setMessage(null);

    const res = await fetch(
      edition ? `/api/faq/${edition}` : "/api/faq",
      {
        method: edition ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formulaire,
          ordre: Number(formulaire.ordre || 0),
        }),
      },
    );
    const donnees = await res.json().catch(() => null);

    if (!donnees?.succes) {
      setMessage({
        type: "erreur",
        texte: donnees?.erreur ?? "Une erreur s'est produite.",
      });
      setEnCours(false);
      return;
    }

    setMessage({ type: "succes", texte: "Frage gespeichert." });
    setEnCours(false);
    reinitialiser();
    void charger();
  };

  const supprimer = async (id: string) => {
    if (!confirm("Supprimer cette question ?")) return;
    const res = await fetch(`/api/faq/${id}`, { method: "DELETE" });
    const donnees = await res.json().catch(() => null);
    if (!donnees?.succes) {
      setMessage({
        type: "erreur",
        texte: donnees?.erreur ?? "Suppression impossible.",
      });
      return;
    }
    void charger();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">FAQ</h1>

      {message && (
        <p
          className={
            message.type === "succes"
              ? "mt-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
              : "mt-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
          }
        >
          {message.texte}
        </p>
      )}

      <form
        onSubmit={enregistrer}
        className="mt-6 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2"
      >
        <h2 className="font-semibold sm:col-span-2">
          {edition ? "Frage bearbeiten" : "Neue Frage"}
        </h2>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-medium">Frage *</span>
          <input
            value={formulaire.question}
            onChange={(e) =>
              setFormulaire((f) => ({ ...f, question: e.target.value }))
            }
            required
            className={champClasse}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-medium">Antwort *</span>
          <textarea
            value={formulaire.reponse}
            onChange={(e) =>
              setFormulaire((f) => ({ ...f, reponse: e.target.value }))
            }
            rows={4}
            required
            className={champClasse}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Catégorie</span>
          <input
            value={formulaire.categorie}
            onChange={(e) =>
              setFormulaire((f) => ({ ...f, categorie: e.target.value }))
            }
            className={champClasse}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Reihenfolge</span>
          <input
            type="number"
            min="0"
            value={formulaire.ordre}
            onChange={(e) =>
              setFormulaire((f) => ({
                ...f,
                ordre: Number(e.target.value),
              }))
            }
            className={champClasse}
          />
        </label>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input
            type="checkbox"
            checked={formulaire.actif}
            onChange={(e) =>
              setFormulaire((f) => ({ ...f, actif: e.target.checked }))
            }
          />
          Frage auf der Website sichtbar
        </label>
        <div className="flex gap-2 sm:col-span-2">
          <button
            type="submit"
            disabled={enCours}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-18px_rgba(178,107,30,0.9)] transition-colors hover:bg-[#8f5414] disabled:opacity-60"
          >
            {enCours ? <FaSpinner className="size-4 animate-spin" aria-hidden /> : null}
            <span>{edition ? "Enregistrer" : "Créer"}</span>
          </button>
          {edition && (
            <button
              type="button"
              onClick={reinitialiser}
              className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <ul className="mt-6 space-y-2">
        {faqs.map((faq) => (
          <li
            key={faq._id}
            className="flex items-start justify-between gap-2 rounded-xl border border-border px-3 py-2 text-sm"
          >
            <div className="min-w-0">
              <p className="font-medium">{faq.question}</p>
              <p className="text-xs text-muted-foreground">
                {faq.categorie}
                {!faq.actif && " · Ausgeblendet"}
              </p>
            </div>
            <span className="flex shrink-0 gap-1">
              <button
                type="button"
                aria-label="Modifier"
                onClick={() => editer(faq)}
                className="rounded-lg border border-border p-1.5 transition-colors hover:bg-muted"
              >
                <FaPenToSquare className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Supprimer"
                onClick={() => void supprimer(faq._id)}
                className="rounded-lg border border-border p-1.5 transition-colors hover:bg-muted"
              >
                <FaTrashCan className="size-4" />
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}