import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { PrismaModule } from './prisma/prisma.module'; // 👈 Add this line


@Module({
  imports: [AuthModule, CartModule, PrismaModule], // 👈 Add this line
})
export class AppModule {}

