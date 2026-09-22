import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://perrier-bois.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin",
          "/gerant",
          "/commande/confirmation/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}