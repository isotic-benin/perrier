import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ROLES } from "@/lib/constants";

export default auth((req) => {
  const path = req.nextUrl.pathname;
  const user = req.auth?.user;

  const estAdmin = user?.role === ROLES.ADMIN;
  const estGerant = user?.role === ROLES.GERANT;
  const estAuthentifie = user != null;

  const vers = (destination: string) =>
    NextResponse.redirect(new URL(destination, req.nextUrl));

  if (path === "/admin/login") {
    if (estAdmin) return vers("/admin");
    if (estGerant) return vers("/gerant");
    return NextResponse.next();
  }

  if (path.startsWith("/admin")) {
    if (!estAuthentifie) {
      return vers("/admin/login");
    }
    if (!estAdmin) {
      return vers("/");
    }
  }

  if (path.startsWith("/gerant")) {
    if (!estAuthentifie) {
      return vers("/admin/login");
    }
    if (!estAdmin && !estGerant) {
      return vers("/");
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/gerant/:path*"],
};