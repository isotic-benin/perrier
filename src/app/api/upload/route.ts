import { NextResponse, type NextRequest } from "next/server";
import { put } from "@vercel/blob";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";

const TAILLE_MAX = 5 * 1024 * 1024;
const EXTENSIONS_AUTORISEES = [
  "jpg", "jpeg", "png", "webp", "gif", "svg", "avif",
];

function genererPathname(nomOriginal: string, extension: string): string {
  const sansExtension =
    nomOriginal.slice(0, Math.max(0, nomOriginal.length - extension.length - 1)) ||
    "image";
  const nettoye = sansExtension
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return `produits/${nettoye || "image"}-${Date.now()}.${extension}`;
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { succes: false, erreur: "Non authentifié" },
        { status: 401 },
      );
    }
    if (user.role !== ROLES.ADMIN && user.role !== ROLES.GERANT) {
      return NextResponse.json(
        { succes: false, erreur: "Action réservée à l'équipe boutique" },
        { status: 403 },
      );
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (err) {
      console.error("[UPLOAD] Erreur parsing formData:", err);
      return NextResponse.json(
        { succes: false, erreur: "Impossible de lire le formulaire. Vérifiez que le fichier est bien envoyé." },
        { status: 400 },
      );
    }

    const fichier = formData.get("fichier");

    if (!fichier || typeof fichier === "string") {
      return NextResponse.json(
        { succes: false, erreur: "Aucun fichier fourni (champ 'fichier')" },
        { status: 400 },
      );
    }

    const blob = fichier as Blob & { name?: string };
    const nomOriginal = blob.name ?? "fichier";
    const extension = nomOriginal.split(".").pop()?.toLowerCase() ?? "";

    if (!EXTENSIONS_AUTORISEES.includes(extension)) {
      return NextResponse.json(
        {
          succes: false,
          erreur: `Type de fichier non autorisé (.${extension}). Extensions acceptées : ${EXTENSIONS_AUTORISEES.join(", ")}`,
        },
        { status: 400 },
      );
    }

    if (blob.size === 0) {
      return NextResponse.json(
        { succes: false, erreur: "Fichier vide" },
        { status: 400 },
      );
    }

    if (blob.size > TAILLE_MAX) {
      return NextResponse.json(
        { succes: false, erreur: "Fichier trop volumineux (max 5 Mo)" },
        { status: 400 },
      );
    }

    const pathname = genererPathname(nomOriginal, extension);

    try {
      const resultat = await put(pathname, blob, {
        access: "public",
        contentType: blob.type || undefined,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      console.log("[UPLOAD] Fichier envoyé sur Vercel Blob:", resultat.url);

      return NextResponse.json(
        { succes: true, donnees: { url: resultat.url } },
        { status: 201 },
      );
    } catch (err) {
      console.error("[UPLOAD] Erreur Vercel Blob:", err);
      const message = err instanceof Error ? err.message : "";
      const erreurBlob =
        message.includes("BLOB_READ_WRITE_TOKEN") || message.includes("token")
          ? "Stockage distant non configuré (BLOB_READ_WRITE_TOKEN manquant)."
          : message.includes("private store") || message.includes("private")
            ? "Le stockage Vercel Blob est en accès privé : passez le store en accès public dans Vercel (Storage > Blob > Settings) pour que les images soient visibles publiquement."
            : "Erreur lors de l'envoi vers le stockage distant.";
      return NextResponse.json(
        { succes: false, erreur: erreurBlob },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("[UPLOAD] Erreur inattendue:", err);
    return NextResponse.json(
      { succes: false, erreur: "Erreur interne lors de l'upload" },
      { status: 500 },
    );
  }
}