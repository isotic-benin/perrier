import type { Metadata } from "next";
import { requireGerant } from "@/lib/dal";
import { getLignesCommandes } from "@/lib/stats";
import { TableauCommandes } from "@/components/dashboard/tableau-commandes";

export const metadata: Metadata = {
  title: "Commandes",
};

export default async function GerantCommandesPage() {
  await requireGerant();

  const lignes = await getLignesCommandes(100);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Commandes</h1>
      <TableauCommandes commandes={lignes} baseHref="/gerant/commandes" />
    </div>
  );
}