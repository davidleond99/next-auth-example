import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./actions";

export const authConfig: NextAuthConfig = {
  pages: {
    signOut: "/auth/login",
    signIn: "/auth/login",
    newUser: "/auth/register",
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
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
