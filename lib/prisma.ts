import { PrismaClient } from "@prisma/client";

// Satu koneksi bersama; disimpan di globalThis agar tidak dibuat ulang saat hot reload.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}