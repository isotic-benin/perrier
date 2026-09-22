import { describe, it, expect } from "vitest";
import {
  calculerFraisLivraison,
  OPTIONS_LIVRAISON,
  SEUIL_LIVRAISON_GRATUITE,
} from "../livraison";

describe("calculerFraisLivraison", () => {
  it("offre la livraison gratuite au-delà du seuil", () => {
    expect(calculerFraisLivraison(SEUIL_LIVRAISON_GRATUITE, "standard")).toBe(0);
    expect(calculerFraisLivraison(100, "standard")).toBe(0);
  });

  it("applique les frais standard en dessous du seuil", () => {
    expect(calculerFraisLivraison(50, "standard")).toBe(6.9);
  });

  it("applique les frais express", () => {
    expect(calculerFraisLivraison(50, "express")).toBe(12.9);
  });

  it("retombe sur le mode standard si le mode est inconnu", () => {
    expect(calculerFraisLivraison(50, "inconnu")).toBe(6.9);
  });
});

describe("constantes livraison", () => {
  it("le seuil de livraison gratuite est de 75 EUR", () => {
    expect(SEUIL_LIVRAISON_GRATUITE).toBe(75);
  });

  it("propose les deux modes standard et express", () => {
    expect(OPTIONS_LIVRAISON.map((o) => o.id)).toEqual([
      "standard",
      "express",
    ]);
  });
});