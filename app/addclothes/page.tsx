'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null); // actual file, not base64

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('image', imageFile); // ✅ now using actual file

    try {
      const response = await fetch('http://localhost:3001/clothes/upload', {
        method: 'POST', // ✅ must be POST
        body: formData,
      });
      

      const data = await response.json();

      if (!response.ok) {
        console.error("Server error details:", data.error);
        throw new Error(data.message || "Something went wrong");
      }

      alert("Success! 🎉 " + data.message);
      router.push('/login');

    } catch (err: any) {
      console.error("Fetch error:", err);
      alert("Failed to add item: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Add New Clothing 🧥</h2>

        <input
          type="text"
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <select
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          <option value="Tops">Tops</option>
          <option value="Trousers">Trousers</option>
          <option value="Dress">Dress</option>
        </select>


        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImageFile(file);
          }}
          required
        />

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-600 transition"
        >
          ADD ITEM
        </button>
      </form>
    </div>
  );
}
