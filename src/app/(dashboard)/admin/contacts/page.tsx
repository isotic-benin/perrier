import { requireAdmin } from "@/lib/dal";
import { GestionContacts } from "@/components/dashboard/gestion-contacts";

export default async function AdminContactsPage() {
  await requireAdmin();
  return <GestionContacts />;
}