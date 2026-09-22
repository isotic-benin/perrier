import "server-only";
import { dbConnect } from "@/lib/db";
import ActivityLog from "@/models/ActivityLog";

export async function journaliser(
  utilisateurId: string,
  action: string,
  cible: string,
  details?: Record<string, unknown>,
) {
  try {
    await dbConnect();
    await ActivityLog.create({
      utilisateurId,
      action,
      cible,
      details: details ?? {},
      date: new Date(),
    });
  } catch {
    // Le journal ne doit jamais bloquer l'action principale
  }
}