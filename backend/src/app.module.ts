import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { PrismaModule } from './prisma/prisma.module'; // 👈 Add this line
import { FabricsModule } from './fabrics/fabrics.module';
import { ClothesModule } from './clothes/clothes.module';



@Module({
  imports: [AuthModule,FabricsModule,ClothesModule, CartModule, PrismaModule], // 👈 Add this line
})
export class AppModule {}

