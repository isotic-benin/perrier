import { FaCartShopping, FaStar } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

import type { ProduitVue } from "@/lib/produit-vue";
import { formaterPrix, prixEffectif } from "@/lib/format";

export function ProductCard({ produit }: { produit: ProduitVue }) {
  const prix = prixEffectif(produit);
  const image = produit.images[0];

  return (
    <Link
      href={`/produits/${produit.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(42,33,27,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_50px_-28px_rgba(42,33,27,0.45)]"
    >
      {/* IMAGE */}
      <div className="relative block aspect-[4/3] overflow-hidden bg-muted/60">
        {image ? (
          <Image
            src={image}
            alt={produit.nom}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-muted-foreground/40">
            🛍️
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {produit.enPromotion && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-destructive px-3 py-1 text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-white shadow-[0_10px_24px_-12px_rgba(179,53,44,0.9)]">
            PROMO
          </span>
        )}
        {produit.stock <= 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-card/95 px-3 py-1 text-[11px] font-semibold text-muted-foreground shadow-sm backdrop-blur">
            Rupture de stock
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {produit.typeLivraison && (
          <div className="inline-flex w-fit items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            {produit.typeLivraison === "retrait"
              ? "📦 Retrait"
              : produit.typeLivraison === "livraison_portail"
                ? "🚚 Livr. portail"
                : "🏡 Livr. garage"}
          </div>
        )}
        <h3 className="line-clamp-2 text-[14.5px] font-semibold leading-[1.35] text-foreground transition-colors group-hover:text-primary">
          {produit.nom}
        </h3>

        {produit.noteMoyenne > 0 && (
          <p className="flex items-center gap-1 text-[12px] text-muted-foreground">
            <FaStar className="size-3.5 fill-[#d99a2b] text-[#d99a2b]" />
            {produit.noteMoyenne.toFixed(1)}
            <span className="text-muted-foreground/60">
              ({produit.nombreAvis})
            </span>
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-border pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[19px] font-extrabold tracking-[-0.01em] text-foreground">
              {formaterPrix(prix)}
            </span>
            {produit.enPromotion && produit.prixPromo != null && (
              <span className="text-[13px] text-muted-foreground/60 line-through">
                {formaterPrix(produit.prix)}
              </span>
            )}
          </div>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_22px_-14px_rgba(178,107,30,0.95)] transition-transform group-hover:scale-110">
            <FaCartShopping className="size-[14px]" />
          </span>
        </div>
      </div>
    </Link>
  );
}
