"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  label: string;
  href: string;
}

export const BackButton = ({ label, href }: Props) => {
  return (
    <Button
      variant={"link"}
      className="font-normal w-full hover:font-semibold transition-all"
      size={"sm"}
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
