"use client";

import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";
import React from "react";

interface FabricItem {
  id: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface Props {
  groupedByCategory: Record<string, FabricItem[]>;
}

export default function CartItemList({ groupedByCategory }: Props) {
  const router = useRouter();

  const handleAddToCart = async (item: FabricItem) => {
    try {
      const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          description: item.description,
          price: item.price,
          image: item.image,
          quantity: 1,
          clothe_id: Number(item.id),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || 'Something went wrong');
        if (data.redirectTo) router.push(data.redirectTo);
        return;
      }

      toast.success('🛒 Added to cart ');
    } catch (err: any) {
      toast.error('Failed to add to cart: ' + err.message);
      if (err.message.includes('Not logged in')) router.push('/login');
    }
  };

  return (
    <div className="px-6 py-8 bg-gradient-to-b from-[#ffffff] to-[#e2d1c3] min-h-screen">
      {Object.entries(groupedByCategory).map(([category, items]) => (
        <div key={category} className="mb-12">
          <h2 className="text-3xl font-serif font-semibold text-gray-700 border-b-2 border-gray-300 pb-2 mb-6">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300"
              >
                <img
                  src={item.image}
                  alt={item.description}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col items-center">
                  <p className="text-lg text-gray-700 text-center font-medium mb-2 font-serif">
                    {item.description}
                  </p>
                  <p className="text-sm font-semibold mb-2">${Number(item.price).toFixed(2)}</p>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-gradient-to-r from-pink-500 to-rose-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
