import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const fabrics = await prisma.clothes.findMany();
  const safeFabrics = fabrics.map(f => ({
    id: f.id.toString(),
    description: f.description,
    price: f.price.toString(),
    image: f.image,
    category: f.category,
  }));

  const grouped: Record<string, typeof safeFabrics> = {};
  safeFabrics.forEach(f => {
    if (!grouped[f.category]) grouped[f.category] = [];
    grouped[f.category].push(f);
  });

  return NextResponse.json(grouped);
}
