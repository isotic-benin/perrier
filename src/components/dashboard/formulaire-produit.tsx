"use client";
import { FaCircle, FaPlus, FaTrashCan, FaUpload, FaSpinner } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { slugify } from "@/lib/slugify";

interface LigneVariante {
  nom: string;
  valeur: string;
  stockVariante: number;
  prixSupplement: number;
  sku: string;
}

interface LigneAttribut {
  cle: string;
  valeur: string;
}

interface OptionsCategorie {
  _id: string;
  nom: string;
  profondeur: number;
}

export interface FormulaireProduitDonnees {
  _id?: string;
  nom: string;
  slug: string;
  description: string;
  descriptionCourte: string;
  categorieId: string;
  typeLivraison: "retrait" | "livraison_portail" | "livraison_garage";
  sku: string;
  images: string[];
  prix: number;
  prixPromo: number | null;
  enPromotion: boolean;
  pourcentageRemise: number;
  stock: number;
  seuilAlerteStock: number;
  variantes: LigneVariante[];
  attributs: LigneAttribut[];
  poids: number;
  actif: boolean;
  vedette: boolean;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
}

const VALEURS_INITIALES: FormulaireProduitDonnees = {
  nom: "",
  slug: "",
  description: "",
  descriptionCourte: "",
  categorieId: "",
  typeLivraison: "retrait",
  sku: "",
  images: [],
  prix: 0,
  prixPromo: null,
  enPromotion: false,
  pourcentageRemise: 0,
  stock: 0,
  seuilAlerteStock: 5,
  variantes: [],
  attributs: [],
  poids: 0,
  actif: true,
  vedette: false,
  tags: [],
  metaTitle: "",
  metaDescription: "",
};

const champClasse =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15";

