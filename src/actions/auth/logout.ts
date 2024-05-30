"use server";

import { signOut } from "@/auth.config";

export const logout = async () => {
  try {
    await signOut({ redirectTo: "/auth/login", redirect: true });
  } catch (error) {}
};
