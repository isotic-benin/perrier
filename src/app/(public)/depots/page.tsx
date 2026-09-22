import { dbConnect } from "@/lib/db";
import Depot from "@/models/Depot";
import { DepotsClient } from "./depots-client";
import type { DepotProps } from "./depots-client";

export default async function DepotsPage() {
    let depots: DepotProps[] = [];
    let erreur = false;
    try {
        await dbConnect();
        const depotsBruts = await Depot.find({ actif: true }).sort({ ville: 1 }).lean();
        depots = depotsBruts.map((d) => ({
            ...d,
            _id: String(d._id)
        }));
    } catch (error) {
        console.error("Erreur chargement des dépôts:", error);
        erreur = true;
    }

    if (erreur) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-20 text-center">
                <h1 className="text-2xl font-bold text-destructive">Erreur</h1>
                <p className="mt-4 text-muted-foreground">La liste des points de retrait n'a pas pu être chargée.</p>
            </div>
        );
    }

    return <DepotsClient initialDepots={depots} />;
}
