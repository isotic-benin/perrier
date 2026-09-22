import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { construireURL } from "@/lib/url";

export function Pagination({
  chemin,
  params,
  page,
  pagesTotales,
}: {
  chemin: string;
  params: Record<string, string | undefined>;
  page: number;
  pagesTotales: number;
}) {
  if (pagesTotales <= 1) return null;

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= pagesTotales; i++) {
    if (
      i === 1 ||
      i === pagesTotales ||
      Math.abs(i - page) <= 1
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav className="flex items-center justify-center gap-2 pt-10" aria-label="Paginierung">
      {page > 1 && (
        <Link
          href={construireURL(chemin, params, { page: String(page - 1) })}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          aria-label="Page précédente"
        >
          <FaChevronLeft className="size-4" />
        </Link>
      )}

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ell-${i}`} className="px-1 text-muted-foreground">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={construireURL(chemin, params, { page: String(p) })}
            aria-current={p === page ? "page" : undefined}
            className={
              p === page
                ? "inline-flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-[0_14px_28px_-16px_rgba(178,107,30,0.9)]"
                : "inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-sm transition-colors hover:border-primary/40 hover:text-primary"
            }
          >
            {p}
          </Link>
        ),
      )}

      {page < pagesTotales && (
        <Link
          href={construireURL(chemin, params, { page: String(page + 1) })}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          aria-label="Page suivante"
        >
          <FaChevronRight className="size-4" />
        </Link>
      )}
    </nav>
  );
}