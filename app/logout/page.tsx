'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:3001/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Bye, please come back 👋🏽');

        // ⏳ Add 2-second delay before redirecting
        setTimeout(() => {
          router.push('/clothes');
        }, 2000); // 2000ms = 2 seconds
      } else {
        toast.error('Logout failed 😵');
      }
    } catch (err) {
      console.error("Logout error:", err);
      toast.error('Something went wrong 💥');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-xl transition duration-200"
    >
      Logout
    </button>
  );
}