export function FormulaireProduit({
  produit,
  titre,
}: {
  produit?: FormulaireProduitDonnees;
  titre: string;
}) {
  const router = useRouter();
  const [formulaire, setFormulaire] = useState<FormulaireProduitDonnees>(
    produit ?? VALEURS_INITIALES,
  );
  const [categories, setCategories] = useState<OptionsCategorie[]>([]);
  const [slugModifie, setSlugModifie] = useState(false);
  const [enCours, setEnCours] = useState(false);
  const [message, setMessage] = useState<{
    type: "succes" | "erreur";
    texte: string;
  } | null>(null);

  useEffect(() => {
    let annule = false;
    (async () => {
      const res = await fetch("/api/categories", { cache: "no-store" });
      const donnees = await res.json();
      if (annule || !donnees.succes) return;
      const aplatir = (
        noeuds: any[],
        profondeur = 0,
      ): OptionsCategorie[] =>
        noeuds.flatMap((noeud) => [
          { _id: noeud._id, nom: noeud.nom, profondeur },
          ...aplatir(noeud.sousCategories, profondeur + 1),
        ]);
      setCategories(aplatir(donnees.donnees));
    })();
    return () => {
      annule = true;
    };
  }, []);

  const definir = <K extends keyof FormulaireProduitDonnees>(
    cle: K,
    valeur: FormulaireProduitDonnees[K],
  ) => setFormulaire((f) => ({ ...f, [cle]: valeur }));

  const changerNom = (valeur: string) => {
    setFormulaire((f) => ({
      ...f,
      nom: valeur,
      slug: slugModifie ? f.slug : slugify(valeur),
    }));
  };

  const importerImage = async (fichier: File) => {
    const donnees = new FormData();
    donnees.append("fichier", fichier);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: donnees,
    });
    const resultat = await res.json();
    if (resultat.succes) {
      setFormulaire((f) => ({
        ...f,
        images: [...f.images, resultat.donnees.url],
      }));
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
      slug: formulaire.slug || slugify(formulaire.nom),
      prixPromo:
        formulaire.prixPromo === null || formulaire.prixPromo === undefined
          ? null
          : Number(formulaire.prixPromo),
      enPromotion:
        formulaire.prixPromo !== null
          ? formulaire.enPromotion
          : false,
      pourcentageRemise: Number(formulaire.pourcentageRemise || 0),
      stock: Number(formulaire.stock || 0),
      seuilAlerteStock: Number(formulaire.seuilAlerteStock || 0),
      poids: Number(formulaire.poids || 0),
      prix: Number(formulaire.prix || 0),
      tags: formulaire.tags
        .map((t) => t.trim())
        .filter((t) => t !== ""),
      variantes: formulaire.variantes
        .map((v) => ({
          ...v,
          stockVariante: Number(v.stockVariante || 0),
          prixSupplement: Number(v.prixSupplement || 0),
        }))
        .filter((v) => v.nom.trim() !== "" && v.valeur.trim() !== ""),
      attributs: formulaire.attributs.filter(
        (a) => a.cle.trim() !== "" && a.valeur.trim() !== "",
      ),
    };

    const res = await fetch(
      produit?._id ? `/api/produits/${produit._id}` : "/api/produits",
      {
        method: produit?._id ? "PUT" : "POST",
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

    router.push("/admin/produits");
    router.refresh();
  };

  return (
    <form onSubmit={enregistrer} className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">{titre}</h1>
        <button
          type="submit"
          disabled={enCours}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-18px_rgba(178,107,30,0.9)] transition-colors hover:bg-[#8f5414] disabled:opacity-60"
        >
          {enCours ? <FaSpinner className="size-4 animate-spin" aria-hidden /> : null}
          <span>Enregistrer</span>
        </button>
      </div>

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

      <section className="rounded-2xl border border-border bg-card p-4">
        <h2 className="mb-3 font-semibold">Informations générales</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-medium">Nom *</span>
            <input
              value={formulaire.nom}
              onChange={(e) => changerNom(e.target.value)}
              required
              className={champClasse}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Slug</span>
            <input
              value={formulaire.slug}
              onChange={(e) => {
                setSlugModifie(true);
                definir("slug", slugify(e.target.value));
              }}
              className={champClasse}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">SKU *</span>
            <input
              value={formulaire.sku}
              onChange={(e) => definir("sku", e.target.value)}
              required
              className={champClasse}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Catégorie *</span>
            <select
              value={formulaire.categorieId}
              onChange={(e) => definir("categorieId", e.target.value)}
              required
              className={champClasse}
            >
              <option value="">Sélectionner…</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {"— ".repeat(c.profondeur)}
                  {c.nom}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Type de livraison</span>
            <select
              value={formulaire.typeLivraison}
              onChange={(e) => definir("typeLivraison", e.target.value as any)}
              className={champClasse}
            >
              <option value="retrait">Retrait</option>
              <option value="livraison_portail">Livraison au portail</option>
              <option value="livraison_garage">Livraison en garage</option>
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-medium">
              Description courte
            </span>
            <textarea
              value={formulaire.descriptionCourte}
              onChange={(e) => definir("descriptionCourte", e.target.value)}
              rows={2}
              maxLength={300}
              className={champClasse}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-medium">Description</span>
            <textarea
              value={formulaire.description}
              onChange={(e) => definir("description", e.target.value)}
              rows={5}
              className={champClasse}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-medium">
              Tags (séparés par des virgules)
            </span>
            <input
              value={formulaire.tags.join(", ")}
              onChange={(e) =>
                definir(
                  "tags",
                  e.target.value.split(",").map((t) => t.trim()),
                )
              }
              className={champClasse}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4">
        <h2 className="mb-3 font-semibold">Images</h2>
        <div className="flex flex-wrap items-start gap-3">
          {formulaire.images.map((image, i) => (
            <div key={i} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt=""
                className="size-20 rounded border object-cover"
              />
              <button
                type="button"
                aria-label="Supprimer l'image"
                onClick={() =>
                  definir(
                    "images",
                    formulaire.images.filter((_, j) => j !== i),
                  )
                }
                className="absolute -right-1.5 -top-1.5 rounded-full bg-destructive p-1 text-white"
              >
                <FaTrashCan className="size-3" />
              </button>
            </div>
          ))}
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm transition-colors hover:bg-muted">
            <FaUpload className="size-4" />
            Ajouter une image
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
      </section>

      <section className="rounded-2xl border border-border bg-card p-4">
        <h2 className="mb-3 font-semibold">Prix et stock</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Prix *</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formulaire.prix}
              onChange={(e) => definir("prix", Number(e.target.value))}
              required
              className={champClasse}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">
              Prix promotionnel (optionnel)
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formulaire.prixPromo ?? ""}
              onChange={(e) =>
                definir(
                  "prixPromo",
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
              className={champClasse}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">
              Réduction (%)
            </span>
            <input
              type="number"
              min="0"
              max="100"
              value={formulaire.pourcentageRemise}
              onChange={(e) =>
                definir("pourcentageRemise", Number(e.target.value))
              }
              className={champClasse}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Stock</span>
            <input
              type="number"
              min="0"
              value={formulaire.stock}
              onChange={(e) => definir("stock", Number(e.target.value))}
              className={champClasse}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">
              Seuil d'alerte stock
            </span>
            <input
              type="number"
              min="0"
              value={formulaire.seuilAlerteStock}
              onChange={(e) =>
                definir("seuilAlerteStock", Number(e.target.value))
              }
              className={champClasse}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Poids (g)</span>
            <input
              type="number"
              min="0"
              value={formulaire.poids}
              onChange={(e) => definir("poids", Number(e.target.value))}
              className={champClasse}
            />
          </label>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formulaire.enPromotion}
              onChange={(e) => definir("enPromotion", e.target.checked)}
              disabled={formulaire.prixPromo == null}
            />
            En promotion
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formulaire.vedette}
              onChange={(e) => definir("vedette", e.target.checked)}
            />
            Produit en vedette
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formulaire.actif}
              onChange={(e) => definir("actif", e.target.checked)}
            />
            Actif
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4">
        <h2 className="mb-3 font-semibold">Variantes</h2>
        {formulaire.variantes.map((variante, i) => (
          <div
            key={i}
            className="mb-2 grid grid-cols-2 gap-2 rounded-xl border border-border p-2 sm:grid-cols-5"
          >
            <input
              placeholder="Type (Taille…)"
              value={variante.nom}
              onChange={(e) => {
                const copie = [...formulaire.variantes];
                copie[i] = { ...copie[i], nom: e.target.value };
                definir("variantes", copie);
              }}
              className={champClasse}
            />
            <input
              placeholder="Valeur (M…)"
              value={variante.valeur}
              onChange={(e) => {
                const copie = [...formulaire.variantes];
                copie[i] = { ...copie[i], valeur: e.target.value };
                definir("variantes", copie);
              }}
              className={champClasse}
            />
            <input
              type="number"
              min="0"
              placeholder="Stock"
              value={variante.stockVariante}
              onChange={(e) => {
                const copie = [...formulaire.variantes];
                copie[i] = {
                  ...copie[i],
                  stockVariante: Number(e.target.value),
                };
                definir("variantes", copie);
              }}
              className={champClasse}
            />
            <input
              type="number"
              min="0"
              placeholder="Supplément de prix"
              value={variante.prixSupplement}
              onChange={(e) => {
                const copie = [...formulaire.variantes];
                copie[i] = {
                  ...copie[i],
                  prixSupplement: Number(e.target.value),
                };
                definir("variantes", copie);
              }}
              className={champClasse}
            />
            <div className="flex gap-2">
              <input
                placeholder="SKU"
                value={variante.sku}
                onChange={(e) => {
                  const copie = [...formulaire.variantes];
                  copie[i] = { ...copie[i], sku: e.target.value };
                  definir("variantes", copie);
                }}
                className={champClasse}
              />
              <button
                type="button"
                aria-label="Supprimer la variante"
                onClick={() =>
                  definir(
                    "variantes",
                    formulaire.variantes.filter((_, j) => j !== i),
                  )
                }
                className="shrink-0 rounded-lg border border-border px-2 transition-colors hover:bg-muted"
              >
                <FaTrashCan className="size-4" />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            definir("variantes", [
              ...formulaire.variantes,
              { nom: "", valeur: "", stockVariante: 0, prixSupplement: 0, sku: "" },
            ])
          }
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
        >
          <FaPlus className="size-4" />
          Ajouter une variante
        </button>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4">
        <h2 className="mb-3 font-semibold">Propriétés</h2>
        {formulaire.attributs.map((attribut, i) => (
          <div key={i} className="mb-2 flex gap-2">
            <input
              placeholder="Clé (Couleur…)"
              value={attribut.cle}
              onChange={(e) => {
                const copie = [...formulaire.attributs];
                copie[i] = { ...copie[i], cle: e.target.value };
                definir("attributs", copie);
              }}
              className={champClasse}
            />
            <input
              placeholder="Valeur (Rouge…)"
              value={attribut.valeur}
              onChange={(e) => {
                const copie = [...formulaire.attributs];
                copie[i] = { ...copie[i], valeur: e.target.value };
                definir("attributs", copie);
              }}
              className={champClasse}
            />
            <button
              type="button"
              aria-label="Supprimer la propriété"
              onClick={() =>
                definir(
                  "attributs",
                  formulaire.attributs.filter((_, j) => j !== i),
                )
              }
              className="shrink-0 rounded-lg border border-border px-2 transition-colors hover:bg-muted"
            >
              <FaTrashCan className="size-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            definir("attributs", [
              ...formulaire.attributs,
              { cle: "", valeur: "" },
            ])
          }
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
        >
          <FaPlus className="size-4" />
          Ajouter une propriété
        </button>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4">
        <h2 className="mb-3 font-semibold">SEO</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Meta title</span>
            <input
              value={formulaire.metaTitle}
              onChange={(e) => definir("metaTitle", e.target.value)}
              maxLength={160}
              className={champClasse}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">
              Meta description
            </span>
            <textarea
              value={formulaire.metaDescription}
              onChange={(e) => definir("metaDescription", e.target.value)}
              rows={2}
              maxLength={300}
              className={champClasse}
            />
          </label>
        </div>
      </section>
    </form>
  );
}