"use client";
import { usePathname } from "next/navigation";
import { FaTableColumns, FaFolderTree, FaImage, FaTicket, FaCircleQuestion, FaMessage, FaBox, FaBagShopping, FaStar, FaEnvelope, FaGear } from "react-icons/fa6";
import Link from "next/link";

interface LienNav {
  href: string;
  label: string;
  icone: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

export function SidebarDashboard({
  estAdmin,
  sombre = false,
}: {
  estAdmin: boolean;
  sombre?: boolean;
}) {
  const chemin = usePathname();
  const base = estAdmin ? "/admin" : "/gerant";

  const liens: LienNav[] = [
    { href: base, label: "Tableau de bord", icone: FaTableColumns, exact: true },
    { href: `${base}/commandes`, label: "Commandes", icone: FaBox },
    { href: `${base}/produits`, label: "Produits", icone: FaBagShopping },
    ...(estAdmin
      ? ([
        { href: `${base}/categories`, label: "Catégories", icone: FaFolderTree },
        { href: `${base}/avis`, label: "Avis", icone: FaStar },
        { href: `${base}/carousel`, label: "Carrousel", icone: FaImage },
        { href: `${base}/newsletter`, label: "Newsletter", icone: FaEnvelope },
        { href: `${base}/coupons`, label: "Coupons", icone: FaTicket },
        { href: `${base}/faq`, label: "FAQ", icone: FaCircleQuestion },
        { href: `${base}/contacts`, label: "Contacts", icone: FaMessage },
        { href: `${base}/parametres`, label: "Paramètres", icone: FaGear },
      ] satisfies LienNav[])
      : []),
  ];

  return (
    <nav aria-label="Navigation du back-office" className="no-scrollbar flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:pb-0">
      {liens.map(({ href, label, icone: Icone, exact }) => {
        const actif = exact
          ? chemin === href
          : chemin.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={actif ? "page" : undefined}
            className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${
              actif
                ? sombre
                  ? "bg-[#d19a3f]/15 text-[#e0ad55] shadow-[inset_2px_0_0_0_#d19a3f] lg:shadow-none lg:border-l-2 lg:border-[#d19a3f] lg:rounded-l-none lg:pl-2.5"
                  : "bg-accent text-primary shadow-[inset_2px_0_0_0_#b26b1e]"
                : sombre
                  ? "text-sidebar-foreground/60 hover:bg-white/8 hover:text-sidebar-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icone
              className={`size-[16px] ${actif
                ? sombre
                  ? "text-[#d19a3f]"
                  : "text-primary"
                : sombre
                  ? "text-sidebar-foreground/35"
                  : "text-muted-foreground"
                }`}
            />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
