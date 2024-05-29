export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="h-full flex items-center justify-center
     bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-200 to-sky-400"
    >
      {children}
    </div>
  );
}
