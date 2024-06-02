"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";

export const Social = () => {
  const onClick = async (provider: "google" | "github") => {
    await signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        className="w-full"
        variant={"outline"}
        size={"lg"}
        onClick={() => {
          onClick("google");
        }}
      >
        <FcGoogle size={25} />
      </Button>
      <Button
        className="w-full"
        variant={"outline"}
        size={"lg"}
        onClick={() => {
          onClick("github");
        }}
      >
        <FaGithub size={25} />
      </Button>
    </div>
  );
};
