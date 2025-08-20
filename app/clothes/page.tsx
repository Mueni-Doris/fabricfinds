"use client";

import { useEffect, useState } from "react";
import CartItemList from "./ClothesItemList"; // double-check file exists

interface FabricItem {
  id: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function CartPage() {
  const [items, setItems] = useState<FabricItem[]>([]);

  useEffect(() => {
    async function fetchFabrics() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fabrics`);
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch fabrics:", err);
      }
    }

    fetchFabrics();
  }, []);

  // 👇 Group by category (MUST come after items is defined)
  const groupedByCategory = items.reduce((acc: Record<string, FabricItem[]>, item: FabricItem) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div style={{  }}>
      <CartItemList groupedByCategory={groupedByCategory} />
    </div>
  );
}
