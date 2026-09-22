import { FaCircle, FaStar } from "react-icons/fa6";
import { notFound } from "next/navigation";
import { type Metadata } from "next";

import { getProduitParSlug, getProduitsSimilaires } from "@/lib/produits";
import { getCategorieParId } from "@/lib/categories";
import { formaterPrix, prixEffectif, estEnPromotion, calculerRemise } from "@/lib/format";
import { produireProduitVue } from "@/lib/produit-vue";
import { dbConnect } from "@/lib/db";
import Review from "@/models/Review";
import { GalerieProduit } from "@/components/product/galerie-produit";
import { AjouterAuPanier } from "@/components/product/ajouter-panier";
import { ProductGrid } from "@/components/product/product-grid";
import { FilAriane } from "@/components/shared/fil-ariane";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const produit = await getProduitParSlug(slug);
  if (!produit) return { title: "Produit introuvable" };
  const description =
    produit.metaDescription ||
    produit.descriptionCourte?.slice(0, 160) ||
    produit.description?.slice(0, 160);
  return {
    title: produit.metaTitle || produit.nom,
    description,
    alternates: { canonical: `/produits/${slug}` },
    openGraph: {
      type: "website",
      title: produit.nom,
      description,
      images: produit.images?.[0] ? [produit.images[0]] : undefined,
    },
  };
}

export default async function FicheProduitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const produit = await getProduitParSlug(slug);
  if (!produit) notFound();

  const categorie = await getCategorieParId(String(produit.categorieId));
  const similaires = await getProduitsSimilaires(
    String(produit._id),
    String(produit.categorieId),
  );

  await dbConnect();
  const avis = await Review.find({
    produitId: produit._id,
    statut: "approuve",
  })
    .populate<{ clientId: { prenom: string; nom: string } }>(
      "clientId",
      "prenom nom",
    )
    .sort({ dateCreation: -1 })
    .limit(20)
    .lean();

  const prix = prixEffectif(produit);
  const enPromo = estEnPromotion(produit);
  const remise = calculerRemise(produit);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: produit.nom,
            description:
              produit.descriptionCourte?.slice(0, 200) ||
              produit.description?.slice(0, 200),
            image: produit.images ?? [],

            sku: String(produit._id),
            offers: {
              "@type": "Offer",
              priceCurrency: "EUR",
              price: prix,
              availability:
                produit.stock > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
              url: `/produits/${produit.slug}`,
            },
            aggregateRating:
              produit.noteMoyenne > 0
                ? {
                  "@type": "AggregateRating",
                  ratingValue: produit.noteMoyenne,
                  reviewCount: produit.nombreAvis,
                }
                : undefined,
          }),
        }}
      />
      <FilAriane
        items={[
          {
            libelle: categorie?.nom ?? "Produits",
            href: categorie
              ? `/categorie/${categorie.slug}`
              : "/produits",
          },
          { libelle: produit.nom },
        ]}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <GalerieProduit images={produit.images ?? []} nom={produit.nom} />

        <div>
          {produit.typeLivraison && (
            <div className="mb-2 inline-flex items-center gap-1.5 w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {produit.typeLivraison === "retrait" ? "📦 Retrait" :
                produit.typeLivraison === "livraison_portail" ? "🚚 Livraison au portail" : "🏡 Livraison en garage"}
            </div>
          )}
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{produit.nom}</h1>

          {produit.noteMoyenne > 0 && (
            <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
              <FaStar className="size-4 fill-amber-400 text-amber-400" />
              {produit.noteMoyenne.toFixed(1)} · {produit.nombreAvis} avis
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-bold">{formaterPrix(prix)}</span>
            {enPromo && produit.prixPromo != null && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  {formaterPrix(produit.prix)}
                </span>
                {remise > 0 && (
                  <span className="rounded-md bg-destructive px-2 py-0.5 text-sm font-semibold text-white">
                    −{remise}%
                  </span>
                )}
              </>
            )}
          </div>

          {produit.descriptionCourte && (
            <p className="mt-4 text-muted-foreground">
              {produit.descriptionCourte}
            </p>
          )}

          <div className="mt-4 text-sm">
            {produit.stock > 0 ? (
              <p className="font-medium text-emerald-600">
                En stock ({produit.stock} disponible{produit.stock > 1 ? "s" : ""})
              </p>
            ) : (
              <p className="font-medium text-destructive">Rupture de stock</p>
            )}
          </div>

          <div className="mt-6">
            <AjouterAuPanier
              produitId={String(produit._id)}
              nom={produit.nom}
              slug={produit.slug}
              image={produit.images?.[0] ?? ""}
              prixUnitaire={prix}
              stock={produit.stock}
            />
          </div>

          {(produit.variantes?.length ?? 0) > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide">
                Voir les variantes
              </h2>
              <ul className="space-y-1 text-sm">
                {produit.variantes.map((variante) => (
                  <li
                    key={String(variante._id)}
                    className="flex items-center justify-between rounded-xl border border-border px-3.5 py-2.5"
                  >
                    <span>
                      {variante.nom} : <strong>{variante.valeur}</strong>
                    </span>
                    <span className="text-muted-foreground">
                      {variante.prixSupplement > 0
                        ? `+${formaterPrix(variante.prixSupplement)}`
                        : ""}{" "}
                      · {variante.stockVariante > 0 ? "en stock" : "en rupture"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(produit.attributs?.length ?? 0) > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide">
                Caractéristiques
              </h2>
              <dl className="divide-y overflow-hidden rounded-2xl border border-border bg-card text-sm">
                {produit.attributs.map((attribut) => (
                  <div
                    key={attribut.cle}
                    className="grid grid-cols-2 gap-2 px-3 py-2"
                  >
                    <dt className="text-muted-foreground">{attribut.cle}</dt>
                    <dd>{attribut.valeur}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {produit.description && (
        <div className="mt-10">
          <h2 className="mb-2 text-lg font-semibold">Description</h2>
          <p className="max-w-3xl whitespace-pre-line text-muted-foreground">
            {produit.description}
          </p>
        </div>
      )}

      <section className="mt-10 max-w-3xl">
        <h2 className="mb-4 text-lg font-semibold">
          Avis clients ({avis.length})
        </h2>

        {avis.length === 0 ? (
          <p className="text-muted-foreground">
            Aucun avis pour le moment.
          </p>
        ) : (
          <ul className="space-y-3">
            {avis.map((a) => (
              <li key={String(a._id)} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">
                    {a.clientId && typeof a.clientId === "object"
                      ? `${a.clientId.prenom} ${a.clientId.nom}`.trim()
                      : "Client"}{" "}
                    {a.achatVerifie && (
                      <span className="ml-1 rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-normal text-emerald-700">
                        Achat vérifié
                      </span>
                    )}
                  </p>
                  <p className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <FaStar
                        key={n}
                        className={
                          n <= a.note
                            ? "size-4 fill-amber-400 text-amber-400"
                            : "size-4 text-muted-foreground"
                        }
                      />
                    ))}
                  </p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {a.commentaire}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(a.dateCreation).toLocaleDateString("fr-FR")}
                </p>
                {a.reponseAdmin && (
                  <p className="mt-2 rounded-md bg-muted px-3 py-2 text-sm">
                    <strong>Réponse du magasin :</strong> {a.reponseAdmin}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {similaires.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">
            Produits similaires
          </h2>
          <ProductGrid produits={similaires.map(produireProduitVue)} />
        </div>
      )}
    </div>
  );
}