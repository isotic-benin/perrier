import type { Metadata } from "next";
import Link from "next/link";
import { FaCircle, FaBox, FaCartShopping, FaStar, FaUserGroup, FaMoneyBill, FaTriangleExclamation } from "react-icons/fa6";
import { requireAdmin } from "@/lib/dal";
import { getStatsDashboard } from "@/lib/stats";
import { formaterPrix } from "@/lib/format";
import { TableauCommandes } from "@/components/dashboard/tableau-commandes";

export const metadata: Metadata = {
  title: "Tableau de bord",
};

const LIBELLES_STATUTS: Record<string, string> = {
  en_attente: "En attente",
  confirmee: "Confirmée",
  en_preparation: "En préparation",
  expediee: "Expédiée",
  livree: "Livrée",
  annulee: "Annulée",
};

export default async function AdminPage() {
  await requireAdmin();
  const stats = await getStatsDashboard();

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
      label: "Commandes",
      valeur: String(stats.nombreCommandes),
      detail: `${stats.commandesEnAttente} en attente`,
      icone: FaCartShopping,
    },
    {
      label: "Clients",
      valeur: String(stats.nombreClients),
      icone: FaUserGroup,
    },
    {
      label: "Produits",
      valeur: String(stats.nombreProduits),
      icone: FaBox,
    },
    {
      label: "Stock faible",
      valeur: String(stats.stockFaible),
      icone: FaTriangleExclamation,
    },
    {
      label: "Avis en attente",
      valeur: String(stats.avisEnAttente),
      icone: FaStar,
    },
  ];

  const maxStatut = Math.max(
    1,
    ...stats.commandesParStatut.map((c) => c.nombre),
  );

  const maxRevenu = Math.max(1, ...stats.revenusParMois.map((m) => m.total));

  const NOMS_MOIS = [
    "Jan", "Fév", "Mar", "Avr", "Mai", "Jun",
    "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc",
  ];

  const libelleMois = (mois: string) => {
    const [, num] = mois.split("-");
    return NOMS_MOIS[Number(num) - 1] ?? mois;
  };

  const panierMoyen =
    stats.nombreCommandes > 0
      ? Math.round(stats.chiffreAffaires / stats.nombreCommandes)
      : 0;

  const livrees =
    stats.commandesParStatut.find((c) => c.statut === "livree")?.nombre ?? 0;
  const annulees =
    stats.commandesParStatut.find((c) => c.statut === "annulee")?.nombre ?? 0;
  const nonAnnulees = Math.max(1, stats.nombreCommandes - annulees);
  const tauxLivraison = Math.round((livrees / nonAnnulees) * 100);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <p className="text-[13px] text-muted-foreground">
          {new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3.5 md:grid-cols-3 xl:grid-cols-6">
        {cartes.map(({ label, valeur, detail, icone: Icone }) => (
          <div
            key={label}
            className="group rounded-2xl border border-border bg-card p-4 shadow-[0_1px_2px_rgba(42,33,27,0.03)] transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_24px_50px_-34px_rgba(42,33,27,0.5)]"
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
            {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(42,33,27,0.03)] lg:col-span-2">
          <h2 className="mb-4 font-semibold">
            Chiffre d'affaires — 6 derniers mois
          </h2>
          {stats.revenusParMois.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucune donnée pour cette période.
            </p>
          ) : (
            <div className="flex h-48 items-end gap-2 overflow-x-auto pb-2 px-1 -mx-1">
              {stats.revenusParMois.map((m) => (
                <div
                  key={m.mois}
                  className="group flex flex-1 min-w-[50px] flex-col items-center gap-1.5 shrink-0"
                >
                  <span className="text-[10px] font-medium text-muted-foreground text-center whitespace-nowrap">
                    {formaterPrix(m.total)}
                  </span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-[#8f5414] to-[#b26b1e]"
                    style={{
                      height: `${Math.max(
                        4,
                        Math.round((m.total / maxRevenu) * 100),
                      )}%`,
                    }}
                    title={formaterPrix(m.total)}
                  />
                  <span className="text-[10px] text-muted-foreground text-center whitespace-nowrap">
                    {libelleMois(m.mois)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(42,33,27,0.03)]">
          <h2 className="mb-4 font-semibold">Indicateurs</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 min-w-0">
              <span className="text-muted-foreground truncate">Panier moyen</span>
              <span className="font-bold whitespace-nowrap shrink-0">{formaterPrix(panierMoyen)}</span>
            </li>
            <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 min-w-0">
              <span className="text-muted-foreground truncate">Commandes livrées</span>
              <span className="font-bold whitespace-nowrap shrink-0">
                {livrees} / {nonAnnulees}
              </span>
            </li>
            <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 min-w-0">
              <span className="text-muted-foreground truncate">Taux de livraison</span>
              <span className="font-bold whitespace-nowrap shrink-0">{tauxLivraison}%</span>
            </li>
            <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 min-w-0">
              <span className="text-muted-foreground truncate">Avis en attente</span>
              <span className="font-bold whitespace-nowrap shrink-0">{stats.avisEnAttente}</span>
            </li>
          </ul>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(42,33,27,0.03)]">
          <h2 className="mb-4 font-semibold">Commandes par statut</h2>
          {stats.commandesParStatut.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucune commande pour le moment.
            </p>
          ) : (
            <ul className="space-y-3">
              {stats.commandesParStatut.map((c) => (
                <li key={c.statut} className="flex flex-col gap-1.5 text-sm sm:flex-row sm:items-center sm:gap-3 min-w-0">
                  <span className="w-full sm:w-32 shrink-0 font-medium truncate">
                    {LIBELLES_STATUTS[c.statut] ?? c.statut}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <span
                        className="block h-full rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${(c.nombre / maxStatut) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-full sm:w-8 shrink-0 text-right font-medium">
                    {c.nombre}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(42,33,27,0.03)]">
          <h2 className="mb-4 font-semibold">Meilleures ventes</h2>
          {stats.meilleuresVentes.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucun produit.</p>
          ) : (
            <ol className="space-y-3">
              {stats.meilleuresVentes.map((p) => (
                <li key={p._id} className="flex items-center gap-3 text-sm min-w-0">
                  {p.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.images[0]}
                      alt=""
                      className="size-9 rounded object-cover shrink-0"
                    />
                  ) : (
                    <span className="size-9 rounded bg-muted shrink-0" />
                  )}
                  <span className="min-w-0 flex-1 truncate">{p.nom}</span>
                  <span className="shrink-0 whitespace-nowrap text-muted-foreground">
                    {p.nombreVentes} ventes
                  </span>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(42,33,27,0.03)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Dernières commandes</h2>
          <Link
            href="/admin/commandes"
            className="text-sm text-primary hover:underline"
          >
            Tout voir
          </Link>
        </div>
        <TableauCommandes
          commandes={stats.derniersCommandes}
          baseHref="/admin/commandes"
        />
      </section>
    </div>
  );
}