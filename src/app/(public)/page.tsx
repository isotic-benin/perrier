import { FaCircleCheck, FaLocationDot, FaShieldHalved, FaStar, FaTruck, FaArrowRight, FaLeaf, FaArrowRotateLeft, FaHeadset, FaFire } from "react-icons/fa6";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDonneesAccueil } from "@/lib/accueil";
import { ProductCarousel } from "@/components/product/product-carousel";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { TemoignagesCarousel } from "@/components/home/temoignages-carousel";

export const metadata: Metadata = {
  title: "Perrier Bois - Granulés de bois, Bois de chauffage et Briquettes de bois | Livraison en France",
  description:
    "Votre spécialiste du bois de chauffage en France : granulés certifiés, briquettes de bois, bois de chauffage. Livraison rapide. Combustibles de haute qualité, 100 % naturels.",
  alternates: { canonical: "/" },
};

const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: "Perrier Bois",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://perrier-bois.fr",
  description:
    "Granulés de bois, bois de chauffage et briquettes de bois certifiées. Livraison dans toute la France.",
  areaServed: "FR",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: process.env.CONTACT_EMAIL ?? "contact@perrierbois.fr",
    telephone: "+33 6 12 34 56 78",
  },
};

const featureCards = [
  {
    icon: FaFire,
    color: "#b26b1e",
    bg: "#f6ecdb",
    title: "Bois de haute qualité",
    desc: "Jusqu'à 30 % de puissance en plus",
  },
  {
    icon: FaTruck,
    color: "#2e5e8c",
    bg: "#eaf0f6",
    title: "Livraison à domicile",
    desc: "Livraison sur palette",
  },
  {
    icon: FaLeaf,
    color: "#2f7a50",
    bg: "#eaf3ec",
    title: "Forêts durables",
    desc: "100 % certifié PEFC / FSC",
  },
  {
    icon: FaShieldHalved,
    color: "#6d4c9e",
    bg: "#efeaf6",
    title: "Paiement sécurisé",
    desc: "Virement garanti",
  },
];

const trustItems = [
  { icon: FaTruck, title: "Livraison gratuite", text: "Dans tous les dépôts" },
  { icon: FaShieldHalved, title: "Paiement sécurisé", text: "Garanti" },
  { icon: FaArrowRotateLeft, title: "Qualité certifiée", text: "Haut pouvoir calorifique" },
  { icon: FaHeadset, title: "Service client", text: "Équipe dédiée" },
];

