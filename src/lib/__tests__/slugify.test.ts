import { describe, it, expect } from "vitest";
import { slugify, estObjectId } from "../slugify";

describe("slugify", () => {
  it("supprime les accents", () => {
    expect(slugify("T-shirt Élégant")).toBe("t-shirt-elegant");
  });

  it("met en minuscules", () => {
    expect(slugify("Chaussures De Sport")).toBe("chaussures-de-sport");
  });

  it("remplace les espaces et caractères spéciaux par des tirets", () => {
    expect(slugify("Montre & accessoires !")).toBe("montre-accessoires");
  });

  it("supprime les tirets en début et fin", () => {
    expect(slugify("  -Produit-  ")).toBe("produit");
  });
});

describe("estObjectId", () => {
  it("accepte un ObjectId valide", () => {
    expect(estObjectId("64b0a1b2c3d4e5f6a7b8c9d0")).toBe(true);
  });

  it("rejette un identifiant invalide", () => {
    expect(estObjectId("abc")).toBe(false);
    expect(estObjectId("64b0a1b2c3d4e5f6a7b8c9d0Z")).toBe(false);
  });
});