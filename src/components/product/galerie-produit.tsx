"use client";
import { FaImage } from "react-icons/fa6";
import { useState } from "react";
import Image from "next/image";

export function GalerieProduit({
  images,
  nom,
}: {
  images: string[];
  nom: string;
}) {
  const [active, setActive] = useState(0);
  const principale = images[active] ?? null;

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
        {principale ? (
          <Image
            src={principale}
            alt={nom}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl text-muted-foreground">
            🛍️
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-2 grid grid-cols-4 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Bild ${i + 1}`}
              className={
                i === active
                  ? "relative aspect-square overflow-hidden rounded-md border-2 border-primary"
                  : "relative aspect-square overflow-hidden rounded-md border opacity-70 hover:opacity-100"
              }
            >
              <Image
                src={src}
                alt={`${nom} — Bild ${i + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}