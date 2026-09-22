import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formulaire de rétractation",
};

export default function FormulaireRevocationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Formulaire de rétractation</h1>
      <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          En droit français, le consommateur dispose d un délai de rétractation
          de 14 jours pour annuler un achat conclu à distance sans avoir à
          justifier sa décision (articles L221-1 et suivants du code de la
          consommation). Ce formulaire est un modèle type ; toute déclaration
          claire et univoque envoyée dans le délai est également valable.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Formulaire de rétractation (modèle type)
          </h2>
          <p>
            Veuillez remplir et envoyer ce formulaire uniquement si vous
            souhaitez résilier le contrat.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Destinataire
          </h2>
          <p>
            <strong>PERRIER BOIS (SARL)</strong>
            <br />
            <strong>Siège social :</strong> 109 Zone des Varennes, 71340 Melay,
            France
            <br />
            <strong>SIREN :</strong> 503 747 180
            <br />
            <strong>N° TVA intracommunautaire :</strong> FR79503747180
            <br />
            <strong>E-mail :</strong> contact@perrierbois.fr
            <br />
            <strong>Téléphone :</strong> +33 6 12 34 56 78
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Déclaration du consommateur
          </h2>
          <p>
            Je vous informe par la présente de mon intention d exercer mon droit
            de rétractation concernant le contrat d achat portant sur les
            produits suivants :
          </p>
          <div className="space-y-3 rounded-2xl border border-border bg-muted/50 p-4 text-muted-foreground">
            <p>
              <strong>Produit ou produits :</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>Montant :</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>Numéro de commande :</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>Date de la commande :</strong>
              <br />
              ____ / ____ / ________
            </p>
            <p>
              <strong>Date de réception de la commande :</strong>
              <br />
              ____ / ____ / ________
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Coordonnées du consommateur
          </h2>
          <div className="space-y-3 rounded-2xl border border-border bg-muted/50 p-4 text-muted-foreground">
            <p>
              <strong>Nom et prénom :</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>Rue :</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>Code postal et ville :</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>E-mail :</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>Téléphone :</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Enlèvement des produits
          </h2>
          <div className="space-y-3 rounded-2xl border border-border bg-muted/50 p-4 text-muted-foreground">
            <p>
              <strong>
                Adresse d enlèvement, si elle diffère de l adresse
                indiquée ci-dessus :
              </strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>Remarques :</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>Date :</strong>
              <br />
              ____ / ____ / ________
            </p>
            <p>
              <strong>Signature du consommateur :</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              Une signature n est requise que si le formulaire est soumis sur
              papier.
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Comment soumettre le formulaire
          </h2>
          <p>Le formulaire rempli peut être soumis via :</p>
          <p>
            E-mail : contact@perrierbois.fr
            <br />
            WhatsApp : +33 6 12 34 56 78
            <br />
            Courrier : Perrier Bois, 109 Zone des Varennes, 71340 Melay,
            France
          </p>
          <p>
            Pour que le délai soit respecté, la notification doit être envoyée
            avant l expiration du délai de rétractation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Retour gratuit
          </h2>
          <p>
            À réception de la demande, Perrier Bois contacte le client pour
            organiser l enlèvement gratuit des produits.
          </p>
          <p>
            Le client ne doit pas retourner ou expédier les produits de sa propre
            initiative sans avoir préalablement reçu les instructions de retour.
          </p>
          <p>
            Les produits doivent être maintenus secs, à l abri de l humidité et
            dans des conditions adaptées au transport.
          </p>
          <p>
            <strong>Dernière mise à jour :</strong> 22 septembre 2026.
          </p>
        </section>
      </div>
    </div>
  );
}
