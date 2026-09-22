"use client";
import { FaCircle, FaPenToSquare, FaTrashCan, FaSpinner } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";

import { slugify } from "@/lib/slugify";

interface CategoriePlat {
  _id: string;
  nom: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
  ordre: number;
  active: boolean;
  profondeur: number;
}

interface Formulaire {
  nom: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
  ordre: number;
  active: boolean;
}

interface NoeudArbre {
  _id: string;
  nom: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
  ordre: number;
  active: boolean;
  sousCategories: NoeudArbre[];
}

function aplatirArbre(noeuds: NoeudArbre[], profondeur = 0): CategoriePlat[] {
  return noeuds.flatMap((noeud) => [
    {
      _id: noeud._id,
      nom: noeud.nom,
      slug: noeud.slug,
      description: noeud.description,
      image: noeud.image,
      parentId: noeud.parentId,
      ordre: noeud.ordre,
      active: noeud.active,
      profondeur,
    },
    ...aplatirArbre(noeud.sousCategories, profondeur + 1),
  ]);
}

const FORMULAIRE_VIDE: Formulaire = {
  nom: "",
  slug: "",
  description: "",
  image: "",
  parentId: null,
  ordre: 0,
  active: true,
};

const champClasse =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15";

export function GestionCategories() {
  const [categories, setCategories] = useState<CategoriePlat[]>([]);
  const [formulaire, setFormulaire] = useState<Formulaire>(FORMULAIRE_VIDE);
  const [edition, setEdition] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);
  const [envoiImage, setEnvoiImage] = useState(false);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{
    type: "succes" | "erreur";
    texte: string;
  } | null>(null);

  const importerImage = async (fichier: File) => {
    setEnvoiImage(true);
    setMessage(null);
    const donnees = new FormData();
    donnees.append("fichier", fichier);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: donnees });
      const resultat = await res.json();
      if (resultat.succes) {
        setFormulaire((f) => ({ ...f, image: resultat.donnees.url }));
        setMessage({ type: "succes", texte: "Image téléversée." });
      } else {
        setMessage({ type: "erreur", texte: resultat.erreur });
      }
    } catch {
      setMessage({ type: "erreur", texte: "Erreur lors de l'upload." });
    } finally {
      setEnvoiImage(false);
    }
  };

  const charger = async () => {
    const res = await fetch("/api/categories", { cache: "no-store" });
    const donnees = await res.json();
    if (!donnees.succes) return;
    setCategories(aplatirArbre(donnees.donnees));
  };

  useEffect(() => {
    let annule = false;
    (async () => {
      const res = await fetch("/api/categories", { cache: "no-store" });
      const donnees = await res.json();
      if (annule || !donnees.succes) return;
      setCategories(aplatirArbre(donnees.donnees));
    })();
    return () => {
      annule = true;
    };
  }, []);

  const editer = (categorie: CategoriePlat) => {
    setEdition(categorie._id);
    setFormulaire({
      nom: categorie.nom,
      slug: categorie.slug,
      description: categorie.description,
      image: categorie.image,
      parentId: categorie.parentId,
      ordre: categorie.ordre,
      active: categorie.active,
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

    const corps = {
      ...formulaire,
      slug: formulaire.slug || slugify(formulaire.nom),
      parentId: formulaire.parentId === "" ? null : formulaire.parentId,
      ordre: Number(formulaire.ordre || 0),
    };

    const res = await fetch(
      edition ? `/api/categories/${edition}` : "/api/categories",
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

    setMessage({ type: "succes", texte: "Catégorie enregistrée." });
    setEnCours(false);
    reinitialiser();
    void charger();
  };

  const supprimer = async (id: string) => {
    if (!confirm("Supprimer cette catégorie ?")) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
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
      <h1 className="text-2xl font-bold">Catégories</h1>

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
          {edition ? "Modifier la catégorie" : "Nouvelle catégorie"}
        </h2>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Nom *</span>
          <input
            value={formulaire.nom}
            onChange={(e) =>
              setFormulaire((f) => ({
                ...f,
                nom: e.target.value,
                slug: f.slug ? f.slug : slugify(e.target.value),
              }))
            }
            required
            className={champClasse}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Slug</span>
          <input
            value={formulaire.slug}
            onChange={(e) =>
              setFormulaire((f) => ({
                ...f,
                slug: slugify(e.target.value),
              }))
            }
            className={champClasse}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-medium">Catégorie parente</span>
          <select
            value={formulaire.parentId ?? ""}
            onChange={(e) =>
              setFormulaire((f) => ({
                ...f,
                parentId: e.target.value || null,
              }))
            }
            className={champClasse}
          >
            <option value="">Aucune (catégorie principale)</option>
            {categories
              .filter((c) => c._id !== edition)
              .map((c) => (
                <option key={c._id} value={c._id}>
                  {"— ".repeat(c.profondeur)}
                  {c.nom}
                </option>
              ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-medium">
            Description
          </span>
          <textarea
            value={formulaire.description}
            onChange={(e) =>
              setFormulaire((f) => ({ ...f, description: e.target.value }))
            }
            rows={2}
            className={champClasse}
          />
        </label>
        <div className="sm:col-span-2">
          <span className="mb-1 block text-sm font-medium">Image</span>
          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={inputImageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const fichier = e.target.files?.[0];
                if (fichier) void importerImage(fichier);
                e.target.value = "";
              }}
            />
            {formulaire.image ? (
              <>
                <img
                  src={formulaire.image}
                  alt="Aperçu de l'image de la catégorie"
                  className="size-16 rounded-lg border border-border object-cover"
                />
                <button
                  type="button"
                  onClick={() => inputImageRef.current?.click()}
                  disabled={envoiImage}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-muted disabled:opacity-60"
                >
                  {envoiImage ? <FaSpinner className="size-4 animate-spin" aria-hidden /> : null}
                  Changer l&apos;image
                </button>
                <button
                  type="button"
                  onClick={() => setFormulaire((f) => ({ ...f, image: "" }))}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Retirer
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => inputImageRef.current?.click()}
                disabled={envoiImage}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-muted disabled:opacity-60"
              >
                {envoiImage ? <FaSpinner className="size-4 animate-spin" aria-hidden /> : null}
                Téléverser une image
              </button>
            )}
          </div>
          <input
            value={formulaire.image}
            onChange={(e) =>
              setFormulaire((f) => ({ ...f, image: e.target.value }))
            }
            placeholder="Ou URL de l'image"
            className={`${champClasse} mt-2`}
          />
        </div>
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
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input
            type="checkbox"
            checked={formulaire.active}
            onChange={(e) =>
              setFormulaire((f) => ({ ...f, active: e.target.checked }))
            }
          />
          Catégorie active
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

      <ul className="mt-6 space-y-1">
        {categories.map((categorie) => (
          <li
            key={categorie._id}
            className="flex items-center justify-between gap-2 rounded-xl border border-border px-3 py-2 text-sm"
            style={{ marginLeft: `${categorie.profondeur * 20}px` }}
          >
            <span className="min-w-0 truncate">
              {categorie.nom}
              {!categorie.active && (
                <span className="ml-2 rounded-full bg-destructive/10 px-1.5 py-0.5 text-xs text-destructive">
                  Inactif
                </span>
              )}
            </span>
            <span className="flex shrink-0 gap-1">
              <button
                type="button"
                aria-label={`Modifier ${categorie.nom}`}
                onClick={() => editer(categorie)}
                className="rounded-lg border border-border p-1.5 transition-colors hover:bg-muted"
              >
                <FaPenToSquare className="size-4" />
              </button>
              <button
                type="button"
                aria-label={`Supprimer ${categorie.nom}`}
                onClick={() => void supprimer(categorie._id)}
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