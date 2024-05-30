import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { LoginSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/actions";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const authConfig: NextAuthConfig = {
  pages: {
    signOut: "/auth/login",
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);

        if (!user?.password) {
          return null;
        }

        const passwordMatch = await bcryptjs.compare(password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        const id = token.sub;
        session.user.id = id;
        session.userId = id;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      console.log(session);
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser?.role;

      return token;
    },
  },
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
