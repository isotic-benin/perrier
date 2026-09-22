import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique d'expédition",
};

export default function PolitiqueExpeditionPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Politique d&apos;expédition</h1>
      <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          La présente Politique d expédition réglemente la livraison des
          commandes passées via le site Perrier Bois.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            1. Identification du vendeur
          </h2>
          <p>
            <strong>PERRIER BOIS (SARL)</strong>
            <br />
            <strong>Siège social :</strong> 109 Zone des Varennes, 71340 Melay,
            France
            <br />
            <strong>SIREN :</strong> 503 747 180
            <br />
            <strong>SIRET (siège social) :</strong> 503 747 180 00027
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
            2. Livraison gratuite
          </h2>
          <p>
            La livraison des commandes acceptées par Perrier Bois est
            gratuite.
          </p>
          <p>
            Aucun frais de port ou de livraison n est facturé au client lors
            du processus d achat.
          </p>
          <p>
            La livraison gratuite comprend le transport standard des produits
            jusqu à l endroit le plus proche de l adresse indiquée par le
            client, accessible et sécurisé.
          </p>
          <p>
            Les services supplémentaires tels que le déchargement avec un
            équipement spécialisé, l utilisation d une grue, le transport à
            l intérieur de la propriété, l empilage ou le stockage des
            produits ne sont pas inclus, sauf confirmation expresse de Perrier
            Bois.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            3. Zone de livraison
          </h2>
          <p>
            Les livraisons sont effectuées aux adresses indiquées et acceptées
            lors du processus de commande.
          </p>
          <p>
            Perrier Bois peut vérifier à l avance si l adresse indiquée
            remplit les conditions requises pour la livraison, notamment pour
            les commandes lourdes ou encombrantes.
          </p>
          <p>
            Si la livraison est impossible en raison de la localisation, des
            conditions d accès ou des restrictions de circulation, le client
            est contacté pour trouver une solution adaptée.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            4. Préparation de la commande
          </h2>
          <p>Les commandes sont préparées après :</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>réception de la commande ;</li>
            <li>confirmation de la disponibilité du produit ;</li>
            <li>confirmation de la réception du paiement par virement bancaire ;</li>
            <li>validation de l adresse et des conditions de livraison.</li>
          </ul>
          <p>
            L envoi d un justificatif de virement peut faciliter
            l identification du paiement, mais ne remplace pas la
            confirmation de la réception effective des fonds sur le compte
            bancaire de Perrier Bois.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            5. Délai de livraison
          </h2>
          <p>
            Le délai de livraison estimé est communiqué au client après
            confirmation du paiement et de la disponibilité du produit.
          </p>
          <p>La date peut varier en fonction de :</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>la quantité commandée ;</li>
            <li>la disponibilité du produit ;</li>
            <li>la localisation de l adresse ;</li>
            <li>les conditions d accès ;</li>
            <li>la disponibilité du transporteur ;</li>
            <li>les conditions météorologiques ;</li>
            <li>les périodes de forte demande.</li>
          </ul>
          <p>
            Sauf accord contraire entre Perrier Bois et le client, la
            commande est livrée sans retard excessif et dans le délai légal
            maximal de 30 jours suivant la conclusion du contrat.
          </p>
          <p>
            Si la livraison à une date déterminée est essentielle, le client
            doit en informer Perrier Bois avant de finaliser sa commande.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            6. Planification de la livraison
          </h2>
          <p>
            Si nécessaire, le client est contacté par téléphone, WhatsApp ou
            e-mail pour confirmer la date ou le créneau de livraison prévu.
          </p>
          <p>
            Le client doit s assurer qu une personne est présente à l adresse
            indiquée ou qu une personne autorisée à réceptionner les produits
            est disponible.
          </p>
          <p>
            Perrier Bois ne demande aucun mot de passe, code bancaire ou
            autre information confidentielle pour l exécution des livraisons.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            7. Conditions d accès
          </h2>
          <p>
            Étant donné qu il s agit de granulés de bois, de bois de chauffage
            et d autres produits pouvant être lourds ou encombrants, le client
            doit s assurer que l adresse de livraison est facilement
            accessible.
          </p>
          <p>Avant la livraison, le client doit signaler :</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>les rues étroites ou difficiles d accès ;</li>
            <li>les restrictions de hauteur, de largeur ou de poids ;</li>
            <li>les routes non revêtues ;</li>
            <li>les points d accès en pente ou dangereux ;</li>
            <li>les portes ou entrées aux dimensions réduites ;</li>
            <li>les travaux, obstacles ou véhicules stationnés ;</li>
            <li>les restrictions de circulation municipales ;</li>
            <li>les autorisations nécessaires à l accès ;</li>
            <li>
              toute autre condition pouvant empêcher l approche du véhicule.
            </li>
          </ul>
          <p>
            Perrier Bois peut demander des photos ou des informations
            supplémentaires sur le lieu de livraison si nécessaire pour
            garantir un déchargement sécurisé.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            8. Lieu de déchargement
          </h2>
          <p>
            La livraison est effectuée à l endroit le plus proche de
            l adresse indiquée par le client, accessible et sécurisé.
          </p>
          <p>
            La livraison gratuite ne comprend pas, sauf accord expresse contraire :
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>le transport des produits à l intérieur du logement ;</li>
            <li>le port par les escaliers ;</li>
            <li>l utilisation d ascenseurs ;</li>
            <li>le transport vers les caves, garages ou dépendances ;</li>
            <li>l empilage ou le rangement des produits ;</li>
            <li>l enlèvement de l emballage ;</li>
            <li>l utilisation de grues ou autres équipements spécialisés.</li>
          </ul>
          <p>
            La zone de déchargement doit être plane, sécurisée, accessible et
            adaptée au poids et au volume de l envoi.
          </p>
          <p>
            La décision finale quant à la possibilité d un accès et d un
            déchargement sécurisés appartient au chauffeur ou à l équipe de
            livraison.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            9. Absence du client
          </h2>
          <p>
            Si le client ou une personne autorisée n est pas disponible à
            l heure convenue, la livraison ne peut pas être effectuée.
          </p>
          <p>
            Perrier Bois contacte le client pour reprogrammer la
            livraison.
          </p>
          <p>
            Si la livraison est impossible en raison de l absence du client,
            d une adresse erronée ou de conditions d accès non communiquées,
            tout mode de transport particulier nécessaire est communiqué à
            l avance au client et mis en œuvre uniquement avec son
            accord.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            10. Adresse erronée ou incomplète
          </h2>
          <p>
            Il est de la responsabilité du client de fournir une adresse
            complète, correcte et accessible.
          </p>
          <p>
            Perrier Bois ne saurait être responsable des retards ou de
            l impossibilité de livraison causés par :
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>une adresse erronée ou incomplète ;</li>
            <li>un code postal erroné ;</li>
            <li>l absence du nom du destinataire ;</li>
            <li>un numéro de téléphone erroné ;</li>
            <li>l absence de réponse aux tentatives de contact ;</li>
            <li>des restrictions d accès non communiquées.</li>
          </ul>
          <p>
            Toute erreur doit être signalée dans les meilleurs délais par
            e-mail à contact@perrierbois.fr ou par téléphone au +33 6 12 34
            56 78.
          </p>
          <p>
            Après l expédition du colis, un changement d adresse de livraison
            n est plus forcément possible.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            11. Réception et vérification
          </h2>
          <p>À la livraison, le client doit vérifier :</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>le nombre de colis ou le volume ;</li>
            <li>l état extérieur de la marchandise ;</li>
            <li>la présence d emballages déchirés ;</li>
            <li>toute trace d humidité ;</li>
            <li>les dommages visibles ;</li>
            <li>la conformité des produits livrés avec la commande.</li>
          </ul>
          <p>
            En cas d irrégularité visible, il est recommandé au client de la
            mentionner sur le bon de livraison et de prendre des photos de la
            marchandise et de l emballage.
          </p>
          <p>Le client doit contacter Perrier Bois via :</p>
          <p>
            E-mail : contact@perrierbois.fr
            <br />
            Téléphone ou WhatsApp : +33 6 12 34 56 78
          </p>
          <p>
            La notification doit contenir le numéro de commande, la
            description du problème et, si possible, des photographies.
          </p>
          <p>
            L absence de constatation immédiate ne prive pas le consommateur
            de ses droits légaux en ce qui concerne les dommages ou les
            défauts de conformité non apparents au moment de la livraison.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            12. Transfert des risques
          </h2>
          <p>
            La responsabilité de la commande reste à la charge de Perrier Bois pendant le transport.
          </p>
          <p>
            Le risque de perte ou de détéroration est transféré au client
            lorsque celui-ci ou un tiers désigné par le client, autre que le
            transporteur, prend possession physique des produits. Si le client
            choisit un transporteur autre que celui proposé par Perrier Bois le risque est transféré au moment de la remise des produits
            à ce transporteur.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            13. Retards
          </h2>
          <p>
            En cas de retard, Perrier Bois en informe le client dans les
            meilleurs délais et lui communique une nouvelle date de livraison
            estimée.
          </p>
          <p>
            Les retards peuvent résulter de circonstances extérieures, notamment :
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>des conditions météorologiques défavorables ;</li>
            <li>des accidents ou des perturbations de la circulation ;</li>
            <li>des pannes ;</li>
            <li>des grèves ;</li>
            <li>des restrictions de déplacement ;</li>
            <li>des ruptures de stock ;</li>
            <li>des périodes de forte demande ;</li>
            <li>des événements de force majeure.</li>
          </ul>
          <p>
            Si la livraison n a pas lieu dans le délai convenu ou dans le
            délai légal applicable, le consommateur peut demander une
            prorogation de ce délai. En cas de livraison répétément
            non effectuée, le consommateur peut exercer les droits prévus par
            la loi.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            14. Livraisons partielles
          </h2>
          <p>
            Lorsqu une commande comprend plusieurs produits ou des quantités
            importantes, Perrier Bois peut effectuer la livraison en
            plusieurs envois.
          </p>
          <p>
            Le client est toujours informé lorsqu une livraison partielle est
            prévue.
          </p>
          <p>
            Les livraisons partielles n occasionnent pas de frais de livraison
            supplémentaires pour le client.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            15. Indisponibilité
          </h2>
          <p>
            Si un produit devient indisponible après une commande, Perrier Bois en informe le client dans les meilleurs délais.
          </p>
          <p>Le client peut accepter :</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>un nouveau délai de livraison ;</li>
            <li>un produit équivalent ;</li>
            <li>
              l annulation de la commande et le remboursement des sommes
              versées.
            </li>
          </ul>
          <p>
            Aucun remplacement n est effectué sans l accord du client.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            16. Contacts
          </h2>
          <p>
            Pour des informations sur la préparation, l expédition ou la
            livraison d une commande :
          </p>
          <p>
            Perrier Bois
            <br />
            Forme juridique : SARL
            <br />
            Siège social : 109 Zone des Varennes, 71340 Melay, France
            <br />
            SIREN : 503 747 180 — SIRET : 503 747 180 00027
            <br />
            N° TVA intracommunautaire : FR79503747180
            <br />
            E-mail : contact@perrierbois.fr
            <br />
            Téléphone : +33 6 12 34 56 78
          </p>
          <p>
            <strong>Dernière mise à jour :</strong> 22 septembre 2026.
          </p>
        </section>
      </div>
    </div>
  );
}
