import { describe, it, expect } from "vitest";
import { couponSchema, preparerDates } from "../zod-schemas/coupon";

describe("couponSchema", () => {
  it("accepte un coupon valide", () => {
    const resultat = couponSchema.safeParse({
      code: "PROMO10",
      type: "pourcentage",
      valeur: 10,
    });
    expect(resultat.success).toBe(true);
  });

  it("rejette un code invalide", () => {
    const resultat = couponSchema.safeParse({
      code: "code invalide!",
      type: "pourcentage",
      valeur: 10,
    });
    expect(resultat.success).toBe(false);
  });

  it("rejette une valeur négative", () => {
    const resultat = couponSchema.safeParse({
      code: "PROMO",
      type: "montant_fixe",
      valeur: -5,
    });
    expect(resultat.success).toBe(false);
  });

  it("applique les valeurs par défaut", () => {
    const donnees = couponSchema.parse({ code: "AB", type: "montant_fixe", valeur: 500 });
    expect(donnees.montantMinimum).toBe(0);
    expect(donnees.usageMax).toBe(1);
    expect(donnees.actif).toBe(true);
    expect(donnees.categoriesApplicables).toEqual([]);
  });
});

describe("preparerDates", () => {
  it("met le code en majuscules", () => {
    expect(
      preparerDates(
        couponSchema.parse({ code: "promo", type: "pourcentage", valeur: 5 }),
      ).code,
    ).toBe("PROMO");
  });

  it("convertit les dates en Date", () => {
    const donnees = preparerDates(
      couponSchema.parse({
        code: "PROMO",
        type: "pourcentage",
        valeur: 5,
        dateDebut: "2026-01-01",
        dateFin: "2026-12-31",
      }),
    );
    expect(donnees.dateDebut).toBeInstanceOf(Date);
    expect(donnees.dateFin).toBeInstanceOf(Date);
  });
});