import Link from "next/link";
import type { Metadata } from "next";
import { FaTree } from "react-icons/fa6";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Connexion administration",
  robots: { index: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen bg-white">
      {/* ═══ LEFT HALF: BRANDING IMAGE ═══ */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between bg-[#1c1917] p-12 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-80 bg-cover bg-center"
          style={{ backgroundImage: "url('/Quantite-bois-ideale-16-9.avif')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white hover:text-primary transition-colors"
          >
            <FaTree className="size-8 text-primary" /> Perrier Bois
          </Link>
        </div>

        <div className="relative z-10 max-w-lg mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md text-sm font-semibold mb-6 shadow-[0_4px_24px_rgba(255,123,0,0.15)] text-[#b26b1e]">
            Administration
          </div>
          <h1 className="text-4xl font-extrabold leading-tight mb-5 text-white drop-shadow-md">
            Back-office Perrier Bois.
          </h1>
          <p className="text-lg text-white/80 font-medium">
            Gérez la boutique, les commandes et les produits.
          </p>
        </div>
      </div>

      {/* ═══ RIGHT HALF: LOGIN FORM ═══ */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 md:p-20 bg-[#fbf8f3]">
        <div className="absolute top-6 left-6 lg:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight text-[#1c1917]"
          >
            <FaTree className="size-6 text-primary" /> Perrier Bois
          </Link>
        </div>

        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}