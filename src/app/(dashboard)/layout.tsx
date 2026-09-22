import { requireUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import Link from "next/link";
import { FaArrowLeft, FaTree } from "react-icons/fa6";
import { HeaderDashboard } from "@/components/dashboard/header-dashboard";
import { FooterDashboard } from "@/components/dashboard/footer-dashboard";
import { SidebarDashboard } from "@/components/dashboard/sidebar-dashboard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  const estAdmin = user.role === ROLES.ADMIN;
  const base = estAdmin ? "/admin" : "/gerant";

  return (
    <div className="flex min-h-svh bg-muted">
      {/* ═══ SIDEBAR (desktop, full height) ═══ */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-sidebar lg:flex">
        <div className="flex h-16 shrink-0 items-center border-b border-white/10 px-5">
          <Link href={base} className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-[#d19a3f] text-[#211b16]">
              <FaTree className="size-4" />
            </span>
            <span className="font-heading text-lg font-bold leading-none tracking-tight text-sidebar-foreground">
              Perrier<span className="text-[#d19a3f]">Bois</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
              Backoffice
            </span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <SidebarDashboard estAdmin={estAdmin} sombre />
        </nav>

        <div className="shrink-0 border-t border-white/10 px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[13px] font-medium text-sidebar-foreground/60 transition-colors hover:text-sidebar-foreground"
          >
            <FaArrowLeft className="size-3.5" /> Vers la boutique
          </Link>
        </div>
      </aside>

      {/* ═══ COLONNE PRINCIPALE (header + contenu + footer) ═══ */}
      <div className="flex min-h-svh w-full flex-col lg:pl-64">
        <HeaderDashboard
          nom={user.name ?? "Utilisateur"}
          email={user.email ?? undefined}
          role={user.role}
          base={base}
        />

        {/* Sidebar mobile (bandeau horizontal) */}
        <div className="border-b border-border bg-sidebar px-2 py-2 lg:hidden">
          <SidebarDashboard estAdmin={estAdmin} sombre />
        </div>

        <main className="flex-1 p-4 sm:p-6">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(42,33,27,0.03)] sm:p-7">
            {children}
          </div>
        </main>

        <FooterDashboard />
      </div>
    </div>
  );
}
