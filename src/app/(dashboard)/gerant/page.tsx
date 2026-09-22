import type { Metadata } from "next";
import Link from "next/link";
import { FaCircle, FaBox, FaCartShopping, FaStar, FaMoneyBill, FaTriangleExclamation } from "react-icons/fa6";
import { requireGerant } from "@/lib/dal";
import { getStatsDashboard, getLignesCommandes } from "@/lib/stats";
import { formaterPrix } from "@/lib/format";
import { TableauCommandes } from "@/components/dashboard/tableau-commandes";

export const metadata: Metadata = {
  title: "Tableau de bord",
};

export default async function GerantPage() {
  await requireGerant();
  const stats = await getStatsDashboard();
  const commandes = await getLignesCommandes(6);

  if (!stats) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
        Base de données indisponible. Veuillez vérifier la configuration MongoDB.
      </div>
    );
  }

  const cartes = [
    {
      label: "Chiffre d'affaires",
      valeur: formaterPrix(stats.chiffreAffaires),
      icone: FaMoneyBill,
    },
    {
      label: "Commandes en attente",
      valeur: String(stats.commandesEnAttente),
      icone: FaCartShopping,
    },
    {
      label: "Produits en stock faible",
      valeur: String(stats.stockFaible),
      icone: FaTriangleExclamation,
    },
    {
      label: "Produits",
      valeur: String(stats.nombreProduits),
      icone: FaBox,
    },
    {
      label: "Avis en attente",
      valeur: String(stats.avisEnAttente),
      icone: FaStar,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Tableau de bord</h1>

      <div className="mt-6 grid grid-cols-2 gap-3.5 md:grid-cols-3">
        {cartes.map(({ label, valeur, icone: Icone }) => (
          <div
            key={label}
            className="group rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(42,33,27,0.03)] transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_24px_50px_-34px_rgba(42,33,27,0.5)]"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
                {label}
              </p>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icone className="size-3.5" />
              </span>
            </div>
            <p className="mt-2 font-heading text-2xl font-bold text-foreground">
              {valeur}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(42,33,27,0.03)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Dernières commandes</h2>
          <Link
            href="/gerant/commandes"
            className="text-sm text-primary hover:underline"
          >
            Tout voir
          </Link>
        </div>
        <TableauCommandes commandes={commandes} baseHref="/gerant/commandes" />
      </section>
    </div>
  );
}