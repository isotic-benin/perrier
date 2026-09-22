"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface Banner {
    _id?: string;
    titre: string;
    sousTitre: string;
    image: string;
    lienBouton: string;
    texteBouton: string;
}

export function HeroCarousel({
    bannieres,
    children
}: {
    bannieres: Banner[],
    children: React.ReactNode
}) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, duration: 40 },
        [Autoplay({ delay: 5000, stopOnInteraction: false })]
    );

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        const id = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(id);
    }, []);

    if (!bannieres || bannieres.length === 0) {
        return (
            <section className="w-full bg-[#f6f1e8] relative">
                {children}
            </section>
        );
    }

    return (
        <section className="w-full relative overflow-hidden group">
            {/* Background Carousel */}
            <div className="absolute inset-0 z-0 bg-[#1c1917]">
                <div className="overflow-hidden h-full" ref={emblaRef}>
                    <div className="flex h-full">
                        {bannieres.map((banner, index) => (
                            <div key={banner._id ?? index} className="relative flex-[0_0_100%] h-full">
                                {banner.image ? (
                                    <div
                                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
                                        style={{ backgroundImage: `url('${banner.image}')` }}
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-[#1c1917]" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#211b16]/90 via-[#211b16]/65 to-[#211b16]/35" />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#211b16]/60 to-transparent" />

            {/* Foreground Content */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Hidden nav controls - just for manual override logic if they want, but autoplay handles it cleanly */}
            {bannieres.length > 1 && (
                <>
                    <button
                        onClick={() => emblaApi && emblaApi.scrollPrev()}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 size-12 flex items-center justify-center rounded-full bg-white/70 text-[#2a211b] shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                    >
                        <FaChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => emblaApi && emblaApi.scrollNext()}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 size-12 flex items-center justify-center rounded-full bg-white/70 text-[#2a211b] shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                    >
                        <FaChevronRight size={24} />
                    </button>
                </>
            )}
        </section>
    );
}
