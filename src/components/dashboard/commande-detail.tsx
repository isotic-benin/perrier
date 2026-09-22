import Link from "next/link";
import { formaterPrix } from "@/lib/format";
import { ChangementStatut } from "@/components/dashboard/changement-statut";

export interface CommandeDetailData {
  _id: string;
  numeroCommande: string;
  dateCommande: string;
  statutCommande: string;
  statutPaiement: string;
  methodePaiement: string;
  articles: Array<{
    produitId: string;
    nom: string;
    variante: string;
    quantite: number;
    sousTotal: number;
  }>;
  adresseLivraison: {
    rue: string;
    ville: string;
    codePostal: string;
    pays: string;
    telephone: string;
  };
  sousTotal: number;
  fraisLivraison: number;
  reduction: number;
  total: number;
  transporteur: string;
  numeroSuivi: string;
  historiqueStatuts: Array<{ statut: string; date: string; commentaire: string }>;
  client: { prenom: string; nom: string; email: string } | null;
}

const LIBELLES_STATUTS: Record<string, string> = {
  en_attente: "En attente",
  confirmee: "Confirmée",
  en_preparation: "En préparation",
  expediee: "Expédiée",
  livree: "Livrée",
  annulee: "Annulée",
};

export function CommandeDetail({
  commande,
  baseHref,
  retourLabel,
}: {
  commande: CommandeDetailData;
  baseHref: string;
  retourLabel: string;
}) {
  return (
    <div>
      <Link href={baseHref} className="text-sm text-primary hover:underline">
        ← {retourLabel}
      </Link>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">{commande.numeroCommande}</h1>
        <span className="rounded-full bg-muted px-2 py-0.5 text-sm">
          {LIBELLES_STATUTS[commande.statutCommande] ??
            commande.statutCommande}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        {new Date(commande.dateCommande).toLocaleDateString("fr-FR", {
          dateStyle: "long",
        })}{" "}
        · Paiement : {commande.statutPaiement} · {commande.methodePaiement}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-4">
          <h2 className="mb-3 font-semibold">Articles</h2>
          <ul className="space-y-2 text-sm">
            {commande.articles.map((article) => (
              <li key={`${article.produitId}-${article.variante}`}>
                <span className="font-medium">{article.nom}</span>
                {article.variante && (
                  <span className="text-muted-foreground">
                    {" "}
                    — {article.variante}
                  </span>
                )}{" "}
                <span className="text-muted-foreground">
                  × {article.quantite}
                </span>
                <span className="float-right font-medium">
                  {formaterPrix(article.sousTotal)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-3 space-y-1 border-t pt-3 text-sm">
            <div className="flex justify-between">
              <dt>Sous-total</dt>
              <dd>{formaterPrix(commande.sousTotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Livraison</dt>
              <dd>
                {commande.fraisLivraison === 0
                  ? "Gratuit"
                  : formaterPrix(commande.fraisLivraison)}
              </dd>
            </div>
            {commande.reduction > 0 && (
              <div className="flex justify-between">
                <dt>Réduction</dt>
                <dd>-{formaterPrix(commande.reduction)}</dd>
              </div>
            )}
            <div className="flex justify-between font-bold">
              <dt>Total</dt>
              <dd>{formaterPrix(commande.total)}</dd>
            </div>
          </dl>
        </section>

        <div className="space-y-4">
          <section className="rounded-2xl border border-border bg-card p-4 text-sm">
            <h2 className="mb-2 font-semibold">Client</h2>
            <p>
              {commande.client
                ? `${commande.client.prenom} ${commande.client.nom}`
                : "Client"}{" "}
              {commande.client?.email && (
                <span className="text-muted-foreground">
                  ({commande.client.email})
                </span>
              )}
            </p>
            <p className="mt-2 text-muted-foreground">
              {commande.adresseLivraison.rue}
              <br />
              {commande.adresseLivraison.ville}
              {commande.adresseLivraison.codePostal
                ? ` ${commande.adresseLivraison.codePostal}`
                : ""}
              , {commande.adresseLivraison.pays}
              {commande.adresseLivraison.telephone &&
                ` — Tél.: ${commande.adresseLivraison.telephone}`}
            </p>
            {commande.transporteur || commande.numeroSuivi ? (
              <p className="mt-2 text-muted-foreground">
                Suivi de colis : {commande.transporteur || "—"} /{" "}
                {commande.numeroSuivi || "—"}
              </p>
            ) : null}
          </section>

          <ChangementStatut
            commandeId={commande._id}
            statutActuel={commande.statutCommande}
          />

          {commande.historiqueStatuts.length > 0 && (
            <section className="rounded-2xl border border-border bg-card p-4 text-sm">
              <h2 className="mb-2 font-semibold">Historique</h2>
              <ol className="space-y-1">
                {[...commande.historiqueStatuts]
                  .reverse()
                  .map((entree, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="shrink-0 text-muted-foreground">
                        {new Date(entree.date).toLocaleDateString("fr-FR")}
                      </span>
                      <span>
                        <strong>
                          {LIBELLES_STATUTS[entree.statut] ?? entree.statut}
                        </strong>
                        {entree.commentaire && (
                          <span className="text-muted-foreground">
                            {" "}
                            — {entree.commentaire}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
              </ol>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}