export default async function AccueilPage() {
  const donnees = await getDonneesAccueil();
  const baseDisponible = donnees !== null;
  const bannieres = donnees?.bannieres ?? [];
  const categories = donnees?.categories ?? [];
  const bestSellers = donnees?.bestSellers ?? [];
  const promotions = donnees?.promotions ?? [];
  const temoignages = donnees?.temoignages ?? [];

  return (
    <div className="w-full bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
      />

      {/* ═══ HERO ═══ */}
      <HeroCarousel bannieres={bannieres}>
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-16 sm:px-6 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left: CTA */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                <span className="size-2 rounded-full bg-[#d99a2b]" />
                Saison de chauffage 2026
              </div>
              <h1 className="text-[34px] font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-[44px] lg:text-[54px]">
                Granulés de bois,{" "}
                <span className="text-[#e0a95a]">bois de chauffage</span> et briquettes de bois
              </h1>
              <p className="max-w-lg text-[16px] leading-relaxed text-white/80">
                Commandez en ligne, retirez en dépôt ou faites-vous
                livrer à domicile. Des combustibles de haute qualité, 100 % naturels,
                livrés partout en France.
              </p>

              {/* Depot Search Block */}
              <div className="mt-2 rounded-2xl border border-white/15 bg-white/95 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur">
                <h3 className="mb-3 flex items-center gap-2 font-heading text-[16px] font-semibold text-foreground">
                  <FaLocationDot className="size-[18px] text-primary" />
                  Où souhaitez-vous commander ?
                </h3>
                <form action="/depots" method="get" className="flex flex-col gap-2.5 sm:flex-row">
                  <input
                    type="text"
                    name="cp"
                    maxLength={5}
                    placeholder="Saisissez votre code postal..."
                    className="h-[46px] flex-1 rounded-lg border border-border bg-background px-4 text-[14px] text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-3 focus:ring-primary/15"
                  />
                  <Button type="submit" size="lg" className="h-[46px] px-8 uppercase tracking-[0.1em]">
                    Rechercher
                  </Button>
                </form>
              </div>

              <div className="flex flex-wrap gap-5 text-[13px] font-medium text-white/80">
                <span className="flex items-center gap-1.5">
                  <FaCircleCheck className="size-4 text-[#e0a95a]" /> Stock garanti
                </span>
                <span className="flex items-center gap-1.5">
                  <FaCircleCheck className="size-4 text-[#e0a95a]" /> Livraison sous quelques jours
                </span>
              </div>
            </div>

            {/* Right: Feature Cards */}
            <div className="hidden grid-cols-2 gap-4 lg:grid">
              {featureCards.map(({ icon: Icon, color, bg, title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/95 p-5 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.6)] backdrop-blur transition-transform hover:-translate-y-1"
                >
                  <div
                    className="flex size-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: bg }}
                  >
                    <Icon className="size-5" style={{ color }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] text-foreground">{title}</h4>
                    <p className="mt-0.5 text-[12px] text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </HeroCarousel>

      {/* ═══ TRUST STRIP ═══ */}
      <section className="w-full border-y border-border bg-card">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-6 py-8 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                <Icon className="size-5" />
              </div>
              <div>
                <h3 className="text-[13.5px] font-semibold text-foreground">{title}</h3>
                <p className="text-[12px] text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ WILLKOMMEN ═══ */}
      <section className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-accent/60 p-8 md:p-12">
          <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-primary">
            Bienvenue
          </span>
          <h2 className="mt-3 text-[26px] font-bold text-foreground md:text-[32px]">
            Bienvenue chez Perrier Bois !
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
            Nous proposons des granulés de bois de haute qualité – 100 % naturels et certifiés DIN Plus et EN Plus A1.
            Nos solutions garantissent un haut pouvoir calorifique, une faible teneur en cendres et une combustion propre et économique pour votre logement ou votre entreprise.
            Un chauffage naturel et économique avec des granulés de bois de première qualité. Livraison à domicile sur palettes prêtes à l'emploi.
          </p>
          <ul className="mt-6 grid gap-3 text-[13.5px] text-foreground md:grid-cols-3">
            <li className="flex gap-2.5">
              <FaLeaf className="mt-0.5 size-4 shrink-0 text-[#2f7a50]" />
              100 % bois naturel – sans additifs chimiques, liants ni écorce
            </li>
            <li className="flex gap-2.5">
              <FaFire className="mt-0.5 size-4 shrink-0 text-[#b26b1e]" />
              Haut pouvoir calorifique – économies d'énergie prouvées
            </li>
            <li className="flex gap-2.5">
              <FaTruck className="mt-0.5 size-4 shrink-0 text-[#2e5e8c]" />
              Livraison garantie – logistique spécialisée avec camion-grue à domicile
            </li>
          </ul>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="mx-auto max-w-[1400px] px-4 pt-16 pb-4 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-primary">
              Catégories
            </span>
            <h2 className="mt-2 text-[26px] font-bold text-foreground md:text-[30px]">
              Nos granulés de bois
            </h2>
            <p className="mt-1.5 text-[14px] text-muted-foreground">
              Trouvez le combustible adapté à votre appareil
            </p>
          </div>
          <Link
            href="/produits"
            className="hidden items-center gap-1.5 text-[13px] font-semibold text-primary transition-colors hover:text-[#8f5414] sm:inline-flex"
          >
            Tout afficher <FaArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
          {categories.slice(0, 8).map((categorie) => (
            <Link
              key={categorie._id}
              href={`/categorie/${categorie.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_50px_-30px_rgba(42,33,27,0.5)]"
            >
              {categorie.image ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${categorie.image})` }}
                  aria-hidden
                />
              ) : (
                <div className="absolute inset-0 bg-muted transition-colors group-hover:bg-accent" aria-hidden />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#211b16]/85 via-[#211b16]/25 to-transparent" aria-hidden />
              <div className="relative flex min-h-[120px] flex-col justify-end p-4">
                <h3 className="font-heading text-[15px] font-semibold text-white transition-colors group-hover:text-[#f0c07a]">
                  {categorie.nom}
                </h3>
                {categorie.sousCategories.length > 0 && (
                  <p className="mt-1 text-[12px] text-white/70">
                    {categorie.sousCategories.length} sous-catégorie
                    {categorie.sousCategories.length > 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ BESTSELLER ═══ */}
      {baseDisponible && bestSellers.length > 0 && (
        <section className="mx-auto mt-16 max-w-[1400px] px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-primary">
                Populaires
              </span>
              <h2 className="mt-2 text-[26px] font-bold text-foreground md:text-[30px]">
                Meilleures ventes
              </h2>
              <p className="mt-1.5 text-[14px] text-muted-foreground">
                Les produits préférés de nos clients
              </p>
            </div>
            <Link
              href="/produits?tri=ventes"
              className="hidden items-center gap-1.5 text-[13px] font-semibold text-primary transition-colors hover:text-[#8f5414] sm:inline-flex"
            >
              Tout afficher <FaArrowRight className="size-3.5" />
            </Link>
          </div>
          <ProductCarousel produits={bestSellers} />
        </section>
      )}

      {/* ═══ PROMO + CATALOGUE BLOCKS ═══ */}
      <section className="mx-auto mt-16 grid max-w-[1400px] gap-4 px-4 sm:grid-cols-2 sm:px-6">
        <div className="group flex flex-col justify-center rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/40 hover:shadow-[0_24px_50px_-30px_rgba(42,33,27,0.5)] md:p-10">
          <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-primary">
            Bonnes affaires
          </span>
          <h3 className="mt-3 text-[24px] font-bold text-foreground">Promotions actuelles</h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
            Prix réduits sur les granulés et les briquettes de bois.
          </p>
          <div className="mt-7">
            <Button asChild size="lg" className="uppercase tracking-[0.1em]">
              <Link href="/promotions">Voir les promotions</Link>
            </Button>
          </div>
        </div>

        <div className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-secondary p-8 text-secondary-foreground md:p-10">
          <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#d99a2b]">
            Catalogue
          </span>
          <h3 className="mt-3 text-[24px] font-bold">Tous les produits</h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-secondary-foreground/60">
            Parcourez notre catalogue complet de combustibles certifiés.
          </p>
          <div className="mt-7">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 bg-transparent text-white uppercase tracking-[0.1em] hover:bg-white hover:text-secondary"
            >
              <Link href="/produits">Parcourir le catalogue</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ PROMOTIONS ═══ */}
      {baseDisponible && promotions.length > 0 && (
        <section className="mx-auto mt-16 max-w-[1400px] px-4 sm:px-6">
          <div className="mb-8">
            <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-primary">
              Offres
            </span>
            <h2 className="mt-2 text-[26px] font-bold text-foreground md:text-[30px]">
              Produits en promotion
            </h2>
            <p className="mt-1.5 text-[14px] text-muted-foreground">
              Stock limité, profitez-en vite
            </p>
          </div>
          <ProductCarousel produits={promotions} />
        </section>
      )}

      {/* ═══ TÉMOIGNAGES ═══ */}
      {baseDisponible && temoignages.length > 0 && (
        <TemoignagesCarousel temoignages={temoignages} />
      )}

      {/* ═══ CTA NEWSLETTER / RÉASSURANCE ═══ */}
      <section className="mx-auto mb-20 max-w-[1400px] px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-12 text-primary-foreground md:px-14 md:py-16">
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <div className="mb-4 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <FaStar key={n} className="size-4 fill-white text-white" />
                ))}
              </div>
              <h2 className="text-[26px] font-bold md:text-[32px]">
                Prêt pour une saison de chauffage bien au chaud ?
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-primary-foreground/80">
                Commandez dès aujourd'hui vos combustibles certifiés – livraison
                à domicile ou retrait gratuit dans l'un de nos dépôts.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="group bg-white text-primary shadow-none hover:bg-white/90 hover:text-primary relative overflow-hidden hover:scale-[1.02] hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.45)] transition-all duration-300 animate-[pulse_3s_ease-in-out_infinite] hover:animate-none"
              >
                <Link href="/produits" className="inline-flex items-center gap-2">
                  Commander maintenant <FaArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white hover:scale-[1.02] transition-all duration-300"
              >
                <Link href="/depots" className="inline-flex items-center gap-2">
                  Trouver un dépôt <FaArrowRight className="size-3.5 opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
