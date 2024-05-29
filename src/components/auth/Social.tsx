"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";

export const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        className="w-full"
        variant={"outline"}
        size={"lg"}
        onClick={() => {}}
      >
        <FcGoogle size={25} />
      </Button>
      <Button
        className="w-full"
        variant={"outline"}
        size={"lg"}
        onClick={() => {}}
      >
        <FaGithub size={25} />
      </Button>
    </div>
  );
};
