export const ROLES = {
  CLIENT: "client",
  GERANT: "gerant",
  ADMIN: "admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const STATUTS_COMMANDE = [
  "en_attente",
  "confirmee",
  "en_preparation",
  "expediee",
  "livree",
  "annulee",
] as const;

export type StatutCommande = (typeof STATUTS_COMMANDE)[number];

export const STATUTS_PAIEMENT = [
  "en_attente",
  "paye",
  "echoue",
  "rembourse",
] as const;

export type StatutPaiement = (typeof STATUTS_PAIEMENT)[number];

export const METHODES_PAIEMENT = ["virement"] as const;

export type MethodePaiement = (typeof METHODES_PAIEMENT)[number];

export const STATUTS_AVIS = ["en_attente", "approuve", "rejete"] as const;

export type StatutAvis = (typeof STATUTS_AVIS)[number];

export const DEVISES = ["EUR"] as const;

export type Devise = (typeof DEVISES)[number];
