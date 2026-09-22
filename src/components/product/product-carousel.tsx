"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { ProductCard } from "./product-card";
import type { ProduitVue } from "@/lib/produit-vue";

export function ProductCarousel({ produits }: { produits: ProduitVue[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: "start",
            loop: true,
            skipSnaps: false,
        },
        [Autoplay({ delay: 4000, stopOnInteraction: true })]
    );

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative group">
            {/* Viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y -ml-4">
                    {produits.map((produit) => (
                        <div
                            key={produit._id}
                            className="flex-[0_0_50%] sm:flex-[0_0_33.33%] lg:flex-[0_0_25%] pl-4"
                        >
                            <ProductCard produit={produit} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation buttons */}
            <button
                onClick={scrollPrev}
                className="absolute left-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/95 text-foreground opacity-0 shadow-[0_18px_40px_-20px_rgba(42,33,27,0.55)] backdrop-blur transition-all hover:bg-primary hover:text-primary-foreground group-hover:opacity-100"
                aria-label="Vorheriges ansehen"
            >
                <FaChevronLeft className="size-4" />
            </button>
            <button
                onClick={scrollNext}
                className="absolute right-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/95 text-foreground opacity-0 shadow-[0_18px_40px_-20px_rgba(42,33,27,0.55)] backdrop-blur transition-all hover:bg-primary hover:text-primary-foreground group-hover:opacity-100"
                aria-label="Voir suivant"
            >
                <FaChevronRight className="size-4" />
            </button>
        </div>
    );
}
