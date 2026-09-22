import { requireAdmin } from "@/lib/dal";
import { GestionCategories } from "@/components/dashboard/gestion-categories";

export default async function AdminCategoriesPage() {
  await requireAdmin();
  return <GestionCategories />;
}