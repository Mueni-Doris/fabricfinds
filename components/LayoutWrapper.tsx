'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import AdNavbar from "@/components/adnavbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAdminRoute =
    pathname.startsWith("/reports") ||
    pathname.startsWith("/admin-dashboard") ||
    pathname.startsWith("/addclothes") ||
    pathname.startsWith("/logout");

  return (
    <>
      {isAdminRoute ? <AdNavbar /> : <Navbar />}
      <main className="min-h-screen pt-4 px-6">{children}</main>
    </>
  );
}
