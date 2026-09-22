"use client";
import { FaCircle, FaArrowRight, FaEnvelope } from "react-icons/fa6";
import { useState } from "react";


export function NewsletterInscription() {
  const [email, setEmail] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [message, setMessage] = useState<{
    type: "succes" | "erreur";
    texte: string;
  } | null>(null);

  const soumettre = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnCours(true);
    setMessage(null);

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const donnees = await res.json().catch(() => null);

    if (!donnees?.succes) {
      setMessage({
        type: "erreur",
        texte: donnees?.erreur ?? "Une erreur s'est produite.",
      });
      setEnCours(false);
      return;
    }

    setMessage({ type: "succes", texte: donnees.donnees.message });
    setEmail("");
    setEnCours(false);
  };

  return (
    <div className="bg-[#b26b1e]">
      <div className="mx-auto max-w-[1400px] px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center size-14 rounded-full bg-white/20">
            <FaEnvelope className="size-6 text-white" />
          </div>
          <div className="text-white">
            <h2 className="text-[22px] font-extrabold">Restez informé</h2>
            <p className="text-[14px] text-white/70 mt-0.5">
              Recevez nos nouveautés, offres exclusives et conseils
            </p>
          </div>
        </div>

        <form
          onSubmit={soumettre}
          className="flex w-full md:w-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse e-mail"
            className="h-[46px] flex-1 md:w-[300px] rounded-l-[6px] border-0 bg-white px-4 text-[14px] text-[#292524] placeholder:text-[#a69c8e] focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            disabled={enCours}
            className="h-[46px] px-6 rounded-r-[6px] bg-[#2a211b] text-white text-[13px] font-bold uppercase tracking-wider hover:bg-[#1c1917] disabled:opacity-60 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            {enCours ? "Envoi en cours…" : (
              <>S'abonner <FaArrowRight className="size-4" /></>
            )}
          </button>
        </form>
      </div>

      {message && (
        <div className="mx-auto max-w-[1400px] px-6 pb-4">
          <p
            className={
              message.type === "succes"
                ? "text-[13px] text-white font-medium"
                : "text-[13px] rounded-[6px] bg-red-600/20 px-3 py-2 text-white"
            }
          >
            {message.texte}
          </p>
        </div>
      )}
    </div>
  );
}