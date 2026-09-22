"use client";
import { FaCircle, FaPenToSquare, FaTrashCan, FaUpload, FaSpinner } from "react-icons/fa6";
import { useState, useEffect } from "react";


interface Banniere {
  _id: string;
  titre: string;
  sousTitre: string;
  image: string;
  lienBouton: string;
  texteBouton: string;
  ordre: number;
  actif: boolean;
  dateDebut: string | null;
  dateFin: string | null;
}

interface Formulaire {
  titre: string;
  sousTitre: string;
  image: string;
  lienBouton: string;
  texteBouton: string;
  ordre: number;
  actif: boolean;
  dateDebut: string;
  dateFin: string;
}

const FORMULAIRE_VIDE: Formulaire = {
  titre: "",
  sousTitre: "",
  image: "",
  lienBouton: "",
  texteBouton: "Entdecken",
  ordre: 0,
  actif: true,
  dateDebut: "",
  dateFin: "",
};

const champClasse =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15";

export function GestionBannieres() {
  const [bannieres, setBannieres] = useState<Banniere[]>([]);
  const [formulaire, setFormulaire] = useState<Formulaire>(FORMULAIRE_VIDE);
  const [edition, setEdition] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);
  const [message, setMessage] = useState<{
    type: "succes" | "erreur";
    texte: string;
  } | null>(null);

  const charger = async () => {
    const res = await fetch("/api/banners", { cache: "no-store" });
    const donnees = await res.json();
    if (!donnees.succes) return;
    setBannieres(donnees.donnees.bannieres);
  };

  useEffect(() => {
    let annule = false;
    (async () => {
      const res = await fetch("/api/banners", { cache: "no-store" });
      const donnees = await res.json();
      if (annule || !donnees.succes) return;
      setBannieres(donnees.donnees.bannieres);
    })();
    return () => {
      annule = true;
    };
  }, []);

  const editer = (banniere: Banniere) => {
    setEdition(banniere._id);
    setFormulaire({
      titre: banniere.titre,
      sousTitre: banniere.sousTitre,
      image: banniere.image,
      lienBouton: banniere.lienBouton,
      texteBouton: banniere.texteBouton,
      ordre: banniere.ordre,
      actif: banniere.actif,
      dateDebut: banniere.dateDebut
        ? banniere.dateDebut.slice(0, 10)
        : "",
      dateFin: banniere.dateFin ? banniere.dateFin.slice(0, 10) : "",
    });
    setMessage(null);
  };

  const reinitialiser = () => {
    setEdition(null);
    setFormulaire(FORMULAIRE_VIDE);
    setMessage(null);
  };

  const importerImage = async (fichier: File) => {
    const donnees = new FormData();
    donnees.append("fichier", fichier);
    const res = await fetch("/api/upload", { method: "POST", body: donnees });
    const resultat = await res.json();
    if (resultat.succes) {
      setFormulaire((f) => ({ ...f, image: resultat.donnees.url }));
    } else {
      setMessage({ type: "erreur", texte: resultat.erreur });
    }
  };

  const enregistrer = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnCours(true);
    setMessage(null);

    const corps = {
      ...formulaire,
      ordre: Number(formulaire.ordre || 0),
      dateDebut: formulaire.dateDebut ? new Date(formulaire.dateDebut).toISOString() : null,
      dateFin: formulaire.dateFin ? new Date(formulaire.dateFin).toISOString() : null,
    };

    const res = await fetch(
      edition ? `/api/banners/${edition}` : "/api/banners",
      {
        method: edition ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corps),
      },
    );
    const donnees = await res.json().catch(() => null);

    if (!donnees?.succes) {
      setMessage({
        type: "erreur",
        texte: donnees?.erreur ?? "Une erreur est survenue.",
      });
      setEnCours(false);
      return;
    }

    setMessage({ type: "succes", texte: "Bannière enregistrée." });
    setEnCours(false);
    reinitialiser();
    void charger();
  };

  const supprimer = async (id: string) => {
    if (!confirm("Supprimer cette bannière ?")) return;
    const res = await fetch(`/api/banners/${id}`, { method: "DELETE" });
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
      <h1 className="text-2xl font-bold">Carrousel de la page d'accueil</h1>

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
          {edition ? "Modifier la bannière" : "Nouvelle bannière"}
        </h2>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Titre</span>
          <input
            value={formulaire.titre}
            onChange={(e) =>
              setFormulaire((f) => ({ ...f, titre: e.target.value }))
            }
            className={champClasse}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Sous-titre</span>
          <input
            value={formulaire.sousTitre}
            onChange={(e) =>
              setFormulaire((f) => ({ ...f, sousTitre: e.target.value }))
            }
            className={champClasse}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-medium">Lien du bouton</span>
          <input
            value={formulaire.lienBouton}
            onChange={(e) =>
              setFormulaire((f) => ({ ...f, lienBouton: e.target.value }))
            }
            placeholder="/produits, /promotions…"
            className={champClasse}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">
            Texte du bouton
          </span>
          <input
            value={formulaire.texteBouton}
            onChange={(e) =>
              setFormulaire((f) => ({ ...f, texteBouton: e.target.value }))
            }
            className={champClasse}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Ordre</span>
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
        <label className="block">
          <span className="mb-1 block text-sm font-medium">
            Date de début (optionnel)
          </span>
          <input
            type="date"
            value={formulaire.dateDebut}
            onChange={(e) =>
              setFormulaire((f) => ({ ...f, dateDebut: e.target.value }))
            }
            className={champClasse}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">
            Date de fin (optionnel)
          </span>
          <input
            type="date"
            value={formulaire.dateFin}
            onChange={(e) =>
              setFormulaire((f) => ({ ...f, dateFin: e.target.value }))
            }
            className={champClasse}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-medium">Image</span>
          <div className="flex flex-wrap items-center gap-3">
            {formulaire.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={formulaire.image}
                alt=""
                className="h-16 rounded border object-cover"
              />
            )}
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm transition-colors hover:bg-muted">
              <FaUpload className="size-4" />
              Importer
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const fichier = e.target.files?.[0];
                  if (fichier) void importerImage(fichier);
                  e.target.value = "";
                }}
              />
            </label>
          </div>
        </label>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input
            type="checkbox"
            checked={formulaire.actif}
            onChange={(e) =>
              setFormulaire((f) => ({ ...f, actif: e.target.checked }))
            }
          />
          Bannière active
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
        {bannieres.map((banniere) => (
          <li
            key={banniere._id}
            className="flex items-center justify-between gap-2 rounded-xl border border-border px-3 py-2 text-sm"
          >
            <div className="flex min-w-0 items-center gap-3">
              {banniere.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={banniere.image}
                  alt=""
                  className="h-10 w-16 rounded object-cover"
                />
              ) : (
                <span className="h-10 w-16 rounded bg-muted" />
              )}
              <span className="min-w-0">
                <span className="block truncate font-medium">
                  {banniere.titre || "Sans titre"}
                </span>
                <span className="text-xs text-muted-foreground">
                  Ordre {banniere.ordre}
                  {!banniere.actif && " · Inactive"}
                </span>
              </span>
            </div>
            <span className="flex shrink-0 gap-1">
              <button
                type="button"
                aria-label="Modifier"
                onClick={() => editer(banniere)}
                className="rounded-lg border border-border p-1.5 transition-colors hover:bg-muted"
              >
                <FaPenToSquare className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Supprimer"
                onClick={() => void supprimer(banniere._id)}
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