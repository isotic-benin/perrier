import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modes de paiement",
};

export default function ModeDePaiementPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Modes de paiement</h1>
      <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          Perrier Bois accepte les paiements exclusivement par virement
          bancaire.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Virement bancaire
          </h2>
          <p>
            Après confirmation de la commande, le client reçoit les coordonnées
            bancaires nécessaires au paiement, notamment :
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>nom du bénéficiaire ;</li>
            <li>IBAN ;</li>
            <li>montant total de la commande ;</li>
            <li>référence ou numéro de commande.</li>
          </ul>
          <p>
            Le client doit indiquer le numéro de commande dans l objet ou la
            référence du virement, si cette option est disponible.
          </p>
          <p>
            La commande n est préparée et expédiée qu après confirmation de la
            réception du paiement sur le compte bancaire de Perrier Bois.
          </p>
          <p>
            Les délais de traitement bancaire peuvent varier selon la banque,
            le jour et l horaire du virement.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Transmission du justificatif de paiement
          </h2>
          <p>
            Pour faciliter l identification et la validation du paiement, le
            client peut envoyer un justificatif de virement via :
          </p>
          <p>
            E-mail : contact@perrierbois.fr
            <br />
            WhatsApp : +33 6 12 34 56 78
          </p>
          <p>
            L envoi d un justificatif de paiement ne remplace pas la
            confirmation effective de la réception des fonds sur le compte
            bancaire.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Montant du virement
          </h2>
          <p>
            Le client doit virer le montant total indiqué dans la confirmation
            de commande, comprenant :
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>prix des produits ;</li>
            <li>TVA applicable ;</li>
            <li>frais de transport ;</li>
            <li>autres frais préalablement communiqués, le cas échéant.</li>
          </ul>
          <p>
            Les frais bancaires liés au virement sont à la charge du client. Le
            montant reçu par Perrier Bois doit correspondre à la valeur
            totale de la commande.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Défaut de paiement
          </h2>
          <p>
            Si le paiement n est pas reçu dans le délai indiqué dans la
            confirmation de commande, celle-ci peut être annulée.
          </p>
          <p>
            Si vous souhaitez maintenir votre commande ou avez besoin de plus de
            temps pour effectuer le paiement, veuillez contacter préalablement
            Perrier Bois.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Sécurité
          </h2>
          <p>
            Perrier Bois ne vous demandera jamais vos mots de passe de
            compte bancaire, codes d accès, codes d authentification ou autres
            informations confidentielles.
          </p>
          <p>
            En cas de doute sur les coordonnées bancaires reçues, veuillez les
            vérifier via les canaux officiels :
          </p>
          <p>
            Téléphone : +33 6 12 34 56 78
            <br />
            WhatsApp : +33 6 12 34 56 78
            <br />
            E-mail : contact@perrierbois.fr
          </p>
        </section>
      </div>
    </div>
  );
}
