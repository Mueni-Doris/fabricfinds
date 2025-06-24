'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost/backend/logout.php', {
        method: 'POST',
        credentials: 'include', // sends session cookie
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Bye, please come back');
        router.push('/login');
      } else {
        toast.error('Logout failed ');
      }
    } catch (err) {
      console.error("Logout error:", err);
      toast.error('Something went wrong ');
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
