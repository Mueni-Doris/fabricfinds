'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:3001/auth/check-session", {
          credentials: 'include',
        });
        const data = await res.json();
        setIsLoggedIn(data.loggedIn);
      } catch (err) {
        console.error('Session check failed:', err);
      }
    };

    checkSession();
  }, []);

  return (
    <nav className="bg-pink-100 p-4 flex justify-between">
      <div className="text-xl font-bold">🧵 FabricFinds</div>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/clothes">Products </Link>
        <Link href="/cart">Cart</Link>
        {!isLoggedIn && <Link href="/login">Login</Link>}
        {isLoggedIn && <Link href="/logout">Logout</Link>}

      </div>
    </nav>
  );
}
