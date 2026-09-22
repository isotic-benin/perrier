import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
};

export default function CgvPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">
        Conditions générales de vente
      </h1>
      <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          Les présentes Conditions générales de vente régissent les achats
          effectués via le site Perrier Bois, y compris la vente en ligne
          de granulés de bois, de bois de chauffage et de produits connexes.
        </p>
        <p>
          En passant une commande, le client déclare avoir lu, compris et
          accepté les présentes Conditions générales de vente.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            1. Identification du vendeur
          </h2>
          <p>Le site et les produits vendus sont exploités par :</p>
          <p>
            <strong>Raison sociale :</strong> PERRIER BOIS
            <br />
            <strong>Forme juridique :</strong> Société à responsabilité limitée
            (SARL)
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
            <strong>Activité (code NAF/APE) :</strong> 02.20Z — Exploitation
            forestière
            <br />
            <strong>Date de création :</strong> 18 avril 2008
            <br />
            <strong>Dirigeant :</strong> Laurent PERRIER
            <br />
            <strong>E-mail :</strong> contact@perrierbois.fr
            <br />
            <strong>Téléphone :</strong> +33 6 12 34 56 78
          </p>
          <p>
            Le coût de l appel dépend du forfait souscrit par le client auprès
            de son opérateur de télécommunications.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            2. Champ d application
          </h2>
          <p>
            Les présentes Conditions générales de vente s appliquent aux
            commandes passées via le site Perrier Bois.
          </p>
          <p>
            Au sens des présentes Conditions générales de vente, est considéré
            comme consommateur toute personne physique qui acquiert des produits
            à des fins non liées à son activité commerciale, industrielle,
            artisanale ou professionnelle.
          </p>
          <p>
            Lorsqu un client effectue un achat à des fins commerciales ou au
            nom d une entreprise, certaines règles spécifiques de protection
            des consommateurs peuvent ne pas s appliquer.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            3. Acceptation des conditions
          </h2>
          <p>
            Avant de finaliser sa commande, le client doit prendre connaissance
            et accepter les présentes Conditions générales de vente.
          </p>
          <p>
            L acceptation s effectue en cochant la case de confirmation
            correspondante pendant le processus d achat.
          </p>
          <p>
            Le client devrait conserver une copie des présentes Conditions
            générales de vente. La version applicable à la commande est la
            version publiée et acceptée au moment de l achat.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            4. Produits
          </h2>
          <p>
            Perrier Bois vend des granulés de bois, du bois de chauffage
            et d autres produits liés au chauffage au bois.
          </p>
          <p>
            Les caractéristiques essentielles de chaque produit, y compris le
            nom, le type, la quantité, le poids, les dimensions, l
            emballage, la composition et les recommandations d utilisation,
            sont présentées sur la page du produit concerné.
          </p>
          <p>
            Avant de finaliser l achat, le client doit vérifier que le produit
            est compatible avec son appareil de récupération de chaleur, son
            poêle à bois, sa chaudière, son cuisinière ou tout autre
            équipement de chauffage.
          </p>
          <p>
            Les photographies et images sont fournies à titre informatif
            uniquement. Étant donné que ces produits sont d origine naturelle,
            de légères différences de couleur, de ton, de texture, de forme,
            de longueur ou d aspect peuvent exister.
          </p>
          <p>
            Ces écarts naturels ne constituent pas un défaut de conformité
            lorsqu ils n altèrent pas les caractéristiques essentielles, la
            quantité, la qualité ou l usage annoncé.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            5. Disponibilité
          </h2>
          <p>
            Les produits présentés sur le site sont proposés sous réserve de
            disponibilité en stock.
          </p>
          <p>
            La présence d un produit sur le site ne garantit pas sa
            disponibilité permanente.
          </p>
          <p>
            Si un produit n est plus disponible après une commande, Perrier Bois en informe le client dans les meilleurs délais.
          </p>
          <p>
            Le client peut choisir d attendre le réapprovisionnement, d
            accepter un produit équivalent ou d annuler sa commande. En cas
            d annulation, les sommes versées sont remboursées par le même
            moyen de paiement utilisé lors de l achat, sauf accord contraire,
            sans frais pour le client.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">6. Prix</h2>
          <p>
            Les prix affichés sur le site sont exprimés en euros et incluent la
            TVA applicable.
          </p>
          <p>
            Les frais de livraison, de transport ou autres frais supplémentaires
            non inclus dans le prix du produit sont communiqués au client avant
            la confirmation de la commande.
          </p>
          <p>
            Le prix applicable est celui affiché au moment de l achat, sauf
            erreur manifeste.
          </p>
          <p>
            En cas d erreur manifeste sur le prix, la description ou les
            conditions d un produit, Perrier Bois en informe le client
            avant l expédition. Le client peut alors confirmer sa commande avec
            les informations corrigées ou l annuler et obtenir un
            remboursement intégral.
          </p>
          <p>
            Les promotions et offres s appliquent pendant la période indiquée
            ou jusqu à épuisement des stocks. Sauf mention contraire, les
            offres ne sont pas cumulables.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            7. Processus de commande
          </h2>
          <p>
            Pour passer une commande, le client doit sélectionner les produits
            souhaités, indiquer les quantités respectives, les ajouter au
            panier et remplir les informations demandées.
          </p>
          <p>
            Avant la confirmation, un récapitulatif comprenant les produits,
            les quantités, le prix, les taxes, les frais de livraison, les
            coordonnées du client, l adresse de livraison et le moyen de
            paiement est affiché.
          </p>
          <p>
            Il est de la responsabilité du client de vérifier l exactitude de
            ces informations avant de finaliser l achat.
          </p>
          <p>
            Après avoir passé sa commande, le client reçoit une confirmation
            électronique à l adresse e-mail indiquée.
          </p>
          <p>
            Le contrat de vente est réputé conclu après confirmation de la
            commande par Perrier Bois et, le cas échéant, après validation
            du paiement et de la disponibilité du produit.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            8. Données fournies par le client
          </h2>
          <p>
            Le client s engage à fournir des informations complètes, sincères
            et à jour.
          </p>
          <p>
            Perrier Bois ne saurait être tenu responsable des retards, des
            livraisons erronées ou de l impossibilité de contacter le client
            résultant d informations incomplètes ou inexactes fournies par
            celui-ci.
          </p>
          <p>
            Le client doit signaler toute erreur dans les données de commande
            par e-mail à contact@perrierbois.fr ou par téléphone et
            WhatsApp au +33 6 12 34 56 78.
          </p>
          <p>
            Les modifications demandées après l expédition ne sont pas
            forcément possibles.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            9. Paiement
          </h2>
          <p>
            Les moyens de paiement disponibles sont indiqués lors du processus
            d achat.
          </p>
          <p>
            La commande n est préparée ou expédiée qu après confirmation du
            paiement lorsque le mode de paiement choisi nécessite un
            prépaiement.
          </p>
          <p>
            En cas de rejet du paiement, d annulation ou de non-réception
            dans le délai indiqué lors de l achat, la commande peut être
            automatiquement annulée.
          </p>
          <p>
            Les transactions électroniques de paiement peuvent être traitées
            par des prestataires de paiement externes, qui sont également
            soumis à leurs propres conditions d utilisation et de sécurité.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            10. Facturation
          </h2>
          <p>
            La facture est établie sur la base des informations fournies par le
            client lors du processus de commande.
          </p>
          <p>
            Le client doit indiquer correctement son nom ou sa raison sociale,
            son adresse de facturation et, le cas échéant, son numéro de TVA
            intracommunautaire avant de finaliser l achat.
          </p>
          <p>
            La facture peut être envoyée par voie électronique à l adresse
            e-mail communiquée ou mise à disposition via le compte client, si
            cette fonctionnalité est disponible.
          </p>
          <p>
            Après émission, les modifications des données fiscales ne sont
            effectuées que si cela est légalement et techniquement possible.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            11. Livraison
          </h2>
          <p>
            Les produits sont livrés aux zones et adresses indiquées lors de
            l achat.
          </p>
          <p>
            Les délais de livraison estimés, les modes de livraison et les
            frais associés sont communiqués avant la confirmation de la
            commande.
          </p>
          <p>
            En l absence de délai spécifique convenu, la législation française
            prévoit que les marchandises doivent être livrées sans
            retard excessif et en principe dans un délai de 30 jours suivant
            la conclusion du contrat.
          </p>
          <p>
            Les délais de livraison peuvent varier en fonction de la
            disponibilité du produit, de la quantité commandée, du lieu de
            livraison, des conditions d accès, du transporteur et des
            périodes de forte demande.
          </p>
          <p>
            Si la date de livraison est essentielle, le client doit en informer
            Perrier Bois avant de finaliser sa commande.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            12. Conditions d accès et de déchargement
          </h2>
          <p>
            En raison du poids ou du volume, le client doit s assurer que
            l adresse de livraison est suffisamment accessible pour le véhicule
            utilisé pour le transport.
          </p>
          <p>
            Le client doit signaler à l avance les rues étroites, les
            restrictions de circulation, les étages sans ascenseur, les
            accès privés, les restrictions de hauteur ou de poids, les
            besoins en autorisation, les travaux ou tout autre obstacle
            pertinent.
          </p>
          <p>
            Le mode de déchargement et le lieu de livraison des marchandises
            sont ceux indiqués ou convenus avant l achat.
          </p>
          <p>
            Sauf mention expresse contraire, le client ne doit pas considérer
            que la livraison comprend le transport à l intérieur de la
            propriété, le stockage, l empilage, l installation ou
            l enlèvement de l emballage.
          </p>
          <p>
            Si la livraison ne peut être effectuée en raison d informations
            erronées, de l absence du client ou d une impossibilité non
            signalée d accéder au lieu de livraison, une nouvelle livraison
            peut être planifiée. Les éventuels frais supplémentaires sont
            communiqués au client à l avance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            13. Réception des marchandises
          </h2>
          <p>
            À la livraison, il est recommandé aux clients de vérifier l état
            de l emballage, la quantité reçue et les dommages visibles.
          </p>
          <p>
            En cas de dommages, d emballage déchiré, de traces d humidité,
            de produits manquants ou d autres irrégularités, le client doit,
            dans la mesure du possible, les mentionner sur le bon de livraison
            du transporteur et photographier les marchandises.
          </p>
          <p>
            Les réclamations doivent être envoyées à
            contact@perrierbois.fr, avec le numéro de commande, la
            description du problème et les photos pertinentes.
          </p>
          <p>
            Cette recommandation ne porte pas atteinte aux droits légaux du
            consommateur concernant les problèmes non apparents au moment de
            la livraison.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            14. Transfert des risques
          </h2>
          <p>
            Le risque de perte ou de détérioration des produits est transféré
            au client lorsque celui-ci ou un tiers désigné par le client,
            autre que le transporteur, prend possession physique des
            marchandises.
          </p>
          <p>
            Si le client choisit un transporteur autre que ceux proposés par
            Perrier Bois, le risque peut être transféré au moment de la
            remise des produits à ce transporteur.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            15. Annulation avant l expédition
          </h2>
          <p>
            Le client peut demander l annulation de sa commande avant
            l expédition via :
          </p>
          <p>
            E-mail : contact@perrierbois.fr
            <br />
            Téléphone ou WhatsApp : +33 6 12 34 56 78
          </p>
          <p>
            La possibilité d annulation dépend de l état de préparation de la
            commande.
          </p>
          <p>
            Après l expédition de la commande, les règles relatives au droit
            de rétractation et de retour s appliquent.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            16. Droit de rétractation
          </h2>
          <p>
            Pour les contrats conclus en ligne, le consommateur dispose en
            principe d un délai de 14 jours consécutifs pour annuler le contrat
            sans avoir à justifier sa décision.
          </p>
          <p>
            En cas d achat de produits, le délai commence à courir le jour où
            le consommateur ou un tiers désigné par lui, autre que le
            transporteur, prend physique possession des marchandises.
          </p>
          <p>Pour exercer ce droit, le consommateur doit notifier clairement sa décision via :</p>
          <p>
            E-mail : contact@perrierbois.fr
            <br />
            Adresse : Perrier Bois, 109 Zone des Varennes, 71340 Melay,
            France
          </p>
          <p>
            La notification doit contenir le nom du client, le numéro de
            commande, les produits concernés et la date de réception.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            17. Modèle de déclaration de rétractation libre
          </h2>
          <p>Le consommateur peut utiliser le texte suivant :</p>
          <p>À Perrier Bois,</p>
          <p>
            Par la présente, je vous informe que je souhaite exercer mon droit
            de rétractation concernant le contrat d achat portant sur les
            produits suivants : [identification du produit].
          </p>
          <p>
            Numéro de commande : [numéro de commande].
            <br />
            Date de la commande : [date].
            <br />
            Date de réception : [date].
            <br />
            Nom du client : [nom].
            <br />
            Adresse du client : [adresse].
            <br />
            Date de la notification : [date].
          </p>
          <p>
            L utilisation de ce modèle n est pas obligatoire. Il suffit de
            mentionner clairement la commande et la décision du consommateur.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            18. Retour des produits
          </h2>
          <p>
            Après avoir notifié sa décision d annulation, le consommateur doit
            retourner les produits dans un délai maximum de 14 jours, sauf si
            Perrier Bois propose de les récupérer.
          </p>
          <p>
            Avant le retour, le consommateur doit contacter Perrier Bois
            pour recevoir les instructions nécessaires.
          </p>
          <p>
            Les produits doivent être correctement protégés et emballés pour
            éviter les pertes, l humidité ou les dommages pendant le transport.
          </p>
          <p>
            Le consommateur supporte les frais directs de retour, sauf si
            Perrier Bois a accepté de les prendre en charge, ou si le
            retour est dû à une erreur, un dommage ou un défaut de conformité
            imputable au vendeur.
          </p>
          <p>
            Si le poids, le volume ou la nature des produits rendent le retour
            par voie postale normale impossible, le coût estimé de
            l enlèvement ou du transport doit être communiqué au consommateur
            avant la finalisation de l achat.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            19. État des produits retournés
          </h2>
          <p>
            Le consommateur ne doit manipuler les produits que dans la mesure
            nécessaire pour vérifier leur nature, leurs caractéristiques et
            leur conformité.
          </p>
          <p>
            Le consommateur peut être tenu responsable de toute dépréciation
            résultant d une manipulation allant au-delà de ce qui est
            nécessaire pour l examen.
          </p>
          <p>
            Pour les granulés ou le bois de chauffage, l utilisation, la
            combustion, la consommation, le mélange avec d autres combustibles,
            l exposition à la pluie, le stockage dans un environnement humide
            ou l ouverture d une quantité d emballage supérieure à celle
            nécessaire à l inspection peuvent entraîner une réduction du montant
            du remboursement.
          </p>
          <p>
            Cette disposition ne porte pas atteinte aux droits des consommateurs
            lorsque les produits sont endommagés, non conformes ou ne
            correspondent pas au contrat.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            20. Exceptions au droit de rétractation
          </h2>
          <p>
            Le droit de rétractation ne s applique pas dans les cas prévus par
            la loi, notamment, le cas échéant, pour les produits fabriqués,
            découpés, préparés ou personnalisés selon les indications
            spécifiques du client.
          </p>
          <p>
            Toute exception applicable est clairement communiquée avant la
            finalisation de la commande.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            21. Remboursements
          </h2>
          <p>
            Lorsque le consommateur exerce efficacement son droit de
            rétractation, Perrier Bois rembourse les paiements reçus, y
            compris les frais de la méthode de livraison standard prévue pour
            la commande.
          </p>
          <p>
            Les frais supplémentaires résultant du choix d une méthode de
            livraison plus coûteuse que la méthode standard ne sont pas
            remboursés.
          </p>
          <p>
            Le remboursement est effectué dans le délai légal de 14 jours à
            compter de la date de notification de l annulation, par le même
            moyen de paiement utilisé lors de l achat, sauf accord exprès
            contraire, et le consommateur ne supporte aucun frais.
          </p>
          <p>
            Perrier Bois peut retenir le remboursement jusqu à la
            réception des produits retournés ou jusqu à la preuve de
            l envoi par le consommateur, selon l événement le plus précoce.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            22. Conformité et garantie légale
          </h2>
          <p>
            Perrier Bois s engage à fournir des produits conformes à la
            description, à la quantité, à la qualité et aux caractéristiques
            indiquées au moment de l achat.
          </p>
          <p>
            Conformément à la réglementation française sur la garantie légale
            de conformité (articles L217-1 et suivants du code de la
            consommation), l entreprise est responsable de tout défaut de
            conformité survenant dans un délai de deux ans à compter de la
            date de livraison des biens.
          </p>
          <p>
            Le caractère consommable des granulés et du bois de chauffage ne
            supprime pas les droits du consommateur en ce qui concerne les
            éventuels défauts de conformité existant au moment de la livraison.
          </p>
          <p>
            Les problèmes résultant d une mauvaise utilisation, d un
            stockage inadapté, d une humidité après la livraison, d un
            mélange avec d autres matériaux, d une utilisation avec un
            équipement incompatible ou du non-respect des instructions du
            fabricant d équipement ne sont pas considérés comme des défauts
            de conformité.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            23. Produits endommagés ou non conformes
          </h2>
          <p>
            Si un produit est endommagé, diffère de la commande ou présente
            un autre défaut de conformité, le client doit contacter :
          </p>
          <p>
            E-mail : contact@perrierbois.fr
            <br />
            Téléphone ou WhatsApp : +33 6 12 34 56 78
          </p>
          <p>
            Le client doit indiquer le numéro de commande, décrire le problème
            et, si possible, envoyer des photos de la marchandise, de
            l emballage et de l étiquette.
          </p>
          <p>
            À l issue de cette analyse, les mesures juridiques appropriées sont
            prises, pouvant inclure le remplacement, une réduction
            proportionnelle du prix, un remboursement ou la résiliation du
            contrat.
          </p>
          <p>
            Si un défaut de conformité survient dans les 24 premiers mois
            suivant la livraison, il est présumé exister à la date de la
            livraison et le consommateur peut légalement exiger le
            remplacement ou la réparation des marchandises.
          </p>
          <p>
            Les retours pour défaut de conformité n occasionnent aucun frais
            pour le consommateur.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            24. Utilisation et stockage
          </h2>
          <p>
            Les granulés et le bois de chauffage doivent être stockés dans un
            endroit sec et bien ventilé, à l abri de la pluie, de
            l humidité, de la condensation et du contact direct avec un sol
            humide.
          </p>
          <p>
            Le client doit respecter les instructions du fabricant pour
            l équipement de chauffage concerné et utiliser uniquement des
            combustibles compatibles.
          </p>
          <p>
            Perrier Bois ne saurait être tenu responsable des dommages
            résultant d un stockage inadapté, d une infiltration d eau, d une
            exposition à l eau, d une mauvaise utilisation, d un entretien
            insuffisant de l équipement ou de l utilisation de produits
            incompatibles.
          </p>
          <p>
            Cette limitation n exclut pas la responsabilité qui ne peut pas
            être légalement exclue.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            25. Refus ou annulation de commandes
          </h2>
          <p>
            Perrier Bois peut refuser ou annuler une commande en cas
            d indispponibilité, d impossibilité de livraison, de défaut de
            paiement, de soupçon fondé de fraude, d erreur manifeste ou
            d utilisation abusive du site.
          </p>
          <p>
            Le client est informé et, après paiement effectué, se voit
            rembourser intégralement les montants correspondant aux produits
            non livrés.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            26. Responsabilité
          </h2>
          <p>
            Perrier Bois est responsable de l exécution des obligations
            découlant du contrat et de la législation applicable.
          </p>
          <p>
            Nous ne saurions être responsables des retards ou dommages causés
            par des informations erronées du client, une mauvaise utilisation
            des produits, un stockage insuffisant, une inaccessibilité du
            produit non signalée ou des événements échappant à notre contrôle.
          </p>
          <p>
            Aucune disposition des présentes Conditions générales de vente
            n exclut ni ne limite les droits obligatoires des consommateurs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            27. Force majeure
          </h2>
          <p>
            Perrier Bois ne saurait être responsable des retards ou des
            défauts de conformité résultant d événements imprévisibles ou
            inévitables, notamment incendies, inondations, tempêtes,
            accidents, grèves, fermetures de routes, coupures
            d électricité, perturbations logistiques, pénurie généralisée de
            matières premières ou décisions administratives.
          </p>
          <p>
            Si l exécution du contrat devient définitivement impossible, le
            client en est informé et les sommes correspondant aux produits
            non livrés lui sont remboursées.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            28. Protection des données
          </h2>
          <p>
            Les données personnelles fournies par le client sont traitées pour
            la gestion du compte, de la commande, du paiement, de la
            facturation, de la livraison, du support client, des retours et
            pour l accomplissement des obligations légales.
          </p>
          <p>
            Des informations détaillées sur le traitement des données à
            caractère personnel figurent dans la Politique de confidentialité
            du site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            29. Réclamations
          </h2>
          <p>Le client peut adresser ses réclamations via :</p>
          <p>
            Perrier Bois
            <br />
            E-mail : contact@perrierbois.fr
            <br />
            Téléphone : +33 6 12 34 56 78
            <br />
            Adresse : 109 Zone des Varennes, 71340 Melay, France
          </p>
          <p>
            Les consommateurs peuvent également utiliser la plateforme de
            règlement en ligne des litiges de la Commission européenne
            (https://ec.europa.eu/consumers/odr).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            30. Règlement alternatif des litiges
          </h2>
          <p>
            En cas de litige, le consommateur doit d abord contacter Perrier Bois
            pour rechercher une solution amiable.
          </p>
          <p>
            Le consommateur peut s adresser au médiateur de la consommation
            dont relève Perrier Bois, conformément aux articles L611-1 et
            suivants du code de la consommation. La médiation est gratuite et
            facultative pour le consommateur.
          </p>
          <p>
            Le consommateur peut également recourir à la plateforme de
            règlement en ligne des litiges mise à disposition par la
            Commission européenne, accessible à l adresse
            https://ec.europa.eu/consumers/odr.
          </p>
          <p>
            La liste actualisée des médiateurs de la consommation peut être
            consultée auprès de la Direction générale de la concurrence, de la
            consommation et de la répression des fraudes (DGCCRF).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            31. Droit applicable
          </h2>
          <p>
            Les présentes Conditions générales de vente et les contrats conclus
            via le site sont soumis au droit français.
          </p>
          <p>
            Ce choix ne prive pas le consommateur des mesures de protection
            obligatoires que lui confère la législation applicable dans son
            pays de résidence.
          </p>
          <p>
            À défaut de règlement amiable ou extrajudiciaire, les juridictions
            compétentes sont celles déterminées par les règles de droit
            applicables, et aucune restriction territoriale ne sera imposée
            au détriment des droits du consommateur.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            32. Modifications des conditions
          </h2>
          <p>
            Perrier Bois peut modifier les présentes Conditions générales de
            vente en raison de modifications légales, techniques, logistiques
            ou commerciales.
          </p>
          <p>
            Ces modifications ne portent pas atteinte aux commandes déjà
            conclues. La version applicable à chaque achat est la version
            acceptée par le client au moment de la commande.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            33. Contacts
          </h2>
          <p>
            Pour des informations sur les produits, les commandes, les
            paiements, les livraisons, les retours ou les réclamations :
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
