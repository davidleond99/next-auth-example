"use server";

import { verificationTokenByToken } from "@/utils/verification-token";
import { getUserByEmail } from "../user/get-user-by-email";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const existingToken = await verificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const exisitingUser = await getUserByEmail(existingToken.email);

  if (!exisitingUser) {
    return { error: "Email does not exist" };
  }

  await db.user.update({
    where: { id: exisitingUser.id },
    data: { email: exisitingUser.email, emailVerified: new Date() },
  });

  await db.verificationToken.delete({ where: { id: existingToken.id } });
  return { success: "Email verified!" };
};
