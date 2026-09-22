import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

export interface ItemFilAriane {
  libelle: string;
  href?: string;
}

export function FilAriane({ items }: { items: ItemFilAriane[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-[12.5px] text-muted-foreground">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-primary"
          >
            Startseite
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={`${item.libelle}-${i}`} className="flex items-center gap-2">
            <FaChevronRight className="size-3 text-primary/50" />
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-primary"
              >
                {item.libelle}
              </Link>
            ) : (
              <span className="font-medium text-foreground">
                {item.libelle}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}