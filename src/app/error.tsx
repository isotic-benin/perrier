"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErreurGlobale({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <p className="text-6xl font-bold text-primary">500</p>
      <h1 className="text-2xl font-bold">Une erreur s'est produite</h1>
      <p className="max-w-md text-muted-foreground">
        Une erreur inattendue s’est produite. Veuillez réessayer
        ou retournez à la page d’accueil.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Réessayer</Button>
        <Button variant="outline" asChild>
          <Link href="/">Retour à l’accueil</Link>
        </Button>
      </div>
    </div>
  );
}