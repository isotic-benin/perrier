import { describe, it, expect } from "vitest";
import { formaterPrix, prixEffectif } from "../format";

describe("formaterPrix", () => {
  it("formate un prix en EUR", () => {
    expect(formaterPrix(50)).toContain("50,00");
    expect(formaterPrix(50)).toContain("€");
  });

  it("formate avec deux décimales", () => {
    expect(formaterPrix(49.99)).toContain("49,99");
  });

  it("formate avec des décimales", () => {
    expect(formaterPrix(12.5)).toContain("12,50");
  });

  it("formate les grands montants avec espace insécable", () => {
    expect(formaterPrix(1250)).toContain("1\u202f250,00");
  });
});

describe("prixEffectif", () => {
  it("retourne le prix promo quand il existe", () => {
    expect(prixEffectif({ prix: 100, prixPromo: 80 })).toBe(80);
  });

  it("retourne le prix normal sinon", () => {
    expect(prixEffectif({ prix: 100, prixPromo: null })).toBe(100);
    expect(prixEffectif({ prix: 100 })).toBe(100);
  });
});