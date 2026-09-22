"use client";
import { FaCircle, FaSpinner } from "react-icons/fa6";
import { useState } from "react";


const champClasse =
  "w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15";

export function FormulaireContact() {
  const [formulaire, setFormulaire] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });
  const [enCours, setEnCours] = useState(false);
  const [message, setMessage] = useState<{
    type: "succes" | "erreur";
    texte: string;
  } | null>(null);

  const enregistrer = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnCours(true);
    setMessage(null);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formulaire),
    });
    const donnees = await res.json().catch(() => null);

    if (!donnees?.succes) {
      setMessage({
        type: "erreur",
        texte: donnees?.erreur ?? "Une erreur s'est produite.",
      });
      setEnCours(false);
      return;
    }

    setMessage({ type: "succes", texte: donnees.donnees.message });
    setFormulaire({ nom: "", email: "", sujet: "", message: "" });
    setEnCours(false);
  };

  return (
    <form onSubmit={enregistrer} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Votre nom *</span>
          <input
            value={formulaire.nom}
            onChange={(e) =>
              setFormulaire((f) => ({ ...f, nom: e.target.value }))
            }
            required
            className={champClasse}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">E-Mail *</span>
          <input
            type="email"
            value={formulaire.email}
            onChange={(e) =>
              setFormulaire((f) => ({ ...f, email: e.target.value }))
            }
            required
            className={champClasse}
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Sujet *</span>
        <input
          value={formulaire.sujet}
          onChange={(e) =>
            setFormulaire((f) => ({ ...f, sujet: e.target.value }))
          }
          required
          className={champClasse}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Votre message *</span>
        <textarea
          value={formulaire.message}
          onChange={(e) =>
            setFormulaire((f) => ({ ...f, message: e.target.value }))
          }
          rows={5}
          required
          className={champClasse}
        />
      </label>

      {message && (
        <p
          className={
            message.type === "succes"
              ? "rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
              : "rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
          }
        >
          {message.texte}
        </p>
      )}

      <button
        type="submit"
        disabled={enCours}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-18px_rgba(178,107,30,0.9)] transition-colors hover:bg-[#8f5414] disabled:opacity-60"
      >
        {enCours ? <FaSpinner className="size-4 animate-spin" aria-hidden /> : null}
        <span>Envoyer le message</span>
      </button>
    </form>
  );
}