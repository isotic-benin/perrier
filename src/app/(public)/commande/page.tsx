"use client";
import { FaCircle, FaArrowRight, FaCheck, FaBuildingColumns, FaTruck, FaArrowLeft, FaEnvelope } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { usePanier } from "@/hooks/use-panier";
import { calculerSousTotal, nombreArticles } from "@/store/cart";
import { formaterPrix } from "@/lib/format";
import {
  OPTIONS_LIVRAISON,
  SEUIL_LIVRAISON_GRATUITE,
  calculerFraisLivraison,
} from "@/lib/livraison";

const ETAPES = ["Adresse", "Livraison", "Récapitulatif"];

export default function CommandePage() {
  const router = useRouter();
  const { articles, vider } = usePanier();

  const [etape, setEtape] = useState(0);
  const [adresse, setAdresse] = useState({
    rue: "",
    ville: "",
    codePostal: "",
    pays: "",
    telephone: "",
  });
  const [email, setEmail] = useState("");
  const [modeLivraison, setModeLivraison] = useState<string>("standard");
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [envoye, setEnvoye] = useState(false);
  const [numeroCommande, setNumeroCommande] = useState<string | null>(null);

  const sousTotal = calculerSousTotal(articles);
  const totalArticles = nombreArticles(articles);
  const fraisLivraison = calculerFraisLivraison(sousTotal, modeLivraison);
  const total = sousTotal + fraisLivraison;

  const adresseValide =
    adresse.rue.trim().length >= 3 &&
    adresse.ville.trim().length >= 2 &&
    adresse.pays.trim().length >= 2 &&
    adresse.telephone.trim().length >= 8 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validerEtape = () => {
    if (etape === 0 && !adresseValide) {
      setErreur("Veuillez saisir l'adresse de livraison et votre e-mail.");
      return;
    }
    setErreur(null);
    setEtape((e) => Math.min(e + 1, ETAPES.length - 1));
  };

  const confirmer = async () => {
    setChargement(true);
    setErreur(null);
    try {
      const res = await fetch("/api/commandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articles: articles.map((a) => ({
            produitId: a.produitId,
            variante: a.variante,
            quantite: a.quantite,
          })),
          adresseLivraison: adresse,
          email,
          methodePaiement: "virement",
          modeLivraison,
        }),
      });

      const donnees = await res.json();
      if (!donnees.succes) {
        setErreur(donnees.erreur ?? "La commande n'a pas pu être créée.");
        return;
      }

      const commande = donnees.donnees.commande;
      await vider();
      setNumeroCommande(commande.numeroCommande);
      setEnvoye(true);
    } catch {
      setErreur("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setChargement(false);
    }
  };

  if (envoye) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <div className="mb-6 flex justify-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-accent">
            <FaEnvelope className="size-8 text-primary" />
          </div>
        </div>
        <h1 className="mb-2 text-3xl font-bold">Vérifiez votre e-mail</h1>
        <p className="mb-4 text-muted-foreground">
          Un e-mail contenant les coordonnées bancaires pour le paiement de votre commande
          {numeroCommande && (
            <>
              {" "}
              <strong className="text-foreground">{numeroCommande}</strong>
            </>
          )}{" "}
          vient d'être envoyé à l'adresse <strong className="text-foreground">{email}</strong>.
        </p>
        <p className="mb-6 text-sm text-muted-foreground">
          Veuillez effectuer le virement du montant total en précisant votre numéro de commande en référence.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/produits"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-18px_rgba(178,107,30,0.9)] transition-colors hover:bg-[#8f5414]"
          >
            Continuer mes achats <FaArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (articles.length === 0 && !chargement) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <h1 className="mb-2 text-2xl font-bold">Votre panier est vide</h1>
        <p className="mb-6 text-muted-foreground">
          Ajoutez des produits avant de passer commande.
        </p>
        <Link
          href="/produits"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-18px_rgba(178,107,30,0.9)] transition-colors hover:bg-[#8f5414]"
        >
          Voir les produits <FaArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl">Commande</h1>

      <ol className="mb-8 flex items-center gap-1 text-xs sm:text-sm">
        {ETAPES.map((libelle, i) => (
          <li
            key={libelle}
            className={`flex items-center gap-1.5 ${
              i <= etape ? "font-semibold text-primary" : "text-muted-foreground"
            }`}
          >
            {i < etape ? (
              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <FaCheck className="size-3" />
              </span>
            ) : (
              <span
                className={`flex size-6 items-center justify-center rounded-full border text-[11px] ${
                  i === etape ? "border-primary text-primary" : "border-border"
                }`}
              >
                {i + 1}
              </span>
            )}
            <span className="hidden sm:inline">{libelle}</span>
            {i < ETAPES.length - 1 && (
              <span className="mx-2 h-px w-6 bg-border" aria-hidden />
            )}
          </li>
        ))}
      </ol>

      {erreur && (
        <p className="mb-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {erreur}
        </p>
      )}

      {etape === 0 && (
        <div className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(42,33,27,0.03)] sm:p-8">
          <h2 className="text-lg font-semibold">Informations de livraison</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="email"
              placeholder="Adresse e-mail (pour recevoir les coordonnées bancaires)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-lg border border-input bg-background px-3.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 sm:col-span-2"
              required
            />
            <input
              type="text"
              placeholder="Adresse (rue, quartier…)"
              value={adresse.rue}
              onChange={(e) => setAdresse({ ...adresse, rue: e.target.value })}
              className="h-11 rounded-lg border border-input bg-background px-3.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 sm:col-span-2"
            />
            <input
              type="text"
              placeholder="Ville"
              value={adresse.ville}
              onChange={(e) => setAdresse({ ...adresse, ville: e.target.value })}
              className="h-11 rounded-lg border border-input bg-background px-3.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
            <input
              type="text"
              placeholder="Code postal (facultatif)"
              value={adresse.codePostal}
              onChange={(e) =>
                setAdresse({ ...adresse, codePostal: e.target.value })
              }
              className="h-11 rounded-lg border border-input bg-background px-3.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
            <input
              type="text"
              placeholder="Pays"
              value={adresse.pays}
              onChange={(e) => setAdresse({ ...adresse, pays: e.target.value })}
              className="h-11 rounded-lg border border-input bg-background px-3.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
            <input
              type="tel"
              placeholder="Téléphone"
              value={adresse.telephone}
              onChange={(e) =>
                setAdresse({ ...adresse, telephone: e.target.value })
              }
              className="h-11 rounded-lg border border-input bg-background px-3.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={validerEtape}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-18px_rgba(178,107,30,0.9)] transition-colors hover:bg-[#8f5414]"
            >
              Continuer <FaArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {etape === 1 && (
        <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(42,33,27,0.03)] sm:p-8">
          <h2 className="text-lg font-semibold">Mode de livraison</h2>
          {sousTotal >= SEUIL_LIVRAISON_GRATUITE && (
            <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
              Livraison gratuite incluse !
            </p>
          )}
          {OPTIONS_LIVRAISON.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setModeLivraison(option.id)}
              className={`flex w-full items-center justify-between rounded-2xl border bg-card p-4 text-left transition-colors ${
                modeLivraison === option.id
                  ? "border-primary ring-2 ring-primary/20"
                  : ""
              }`}
            >
              <span className="flex items-center gap-3">
                <FaTruck className="size-5 text-muted-foreground" />
                <span>
                  <span className="block font-medium">{option.libelle}</span>
                  <span className="block text-xs text-muted-foreground">
                    {option.delai}
                  </span>
                </span>
              </span>
              <span className="font-semibold">
                {sousTotal >= SEUIL_LIVRAISON_GRATUITE
                  ? "Gratuit"
                  : formaterPrix(option.frais)}
              </span>
            </button>
          ))}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setEtape(0)}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <FaArrowLeft className="size-4" /> Retour
            </button>
            <button
              type="button"
              onClick={validerEtape}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-18px_rgba(178,107,30,0.9)] transition-colors hover:bg-[#8f5414]"
            >
              Continuer <FaArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {etape === 2 && (
        <div className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(42,33,27,0.03)] sm:p-8">
          <h2 className="text-lg font-semibold">Récapitulatif</h2>

          <ul className="space-y-2 text-sm">
            {articles.map((article) => (
              <li key={`${article.produitId}-${article.variante}`}>
                <span className="font-medium">{article.nom}</span>
                {article.variante && (
                  <span className="text-muted-foreground"> — {article.variante}</span>
                )}{" "}
                <span className="text-muted-foreground">
                  × {article.quantite}
                </span>
                <span className="float-right font-medium">
                  {formaterPrix(article.prixUnitaire * article.quantite)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="space-y-2 border-t pt-3 text-sm">
            <div className="flex justify-between">
              <dt>Sous-total ({totalArticles} articles)</dt>
              <dd>{formaterPrix(sousTotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Livraison</dt>
              <dd>
                {fraisLivraison === 0
                  ? "Gratuit"
                  : formaterPrix(fraisLivraison)}
              </dd>
            </div>
            <div className="flex justify-between border-t pt-2 text-base font-bold">
              <dt>Total</dt>
              <dd>{formaterPrix(total)}</dd>
            </div>
          </dl>

          <div className="text-sm text-muted-foreground">
            <p>
              Livraison à : <strong>{adresse.rue}</strong>, {adresse.ville}
              {adresse.codePostal && ` ${adresse.codePostal}`}, {adresse.pays}
            </p>
            <p>
              E-mail : <strong>{email}</strong>
            </p>
            <p>
              Paiement : <strong>Virement bancaire</strong>
            </p>
            <p className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700">
              Un e-mail avec les coordonnées bancaires vous sera envoyé pour effectuer le paiement.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setEtape(1)}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <FaArrowLeft className="size-4" /> Retour
            </button>
            <button
              type="button"
              onClick={confirmer}
              disabled={chargement}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-18px_rgba(178,107,30,0.9)] transition-colors hover:bg-[#8f5414] disabled:opacity-60"
            >
              {chargement ? "Création de la commande…" : "Confirmer la commande"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
