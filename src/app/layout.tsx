import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const SITE_NOM = "Perrier Bois";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://perrier-bois.fr",
  ),
  title: {
    default: SITE_NOM,
    template: `%s | ${SITE_NOM}`,
  },
  description:
    "Perrier Bois - Votre spécialiste combustibles bois en France : granulés certifiés, bûches compressées, bois de chauffage. Livraison rapide offerte dès 75€. +120 points de retrait.",
  applicationName: SITE_NOM,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    siteName: SITE_NOM,
    locale: "fr_FR",
    url: "/",
    title: SITE_NOM,
    description:
      "Bois de chauffage, granulés et bûches compressées certifiés. Livraison partout en France métropolitaine.",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NOM,
    description:
      "Bois de chauffage, granulés et bûches compressées certifiés. Livraison partout en France métropolitaine.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${fraunces.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
