'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email.trim() || !password.trim()) {
      toast.error('Both fields are required');
      return;
    }
  
    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
  
      const text = await res.text();
      console.log("Raw response:", text);
  
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        toast.error("Weird server response");
        return;
      }
  
      if (data.success) {
        toast.success('Login successful ');
        setTimeout(() => {
          router.push('/cart');
        }, 500);
      } else {
        toast.error(data.message || 'Invalid login 😶');
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error('Server error. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Yaay,,Welcome Back 🤗
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-pink-400 text-white py-3 rounded-xl font-semibold hover:bg-pink-500 transition duration-200"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-700">
          Don&apos;t have an account?{' '}
          <a href="/register" className="underline text-pink-500 hover:text-pink-600">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
