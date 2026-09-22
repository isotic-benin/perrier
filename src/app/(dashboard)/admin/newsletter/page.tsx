import { requireAdmin } from "@/lib/dal";
import { GestionNewsletter } from "@/components/dashboard/gestion-newsletter";

export default async function AdminNewsletterPage() {
  await requireAdmin();
  return <GestionNewsletter />;
}