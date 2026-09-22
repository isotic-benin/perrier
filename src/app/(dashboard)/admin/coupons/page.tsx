import { requireAdmin } from "@/lib/dal";
import { GestionCoupons } from "@/components/dashboard/gestion-coupons";

export default async function AdminCouponsPage() {
  await requireAdmin();
  return <GestionCoupons />;
}