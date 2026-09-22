import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Politique de confidentialité</h1>
      <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          La présente Politique de confidentialité décrit comment Perrier Bois collecte, utilise, stocke et protège les données à caractère
          personnel des utilisateurs et clients de son site.
        </p>
        <p>
          Le traitement des données à caractère personnel est effectué
          conformément au Règlement général sur la protection des données
          (RGPD) et à la loi n° 78-17 du 6 janvier 1978 relative à
          l informatique, aux fichiers et aux libertés, modifiée (loi
          Informatique et Libertés).
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            1. Responsable du traitement
          </h2>
          <p>Le responsable du traitement des données à caractère personnel est :</p>
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
            <strong>Dirigeant :</strong> Laurent PERRIER
            <br />
            <strong>E-mail :</strong> contact@perrierbois.fr
            <br />
            <strong>Téléphone :</strong> +33 6 12 34 56 78
          </p>
          <p>
            Pour toute question relative à la protection des données à caractère
            personnel ou à l exercice de vos droits, vous pouvez nous contacter
            à l adresse suivante :
            <br />
            contact@perrierbois.fr
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            2. Données à caractère personnel collectées
          </h2>
          <p>Perrier Bois peut collecter les données à caractère personnel suivantes :</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>nom et prénom ;</li>
            <li>numéro de TVA intracommunautaire, le cas échéant ;</li>
            <li>adresse e-mail ;</li>
            <li>numéro de téléphone ;</li>
            <li>adresse de facturation ;</li>
            <li>adresse de livraison ;</li>
            <li>informations sur le produit et la commande ;</li>
            <li>données nécessaires à l émission des factures ;</li>
            <li>
              historique des achats, paiements, livraisons et retours ;
            </li>
            <li>
              messages via le formulaire de contact, par e-mail, téléphone ou
              WhatsApp ;
            </li>
            <li>adresse IP ;</li>
            <li>
              informations sur le navigateur, l appareil et le système
              d exploitation ;
            </li>
            <li>données de navigation et d interaction avec le site ;</li>
            <li>
              préférences en matière de cookies et de communications
              publicitaires.
            </li>
          </ul>
          <p>
            Perrier Bois ne collecte ni ne stocke directement les
            informations complètes de carte bancaire. Les paiements
            électroniques sont éventuellement traités par le prestataire de
            paiement indiqué sur le site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            3. Mode de collecte des données
          </h2>
          <p>Les données à caractère personnel peuvent être collectées lorsque l utilisateur :</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>crée un compte client ;</li>
            <li>passe une commande ;</li>
            <li>demande une facture ;</li>
            <li>effectue un paiement ou tente d en effectuer un ;</li>
            <li>remplit un formulaire de contact ;</li>
            <li>envoie un e-mail ;</li>
            <li>nous contacte par téléphone ou WhatsApp ;</li>
            <li>
              demande des informations sur les produits, les prix ou les
              livraisons ;
            </li>
            <li>introduit une réclamation ;</li>
            <li>demande un retour ou un remboursement ;</li>
            <li>s inscrit aux communications publicitaires ;</li>
            <li>navigue ou interagit sur le site ;</li>
            <li>accepte ou configure des cookies.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            4. Finalités du traitement
          </h2>
          <p>Les données à caractère personnel peuvent être traitées aux fins suivantes :</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Gestion des commandes</strong>
              <br />
              Pour l enregistrement, la confirmation, la préparation et le
              suivi des commandes passées via le site.
            </li>
            <li>
              <strong>Paiements et facturation</strong>
              <br />
              Pour le traitement des paiements, l émission des factures, le
              traitement des remboursements et l accomplissement des
              obligations fiscales, comptables et commerciales applicables.
            </li>
            <li>
              <strong>Livraisons</strong>
              <br />
              Pour la confirmation de l adresse, l organisation du transport,
              la prise de contact avec le client et la livraison des produits
              achetés.
            </li>
            <li>
              <strong>Service client</strong>
              <br />
              Pour répondre aux demandes, questions, réclamations, retours,
              annulations et problèmes liés aux produits ou aux commandes.
            </li>
            <li>
              <strong>Gestion des comptes clients</strong>
              <br />
              Pour la création et la gestion de votre compte, le stockage des
              données nécessaires et la consultation de l historique des
              commandes.
            </li>
            <li>
              <strong>Sécurité et prévention de la fraude</strong>
              <br />
              Pour la protection du site, la vérification des transactions, la
              prévention des accès non autorisés, la détection des
              comportements frauduleux et la défense des droits de Perrier Bois et de ses clients.
            </li>
            <li>
              <strong>Accomplissement des obligations légales</strong>
              <br />
              Pour l accomplissement des obligations fiscales, comptables,
              administratives, judiciaires ou imposées par les autorités
              compétentes.
            </li>
            <li>
              <strong>Communication de l entreprise</strong>
              <br />
              Pour l envoi de messages, campagnes, offres promotionnelles et
              informations commerciales lorsque le client y a consenti ou
              lorsque l envoi est autorisé par la législation applicable.
            </li>
          </ul>
          <p>
            Toute communication publicitaire propose un moyen simple et gratuit
            de se désinscrire. La CNIL (Commission nationale de l informatique
            et des libertés) rappelle que les messages publicitaires adressés
            aux personnes physiques nécessitent en principe un consentement
            préalable et explicite et doivent permettre un refus libre et
            simple.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Amélioration du site</strong>
              <br />
              Analyse des fonctionnalités, correction des erreurs, amélioration
              de la navigation, compréhension de l utilisation du service et
              optimisation de la présentation des produits.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            5. Base juridique
          </h2>
          <p>
            Perrier Bois traite les données à caractère personnel sur la
            base d un ou plusieurs des fondements suivants :
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Exécution du contrat</strong>
              <br />
              Lorsque le traitement est nécessaire pour obtenir, traiter,
              livrer ou gérer une commande et pour répondre aux demandes du
              client avant l achat.
            </li>
            <li>
              <strong>Accomplissement d une obligation légale</strong>
              <br />
              Lorsque ces données sont nécessaires pour la facturation, la
              comptabilité, les impôts, la prévention de la fraude, les
              réponses aux autorités ou l accomplissement d autres obligations
              légales.
            </li>
            <li>
              <strong>Intérêt légitime</strong>
              <br />
              Lorsque le traitement est nécessaire pour protéger et améliorer
              l activité de Perrier Bois, garantir la sécurité du site,
              prévenir les abus, répondre aux clients ou défendre des droits
              dans des procédures administratives ou judiciaires.
            </li>
            <li>
              <strong>Consentement</strong>
              <br />
              Lorsque l utilisateur consent à recevoir des communications
              publicitaires ou autorise l utilisation de cookies non
              essentiels.
            </li>
          </ul>
          <p>
            Le consentement peut être retiré à tout moment sans que cela porte
            atteinte à la licéité des traitements effectués préalablement. Le
            consentement n est qu un des fondements juridiques du traitement
            prévus par le RGPD.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            6. Informations nécessaires pour un achat
          </h2>
          <p>
            Certaines informations, telles que le nom, les coordonnées,
            l adresse de livraison et les données de facturation, sont
            nécessaires au traitement d une commande.
          </p>
          <p>
            Si l utilisateur ne fournit pas les données requises, Perrier Bois ne sera peut-être pas en mesure de :
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>finaliser l achat ;</li>
            <li>émettre la facture ;</li>
            <li>recevoir ou confirmer un paiement ;</li>
            <li>livrer les produits ;</li>
            <li>contacter le client concernant la commande ;</li>
            <li>traiter un retour ou une réclamation.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            7. Destinataires des données
          </h2>
          <p>
            Les données à caractère personnel ne peuvent être communiquées dans
            la mesure nécessaire qu aux catégories de destinataires suivantes :
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>sociétés de transport et de distribution ;</li>
            <li>prestataires de paiement ;</li>
            <li>établissements bancaires ;</li>
            <li>prestataires d hébergement et de maintenance du site ;</li>
            <li>prestataires de plateformes de commerce électronique ;</li>
            <li>
              prestataires de services d e-mail et de service client ;
            </li>
            <li>services de comptabilité et de facturation ;</li>
            <li>conseillers juridiques, fiscaux ou techniques ;</li>
            <li>sociétés d assurance, le cas échéant ;</li>
            <li>autorités fiscales, judiciaires, policières ou administratives ;</li>
            <li>
              autres organismes lorsque la communication est prévue par la loi.
            </li>
          </ul>
          <p>
            Ces destinataires ne peuvent utiliser les données que pour
            l exécution des services contractuels, l accomplissement des
            obligations légales ou l atteinte des finalités communiquées à la
            personne concernée.
          </p>
          <p>Perrier Bois ne vend pas de données à caractère personnel à des tiers.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            8. Communication par WhatsApp
          </h2>
          <p>
            Lorsqu un utilisateur contacte Perrier Bois via WhatsApp, il
            fournit volontairement son numéro de téléphone, son nom de profil,
            ses messages et toutes les autres informations envoyées au cours
            de la conversation.
          </p>
          <p>
            Ces données sont utilisées pour répondre à la demande, fournir des
            informations, assister le client ou suivre une commande.
          </p>
          <p>
            L utilisation de WhatsApp est également soumise aux conditions
            d utilisation et à la politique de confidentialité du prestataire
            de service concerné.
          </p>
          <p>
            L utilisateur peut choisir de contacter Perrier Bois
            directement par e-mail à contact@perrierbois.fr.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            9. Transferts internationaux
          </h2>
          <p>
            Certains prestataires technologiques utilisés par le site peuvent
            traiter ou stocker des informations en dehors de l Espace
            économique européen.
          </p>
          <p>
            En cas de transfert international de données à caractère personnel,
            Perrier Bois veillera à l existence d un mécanisme juridique
            approprié, tel que :
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>une décision d adéquation de la Commission européenne ;</li>
            <li>des clauses contractuelles types ;</li>
            <li>des garanties de sécurité supplémentaires ;</li>
            <li>un autre mécanisme autorisé par le RGPD.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            10. Conservation des données
          </h2>
          <p>
            Les données à caractère personnel ne sont conservées que pour la
            durée nécessaire à la réalisation des finalités pour lesquelles
            elles ont été collectées.
          </p>
          <p>Les critères suivants sont notamment appliqués :</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Les données de commande sont conservées pour la durée nécessaire
              à la gestion de la relation commerciale, des garanties, des
              retours et des éventuelles réclamations ;
            </li>
            <li>
              Les documents fiscaux, documents comptables, factures et leurs
              justificatifs sont conservés pendant la durée légale applicable,
              pouvant aller jusqu à dix ans ;
            </li>
            <li>
              Vos coordonnées sont conservées pour la durée nécessaire au
              traitement de votre demande.
            </li>
          </ul>
          <p>
            Les données utilisées pour les communications publicitaires sont
            conservées jusqu à ce que la personne concernée retire son
            consentement ou s y oppose.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Les données relatives aux réclamations ou aux procédures
              judiciaires sont conservées aussi longtemps que nécessaire pour
              la défense des droits ;
            </li>
            <li>
              Les données techniques et de sécurité sont conservées pour la
              durée nécessaire à la protection du site et à l investigation des
              incidents.
            </li>
          </ul>
          <p>
            Les données collectées via les cookies sont conservées pour les
            durées indiquées dans la politique de cookies.
          </p>
          <p>
            La législation française prévoit que les documents comptables et
            leurs justificatifs doivent être conservés pendant dix années
            civiles consécutives.
          </p>
          <p>
            À l expiration du délai de conservation, les données sont
            supprimées, anonymisées ou bloquées, sauf si leur conservation est
            nécessaire pour l accomplissement d une obligation légale ou pour
            la défense de droits.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            11. Droits des personnes concernées
          </h2>
          <p>
            En vertu de la législation applicable, la personne concernée peut
            exercer les droits suivants :
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Droit d accès :</strong> obtenir la confirmation du
              traitement et consulter vos données ;
            </li>
            <li>
              <strong>Droit de rectification :</strong> corriger les données
              inexactes ou incomplètes ;
            </li>
            <li>
              <strong>Droit à l effacement :</strong> demander la suppression
              des données, dans les limites autorisées par la loi ;
            </li>
            <li>
              <strong>Droit à la limitation :</strong> demander la limitation
              temporaire du traitement ;
            </li>
            <li>
              <strong>Droit d&apos;opposition :</strong> s&apos;opposer à certains
              traitements, y compris le marketing direct ;
            </li>
            <li>
              <strong>Droit à la portabilité :</strong> recevoir les données
              dans un format structuré et couramment utilisé, le cas échéant ;
            </li>
            <li>
              <strong>Droit de retrait du consentement :</strong> retirer une
              autorisation préalablement accordée ;
            </li>
            <li>
              <strong>Droit de réclamation :</strong> déposer une plainte
              auprès de l autorité de contrôle compétente.
            </li>
          </ul>
          <p>
            Le RGPD a renforcé les droits des personnes concernées et les
            obligations de transparence des responsables du traitement.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            12. Exercice des droits
          </h2>
          <p>Pour exercer un droit, la personne concernée doit contacter :</p>
          <p>
            E-mail : contact@perrierbois.fr
            <br />
            Adresse : Perrier Bois, 109 Zone des Varennes, 71340 Melay,
            France
          </p>
          <p>
            La demande doit indiquer clairement le droit que vous souhaitez
            exercer.
          </p>
          <p>
            En cas de doute raisonnable sur l identité du demandeur, des
            informations supplémentaires peuvent être demandées, exclusivement
            aux fins de confirmation de l identité et de protection des données
            contre un accès non autorisé.
          </p>
          <p>
            La demande est traitée dans les délais prévus par la législation
            applicable.
          </p>
          <p>
            Certaines demandes ne peuvent pas être entièrement satisfaites si
            la conservation ou le traitement des données est nécessaire pour
            l accomplissement d une obligation légale, l exercice d un droit
            ou la défense de Perrier Bois dans des procédures judiciaires.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            13. Réclamation auprès de la CNIL
          </h2>
          <p>
            La personne concernée a le droit de déposer une plainte auprès de :
            <br />
            <strong>
              CNIL — Commission nationale de l informatique et des libertés
            </strong>
          </p>
          <p>
            La CNIL est l autorité de contrôle française chargée du respect du
            RGPD et de la loi Informatique et Libertés en matière de protection
            des données à caractère personnel. La réclamation peut être
            déposée en ligne à l adresse www.cnil.fr.
          </p>
          <p>
            Le dépôt d une plainte ne fait pas obstacle à la possibilité de
            contacter préalablement Perrier Bois pour tenter une résolution
            directe du problème.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            14. Cookies
          </h2>
          <p>
            Le site peut utiliser des cookies et des technologies similaires
            pour :
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>garantir le bon fonctionnement de la boutique en ligne ;</li>
            <li>enregistrer le panier d achat ;</li>
            <li>mémoriser les préférences ;</li>
            <li>protéger les sessions et les paiements ;</li>
            <li>analyser l utilisation du site ;</li>
            <li>mesurer la performance ;</li>
            <li>personnaliser le contenu ou la publicité le cas échéant.</li>
          </ul>
          <p>
            Les cookies strictement nécessaires peuvent être utilisés sans
            consentement, car ils sont indispensables au fonctionnement du
            site.
          </p>
          <p>
            Les cookies analytiques, publicitaires ou autres non essentiels ne
            sont utilisés qu avec le consentement de l utilisateur, dans les
            limites prévues par la loi.
          </p>
          <p>
            L utilisateur peut accepter, refuser ou configurer les cookies via
            le mécanisme de consentement prévu sur le site.
          </p>
          <p>
            Les informations détaillées relatives à chaque cookie devraient
            figurer dans la politique de cookies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            15. Sécurité des données
          </h2>
          <p>
            Perrier Bois met en œuvre des mesures techniques et
            organisationnelles appropriées pour protéger les données à caractère
            personnel contre :
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>la perte ;</li>
            <li>la destruction ;</li>
            <li>la modification ;</li>
            <li>l utilisation abusive ;</li>
            <li>l accès non autorisé ;</li>
            <li>la divulgation accidentaire ou illicite.</li>
          </ul>
          <p>
            Ces mesures peuvent inclure des contrôles d accès, des mots de
            passe, des connexions sécurisées, des mises à jour techniques, des
            sauvegardes et la limitation de l accès aux données.
          </p>
          <p>
            Malgré les mesures prises, aucun système de transmission ou de
            stockage électronique ne peut garantir une sécurité absolue.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            16. Violation de données à caractère personnel
          </h2>
          <p>
            En cas d incident de sécurité, Perrier Bois évalue les risques
            et prend les mesures nécessaires pour en limiter les
            conséquences.
          </p>
          <p>
            Une fois les conditions légales remplies, l incident est déclaré
            à la CNIL (Commission nationale de l informatique et des libertés)
            et aux personnes concernées. La CNIL précise en outre que toute
            violation de données doit être documentée, même si la déclaration à
            l autorité n est pas obligatoire.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            17. Données de mineurs
          </h2>
          <p>
            Ce site ne s adresse pas spécifiquement aux mineurs.
          </p>
          <p>
            Perrier Bois n a pas l intention de collecter sciemment des
            données à caractère personnel de mineurs sans la participation de
            leur représentant légal.
          </p>
          <p>
            Si une collecte inappropriée de données d un mineur est détectée,
            des mesures de suppression de ces informations sont prises, sauf si
            leur conservation est imposée par la loi.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            18. Décisions automatisées
          </h2>
          <p>
            Perrier Bois n a pas l intention de prendre des décisions
            fondées exclusivement sur un traitement automatisé ayant des
            effets juridiques ou affectant significativement les
            utilisateurs.
          </p>
          <p>
            Des mécanismes automatiques de sécurité ou de prévention de la
            fraude peuvent être utilisés. Lorsqu une transaction suspecte est
            détectée par ces mécanismes, la commande peut faire l objet d un
            contrôle supplémentaire.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            19. Liens vers d autres sites
          </h2>
          <p>
            Le site peut contenir des liens vers des pages de tiers.
          </p>
          <p>
            Perrier Bois ne contrôle pas les pratiques en matière de
            protection des données de ces sites et n est pas responsable du
            traitement effectué par leurs exploitants.
          </p>
          <p>
            Il est recommandé aux utilisateurs de consulter la politique de
            confidentialité de chaque site externe avant de fournir des données
            à caractère personnel.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            20. Modification de la politique de confidentialité
          </h2>
          <p>
            Perrier Bois peut mettre à jour la présente politique de
            confidentialité pour refléter des modifications légales,
            techniques, commerciales ou opérationnelles du site.
          </p>
          <p>La version la plus récente est toujours disponible sur cette page.</p>
          <p>
            En cas de modification substantielle, celle-ci peut être communiquée
            via le site ou les coordonnées du client.
          </p>
          <p>
            <strong>Dernière mise à jour :</strong> 22 septembre 2026.
          </p>
        </section>
      </div>
    </div>
  );
}
