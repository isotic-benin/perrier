import Link from "next/link";

export function FooterDashboard() {
  return (
    <footer className="shrink-0 border-t border-border bg-background px-4 py-3.5">
      <div className="flex flex-col items-center justify-between gap-1.5 text-[12px] text-muted-foreground sm:flex-row sm:px-2">
        <p>© {new Date().getFullYear()} Perrier Bois — Backoffice</p>
        <Link href="/" className="transition-colors hover:text-primary">
          Retour à la boutique
        </Link>
      </div>
    </footer>
  );
}
