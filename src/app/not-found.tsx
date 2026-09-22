import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="text-2xl font-bold">Page non trouvée</h1>
      <p className="max-w-md text-muted-foreground">
        La page recherchée n’existe pas ou a été déplacée.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/">Retour à l’accueil</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/produits">Voir les produits</Link>
        </Button>
      </div>
    </div>
  );
}