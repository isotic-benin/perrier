"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa6";

interface Temoignage {
  nom: string;
  commentaire: string;
  note: number;
  ville?: string;
}

interface TemoignagesCarouselProps {
  temoignages: Temoignage[];
}

export function TemoignagesCarousel({ temoignages }: TemoignagesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    update();
    emblaApi.on("reInit", update);
    emblaApi.on("select", update);
    return () => {
      emblaApi.off("reInit", update);
      emblaApi.off("select", update);
    };
  }, [emblaApi]);

  if (temoignages.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-4 mt-14 mb-16 sm:px-6" aria-label="Clientsstimmen">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Ils nous font confiance</h2>
        <p className="mx-auto mt-2 max-w-2xl text-[15px] text-muted-foreground">
          Ce que nos clients disent de leur expérience avec nos produits et services
        </p>
      </div>

      <div className="relative" style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Carousel viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex" style={{ gap: "24px" }}>
            {temoignages.map((temoignage, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0" style={{ minWidth: 0 }}>
                <article className="group relative h-full rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(42,33,27,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_50px_-30px_rgba(42,33,27,0.35)] sm:p-8">
                  {/* Quote icon background */}
                  <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <svg
                      className="size-12 text-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609v-2.031c-6.176 1.584-10.983 7.012-10.983 13.902 0 4.419 2.223 7.65 5.164 9.152v-3.023zM5.983 21v-7.391c0-5.704 3.746-9.57 9-10.609v-2.031c-6.176 1.584-10.983 7.012-10.983 13.902 0 4.419 2.223 7.65 5.164 9.152v-3.023z" />
                    </svg>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4 relative z-10">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <FaStar
                        key={n}
                        className={
                          n <= temoignage.note
                            ? "size-5 fill-[#d99a2b] text-[#d99a2b]"
                            : "size-5 text-[#e8dfd0]"
                        }
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <blockquote className="relative z-10 mb-6 min-h-[80px] text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
                    &laquo;&nbsp;{temoignage.commentaire}&nbsp;&raquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3 relative z-10">
                    <div
                      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#b26b1e] to-[#8f5414] text-[15px] font-bold text-white"
                      aria-hidden="true"
                    >
                      {temoignage.nom.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-[15px] text-foreground">{temoignage.nom}</p>
                      {temoignage.ville && (
                        <p className="text-[13px] text-muted-foreground">{temoignage.ville}</p>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        {temoignages.length > 1 && (
          <>
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-0 top-1/2 z-20 flex size-12 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition-all hover:bg-muted sm:-translate-x-8"
              aria-label="Avis précédent"
            >
              <FaChevronLeft size={22} />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-0 top-1/2 z-20 flex size-12 translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition-all hover:bg-muted sm:translate-x-8"
              aria-label="Avis suivant"
            >
              <FaChevronRight size={22} />
            </button>

            {/* Dots navigation */}
            {scrollSnaps.length > 0 && (
              <div className="absolute bottom-[-48px] left-1/2 -translate-x-1/2 flex justify-center gap-2">
                {scrollSnaps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    className={`size-2.5 rounded-full transition-all ${
                      i === selectedIndex
                        ? "w-6 bg-primary"
                        : "bg-input hover:bg-[#d6cbbb]"
                    }`}
                    aria-label={`Zur Clientsstimme ${i + 1} gehen`}
                    aria-current={i === selectedIndex ? "true" : "false"}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}