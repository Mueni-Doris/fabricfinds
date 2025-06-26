"use client";

import { useEffect, useState } from "react";
import CartItemList from "./ClothesItemList"; // Make sure this file exists and exports default

interface FabricItem {
  id: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function CartPage() {
  const [groupedByCategory, setGroupedByCategory] = useState<Record<string, FabricItem[]>>({});

  useEffect(() => {
    const fetchFabrics = async () => {
      try {
        const response = await fetch("/api/fabrics");
        const data = await response.json();
        setGroupedByCategory(data);
      } catch (error) {
        console.error("Failed to fetch fabrics:", error);
      }
    };

    fetchFabrics();
  }, []);

  return (
    <div style={{ padding: "20px", backgroundColor: "#FFF5EE" }}>
      <CartItemList groupedByCategory={groupedByCategory} />
    </div>
  );
}
