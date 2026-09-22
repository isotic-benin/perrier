import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de retour et de remboursement",
};

export default function PolitiqueRetourPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">
        Politique de retour et de remboursement
      </h1>
      <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          La présente Politique de retour et de remboursement s applique aux
          achats effectués via le site Perrier Bois.
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
            2. Retour gratuit dans un délai de 14 jours.
          </h2>
          <p>
            Les consommateurs peuvent retourner les produits achetés en ligne
            dans un délai de 14 jours civils sans avoir à justifier leur
            décision.
          </p>
          <p>
            Le délai commence à courir le jour où le consommateur ou un tiers
            désigné par lui, autre que le transporteur, prend possession
            physique de la commande. Ce droit est prévu dans le cadre
            juridique français des contrats à distance (code de la
            consommation).
          </p>
          <p>
            Perrier Bois prend en charge les frais directs de retour ,
            à la condition que :
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>la demande soit notifiée dans un délai de 14 jours ;</li>
            <li>
              l enlèvement soit préalablement organisé par Perrier Bois ;
            </li>
            <li>
              les produits se trouvent à l adresse de livraison initiale.
            </li>
            <li>des conditions d enlèvement sécurisées et adaptées soient réunies ;</li>
            <li>
              les produits ne présentent pas de dommages résultant d une
              mauvaise utilisation ou d un stockage inadapté.
            </li>
          </ul>
          <p>
            Le client ne doit pas expédier les produits de sa propre initiative
            sans avoir préalablement reçu les instructions de Perrier Bois
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            3. Comment demander un retour
          </h2>
          <p>
            Pour exercer son droit de rétractation, le client doit notifier
            clairement sa décision via l un des moyens de contact suivants :
          </p>
          <p>
            E-mail : contact@perrierbois.fr
            <br />
            WhatsApp : +33 6 12 34 56 78
            <br />
            Téléphone : +33 6 12 34 56 78
          </p>
          <p>La notification doit contenir :</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>le nom complet du client ;</li>
            <li>le numéro de commande ;</li>
            <li>la date de réception ;</li>
            <li>l identification des produits à retourner ;</li>
            <li>le montant à rembourser ;</li>
            <li>l adresse où se trouvent les produits ;</li>
            <li>le numéro de téléphone de contact ;</li>
            <li>des photos des produits et de l emballage sur demande.</li>
          </ul>
          <p>
            Le consommateur peut exercer gratuitement son droit de rétractation
            par toute déclaration claire démontrant sa volonté d annuler
            l achat.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            4. Formulaire de demande de retour
          </h2>
          <p>Le client peut utiliser le modèle suivant :</p>
          <p>À Perrier Bois,</p>
          <p>
            Je vous écris pour vous informer que je souhaite exercer mon droit
            de rétractation concernant l achat des produits suivants : [liste
            des produits].
          </p>
          <p>
            Numéro de commande : [numéro]
            <br />
            Date de la commande : [date]
            <br />
            Date de livraison : [date]
            <br />
            Nom du client : [nom]
            <br />
            Adresse d enlèvement : [adresse]
            <br />
            Numéro de téléphone : [numéro]
          </p>
          <p>Date de la commande : [date]</p>
          <p>L utilisation de ce modèle n est pas obligatoire.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            5. Enlèvement gratuit des produits
          </h2>
          <p>
            À réception de la demande, Perrier Bois contacte le client pour
            organiser l enlèvement gratuit des produits.
          </p>
          <p>Le client doit :</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              s assurer de la présence d une personne à l endroit et à
              l heure convenus ;
            </li>
            <li>stocker les produits dans un endroit sec et protégé ;</li>
            <li>garantir un accès adapté au véhicule de collecte ;</li>
            <li>préparer les produits pour un transport sécurisé ;</li>
            <li>nous informer à l avance des restrictions d accès.</li>
          </ul>
          <p>
            L enlèvement gratuit s effectue à l adresse de livraison
            initiale, sauf accord contraire entre Perrier Bois et le
            client.
          </p>
          <p>
            Le retour gratuit ne comprend pas les services supplémentaires tels
            que le transport depuis l intérieur du logement, le port par les
            escaliers, l utilisation de grues, le démontage de structures ou
            le déplacement de produits situés dans des endroits
            inaccessibles.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            6. Absence au moment de l enlèvement
          </h2>
          <p>
            Le client doit s assurer qu une personne est disponible à la date
            convenue pour remettre les produits.
          </p>
          <p>
            Si l enlèvement ne peut être effectué en raison de l absence du
            client, d une adresse erronée, d un accès inexistant ou d autres
            conditions non communiquées, il doit être reprogrammé.
          </p>
          <p>
            Tous les frais liés à une nouvelle tentative d enlèvement sont
            communiqués au client à l avance et ne peuvent être facturés que
            si la première tentative a échoué pour des raisons imputables au
            client.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            7. État des produits retournés
          </h2>
          <p>
            Les produits doivent être retournés dans le même état que celui
            constaté à la réception, avec l emballage d origine, les
            étiquettes et les accessoires, le cas échéant.
          </p>
          <p>Les granulés et le bois de chauffage doivent être :</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>secs et à l abri de l humidité ;</li>
            <li>sans signe d utilisation ou de combustion ;</li>
            <li>non mélangés à d autres combustibles ou matériaux ;</li>
            <li>sans contamination ;</li>
            <li>de préférence dans leur emballage d origine ;</li>
            <li>dans des conditions adaptées à l enlèvement et au transport.</li>
          </ul>
          <p>
            Le consommateur ne doit manipuler les produits que dans la mesure
            nécessaire pour vérifier leur nature et leurs caractéristiques. Il
            peut être tenu responsable de toute dépréciation résultant d une
            manipulation excessive.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            8. Emballages ouverts ou produits utilisés
          </h2>
          <p>
            Le simple fait d ouvrir un colis pour vérifier le produit
            n annule pas automatiquement le droit de retour.
          </p>
          <p>
            Le montant du remboursement peut toutefois être réduit si les
            produits :
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>ont été utilisés ou brûlés ;</li>
            <li>ont été partiellement consommés ;</li>
            <li>ont été exposés à la pluie, à l eau ou à l humidité ;</li>
            <li>ont été stockés de manière inadaptée ;</li>
            <li>ont été mélangés à d autres produits ;</li>
            <li>ont été endommagés après la livraison ;</li>
            <li>
              ont été retirés de l emballage en quantités supérieures à celles
              nécessaires à la vérification.
            </li>
          </ul>
          <p>
            Chaque réduction est déterminée proportionnellement à la perte de
            valeur réelle du produit et communiquée au client.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            9. Remboursement partiel
          </h2>
          <p>
            Le client peut uniquement demander le remboursement partiel de sa
            commande.
          </p>
          <p>
            Dans ce cas, les produits et les quantités à retourner doivent
            être clairement identifiés.
          </p>
          <p>
            Le remboursement correspond exclusivement à la valeur des produits
            effectivement retournés et acceptés.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            10. Remboursement
          </h2>
          <p>
            Après validation du retour, Perrier Bois rembourse le montant
            payé pour les produits retournés.
          </p>
          <p>
            Le remboursement est traité dans le délai légal maximal de 14 jours
            à compter de la date à laquelle Perrier Bois est informé de la
            décision de retour.
          </p>
          <p>
            Perrier Bois peut retenir le remboursement jusqu à la
            réception des produits retournés ou jusqu à la preuve de leur
            envoi, selon l événement le plus précoce.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            11. Mode de remboursement
          </h2>
          <p>
            Étant donné que les paiements s effectuent exclusivement par
            virement bancaire, les remboursements sont également effectués par
            virement bancaire, sans frais supplémentaires pour le client.
          </p>
          <p>Le client devra éventuellement indiquer :</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>le nom du titulaire du compte ;</li>
            <li>l IBAN ;</li>
            <li>
              un justificatif de propriété du compte, si cela est nécessaire
              pour éviter les erreurs ou la fraude.
            </li>
          </ul>
          <p>
            L IBAN communiqué doit appartenir au client ayant passé la commande,
            sauf justification et accord exprès contraire.
          </p>
          <p>
            Perrier Bois ne vous demandera jamais vos mots de passe de
            compte bancaire, codes d accès ou codes d authentification.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            12. Commandes non encore expédiées
          </h2>
          <p>
            Le client peut demander l annulation d une commande non encore
            expédiée.
          </p>
          <p>
            Après réception du paiement, le montant est remboursé par virement
            bancaire.
          </p>
          <p>La demande doit être envoyée à :</p>
          <p>
            E-mail : contact@perrierbois.fr
            <br />
            WhatsApp : +33 6 12 34 56 78
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            13. Produits endommagés, erronés ou non conformes
          </h2>
          <p>
            Le droit de retourner le produit dans un délai de 14 jours ne
            remplace pas les droits légaux du consommateur lorsque le produit :
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>arrive endommagé ;</li>
            <li>présente des traces d humidité avant la livraison ;</li>
            <li>ne correspond pas à la commande.</li>
            <li>la quantité livrée est erronée ;</li>
            <li>ne dispose pas des fonctions annoncées ;</li>
            <li>présente un autre défaut de conformité.</li>
          </ul>
          <p>
            Dans ces cas, le client doit contacter Perrier Bois dans les
            meilleurs délais en indiquant le numéro de commande et en envoyant
            des photos des produits, de l emballage et des étiquettes.
          </p>
          <p>
            En cas de défaut de conformité, la solution est offerte
            gratuitement au consommateur conformément à la législation
            applicable et peut, selon le cas, inclure le remplacement, une
            réduction du prix ou la résiliation du contrat.
          </p>
          <p>
            L enlèvement des produits endommagés, erronés ou non conformes
            est toujours gratuit.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            14. Dommages visibles au moment de la livraison.
          </h2>
          <p>À la livraison, il est recommandé au client de vérifier :</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>l état de l emballage ;</li>
            <li>le nombre ou le volume ;</li>
            <li>la présence de fissures ou de trous ;</li>
            <li>d éventuelles traces d eau ou d humidité ;</li>
            <li>les dommages visibles ;</li>
            <li>la conformité avec la commande.</li>
          </ul>
          <p>
            Dans la mesure du possible, toute irrégularité doit être consignée
            dans la documentation du transporteur et photographiée.
          </p>
          <p>
            L absence de constatation immédiate ne prive pas le consommateur
            de ses droits en ce qui concerne les problèmes non apparents au
            moment de la livraison.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            15. Produits personnalisés
          </h2>
          <p>
            Le droit de rétractation peut ne pas s appliquer aux produits
            spécialement fabriqués, découpés, emballés ou préparés selon les
            instructions individuelles du client.
          </p>
          <p>
            Si cette exception s applique, le client en est clairement informé
            avant la finalisation de sa commande.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            16. Achats à usage professionnel
          </h2>
          <p>
            Le droit de rétractation de 14 jours s applique aux
            consommateurs qui achètent des produits à des fins non liées à
            leur activité commerciale ou professionnelle.
          </p>
          <p>
            Pour les achats effectués par des entreprises, des
            professionnels ou d autres organismes à des fins liées à leur
            activité, les retours dépendent des conditions convenues avec
            Perrier Bois.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            17. Contacts
          </h2>
          <p>
            Pour les demandes de retour, le suivi d envoi ou les informations
            relatives à un remboursement :
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
