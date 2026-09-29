import { describe, it, expect } from "vitest";
import { calculerFraisLivraison, OPTIONS_LIVRAISON } from "../livraison";
import { MODES_LIVRAISON } from "../constants";

describe("calculerFraisLivraison", () => {
  it("est toujours gratuite", () => {
    expect(calculerFraisLivraison()).toBe(0);
  });
});

describe("constantes livraison", () => {
  it("ne propose qu'un seul mode de livraison, standard", () => {
    expect(OPTIONS_LIVRAISON.map((o) => o.id)).toEqual(["standard"]);
    expect(MODES_LIVRAISON).toEqual(["standard"]);
  });

  it("a un tarif de 0 EUR", () => {
    expect(OPTIONS_LIVRAISON[0].frais).toBe(0);
  });
});
