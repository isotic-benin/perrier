import { requireAdmin } from "@/lib/dal";
import { GestionFaq } from "@/components/dashboard/gestion-faq";

export default async function AdminFaqPage() {
  await requireAdmin();
  return <GestionFaq />;
}