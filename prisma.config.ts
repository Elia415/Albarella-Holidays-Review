// prisma.config.ts
import { type PrismaClient as PrismaClientType } from 'generated/prisma'

let PrismaClient;

// Proviamo a importare dinamicamente il client generato.
// Se non esiste (come durante il primo 'prisma generate'), non facciamo crashare tutto.
try {
  const generated = require('./generated/prisma');
  PrismaClient = generated.PrismaClient;
} catch (e) {
  // Durante la build/generate, il modulo potrebbe non esistere.
  // Esportiamo un oggetto vuoto o gestiamo l'errore silenziosamente.
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  (PrismaClient ? new PrismaClient() : null)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
