"use client";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { useCartStore, nombreArticles } from "@/store/cart";
import { Button } from "@/components/ui/button";

export function LienPanier() {
  const articles = useCartStore((s) => s.articles);
  const total = nombreArticles(articles);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Panier"
      asChild
      className="relative"
    >
      <Link href="/panier">
        <FaCartShopping />
        {total > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
            {total}
          </span>
        )}
      </Link>
    </Button>
  );
}