import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  // 🔁 Add or update cart item
  async addItem(data: {
    description: string;
    price: number;
    image: string;
    quantity: number;
    clothe_id: number;
    email: string;
  }) {
    const existing = await this.prisma.cart.findFirst({
      where: {
        clothe_id: data.clothe_id,
        email: data.email,
      },
    });

    if (existing) {
      return this.prisma.cart.update({
        where: { id: existing.id },
        data: {
          quantity: existing.quantity + data.quantity,
          price: new Decimal(existing.price.toNumber() + data.price * data.quantity), // optional update
        },
      });
    }

    return this.prisma.cart.create({
      data: {
        ...data,
        price: new Decimal(data.price), // wrap price in Decimal if needed
      },
    });
  }

  // 📦 Get cart items for a user
  async getCart(email: string) {
    return this.prisma.cart.findMany({
      where: { email },
    });
  }

  // 🔍 Get single item by ID
  async getItemById(id: number) {
    return this.prisma.cart.findUnique({
      where: { id },
    });
  }

  // 🔁 Update quantity and recalculate price
  async updateQuantityAndPrice(id: number, quantity: number, price: Decimal) {
    return this.prisma.cart.update({
      where: { id },
      data: {
        quantity,
        price,
      },
    });
  }

  // ❌ Remove item from cart
  async removeItem(id: number) {
    return this.prisma.cart.delete({
      where: { id },
    });
  }

  // 🧹 Clear cart
  async clearCart(email: string) {
    await this.prisma.cart.deleteMany({
      where: { email },
    });
  }
}
