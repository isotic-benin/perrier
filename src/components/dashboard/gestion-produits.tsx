import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import { formaterPrix } from "@/lib/format";
import { DeleteProduitButton } from "./delete-produit-button";

export async function GestionProduits({ baseHref }: { baseHref: string }) {
  await dbConnect();
  const produits = await Product.find()
    .sort({ dateCreation: -1 })
    .limit(200)
    .lean();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Produits</h1>
        <Link
          href={`${baseHref}/nouveau`}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-18px_rgba(178,107,30,0.9)] transition-colors hover:bg-[#8f5414]"
        >
          <FaPlus className="size-4" />
          Nouveau produit
        </Link>
      </div>

      {produits.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Aucun produit. Créez-en un d'abord.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/60 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                <th className="p-3 font-medium">Produit</th>
                <th className="p-3 font-medium">Prix</th>
                <th className="p-3 font-medium">Stock</th>
                <th className="p-3 font-medium">Statut</th>
                <th className="p-3 font-medium">Ventes</th>
                <th className="p-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {produits.map((produit) => (
                <tr key={String(produit._id)} className="border-b border-border/70 transition-colors last:border-0 hover:bg-muted/40">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      {produit.images?.[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={produit.images[0]}
                          alt=""
                          className="size-10 rounded object-cover"
                        />
                      ) : (
                        <span className="size-10 rounded bg-muted" />
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-medium">{produit.nom}</p>
                        <p className="text-xs text-muted-foreground">
                          {produit.sku}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {produit.prixPromo != null ? (
                      <>
                        <span className="text-muted-foreground line-through">
                          {formaterPrix(produit.prix)}
                        </span>{" "}
                        <span className="font-medium">
                          {formaterPrix(produit.prixPromo)}
                        </span>
                      </>
                    ) : (
                      <span className="font-medium">
                        {formaterPrix(produit.prix)}
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <span
                      className={
                        produit.stock <= produit.seuilAlerteStock
                          ? "font-medium text-destructive"
                          : ""
                      }
                    >
                      {produit.stock}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {!produit.actif && (
                        <span className="rounded-full bg-destructive/10 px-1.5 py-0.5 text-xs text-destructive">
                          Inactif
                        </span>
                      )}
                      {produit.vedette && (
                        <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-xs text-amber-800">
                          En vedette
                        </span>
                      )}
                      {produit.enPromotion && (
                        <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-800">
                          Promotion
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3">{produit.nombreVentes}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`${baseHref}/${String(produit._id)}/modifier`}
                        className="text-primary hover:underline"
                      >
                        Modifier
                      </Link>
                      <DeleteProduitButton
                        produitId={String(produit._id)}
                        nomProduit={produit.nom}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}