"use client";
import { useEffect, useState } from "react";

interface Abonne {
  _id: string;
  email: string;
  actif: boolean;
  dateInscription: string;
}

export function GestionNewsletter() {
  const [abonnes, setAbonnes] = useState<Abonne[]>([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    let annule = false;
    (async () => {
      const res = await fetch("/api/newsletter", { cache: "no-store" });
      const donnees = await res.json();
      if (annule || !donnees.succes) return;
      setAbonnes(donnees.donnees.abonnes);
      setChargement(false);
    })();
    return () => {
      annule = true;
    };
  }, []);

  if (chargement) {
    return <p className="text-muted-foreground">Wird geladen…</p>;
  }

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Newsletter</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        {abonnes.length} Newsletter-Abonnent(en).
      </p>

      {abonnes.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Noch keine Abonnenten.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/60 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                <th className="p-3 font-medium">E-Mail</th>
                <th className="p-3 font-medium">Angemeldet am</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {abonnes.map((abonne) => (
                <tr key={abonne._id} className="border-b border-border/70 transition-colors last:border-0 hover:bg-muted/40">
                  <td className="p-3">{abonne.email}</td>
                  <td className="p-3">
                    {new Date(abonne.dateInscription).toLocaleDateString(
                      "fr-FR",
                    )}
                  </td>
                  <td className="p-3">
                    {abonne.actif ? (
                      <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-800">
                        Aktiv
                      </span>
                    ) : (
                      <span className="rounded-full bg-destructive/10 px-1.5 py-0.5 text-xs text-destructive">
                        Inaktiv
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}