import { auth } from "@/auth.config";
import { Card, CardContent, SignOutButton } from "@/components";

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-500 space-y-4 p-4">
      <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl overflow-hidden">
        <CardContent>{JSON.stringify(session)}</CardContent>
      </Card>
      <SignOutButton />
    </div>
  );
}
