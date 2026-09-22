/**
 * Emails transactionnels (SMTP).
 * Renseigner SMTP_HOST / SMTP_USER / SMTP_PASSWORD dans .env.local pour activer l'envoi.
 */

import nodemailer from "nodemailer";
import { formaterPrix } from "./format";

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
}: {
  to: string;
  sujet: string;
  html: string;
}): Promise<{ envoye: boolean }> {
  if (!transporter) {
    console.warn(
      `[email] SMTP non configuré - email non envoyé à ${to} (sujet: ${sujet})`,
    );
    return { envoye: false };
  }

  try {
    await transporter.sendMail({ from: FROM, to, subject: sujet, html });
    return { envoye: true };
  } catch (error) {
    console.error(`[email] échec envoi à ${to}:`, error);
    return { envoye: false };
  }
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
    html: `
      <h1>Réinitialisation du mot de passe</h1>
      <p>Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
      <p><a href="${lien}">${lien}</a></p>
      <p>Ce lien est valable 1 heure. Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
    `,
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
    html: `
      <h1>Bienvenue sur notre boutique !</h1>
      <p>Merci pour votre inscription. Avant de pouvoir vous connecter, veuillez valider votre adresse email en cliquant sur le lien ci-dessous :</p>
      <p><a href="${lien}">${lien}</a></p>
      <p>Ce lien expirera dans 24 heures.</p>
    `,
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
    html: `
      <h1>Merci ${prenom} !</h1>
      <p>Votre commande <strong>${numeroCommande}</strong> a bien été enregistrée.</p>
      <p>Montant total : <strong>${formaterPrix(total)}</strong></p>
      <p>Vous recevrez un email dès que le statut de votre commande évoluera.</p>
    `,
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
  return envoyerEmail({
    to: email,
    sujet: `Votre commande ${numeroCommande} est ${libelles[statut] ?? statut}`,
    html: `
      <h1>Bonjour ${prenom},</h1>
      <p>Le statut de votre commande <strong>${numeroCommande}</strong> a changé :</p>
      <p><strong>${libelles[statut] ?? statut}</strong></p>
      <p>Merci de votre confiance.</p>
    `,
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
      <div style="background:#f9f6f0;border:1px solid #e2d8c8;border-radius:8px;padding:20px;margin:20px 0;">
        <h2 style="margin:0 0 15px 0;font-size:18px;color:#292524;">Coordonnées bancaires pour le paiement</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr>
            <td style="padding:8px 0;font-weight:bold;color:#57534e;">Titulaire du compte :</td>
            <td style="padding:8px 0;color:#292524;">${rib.titulaire}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:bold;color:#57534e;">Banque :</td>
            <td style="padding:8px 0;color:#292524;">${rib.banque}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:bold;color:#57534e;">IBAN :</td>
            <td style="padding:8px 0;color:#292524;font-family:monospace;">${rib.iban}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:bold;color:#57534e;">BIC/SWIFT :</td>
            <td style="padding:8px 0;color:#292524;font-family:monospace;">${rib.bic}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:bold;color:#57534e;">Siège :</td>
            <td style="padding:8px 0;color:#292524;">${rib.siege}</td>
          </tr>
        </table>
      </div>
    `
    : "";

  return envoyerEmail({
    to: email,
    sujet: `Paiement de votre commande ${numeroCommande}`,
    html: `
      <h1>Merci pour votre commande !</h1>
      <p>Votre commande <strong>${numeroCommande}</strong> a bien été enregistrée.</p>
      <p>Montant total à régler : <strong>${formaterPrix(total)}</strong></p>
      ${ribHtml}
      <p style="margin-top:20px;">Veuillez effectuer un virement bancaire du montant total en mentionnant votre numéro de commande <strong>${numeroCommande}</strong> comme référence.</p>
      <p>Après réception du paiement, votre commande sera confirmée et préparée.</p>
      <p style="margin-top:15px;color:#7c7469;font-size:13px;">Si vous avez des questions, n'hésitez pas à nous contacter.</p>
    `,
  });
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
      `[email] CONTACT_EMAIL non configurée - message de ${email} non notifié (sujet: ${sujet})`,
    );
    return { envoye: false };
  }
  return envoyerEmail({
    to: destinataire,
    sujet: `Nouveau message de contact : ${sujet}`,
    html: `
      <h1>Nouveau message de contact</h1>
      <p><strong>Nom :</strong> ${nom}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Sujet :</strong> ${sujet}</p>
      <p><strong>Message :</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });
}