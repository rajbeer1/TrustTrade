import { PrismaClient } from '@prisma/client';
import { config } from '../config/config';

export let prisma: PrismaClient;

if (config.ENVIRONMENT=== 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }
  prisma = globalThis.prisma;
}


