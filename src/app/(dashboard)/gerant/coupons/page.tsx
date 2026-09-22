import { requireGerant } from "@/lib/dal";
import { GestionCoupons } from "@/components/dashboard/gestion-coupons";

export default async function GerantCouponsPage() {
  await requireGerant();
  return <GestionCoupons lectureSeule />;
}