import Link from "next/link";
import { FaTree } from "react-icons/fa6";
import { DeconnexionButton } from "@/components/shared/deconnexion-button";

const LIBELLES_ROLE: Record<string, string> = {
  admin: "Administrateur",
  gerant: "Gérant",
};

interface Props {
  nom?: string;
  email?: string;
  role: string;
  base: string;
}

export function HeaderDashboard({ nom, email, role, base }: Props) {
  const initiale = (nom ?? email ?? role).charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-background/85 px-4 backdrop-blur-xl sm:px-6">
      <Link href={base} className="flex items-center gap-2 lg:hidden">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <FaTree className="size-4" />
        </span>
        <span className="font-heading text-lg font-bold leading-none tracking-tight text-foreground">
          Perrier<span className="text-primary">Bois</span>
        </span>
      </Link>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <Link
          href="/"
          className="hidden items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-primary md:inline-flex"
        >
          Vers la boutique
        </Link>

        <div className="hidden flex-col items-end leading-tight sm:flex">
          <span className="text-[13px] font-semibold text-foreground">
            {nom ?? email ?? role}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            {LIBELLES_ROLE[role] ?? role}
          </span>
        </div>

        <span className="flex size-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-primary">
          {initiale}
        </span>

        <div className="border-l border-border pl-3 sm:pl-4">
          <DeconnexionButton />
        </div>
      </div>
    </header>
  );
}
