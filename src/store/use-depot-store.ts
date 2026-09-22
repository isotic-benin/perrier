import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DepotState {
    nom: string;
    ville: string;
    codePostal: string;
}

interface DepotStore {
    selectedDepot: DepotState | null;
    setSelectedDepot: (depot: DepotState) => void;
    clearDepot: () => void;
}

export const useDepotStore = create<DepotStore>()(
    persist(
        (set) => ({
            selectedDepot: null,
            setSelectedDepot: (depot) => set({ selectedDepot: depot }),
            clearDepot: () => set({ selectedDepot: null }),
        }),
        {
            name: "perrier-bois-depot-storage",
        }
    )
);
