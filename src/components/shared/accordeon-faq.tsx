"use client";
import { FaCircle, FaChevronDown } from "react-icons/fa6";
import { useState } from "react";


export function AccordeonFaq({
  items,
}: {
  items: Array<{ _id: string; question: string; reponse: string }>;
}) {
  const [ouvert, setOuvert] = useState<string | null>(null);

  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const actif = ouvert === item._id;
        return (
          <li
            key={item._id}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(42,33,27,0.03)] transition-colors data-[actif=true]:border-primary/40"
            data-actif={actif}
          >
            <button
              type="button"
              onClick={() => setOuvert(actif ? null : item._id)}
              aria-expanded={actif}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-foreground transition-colors hover:text-primary"
            >
              <span className="font-heading text-[15px]">{item.question}</span>
              <FaChevronDown
                className={`size-4 shrink-0 text-primary transition-transform duration-200 ${
                  actif ? "rotate-180" : ""
                }`}
              />
            </button>
            {actif && (
              <p className="border-t border-border bg-muted/40 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                {item.reponse}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}