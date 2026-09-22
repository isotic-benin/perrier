import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ROLES, type Role } from "@/lib/constants";

export const getSession = cache(async () => {
  return await auth();
});

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  return session?.user ?? null;
});

export const requireUser = cache(async () => {
  const session = await getSession();
  if (!session?.user) {
    redirect("/admin/login");
  }
  return session.user;
});

export const requireRoles = cache(async (roles: readonly Role[]) => {
  const user = await requireUser();
  if (!roles.includes(user.role)) {
    redirect("/");
  }
  return user;
});

export const requireAdmin = cache(async () => {
  return requireRoles([ROLES.ADMIN]);
});

export const requireGerant = cache(async () => {
  return requireRoles([ROLES.ADMIN, ROLES.GERANT]);
});

export const estConnecte = cache(async () => {
  const session = await getSession();
  return session?.user != null;
});