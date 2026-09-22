import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Mentions légales</h1>
      <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            1. Responsable du site
          </h2>
          <p>
            Ce site est la propriété et est exploité par :
            <br />
            <br />
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
            Le coût de l appel téléphonique dépend du forfait souscrit par
            l utilisateur auprès de son opérateur de télécommunications.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            2. Objet du site
          </h2>
          <p>
            Le site Perrier Bois a pour objet la présentation, la
            promotion et la vente en ligne de granulés de bois, de bois de
            chauffage et d autres produits liés au chauffage au bois pour
            usage domestique.
          </p>
          <p>
            L utilisation de ce site implique l acceptation des présentes
            mentions légales ainsi que de toutes les autres conditions,
            politiques et informations disponibles sur le site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            3. Informations sur les produits
          </h2>
          <p>
            Perrier Bois s efforce de fournir des informations claires,
            précises et actualisées sur les produits qu elle vend.
          </p>
          <p>
            Les photographies et images présentées sur le site sont fournies à
            titre informatif uniquement. En raison de l origine naturelle du
            bois, de légères différences de teinte, de texture, de taille, de
            poids, de forme ou d aspect peuvent exister entre les images
            affichées et les produits livrés.
          </p>
          <p>
            Ces écarts naturels ne constituent pas nécessairement un défaut et
            n altèrent ni la qualité ni l usage du produit.
          </p>
          <p>
            Le client devrait examiner attentivement la description, la
            quantité, le poids, le type de bois, l emballage, les conditions
            d utilisation et les recommandations de stockage sur chaque page
            de produit.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            4. Utilisation et stockage
          </h2>
          <p>
            Les granulés et le bois de chauffage doivent être stockés dans un
            endroit sec et bien ventilé, à l abri de la pluie, de
            l humidité et du contact direct avec l eau.
          </p>
          <p>
            Il est de la responsabilité du client de vérifier que le produit
            acheté est compatible avec son appareil de récupération de chaleur,
            son poêle à bois, sa chaudière, sa cuisinière ou tout autre
            équipement de chauffage.
          </p>
          <p>
            L utilisation de ces produits doit être conforme aux instructions
            et recommandations du fabricant de l équipement.
          </p>
          <p>
            Perrier Bois ne saurait être responsable des dommages
            résultant d un stockage inadapté, d une exposition à l humidité,
            d une mauvaise utilisation, de l utilisation avec un équipement
            incompatible ou d un entretien insuffisant de l équipement de
            chauffage.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            5. Prix, commandes et livraisons
          </h2>
          <p>
            Les prix des produits sont ceux affichés sur le site au moment de
            la commande.
          </p>
          <p>
            Les frais de livraison, les taxes applicables, les modes de
            paiement, les zones de livraison, les délais de livraison
            estimés et autres conditions d achat sont communiqués au client
            avant la confirmation de la commande.
          </p>
          <p>
            Avant de finaliser l achat, le client doit vérifier attentivement
            les produits sélectionnés, les quantités, le prix total, les frais
            de livraison, les coordonnées et l adresse de livraison.
          </p>
          <p>
            Les règles relatives aux commandes, paiements, livraisons,
            annulations, retours et remboursements sont décrites dans les
            Conditions générales de vente disponibles sur le site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            6. Disponibilité
          </h2>
          <p>
            Tous les produits présentés sur le site sont proposés sous réserve
            de disponibilité.
          </p>
          <p>
            La présence d un produit sur le site ne garantit pas sa
            disponibilité permanente.
          </p>
          <p>
            Si un produit n est plus disponible après une commande, Perrier Bois contactera le client via les coordonnées communiquées lors
            de l achat afin de proposer une solution adaptée.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            7. Accès au site
          </h2>
          <p>
            Perrier Bois s efforce de maintenir le site accessible et
            sécurisé en permanence.
          </p>
          <p>
            L accès peut toutefois être temporairement interrompu ou limité en
            raison de travaux de maintenance, de mises à jour, de
            perturbations techniques, de problèmes d hébergement, de pannes
            réseau, de raisons de sécurité ou de circonstances échappant au
            contrôle de Perrier Bois.
          </p>
          <p>
            Perrier Bois ne garantit pas que le site est permanently
            accessible ou totalement exempt d erreurs, d interruptions ou de
            composants nuisibles.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            8. Comportement de l utilisateur
          </h2>
          <p>
            L utilisateur s engage à utiliser le site de manière responsable,
            légale et respectueuse des droits de Perrier Bois et des
            tiers.
          </p>
          <p>Toute utilisation du site aux fins suivantes est interdite :</p>
          <ul className="list-disc space-y-1 pl-6">
            <li> commettre des actes de fraude ou des activités illégales ;</li>
            <li> introduire des virus ou autres éléments informatiques nuisibles ;</li>
            <li>
              obtenir un accès non autorisé au site ou à ses systèmes ;
            </li>
            <li> entraver le fonctionnement normal de la plateforme ;</li>
            <li>
              copier ou utiliser le contenu sans autorisation à des fins
              commerciales ;
            </li>
            <li>
              fournir de fausses informations lors du processus d achat.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            9. Propriété intellectuelle
          </h2>
          <p>
            Le contenu du site, y compris les textes, images, photographies,
            logos, éléments graphiques, vidéos, documents, design, structure et
            organisation, appartient à Perrier Bois ou est utilisé avec
            l autorisation des titulaires respectifs.
          </p>
          <p>
            La reproduction, la diffusion, la modification, la publication, la
            commercialisation, la transmission ou la réutilisation du contenu
            est interdite sans autorisation préalable écrite.
          </p>
          <p>
            Les utilisateurs peuvent uniquement consulter et imprimer les pages
            du site à des fins personnelles et non commerciales.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            10. Limitation de responsabilité
          </h2>
          <p>
            Perrier Bois s efforce de garantir l exactitude et
            l actualité des informations publiées, mais ne garantit pas
            l absence totale d erreurs ou d omissions.
          </p>
          <p>
            Dans les limites autorisées par la loi, Perrier Bois ne saurait
            être responsable des dommages pouvant résulter :
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li> d une utilisation abusive du site ;</li>
            <li> de perturbations ou interruptions techniques ;</li>
            <li>
              de problèmes de connexion Internet de l utilisateur ;
            </li>
            <li> du recours à des informations obsolètes ou incomplètes ;</li>
            <li>
              du non-respect des instructions d utilisation et de stockage ;
            </li>
            <li>
              de la force majeure ou de circonstances échappant à son
              contrôle.
            </li>
          </ul>
          <p>
            Rien dans les présentes mentions légales ne limite les droits
            obligatoires des consommateurs reconnus par la loi.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            11. Liens vers des sites externes
          </h2>
          <p>
            Le site peut contenir des liens vers des pages ou des services
            exploités par des tiers.
          </p>
          <p>
            Perrier Bois n exerce aucun contrôle sur ces sites et
            décline toute responsabilité concernant leur disponibilité,
            sécurité, contenu, produits, services ou politiques de
            confidentialité.
          </p>
          <p>
            L accès aux sites externes se fait sous la responsabilité de
            l utilisateur.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            12. Protection des données à caractère personnel
          </h2>
          <p>
            Perrier Bois peut collecter et traiter les données à caractère
            personnel nécessaires pour répondre aux demandes de contact,
            traiter les commandes, encaisser les paiements, organiser les
            livraisons, établir les documents commerciaux, assurer le support
            client et remplir les obligations légales.
          </p>
          <p>
            Les conditions de traitement des données à caractère personnel, les
            finalités du traitement, les durées de conservation et les droits
            des personnes concernées sont décrits dans la Politique de
            confidentialité du site.
          </p>
          <p>
            Pour toute question relative aux données à caractère personnel,
            l utilisateur peut contacter :
            <br />
            E-mail : contact@perrierbois.fr
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            13. Cookies
          </h2>
          <p>
            Le site peut utiliser des cookies nécessaires à son bon
            fonctionnement.
          </p>
          <p>
            Avec le consentement de l utilisateur, des cookies analytiques,
            de performance, publicitaires ou de tiers peuvent également être
            utilisés.
          </p>
          <p>
            Les informations sur les cookies utilisés et la manière de gérer
            vos préférences sont disponibles dans la politique de cookies du
            site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            14. Droit applicable
          </h2>
          <p>
            Ce site et les achats effectués via celui-ci sont soumis au droit
            français, sans préjudice des dispositions d ordre public
            applicables en matière de protection des consommateurs.
          </p>
          <p>
            En cas de conflit, les parties s efforcent de trouver une solution
            amiable avant de recourir à des procédures de règlement alternatif
            des litiges ou aux juridictions compétentes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            15. Modification des mentions légales
          </h2>
          <p>
            Perrier Bois se réserve le droit de modifier les présentes
            mentions légales chaque fois que cela est nécessaire pour refléter
            des modifications légales, techniques, commerciales ou
            opérationnelles du site.
          </p>
          <p>
            La version en vigueur est la version publiée sur le site au moment
            de votre demande.
          </p>
          <p>
            <strong>Dernière mise à jour :</strong> 22 septembre 2026.
          </p>
        </section>
      </div>
    </div>
  );
}
