import type { MetadataRoute } from "next";
import { dbConnect } from "@/lib/db";
import Category from "@/models/Category";
import Product from "@/models/Product";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://perrier-bois.fr";

const pagesStatiques: Array<{ chemin: string; priorite: number; frequence: string }> = [
  { chemin: "", priorite: 1, frequence: "daily" },
  { chemin: "/produits", priorite: 0.9, frequence: "daily" },
  { chemin: "/promotions", priorite: 0.7, frequence: "daily" },

  { chemin: "/faq", priorite: 0.5, frequence: "monthly" },
  { chemin: "/contact", priorite: 0.5, frequence: "monthly" },
  { chemin: "/a-propos", priorite: 0.4, frequence: "monthly" },
  { chemin: "/cgv", priorite: 0.3, frequence: "yearly" },
  { chemin: "/mentions-legales", priorite: 0.3, frequence: "yearly" },
  { chemin: "/politique-confidentialite", priorite: 0.3, frequence: "yearly" },
  { chemin: "/politique-retour", priorite: 0.3, frequence: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const statiques: MetadataRoute.Sitemap = pagesStatiques.map((p) => ({
    url: `${BASE_URL}${p.chemin}`,
    lastModified: new Date(),
    changeFrequency: p.frequence as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: p.priorite,
  }));

  let dynamiques: MetadataRoute.Sitemap = [];
  try {
    await dbConnect();
    const [categories, produits] = await Promise.all([
      Category.find({ active: true }).select("_id slug").lean(),
      Product.find({ actif: true }).select("slug").lean(),
    ]);

    dynamiques = [
      ...categories.map((c) => ({
        url: `${BASE_URL}/categorie/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.8,
      })),
      ...produits.map((p) => ({
        url: `${BASE_URL}/produits/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ];
  } catch {
    // Base de données indisponible : seules les pages statiques sont référencées
  }

  return [...statiques, ...dynamiques];
}