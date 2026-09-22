"use client";
import { FaCircle, FaLocationDot, FaPhone, FaCircleCheck, FaChevronRight, FaMagnifyingGlass } from "react-icons/fa6";
import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";


import { Button } from "@/components/ui/button";
import { useDepotStore } from "@/store/use-depot-store";
import Link from "next/link";

export interface DepotProps {
    _id: string;
    nom: string;
    slug: string;
    codePostal: string;
    ville: string;
    adresse: string;
    telephone: string;
    horaires: string;
}

export function DepotsClient({ initialDepots }: { initialDepots: DepotProps[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const paramCp = searchParams.get("cp") ?? "";

    const [recherche, setRecherche] = useState(paramCp);
    const { selectedDepot, setSelectedDepot } = useDepotStore();

    const handleSelectDepot = (depot: DepotProps) => {
        setSelectedDepot({
            nom: depot.nom,
            ville: depot.ville,
            codePostal: depot.codePostal,
        });
        // Show a small visual feedback before returning home
        setTimeout(() => {
            router.push("/");
        }, 500);
    };

    const filteredDepots = useMemo(() => {
        if (!recherche) return initialDepots;
        const term = recherche.toLowerCase();
        return initialDepots.filter(d =>
            d.codePostal.includes(term) || d.ville.toLowerCase().includes(term)
        );
    }, [recherche, initialDepots]);

    return (
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">

            {/* ═══ BREADCRUMB ═══ */}
            <nav className="mb-6 flex text-sm font-medium text-muted-foreground">
                <Link href="/" className="transition-colors hover:text-primary">Accueil</Link>
                <span className="mx-2">/</span>
                <span className="text-foreground">Nos points de retrait</span>
            </nav>

            {/* ═══ HEADER & SEARCH ═══ */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-border pb-8">
                <div>
                    <h1 className="mb-3 text-3xl font-bold text-foreground">Trouvez votre point de retrait</h1>
                    <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                        Économisez sur les frais de livraison en choisissant le retrait gratuit dans l'un de nos 120 points de retrait partenaires. Saisissez votre ville ou votre code postal pour trouver le plus proche.
                    </p>
                </div>

                <div className="w-full md:w-[350px]">
                    <div className="relative">
                        <FaMagnifyingGlass className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            value={recherche}
                            onChange={(e) => setRecherche(e.target.value)}
                            placeholder="Code postal ou ville..."
                            className="h-12 w-full rounded-full border border-input bg-background pl-11 pr-4 text-[15px] outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15"
                        />
                    </div>
                </div>
            </div>

            {/* ═══ LISTE DEPOTS ═══ */}
            {filteredDepots.length === 0 ? (
                <div className="rounded-2xl border border-primary/20 bg-accent p-8 text-center font-medium text-primary">
                    Aucun point de retrait ne correspond à &quot;{recherche}&quot;. Essayez un autre code postal.
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredDepots.map(depot => {
                        const isSelected = selectedDepot?.nom === depot.nom;
                        return (
                            <div
                                key={depot._id}
                                className={`relative flex flex-col rounded-2xl bg-card p-6 transition-all ${isSelected
                                        ? "border-2 border-[#2f7a50] shadow-[0_20px_45px_-30px_rgba(47,122,80,0.7)]"
                                        : "border border-border hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_28px_55px_-38px_rgba(42,33,27,0.6)]"
                                    }`}
                            >
                                {isSelected && (
                                    <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-2xl rounded-tr-2xl bg-[#2f7a50] px-3 py-1 text-[12px] font-bold text-white">
                                        <FaCircleCheck className="size-3.5" /> Point de retrait sélectionné
                                    </div>
                                )}

                                <h3 className="mb-4 pr-16 font-heading text-xl font-bold text-foreground">{depot.ville}</h3>

                                <div className="mb-6 flex-1 space-y-3 text-[14.5px] text-muted-foreground">
                                    <p className="flex items-start gap-2.5">
                                        <FaLocationDot className="mt-0.5 size-[18px] shrink-0 text-primary" />
                                        <span>
                                            <strong>{depot.nom}</strong><br />
                                            {depot.adresse}<br />
                                            {depot.codePostal} {depot.ville}
                                        </span>
                                    </p>
                                    <p className="flex items-center gap-2.5">
                                        <FaPhone className="size-[18px] shrink-0 text-primary" />
                                        {depot.telephone}
                                    </p>
                                    <p className="flex items-center gap-2.5">
                                        <FaCircle className="size-[18px] shrink-0 text-primary" />
                                        {depot.horaires}
                                    </p>
                                </div>

                                {!isSelected ? (
                                    <Button
                                        onClick={() => handleSelectDepot(depot)}
                                        className="group h-11 w-full rounded-full border border-border bg-muted text-[14px] font-semibold text-foreground shadow-none transition-all hover:border-transparent hover:bg-primary hover:text-primary-foreground"
                                    >
                                        Choisir ce point de retrait <FaChevronRight className="size-4 ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </Button>
                                ) : (
                                    <div className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#cbe4d3] bg-[#eaf3ec] text-[14px] font-bold text-[#2f7a50]">
                                        <FaCircleCheck className="size-4" /> Sélectionné pour le retrait
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
