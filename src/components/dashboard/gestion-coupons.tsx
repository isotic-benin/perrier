"use client";
import { FaCircle, FaPenToSquare, FaTrashCan, FaSpinner } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { formaterPrix } from "@/lib/format";


interface Coupon {
  _id: string;
  code: string;
  type: "pourcentage" | "montant_fixe";
  valeur: number;
  montantMinimum: number;
  dateDebut: string | null;
  dateFin: string | null;
  usageMax: number;
  usageActuel: number;
  categoriesApplicables: string[];
  actif: boolean;
}

interface Formulaire {
  code: string;
  type: "pourcentage" | "montant_fixe";
  valeur: number;
  montantMinimum: number;
  dateDebut: string;
  dateFin: string;
  usageMax: number;
  actif: boolean;
}

const FORMULAIRE_VIDE: Formulaire = {
  code: "",
  type: "pourcentage",
  valeur: 0,
  montantMinimum: 0,
  dateDebut: "",
  dateFin: "",
  usageMax: 1,
  actif: true,
};

const champClasse =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15";

export function GestionCoupons({ lectureSeule = false }: { lectureSeule?: boolean }) {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [formulaire, setFormulaire] = useState<Formulaire>(FORMULAIRE_VIDE);
  const [edition, setEdition] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);
  const [message, setMessage] = useState<{
    type: "succes" | "erreur";
    texte: string;
  } | null>(null);

  const charger = async () => {
    const res = await fetch("/api/coupons", { cache: "no-store" });
    const donnees = await res.json();
    if (!donnees.succes) return;
    setCoupons(donnees.donnees.coupons);
  };

  useEffect(() => {
    let annule = false;
    (async () => {
      const res = await fetch("/api/coupons", { cache: "no-store" });
      const donnees = await res.json();
      if (annule || !donnees.succes) return;
      setCoupons(donnees.donnees.coupons);
    })();
    return () => {
      annule = true;
    };
  }, []);

  const editer = (coupon: Coupon) => {
    setEdition(coupon._id);
    setFormulaire({
      code: coupon.code,
      type: coupon.type,
      valeur: coupon.valeur,
      montantMinimum: coupon.montantMinimum,
      dateDebut: coupon.dateDebut ? coupon.dateDebut.slice(0, 10) : "",
      dateFin: coupon.dateFin ? coupon.dateFin.slice(0, 10) : "",
      usageMax: coupon.usageMax,
      actif: coupon.actif,
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
      valeur: Number(formulaire.valeur || 0),
      montantMinimum: Number(formulaire.montantMinimum || 0),
      usageMax: Number(formulaire.usageMax || 0),
      dateDebut: formulaire.dateDebut ? new Date(formulaire.dateDebut).toISOString() : null,
      dateFin: formulaire.dateFin ? new Date(formulaire.dateFin).toISOString() : null,
    };

    const res = await fetch(
      edition ? `/api/coupons/${edition}` : "/api/coupons",
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
        texte: donnees?.erreur ?? "Une erreur s'est produite.",
      });
      setEnCours(false);
      return;
    }

    setMessage({ type: "succes", texte: "Coupon gespeichert." });
    setEnCours(false);
    reinitialiser();
    void charger();
  };

  const supprimer = async (id: string) => {
    if (!confirm("Supprimer ce coupon ?")) return;
    const res = await fetch(`/api/coupons/${id}`, { method: "DELETE" });
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
      <h1 className="text-2xl font-bold">Coupons</h1>

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

      {!lectureSeule && (
        <form
          onSubmit={enregistrer}
          className="mt-6 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2"
        >
          <h2 className="font-semibold sm:col-span-2">
            {edition ? "Coupon bearbeiten" : "Neuer Coupon"}
          </h2>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Code *</span>
            <input
              value={formulaire.code}
              onChange={(e) =>
                setFormulaire((f) => ({
                  ...f,
                  code: e.target.value.toUpperCase(),
                }))
              }
              placeholder="PROMO10"
              required
              className={champClasse}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Typ</span>
            <select
              value={formulaire.type}
              onChange={(e) =>
                setFormulaire((f) => ({
                  ...f,
                  type: e.target.value as Formulaire["type"],
                }))
              }
              className={champClasse}
            >
              <option value="pourcentage">Prozent (%)</option>
              <option value="montant_fixe">Fester Betrag (€)</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Wert *</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formulaire.valeur}
              onChange={(e) =>
                setFormulaire((f) => ({ ...f, valeur: Number(e.target.value) }))
              }
              required
              className={champClasse}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">
              Mindestbestellwert
            </span>
            <input
              type="number"
              min="0"
              value={formulaire.montantMinimum}
              onChange={(e) =>
                setFormulaire((f) => ({
                  ...f,
                  montantMinimum: Number(e.target.value),
                }))
              }
              className={champClasse}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">
              Startdatum (optional)
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
              Enddatum (optional)
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
          <label className="block">
            <span className="mb-1 block text-sm font-medium">
              Max. Nutzungen
            </span>
            <input
              type="number"
              min="0"
              value={formulaire.usageMax}
              onChange={(e) =>
                setFormulaire((f) => ({
                  ...f,
                  usageMax: Number(e.target.value),
                }))
              }
              className={champClasse}
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={formulaire.actif}
              onChange={(e) =>
                setFormulaire((f) => ({ ...f, actif: e.target.checked }))
              }
            />
            Coupon aktiv
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
      )}

      <ul className="mt-6 space-y-2">
        {coupons.map((coupon) => (
          <li
            key={coupon._id}
            className="flex items-center justify-between gap-2 rounded-xl border border-border px-3 py-2 text-sm"
          >
            <span className="min-w-0">
              <span className="font-medium">{coupon.code}</span>
              <span className="ml-2 text-muted-foreground">
                {coupon.type === "pourcentage"
                  ? `${coupon.valeur}%`
                  : `${formaterPrix(coupon.valeur)}`}
                {coupon.montantMinimum > 0 &&
                  ` · min ${formaterPrix(coupon.montantMinimum)}`}
                {` · ${coupon.usageActuel}/${coupon.usageMax} Nutzungen`}
              </span>
              {!coupon.actif && (
                <span className="ml-2 rounded-full bg-destructive/10 px-1.5 py-0.5 text-xs text-destructive">
                  Inaktiv
                </span>
              )}
            </span>
            {!lectureSeule && (
              <span className="flex shrink-0 gap-1">
                <button
                  type="button"
                  aria-label="Modifier"
                  onClick={() => editer(coupon)}
                  className="rounded-lg border border-border p-1.5 transition-colors hover:bg-muted"
                >
                  <FaPenToSquare className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Supprimer"
                  onClick={() => void supprimer(coupon._id)}
                  className="rounded-lg border border-border p-1.5 transition-colors hover:bg-muted"
                >
                  <FaTrashCan className="size-4" />
                </button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}