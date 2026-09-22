import type { Metadata } from "next";
import { requireAdmin } from "@/lib/dal";
import { getLignesCommandes } from "@/lib/stats";
import { TableauCommandes } from "@/components/dashboard/tableau-commandes";

export const metadata: Metadata = {
  title: "Commandes",
};

export default async function AdminCommandesPage() {
  await requireAdmin();

  const lignes = await getLignesCommandes();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Commandes</h1>
      <TableauCommandes commandes={lignes} baseHref="/admin/commandes" />
    </div>
  );
}