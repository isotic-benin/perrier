import "server-only";
import { dbConnect } from "@/lib/db";
import { filtreEnPromotion } from "@/lib/produits";
import Banner from "@/models/Banner";
import Product from "@/models/Product";
import Review from "@/models/Review";
import { getArbreCategories, type CategorieArbre } from "@/lib/categories";
import {
  produireProduitVue,
  type ProduitVue,
  type ProduitBrut,
} from "@/lib/produit-vue";

export interface BanniereAccueil {
  titre: string;
  sousTitre: string;
  image: string;
  lienBouton: string;
  texteBouton: string;
}

export interface TemoignageAccueil {
  nom: string;
  note: number;
  commentaire: string;
}

export interface DonneesAccueil {
  bannieres: BanniereAccueil[];
  categories: CategorieArbre[];
  bestSellers: ProduitVue[];
  nouveautes: ProduitVue[];
  promotions: ProduitVue[];
  temoignages: TemoignageAccueil[];
}

async function getBannieresActives(): Promise<BanniereAccueil[]> {
  const maintenant = Date.now();
  const bannieres = await Banner.find({ actif: true }).sort({ ordre: 1 }).lean();

  return bannieres
    .filter((b) => {
      const debut = b.dateDebut ? b.dateDebut.getTime() : null;
      const fin = b.dateFin ? b.dateFin.getTime() : null;
      if (debut && debut > maintenant) return false;
      if (fin && fin < maintenant) return false;
      return true;
    })
    .map((b) => ({
      titre: b.titre,
      sousTitre: b.sousTitre,
      image: b.image,
      lienBouton: b.lienBouton,
      texteBouton: b.texteBouton,
    }));
}

async function getProduitsAccueil(
  filtre: Record<string, unknown>,
  sort: Record<string, 1 | -1>,
  limite: number,
): Promise<ProduitVue[]> {
  const produits = await Product.find({ actif: true, ...filtre })
    .sort(sort)
    .limit(limite)
    .lean();
  return (produits as ProduitBrut[]).map(produireProduitVue);
}

async function getTemoignages(): Promise<TemoignageAccueil[]> {
  const avis = await Review.find({ statut: "approuve", note: { $gte: 4 } })
    .populate<{ clientId: { prenom: string; nom: string } }>(
      "clientId",
      "prenom nom",
    )
    .sort({ dateCreation: -1 })
    .limit(4)
    .lean();

  return avis.map((a) => ({
    nom:
      a.clientId && typeof a.clientId === "object"
        ? `${a.clientId.prenom} ${a.clientId.nom}`.trim()
        : "Client",
    note: a.note,
    commentaire: a.commentaire,
  }));
}

export async function getDonneesAccueil(): Promise<DonneesAccueil | null> {
  try {
    await dbConnect();
  } catch {
    return null;
  }

  const [bannieres, categories, bestSellers, nouveautes, promotions, temoignages] =
    await Promise.all([
      getBannieresActives().catch(() => []),
      getArbreCategories().catch(() => []),
      getProduitsAccueil({}, { vedette: -1, nombreVentes: -1 }, 10).catch(
        () => [],
      ),
      getProduitsAccueil({}, { dateCreation: -1 }, 10).catch(() => []),
      getProduitsAccueil(filtreEnPromotion(), { pourcentageRemise: -1 }, 10).catch(
        () => [],
      ),
      getTemoignages().catch(() => []),
    ]);

  return {
    bannieres,
    categories,
    bestSellers,
    nouveautes,
    promotions,
    temoignages,
  };
}