import Logo from "@/components/logo";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="w-full h-full antialiased ">
        <main className="min-h-screen w-full flex flex-col  items-center justify-center   ">
          <Logo />
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
