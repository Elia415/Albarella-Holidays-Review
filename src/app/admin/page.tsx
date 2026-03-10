import { prisma } from '@/lib/prisma'
import AdminPanel from '@/components/AdminPanel'

export default async function AdminPage() {
  const reviews = await prisma.review.findMany({
    where: { status: { not: 'PUBBLICATO' } },
    include: {
      professional: true,
      evaluator: true,
    },
  })

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-aqua">Pannello Amministratore</h1>
      <AdminPanel reviews={reviews} />
    </div>
  )
}
