import { Button, LoginButton } from "@/components";
import { font } from "@/config/font";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main
      className="flex h-full flex-col items-center justify-center 
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-500"
    >
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-4xl text-white font-semibold drop-shadow-xl",
            font.className
          )}
        >
          🔐Auth
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
        <LoginButton>
          <Button size={"lg"}>Sign In</Button>
        </LoginButton>
      </div>
    </main>
  );
}
