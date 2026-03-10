import { PrismaClient } from '@prisma/client'
import BetterSQLiteAdapter from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'

const sqlite = new Database('./dev.db')
const adapter = new BetterSQLiteAdapter(sqlite)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Insert categories
  const categories = [
    { name: 'IDRAULICO' },
    { name: 'MURATORE' },
    { name: 'ELETTRICISTA' },
    { name: 'FALEGNAME' },
    { name: 'ADDETTO_ALLE_PULIZIE' },
    { name: 'ANTENNISTA' },
    { name: 'PISCINE' },
    { name: 'GIARDINIERE' },
    { name: 'ALTRO' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name as any },
      update: {},
      create: cat,
    })
  }

  console.log('Categories seeded')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
