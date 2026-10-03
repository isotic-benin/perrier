/**
 * Emails transactionnels (SMTP).
 * Renseigner SMTP_HOST / SMTP_USER / SMTP_PASSWORD dans .env.local pour activer l'envoi.
 */

import nodemailer from "nodemailer";
import { formaterPrix } from "./format";
import { OPTIONS_LIVRAISON } from "./livraison";

const FROM =
  process.env.EMAIL_FROM ?? "Perrier Bois <contact@perrierbois.fr>";

const transporter = (() => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) {
    return null;
  }
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_SECURE ?? "true") === "true",
    auth: { user, pass },
  });
})();

export async function envoyerEmail({
  to,
  sujet,
  html,
  replyTo,
}: {
  to: string;
  sujet: string;
  html: string;
  replyTo?: string;
}): Promise<{ envoye: boolean }> {
  if (!transporter) {
    console.warn(
      `[email] SMTP non configuré - email non envoyé à ${to} (sujet: ${sujet})`,
    );
    return { envoye: false };
  }

  try {
    await transporter.sendMail({
      from: FROM,
      to,
      subject: sujet,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    return { envoye: true };
  } catch (error) {
    console.error(`[email] échec envoi à ${to}:`, error);
    return { envoye: false };
  }
}

export function construireLayoutEmail(titre: string, contenu: string): string {
  const annee = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${echapperHtml(titre)}</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f3f4f6;color:#1f2937;-webkit-font-smoothing:antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f3f4f6;width:100%;margin:0;padding:0;">
    <tr>
      <td align="center" style="padding:40px 10px;">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);width:100%;max-width:600px;margin:0 auto;">
          <tr>
            <td align="center" style="background-color:#292524;padding:32px 24px;text-align:center;">
              <h1 style="margin:0;color:#f9f6f0;font-size:26px;font-weight:700;letter-spacing:-0.5px;">PERRIER BOIS</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 32px;font-size:16px;line-height:1.6;color:#374151;">
              ${contenu}
            </td>
          </tr>
          <tr>
            <td style="background-color:#f9fafb;padding:24px 32px;border-top:1px solid #e5e7eb;text-align:center;font-size:13px;color:#6b7280;line-height:1.5;">
              <p style="margin:0 0 8px 0;">
                Vous recevez cet email car vous êtes inscrit(e) sur <strong>Perrier Bois</strong> ou avez effectué une commande.
              </p>
              <p style="margin:0;">
                &copy; ${annee} Perrier Bois. Tous droits réservés.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function envoyerMotDePasseOublie({
  email,
  lien,
}: {
  email: string;
  lien: string;
}): Promise<{ envoye: boolean }> {
  return envoyerEmail({
    to: email,
    sujet: "Réinitialisation de votre mot de passe",
    html: construireLayoutEmail(
      "Réinitialisation du mot de passe",
      `
      <h2 style="margin:0 0 20px 0;font-size:20px;color:#111827;">Réinitialisation de mot de passe</h2>
      <p style="margin:0 0 24px 0;">Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour en définir un nouveau :</p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${lien}" style="display:inline-block;background-color:#292524;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:600;font-size:15px;text-align:center;">
          Définir un nouveau mot de passe
        </a>
      </div>
      <p style="margin:0 0 8px 0;font-size:14px;color:#6b7280;">Ce lien est valable 1 heure.</p>
      <p style="margin:0;font-size:14px;color:#6b7280;">Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email en toute sécurité.</p>
      `
    ),
  });
}

export async function envoyerValidationCompte({
  email,
  lien,
}: {
  email: string;
  lien: string;
}): Promise<{ envoye: boolean }> {
  return envoyerEmail({
    to: email,
    sujet: "Validation de votre compte",
    html: construireLayoutEmail(
      "Validation de votre compte",
      `
      <h2 style="margin:0 0 20px 0;font-size:20px;color:#111827;">Bienvenue chez Perrier Bois !</h2>
      <p style="margin:0 0 24px 0;">Merci pour votre inscription. Avant de pouvoir vous connecter et profiter de nos services, nous devons vérifier votre adresse email.</p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${lien}" style="display:inline-block;background-color:#292524;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:600;font-size:15px;text-align:center;">
          Valider mon adresse email
        </a>
      </div>
      <p style="margin:0;font-size:14px;color:#6b7280;">Ce lien de validation expirera dans 24 heures.</p>
      `
    ),
  });
}

export async function envoyerConfirmationCommande({
  email,
  prenom,
  numeroCommande,
  total,
}: {
  email: string;
  prenom: string;
  numeroCommande: string;
  total: number;
}): Promise<{ envoye: boolean }> {
  return envoyerEmail({
    to: email,
    sujet: `Confirmation de votre commande ${numeroCommande}`,
    html: construireLayoutEmail(
      `Confirmation de votre commande ${numeroCommande}`,
      `
    < h2 style = "margin:0 0 20px 0;font-size:20px;color:#111827;" > Merci ${echapperHtml(prenom)}! </h2>
  < p style = "margin:0 0 16px 0;" > Votre commande<strong>${numeroCommande} < /strong> a bien été enregistrée et est en cours de traitement.</p >
  <div style="background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin:24px 0;" >
  <h3 style="margin:0 0 12px 0;font-size:16px;color:#374151;" > Récapitulatif </h3>
  < p style = "margin:0;font-size:18px;font-weight:600;color:#111827;" > Montant total : ${formaterPrix(total)} </p>
  </div>
  < p style = "margin:0;color:#4b5563;" > Nous vous tiendrons informé(e) très prochainement de l'évolution du statut de votre commande.</p>
    `
    ),
  });
}

export async function envoyerStatutCommande({
  email,
  prenom,
  numeroCommande,
  statut,
}: {
  email: string;
  prenom: string;
  numeroCommande: string;
  statut: string;
}): Promise<{ envoye: boolean }> {
  const libelles: Record<string, string> = {
    en_attente: "en attente de confirmation",
    confirmee: "confirmée",
    en_preparation: "en préparation",
    expediee: "expédiée",
    livree: "livrée",
    annulee: "annulée",
  };
  const statutLibelle = libelles[statut] ?? statut;
  return envoyerEmail({
    to: email,
    sujet: `Votre commande ${numeroCommande} est ${statutLibelle}`,
    html: construireLayoutEmail(
      `Votre commande ${numeroCommande} est ${statutLibelle}`,
      `
  < h2 style = "margin:0 0 20px 0;font-size:20px;color:#111827;" > Bonjour ${echapperHtml(prenom)}, </h2>
  < p style = "margin:0 0 24px 0;" > Le statut de votre commande<strong>${numeroCommande} < /strong> a changé.</p >
  <div style="text-align:center;margin:32px 0;" >
  <span style="display:inline-block;background-color:#f3f4f6;border:1px solid #e5e7eb;color:#111827;padding:12px 24px;border-radius:6px;font-weight:600;font-size:16px;letter-spacing:0.5px;text-transform:uppercase;" >
    ${statutLibelle}
    </span>
    </div>
  < p style = "margin:0;color:#4b5563;" > Une question ? N'hésitez pas à nous contacter.</p>
  < p style = "margin:16px 0 0 0;color:#4b5563;" > Merci encore pour votre confiance.</p>
    `
    ),
  });
}

export async function envoyerEmailPaiement({
  email,
  numeroCommande,
  total,
  rib,
}: {
  email: string;
  numeroCommande: string;
  total: number;
  rib: {
    titulaire: string;
    banque: string;
    iban: string;
    bic: string;
    siege: string;
  } | null;
}): Promise<{ envoye: boolean }> {
  const ribHtml = rib
    ? `
  < div style = "background-color:#ffffff;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin:24px 0;box-shadow:0 1px 2px 0 rgba(0,0,0,0.05);" >
  <h3 style="margin:0 0 16px 0;font-size:16px;font-weight:600;color:#111827;" > Coordonnées bancaires pour le virement </h3>
  < table style = "width:100%;border-collapse:collapse;font-size:14px;" >
  <tr>
  <td style="padding:8px 0;color:#6b7280;width:140px;" > Titulaire du compte : </td>
  < td style = "padding:8px 0;color:#111827;font-weight:500;" >${rib.titulaire} </td>
  </tr>
  < tr >
  <td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6;" > Banque : </td>
  < td style = "padding:8px 0;color:#111827;font-weight:500;border-top:1px solid #f3f4f6;" >${rib.banque} </td>
  </tr>
  < tr >
  <td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6;" > IBAN : </td>
  < td style = "padding:8px 0;color:#111827;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-weight:500;border-top:1px solid #f3f4f6;" >${rib.iban} </td>
  </tr>
  < tr >
  <td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6;" > BIC / SWIFT : </td>
  < td style = "padding:8px 0;color:#111827;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-weight:500;border-top:1px solid #f3f4f6;" >${rib.bic} </td>
  </tr>
  < tr >
  <td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6;" > Siège : </td>
  < td style = "padding:8px 0;color:#111827;font-weight:500;border-top:1px solid #f3f4f6;" >${rib.siege} </td>
  </tr>
  </table>
  </div>
    `
    : "";

  return envoyerEmail({
    to: email,
    sujet: `Paiement de votre commande ${numeroCommande}`,
    html: construireLayoutEmail(
      `Paiement de votre commande ${numeroCommande}`,
      `
  < h2 style = "margin:0 0 20px 0;font-size:20px;color:#111827;" > Merci pour votre commande! </h2>
  < p style = "margin:0 0 16px 0;" > Votre commande<strong>${numeroCommande} < /strong> a bien été enregistrée. Afin de la valider, nous attendons votre paiement.</p >

  <div style="background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin:24px 0;" >
  <h3 style="margin:0 0 12px 0;font-size:16px;color:#374151;" > Montant total à régler </h3>
  < p style = "margin:0;font-size:24px;font-weight:700;color:#111827;" >${formaterPrix(total)} </p>
  </div>

    ${ribHtml}

  < div style = "background-color:#fffbeb;border-left:4px solid #f59e0b;padding:16px;margin:24px 0;border-radius:0 8px 8px 0;" >
  <h4 style="margin:0 0 8px 0;color:#92400e;font-size:15px;" > Information importante </h4>
  < p style = "margin:0;color:#b45309;font-size:14px;line-height:1.5;" > Veuillez effectuer un virement bancaire du montant total en mentionnant obligatoirement votre numéro de commande<strong>${numeroCommande} < /strong> comme libellé ou référence.</p >
  </div>

  < p style = "margin:0;color:#4b5563;" > Dès réception de votre paiement, nous vous enverrons une confirmation et votre commande sera préparée pour l'expédition.</p>
    `
    ),
  });
}

export function echapperHtml(valeur: unknown): string {
  return String(valeur ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function envoyerMessageContact({
  nom,
  email,
  sujet,
  message,
}: {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}): Promise<{ envoye: boolean }> {
  const destinataire = process.env.CONTACT_EMAIL;
  if (!destinataire) {
    console.warn(
      `[email] CONTACT_EMAIL non configurée - message de ${email} non notifié(sujet: ${sujet})`,
    );
    return { envoye: false };
  }
  return envoyerEmail({
    to: destinataire,
    sujet: `Nouveau message de contact : ${sujet}`,
    html: construireLayoutEmail(
      `Nouveau message : ${sujet}`,
      `
  < h2 style = "margin:0 0 20px 0;font-size:20px;color:#111827;" > Nouveau message de contact </h2>
  < div style = "background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin:24px 0;" >
  <p style="margin:0 0 12px 0;" > <strong>Expéditeur : </strong> ${echapperHtml(nom)} (<a href="mailto:${echapperHtml(email)}" style="color:#2563eb;">${echapperHtml(email)}</a >) </p>
    < p style = "margin:0 0 12px 0;" > <strong>Sujet : </strong> ${echapperHtml(sujet)}</p >
      </div>
      < h3 style = "margin:24px 0 12px 0;font-size:16px;color:#374151;" > Contenu du message: </h3>
        < div style = "background-color:#ffffff;border:1px solid #e5e7eb;border-radius:8px;padding:24px;line-height:1.6;color:#1f2937;" >
          ${echapperHtml(message).replace(/n/g, "<br>")}
  </div>
    `
    ),
  });
}

/** Adresse de la boutique qui reçoit les notifications de commande. */
export const DESTINATAIRE_COMMANDES =
  process.env.CONTACT_EMAIL ?? "contact@perrierbois.fr";

export interface ArticleNotificationCommande {
  nom: string;
  variante?: string;
  quantite: number;
  prixUnitaire: number;
  sousTotal?: number;
}

export interface AdresseNotificationCommande {
  rue: string;
  ville: string;
  codePostal?: string;
  pays: string;
  telephone?: string;
}

export interface NotificationCommande {
  commandeId: string;
  numeroCommande: string;
  dateCommande?: Date | string;
  clientNom?: string;
  email: string;
  telephone?: string;
  articles: ArticleNotificationCommande[];
  adresseLivraison: AdresseNotificationCommande;
  adresseFacturation?: AdresseNotificationCommande | null;
  sousTotal: number;
  reduction?: number;
  couponApplique?: string;
  fraisLivraison?: number;
  total: number;
  modeLivraison?: string;
  methodePaiement?: string;
}

const LIBELLES_PAIEMENT: Record<string, string> = {
  virement: "Virement bancaire",
};

function libelleModeLivraison(mode: string): string {
  return (
    OPTIONS_LIVRAISON.find((o) => o.id === mode)?.libelle ?? mode
  );
}

function formaterDateCommande(valeur?: Date | string): string {
  if (!valeur) return "Non renseignée";
  const date = valeur instanceof Date ? valeur : new Date(valeur);
  if (Number.isNaN(date.getTime())) return "Non renseignée";
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

function ligneInfo(label: string, valeur: string): string {
  return `
    < tr >
    <td style="padding:6px 12px 6px 0;font-weight:bold;color:#57534e;white-space:nowrap;vertical-align:top;" > ${label} </td>
      < td style = "padding:6px 0;color:#292524;" > ${valeur} </td>
        </tr>`;
}

function bloc(titre: string, contenu: string): string {
  return `
    <div style="background:#f9f6f0;border:1px solid #e2d8c8;border-radius:8px;padding:20px;margin:20px 0;">
      <h2 style="margin:0 0 12px 0;font-size:16px;color:#292524;border-bottom:2px solid #e2d8c8;padding-bottom:6px;">${titre}</h2>
      ${contenu}
    </div>`;
}

function adresseHtml(adresse: AdresseNotificationCommande): string {
  const codePostal = adresse.codePostal ? `${adresse.codePostal} ` : "";
  const lignes = [
    echapperHtml(adresse.rue),
    echapperHtml(`${codePostal}${adresse.ville}`),
    echapperHtml(adresse.pays),
  ];
  if (adresse.telephone) {
    lignes.push(`Tél : ${echapperHtml(adresse.telephone)}`);
  }
  return lignes
    .map((l) => `<span style="display:block;">${l}</span>`)
    .join("");
}

function ligneTotal(
  label: string,
  valeur: number,
  options: { fort?: boolean; couleur?: string } = {},
): string {
  const styleTexte = options.fort
    ? "font-weight:bold;font-size:16px;color:#292524;"
    : `color:${options.couleur ?? "#292524"};`;
  return `
    <tr>
      <td style="padding:6px 0;${styleTexte}">${label}</td>
      <td style="padding:6px 0;text-align:right;${styleTexte}">${formaterPrix(valeur)}</td>
    </tr>`;
}

/**
 * Construit le HTML de la notification de commande envoyée à la boutique.
 * Exporté pour être testable sans SMTP.
 */
export function construireHtmlNotificationCommande(
  donnees: NotificationCommande,
): string {
  const {
    numeroCommande,
    dateCommande,
    clientNom,
    email,
    telephone,
    articles,
    adresseLivraison,
    adresseFacturation,
    sousTotal,
    reduction = 0,
    couponApplique = "",
    fraisLivraison = 0,
    total,
    modeLivraison = "standard",
    methodePaiement = "virement",
  } = donnees;

  const lignesArticles = articles
    .map((article) => {
      const ligneSousTotal =
        article.sousTotal ?? article.prixUnitaire * article.quantite;
      const variante = article.variante
        ? `<br /><span style="color:#7c7469;font-size:12px;">Variante : ${echapperHtml(article.variante)}</span>`
        : "";
      return `
        <tr>
          <td style="padding:10px 8px;border-bottom:1px solid #e2d8c8;color:#292524;">
            <strong>${echapperHtml(article.nom)}</strong>${variante}
          </td>
          <td style="padding:10px 8px;border-bottom:1px solid #e2d8c8;text-align:center;color:#292524;">${article.quantite}</td>
          <td style="padding:10px 8px;border-bottom:1px solid #e2d8c8;text-align:right;color:#292524;">${formaterPrix(article.prixUnitaire)}</td>
          <td style="padding:10px 8px;border-bottom:1px solid #e2d8c8;text-align:right;font-weight:bold;color:#292524;">${formaterPrix(ligneSousTotal)}</td>
        </tr>`;
    })
    .join("");

  const nombreArticles = articles.reduce((somme, a) => somme + a.quantite, 0);

  const tableauArticles = `
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:10px;">
      <thead>
        <tr>
          <th style="padding:8px;text-align:left;font-size:12px;text-transform:uppercase;color:#7c7469;border-bottom:2px solid #e2d8c8;">Produit</th>
          <th style="padding:8px;text-align:center;font-size:12px;text-transform:uppercase;color:#7c7469;border-bottom:2px solid #e2d8c8;">Qté</th>
          <th style="padding:8px;text-align:right;font-size:12px;text-transform:uppercase;color:#7c7469;border-bottom:2px solid #e2d8c8;">Prix unitaire</th>
          <th style="padding:8px;text-align:right;font-size:12px;text-transform:uppercase;color:#7c7469;border-bottom:2px solid #e2d8c8;">Total</th>
        </tr>
      </thead>
      <tbody>${lignesArticles}</tbody>
    </table>`;

  const ligneReduction = reduction > 0 ? ligneTotal("Remise", -reduction) : "";
  const ligneCoupon = couponApplique
    ? `<tr>
        <td colspan="2" style="padding:0 0 6px 0;font-size:12px;color:#7c7469;">Code promo appliqué : ${echapperHtml(couponApplique)}</td>
      </tr>`
    : "";
  const ligneLivraison =
    fraisLivraison === 0
      ? `<tr>
          <td style="padding:6px 0;color:#292524;">Livraison</td>
          <td style="padding:6px 0;text-align:right;font-weight:bold;color:#16a34a;">Gratuit</td>
        </tr>`
      : ligneTotal("Livraison", fraisLivraison);

  const blocAdresses = `
    ${bloc(
    "Adresse de livraison",
    `<table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${ligneInfo("Destinataire", echapperHtml(clientNom || "Client invité"))}
        ${ligneInfo("Adresse", adresseHtml(adresseLivraison))}
      </table>`,
  )}
    ${adresseFacturation
      ? bloc(
        "Adresse de facturation",
        `<table style="width:100%;border-collapse:collapse;font-size:14px;">
              ${ligneInfo("Adresse", adresseHtml(adresseFacturation))}
            </table>`,
      )
      : ""
    }`;

  const base = (
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000"
  ).replace(/\/+$/, "");
  const lienCommande = `${base}/admin/commandes/${donnees.commandeId}`;

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#292524;">
      <h1 style="margin:0 0 5px 0;font-size:22px;">Nouvelle commande</h1>
      <p style="margin:0 0 20px 0;color:#7c7469;font-size:14px;">
        ${echapperHtml(numeroCommande)} — reçue le ${echapperHtml(formaterDateCommande(dateCommande))}
      </p>

      ${bloc(
    "Client",
    `<table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${ligneInfo("Nom", echapperHtml(clientNom || "Client invité (non connecté)"))}
          ${ligneInfo(
      "Email",
      `<a href="mailto:${echapperHtml(email)}" style="color:#292524;">${echapperHtml(email)}</a>`,
    )}
          ${ligneInfo("Téléphone", echapperHtml(telephone || adresseLivraison.telephone || "Non renseigné"))}
        </table>`,
  )}

      ${bloc(
    `Articles (${nombreArticles})`,
    tableauArticles,
  )}

      ${bloc(
    "Récapitulatif",
    `<table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${ligneTotal("Sous-total", sousTotal)}
          ${ligneReduction}
          ${ligneCoupon}
          ${ligneLivraison}
          <tr>
            <td style="padding:10px 0 0 0;border-top:2px solid #e2d8c8;font-weight:bold;font-size:16px;">Total</td>
            <td style="padding:10px 0 0 0;border-top:2px solid #e2d8c8;text-align:right;font-weight:bold;font-size:16px;">${formaterPrix(total)}</td>
          </tr>
        </table>`,
  )}

      ${bloc(
    "Livraison et paiement",
    `<table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${ligneInfo(
      "Mode de livraison",
      echapperHtml(libelleModeLivraison(modeLivraison)),
    )}
          ${ligneInfo(
      "Méthode de paiement",
      echapperHtml(LIBELLES_PAIEMENT[methodePaiement] ?? methodePaiement),
    )}
          ${ligneInfo("Statut de la commande", "En attente de confirmation")}
        </table>`,
  )}

      ${blocAdresses}

      <p style="margin:24px 0 0 0;">
        <a href="${lienCommande}" style="display:inline-block;background:#292524;color:#f9f6f0;text-decoration:none;padding:12px 22px;border-radius:6px;font-weight:bold;">
          Ouvrir la commande dans l'administration
        </a>
      </p>
      <p style="margin:16px 0 0 0;font-size:12px;color:#7c7469;">
        Répondez directement à cet email pour contacter ${echapperHtml(clientNom || "ce client")}.
      </p>
    </div>`;
}

/**
 * Notifie la boutique dès qu'une commande est enregistrée.
 * Ne bloque jamais la commande : un échec d'envoi est journalisé.
 */
export async function envoyerNotificationCommande(
  donnees: NotificationCommande,
): Promise<{ envoye: boolean }> {
  return envoyerEmail({
    to: DESTINATAIRE_COMMANDES,
    sujet: `Nouvelle commande ${donnees.numeroCommande} — ${formaterPrix(donnees.total)}`,
    html: construireHtmlNotificationCommande(donnees),
    replyTo: donnees.email,
  });
}