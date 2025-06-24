// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import {PrismaClient} from '../../../generated/prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // optional: logs all Prisma queries to console
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
