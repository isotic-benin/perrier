import Link from "next/link";
import { formaterPrix } from "@/lib/format";
import type { LigneCommande } from "@/lib/stats";

export const LIBELLES_STATUTS: Record<string, string> = {
  en_attente: "En attente",
  confirmee: "Confirmée",
  en_preparation: "En préparation",
  expediee: "Expédiée",
  livree: "Livrée",
  annulee: "Annulée",
};

export function TableauCommandes({
  commandes,
  baseHref,
}: {
  commandes: LigneCommande[];
  baseHref: string;
}) {
  if (commandes.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        Aucune commande.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/60 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            <th className="py-2 pr-4 font-medium">Commande</th>
            <th className="py-2 pr-4 font-medium">Client</th>
            <th className="py-2 pr-4 font-medium">Date</th>
            <th className="py-2 pr-4 font-medium">Total</th>
            <th className="py-2 pr-4 font-medium">Statut</th>
            <th className="py-2 font-medium">Paiement</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((commande) => (
            <tr key={commande._id} className="border-b border-border/70 transition-colors last:border-0 hover:bg-muted/40">
              <td className="py-2 pr-4">
                <Link
                  href={`${baseHref}/${commande._id}`}
                  className="font-medium text-primary hover:underline"
                >
                  {commande.numeroCommande}
                </Link>
              </td>
              <td className="py-2 pr-4">{commande.client}</td>
              <td className="py-2 pr-4 whitespace-nowrap">
                {new Date(commande.dateCommande).toLocaleDateString("fr-FR")}
              </td>
              <td className="py-2 pr-4 font-medium">
                {formaterPrix(commande.total)}
              </td>
              <td className="py-2 pr-4">
                {LIBELLES_STATUTS[commande.statutCommande] ??
                  commande.statutCommande}
              </td>
              <td className="py-2">{commande.statutPaiement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}