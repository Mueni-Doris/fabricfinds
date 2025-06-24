"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import React from "react";
import { toast } from "react-hot-toast";

// 🔐 Type definition for each fabric item
interface FabricItem {
  id: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

// 🧺 Props for the component
interface Props {
  groupedByCategory: Record<string, FabricItem[]>;
}

export default function CartItemList({ groupedByCategory }: Props) {
  const router = useRouter();

  // ✅ Check session status on mount
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch('http://localhost/backend/check_session.php', {
          credentials: 'include',
        });
        const data = await res.json();
        console.log("Session check:", data);

        if (!data.loggedIn) {
          toast.error("Please login first 🙅‍♀️");
          router.push('/login');
        }
      } catch (error) {
        console.error("Session check failed:", error);
        toast.error("Session check failed 😵‍💫");
      }
    };

    checkLogin();
  }, [router]);

  // ✅ Add to cart handler
  const handleAddToCart = async (item: FabricItem) => {
    try {
      const res = await fetch('http://localhost:3001/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          description: item.description,
          price: item.price,
          image: item.image,
          quantity: 1,
          clothe_id:Number( item.id),

        }),
      });
      
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        console.error('Server error:', data.message);
        throw new Error(data.message || 'Something went wrong');
      }

      toast.success('🛒 Added to cart: ' + data.message);
    } catch (err: any) {
      console.error('Fetch error:', err);
      toast.error('Failed to add to cart: ' + err.message);
    }
  };

  return (
    <div className="p-4">
      {Object.entries(groupedByCategory).map(([category, items]) => (
        <div key={category} className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{category}</h2>
          <div className="flex gap-4 flex-wrap bg-white p-4 rounded-lg shadow-md">
            {items.map((item) => (
              <div
                key={item.id}
                className="w-40 bg-gray-100 rounded-lg p-3 shadow-sm flex flex-col items-center"
              >
                <img
                  src={item.image}
                  alt={item.description}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <p className="text-sm text-center mb-1">{item.description}</p>
                <p className="text-sm font-semibold mb-2">${item.price}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-black text-white py-1 px-3 rounded hover:bg-gray-800 text-sm"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
