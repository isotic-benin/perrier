import { ProductCard } from "@/components/product/product-card";
import type { ProduitVue } from "@/lib/produit-vue";

export function ProductGrid({
  produits,
  videMessage = "Aucun produit trouvé.",
}: {
  produits: ProduitVue[];
  videMessage?: string;
}) {
  if (produits.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
        {videMessage}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {produits.map((produit) => (
        <ProductCard key={produit._id} produit={produit} />
      ))}
    </div>
  );
}