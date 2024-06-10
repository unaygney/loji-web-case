import { mainFont } from "@/lib/font";
import Link from "next/link";
import Logo from "@/components/logo";
import { NavItem } from "@/components/nav-item";
import "../globals.css";
import { Wallet, CreditCard, LayoutDashboard } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full ">
      <body className={`${mainFont.className} antialiased scroll-smooth  `}>
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-[60px] items-center border-b px-5">
                <Link
                  className="flex items-center gap-3 font-semibold"
                  href="/"
                >
                  <Logo />

                  <p className="text-[#245F8D] text-xl font-bold tracking-wider ">
                    Loji<span className="text-[#2BA1D5]">per</span>
                  </p>
                </Link>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                  <NavItem href="/">
                    <LayoutDashboard size={16} />
                    Anasayfa
                  </NavItem>

                  <NavItem href="/debts">
                    <Wallet size={16} />
                    Borçlar
                  </NavItem>

                  <NavItem href="/payment-plan">
                    <CreditCard size={16} />
                    Ödeme Planı
                  </NavItem>
                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
              <Link
                className="flex items-center gap-2 font-semibold lg:hidden"
                href="/"
              >
                <Logo />
                <span className="">ACME</span>
              </Link>
            </header>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
