import type { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/dal";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Settings from "@/models/Settings";

const RIB_KEY = "rib_bancaire";

export async function GET() {
  await requireAdmin();
  await dbConnect();
  const rib = await Settings.findOne({ cle: RIB_KEY }).lean();
  return apiSuccess({ rib: rib?.valeur ?? null });
}

export async function PUT(request: NextRequest) {
  await requireAdmin();
  const corps = await request.json().catch(() => null);
  if (!corps) return apiErreur("Corps de requête invalide", 400);

  const { titulaire, banque, iban, bic, siege } = corps;
  if (!titulaire || !banque || !iban || !bic || !siege) {
    return apiErreur("Tous les champs du RIB sont requis", 400);
  }

  await dbConnect();
  await Settings.findOneAndUpdate(
    { cle: RIB_KEY },
    {
      cle: RIB_KEY,
      valeur: { titulaire, banque, iban, bic, siege },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  return apiSuccess({ message: "RIB mis à jour avec succès" });
}
