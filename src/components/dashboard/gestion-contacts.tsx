"use client";
import { FaCircle, FaArrowsRotate, FaCircleCheck } from "react-icons/fa6";
import { useState, useEffect } from "react";


interface MessageContact {
  _id: string;
  nom: string;
  email: string;
  sujet: string;
  message: string;
  statut: "nouveau" | "traite";
  dateCreation: string;
}

export function GestionContacts() {
  const [messages, setMessages] = useState<MessageContact[]>([]);
  const [chargement, setChargement] = useState(true);
  const [message, setMessage] = useState<{
    type: "succes" | "erreur";
    texte: string;
  } | null>(null);

  const charger = async () => {
    const res = await fetch("/api/contact", { cache: "no-store" });
    const donnees = await res.json();
    if (!donnees.succes) return;
    setMessages(donnees.donnees.messages);
    setChargement(false);
  };

  useEffect(() => {
    let annule = false;
    (async () => {
      const res = await fetch("/api/contact", { cache: "no-store" });
      const donnees = await res.json();
      if (annule || !donnees.succes) return;
      setMessages(donnees.donnees.messages);
      setChargement(false);
    })();
    return () => {
      annule = true;
    };
  }, []);

  const changerStatut = async (id: string, statut: "nouveau" | "traite") => {
    const res = await fetch(`/api/contact/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut }),
    });
    const donnees = await res.json().catch(() => null);
    if (!donnees?.succes) {
      setMessage({
        type: "erreur",
        texte: donnees?.erreur ?? "Une erreur s'est produite.",
      });
      return;
    }
    setMessages((liste) =>
      liste.map((m) => (m._id === id ? { ...m, statut } : m)),
    );
    setMessage(null);
  };

  if (chargement) {
    return <p className="text-muted-foreground">Chargement des messages…</p>;
  }

  const nonTraites = messages.filter((m) => m.statut === "nouveau").length;

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Messages de contact</h1>
        <button
          type="button"
          onClick={() => void charger()}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
        >
          <FaArrowsRotate className="size-4" />
          Actualiser
        </button>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        {messages.length} message(s) au total · {nonTraites} non traité
      </p>

      {message && (
        <p
          className={
            message.type === "succes"
              ? "mt-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
              : "mt-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
          }
        >
          {message.texte}
        </p>
      )}

      {messages.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Aucun message.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {messages.map((m) => (
            <li
              key={m._id}
              className={`rounded-2xl border border-border bg-card p-4 ${
                m.statut === "nouveau" ? "border-primary/50" : ""
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{m.sujet}</p>
                <span className="flex items-center gap-2">
                  <span
                    className={
                      m.statut === "nouveau"
                        ? "rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800"
                        : "rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800"
                    }
                  >
                    {m.statut === "nouveau" ? "Non traité" : "Traité"}
                  </span>
                  {m.statut === "nouveau" && (
                    <button
                      type="button"
                      onClick={() => void changerStatut(m._id, "traite")}
                      className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs transition-colors hover:bg-muted"
                    >
                      <FaCircleCheck className="size-3.5" />
                      Marquer comme traité
                    </button>
                  )}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {m.nom} · {m.email} ·{" "}
                {new Date(m.dateCreation).toLocaleDateString("fr-FR")}
              </p>
              <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
                {m.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}