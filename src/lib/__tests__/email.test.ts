import { describe, it, expect } from "vitest";
import {
  construireHtmlNotificationCommande,
  echapperHtml,
  type NotificationCommande,
} from "../email";

const commande: NotificationCommande = {
  commandeId: "507f1f77bcf86cd799439011",
  numeroCommande: "CMD-2026-000001",
  dateCommande: new Date("2026-03-15T10:30:00Z"),
  clientNom: "Jean Dupont",
  email: "jean.dupont@example.fr",
  telephone: "+33 6 12 34 56 78",
  articles: [
    { nom: "Planche chêne", variante: "2000x200", quantite: 2, prixUnitaire: 45, sousTotal: 90 },
    { nom: "Pied metal", variante: "", quantite: 1, prixUnitaire: 29.9, sousTotal: 29.9 },
  ],
  adresseLivraison: {
    rue: "12 rue des Lilas",
    ville: "Melay",
    codePostal: "71340",
    pays: "France",
    telephone: "+33 6 12 34 56 78",
  },
  adresseFacturation: {
    rue: "12 rue des Lilas",
    ville: "Melay",
    codePostal: "71340",
    pays: "France",
    telephone: "+33 6 12 34 56 78",
  },
  sousTotal: 119.9,
  reduction: 10,
  couponApplique: "BIENVENUE10",
  fraisLivraison: 0,
  total: 109.9,
  modeLivraison: "standard",
  methodePaiement: "virement",
};

describe("echapperHtml", () => {
  it("neutralise les caractères HTML", () => {
    expect(echapperHtml('<script>"x"&\'y\'</script>')).toBe(
      "&lt;script&gt;&quot;x&quot;&amp;&#39;y&#39;&lt;/script&gt;",
    );
  });

  it("gère les valeurs nulles", () => {
    expect(echapperHtml(undefined)).toBe("");
    expect(echapperHtml(null)).toBe("");
  });
});

describe("construireHtmlNotificationCommande", () => {
  const html = construireHtmlNotificationCommande(commande);

  it("contient le numéro de commande et le client", () => {
    expect(html).toContain("CMD-2026-000001");
    expect(html).toContain("Jean Dupont");
    expect(html).toContain("jean.dupont@example.fr");
    expect(html).toContain("+33 6 12 34 56 78");
  });

  it("détaille les produits, les quantités et les totaux", () => {
    expect(html).toContain("Planche chêne");
    expect(html).toContain("2000x200");
    expect(html).toContain("Pied metal");
    expect(html).toContain("Articles (3)");
  });

  it("affiche le récapitulatif avec remise, livraison et total", () => {
    expect(html).toContain("Sous-total");
    expect(html).toContain("Remise");
    expect(html).toContain("BIENVENUE10");
    expect(html).toContain("Livraison");
    expect(html).toContain("Gratuit");
    expect(html).toContain("109,90");
  });

  it("affiche les adresses de livraison et de facturation", () => {
    expect(html).toContain("Adresse de livraison");
    expect(html).toContain("Adresse de facturation");
    expect(html).toContain("12 rue des Lilas");
    expect(html).toContain("71340");
  });

  it("traduit les libellés de livraison et de paiement", () => {
    expect(html).toContain("Livraison standard");
    expect(html).toContain("Virement bancaire");
  });

  it("propose un lien vers la commande dans l'administration", () => {
    expect(html).toContain("/admin/commandes/507f1f77bcf86cd799439011");
  });

  it("échappe les données saisies par le client", () => {
    const htmlXss = construireHtmlNotificationCommande({
      ...commande,
      clientNom: '<img src=x onerror="alert(1)">',
    });
    expect(htmlXss).not.toContain("<img src=x");
    expect(htmlXss).toContain("&lt;img src=x");
  });

  it("omet le bloc facturation quand l'adresse est identique", () => {
    const htmlSansFacturation = construireHtmlNotificationCommande({
      ...commande,
      adresseFacturation: null,
    });
    expect(htmlSansFacturation).not.toContain("Adresse de facturation");
  });

  it("signale un client invité non connecté", () => {
    const htmlInvite = construireHtmlNotificationCommande({
      ...commande,
      clientNom: "",
      telephone: "",
    });
    expect(htmlInvite).toContain("Client invité (non connecté)");
  });
});
