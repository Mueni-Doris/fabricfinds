'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/'); // Redirect home after 6 seconds
    }, 60000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg--50 text-center px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-black-800">Thank You for Your Purchase🤗🤗</h1>
      <p className="mt-4 text-brown-700 text-lg">
        Your order has been placed successfully. We'll get in touch with you shortly.
      </p>
      <p className="mt-2 text-sm text-orange-800">You’ll be redirected to the homepage shortly.</p>

      <button
        onClick={() => router.push('/')}
        className="mt-6 px-6 py-2 rounded-full bg-orange-300  hover:bg-orange-200 text-white transition"
      >
        Go to Homepage
      </button>
    </div>
  );
}
