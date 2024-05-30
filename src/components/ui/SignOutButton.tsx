"use client";

import { logout } from "@/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return <Button onClick={handleLogout}>Sign out</Button>;
};
