"use client";
import { FaCircleCheck, FaLocationDot } from "react-icons/fa6";
import { useState, useEffect } from "react";

import Link from "next/link";

import { useDepotStore } from "@/store/use-depot-store";

export function DepotHeaderLink() {
    const { selectedDepot } = useDepotStore();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setIsHydrated(true));
        return () => cancelAnimationFrame(id);
    }, []);

    if (!isHydrated) {
        return (
            <Link href="/depots" className="hidden md:inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
                <FaLocationDot className="size-4" />
                Choisir mon entrepôt
            </Link>
        );
    }

    if (selectedDepot) {
        return (
            <Link
                href="/depots"
                className="hidden md:inline-flex items-center gap-1.5 text-[#2f7a50] font-bold hover:text-[#2f7a50] bg-[#eaf3ec] px-2 py-0.5 rounded-md transition-colors"
                title="Changer le point de retrait"
            >
                <FaCircleCheck className="size-4" />
                Point de retrait : {selectedDepot.ville}
            </Link>
        );
    }

    return (
        <Link href="/depots" className="hidden md:inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
            <FaLocationDot className="size-4" />
            Choisir mon entrepôt
        </Link>
    );
}
