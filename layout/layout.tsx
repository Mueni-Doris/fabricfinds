// app/layout.tsx

import Link from "next/link";
import "./globals.css";
import { Providers } from "./Providers";

export const metadata = {
  title: "Fabric Finds",
  description: "Where style meets elegance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers> {/* ✅ All global context (session, theme, etc) lives here */}
          <nav style={{ padding: "1rem", backgroundColor: "#f5f5f5" }}>
            <Link href="/" style={{ marginRight: "1rem" }}>Home</Link>
            <Link href="/about" style={{ marginRight: "1rem" }}>About</Link>
            <Link href="/cart" style={{ marginRight: "1rem" }}>Cart</Link>
            <Link href="/contacts" style={{ marginRight: "1rem" }}>Contact</Link>
            <Link href="/login" style={{ marginRight: "1rem" }}>Login</Link>
          </nav>

          <main style={{ padding: "2rem" }}>
            {children} {/* 👶 The page-specific content lives here */}
          </main>
        </Providers>
      </body>
    </html>
  );
}
