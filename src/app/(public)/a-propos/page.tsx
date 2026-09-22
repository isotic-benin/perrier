import type { Metadata } from "next";
import Link from "next/link";
import { FaShieldHalved, FaLeaf, FaTruck, FaUserGroup } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez Perrier Bois, entreprise familiale d'exploitation forestière basée à Melay (Saône-et-Loire) : granulés, bûches compressées et bois de chauffage certifiés.",
};

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">À propos de Perrier Bois</h1>

      <div className="mt-6 space-y-4 text-muted-foreground">
        <p>
          <strong className="text-foreground">PERRIER BOIS</strong> est une
          société à responsabilité limitée (SARL) d exploitation forestière,
          créée le 18 avril 2008 et dirigée par Laurent Perrier. Son siège est
          situé au 109 Zone des Varennes, à Melay (71340), en Saône-et-Loire.
        </p>
        <p>
          Notre activité (code NAF 02.20Z) couvre l exploitation des forêts,
          la production et la commercialisation de bois de chauffage, de
          granulés et de briquettes compressées. Immatriculée sous le SIREN
          503 747 180, notre entreprise opère en respectant les forêts et les
          cycles naturels du bois.
        </p>
        <p>
          Nous sélectionnons chaque référence avec soin pour vous offrir des
          combustibles certifiés, aux meilleurs prix, livrés directement chez
          vous ou retirés dans nos dépôts.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          {
            icone: FaTruck,
            titre: "Livraison rapide",
            texte: "Dans toute la France, avec suivi de commande.",
          },
          {
            icone: FaLeaf,
            titre: "Exploitation forestière",
            texte: "Une entreprise issue du terrain, de la forêt au foyer.",
          },
          {
            icone: FaShieldHalved,
            titre: "Produits certifiés",
            texte: "Granulés ENplus, bûches compressées et bois de chauffage.",
          },
          {
            icone: FaUserGroup,
            titre: "Support dédié",
            texte: "Notre équipe vous accompagne avant et après l achat.",
          },
        ].map(({ icone: Icone, titre, texte }) => (
          <div key={titre} className="rounded-xl border p-5">
            <Icone className="size-6 text-primary" />
            <h2 className="mt-3 font-semibold">{titre}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{texte}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-muted-foreground">
        Une question ?{" "}
        <Link href="/contact" className="text-primary hover:underline">
          Contactez-nous
        </Link>
        .
      </p>
    </div>
  );
}
