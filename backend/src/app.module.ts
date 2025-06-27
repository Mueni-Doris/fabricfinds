import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { PrismaModule } from './prisma/prisma.module'; // 👈 Add this line
import { FabricsModule } from './fabrics/fabrics.module';



@Module({
  imports: [AuthModule,FabricsModule, CartModule, PrismaModule], // 👈 Add this line
})
export class AppModule {}

