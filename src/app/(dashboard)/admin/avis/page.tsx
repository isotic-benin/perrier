import { requireAdmin } from "@/lib/dal";
import { GestionAvis } from "@/components/dashboard/gestion-avis";

export default async function AdminAvisPage() {
  await requireAdmin();
  return <GestionAvis />;
}