import type { Metadata } from "next";
import { FaCircle, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import { FormulaireContact } from "@/components/shared/formulaire-contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez notre équipe : questions, commandes, support.",
};

const COORDONNEES_EMAIL = process.env.CONTACT_EMAIL ?? "contact@perrierbois.fr";
const COORDONNEES_TELEPHONE = process.env.CONTACT_TELEPHONE ?? "+33 6 12 34 56 78";
const COORDONNEES_ADRESSE = process.env.CONTACT_ADRESSE ?? "109 Zone des Varennes, 71340 Melay, France";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Contactez-nous</h1>
      <p className="mt-2 text-muted-foreground">
        Une question sur une commande, un produit ou un retour ? Écrivez-nous,
        nous répondons rapidement.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section className="rounded-xl border p-6">
          <h2 className="mb-4 text-lg font-semibold">Envoyer un message</h2>
          <FormulaireContact />
        </section>

        <section className="space-y-4">
          <div className="rounded-xl border p-6">
            <h2 className="mb-4 text-lg font-semibold">Coordonnées</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <FaLocationDot className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>{COORDONNEES_ADRESSE}</span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhone className="mt-0.5 size-5 shrink-0 text-primary" />
                <a href={`tel:${COORDONNEES_TELEPHONE.replace(/\s/g, "")}`} className="hover:underline">
                  {COORDONNEES_TELEPHONE}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="mt-0.5 size-5 shrink-0 text-primary" />
                <a
                  href={`mailto:${COORDONNEES_EMAIL}`}
                  className="hover:underline"
                >
                  {COORDONNEES_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaCircle className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>Lundi — Samedi : 8 h à 18 h</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-primary p-6 text-primary-foreground">
            <h2 className="text-lg font-semibold">Besoin d une aide rapide ?</h2>
            <p className="mt-1 text-sm text-primary-foreground/80">
              Consultez notre FAQ ou écrivez-nous pour une réponse immédiate.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
