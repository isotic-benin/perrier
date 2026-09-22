"use client";
import { FaCircle, FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Link from "next/link";

import type { BanniereAccueil } from "@/lib/accueil";

export function CarouselBannieres({
  bannieres,
}: {
  bannieres: BanniereAccueil[];
}) {
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause || bannieres.length <= 1) return;
    const minuterie = setInterval(
      () => setIndex((i) => (i + 1) % bannieres.length),
      6000,
    );
    return () => clearInterval(minuterie);
  }, [pause, bannieres.length]);

  const banniere = bannieres[index];
  if (!banniere) return null;

  const precedente = () =>
    setIndex((i) => (i - 1 + bannieres.length) % bannieres.length);
  const suivante = () => setIndex((i) => (i + 1) % bannieres.length);

  return (
    <section
      aria-label="Hervorgehoben"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      className="relative overflow-hidden rounded-2xl"
    >
      <div
        key={index}
        className="relative flex min-h-[320px] items-center justify-center bg-gradient-to-br from-primary/15 via-background to-primary/5 sm:min-h-[420px]"
      >
        {banniere.image ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${banniere.image})` }}
            aria-hidden
          />
        ) : (
          <div className="absolute inset-0 bg-muted/40" aria-hidden />
        )}
        <div className="absolute inset-0 bg-background/60" aria-hidden />
        <div className="relative z-10 max-w-2xl px-6 text-center">
          {banniere.titre && (
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              {banniere.titre}
            </h1>
          )}
          {banniere.sousTitre && (
            <p className="mx-auto mt-3 max-w-xl text-lg text-muted-foreground">
              {banniere.sousTitre}
            </p>
          )}
          {banniere.lienBouton && (
            <Link
              href={banniere.lienBouton}
              className="mt-6 inline-flex items-center rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              {banniere.texteBouton || "Entdecken"}
            </Link>
          )}
        </div>
      </div>

      {bannieres.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Bannière précédente"
            onClick={precedente}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 shadow hover:bg-background"
          >
            <FaChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Bannière suivante"
            onClick={suivante}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 shadow hover:bg-background"
          >
            <FaChevronRight className="size-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {bannieres.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Zum Banner ${i + 1} gehen`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}