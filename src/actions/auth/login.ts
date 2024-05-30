"use server";

import { signIn } from "@/auth.config";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };

        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }

  return { success: "Email sent!" };
};
// "use server";

// import { LoginSchema } from "@/schemas";
// import { z } from "zod";
// import { getUserByEmail } from "..";
// import bcryptjs from "bcryptjs";

// export const validateLogin = async (values: z.infer<typeof LoginSchema>) => {
//   const validatedFields = LoginSchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { error: "Invalid fields!" };
//   }

//   const { email, password } = validatedFields.data;

//   const user = await getUserByEmail(email);

//   if (!user?.password) {
//     return { error: "User not found!" };
//   }

//   const passwordMatch = await bcryptjs.compare(password, user.password);

//   if (!passwordMatch) {
//     return { error: "Incorrect password!" };
//   }

//   return { success: "Login validated!" };
// };
