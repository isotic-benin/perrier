import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db";
import { ROLES, type Role } from "@/lib/constants";
import User from "@/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "Email et mot de passe",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          return null;
        }

        await dbConnect();

        const user = await User.findOne({ email: email.toLowerCase() }).select(
          "+motDePasseHash",
        );

        if (!user || !user.actif) {
          return null;
        }

        const motDePasseValide = await bcrypt.compare(
          password,
          user.motDePasseHash,
        );

        if (!motDePasseValide) {
          return null;
        }

        if (user.role !== ROLES.ADMIN && user.role !== ROLES.GERANT) {
          return null;
        }

        await User.updateOne(
          { _id: user._id },
          { derniereConnexion: new Date() },
        );

        return {
          id: user._id.toString(),
          email: user.email,
          name: `${user.prenom} ${user.nom}`.trim(),
          image: user.avatar || null,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const utilisateur = user as { id?: string; role?: Role };
        token.id = utilisateur.id ?? "";
        token.role = utilisateur.role ?? ROLES.CLIENT;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
});