import { requireAdmin } from "@/lib/dal";
import { GestionBannieres } from "@/components/dashboard/gestion-bannieres";

export default async function AdminCarouselPage() {
  await requireAdmin();
  return <GestionBannieres />;
}