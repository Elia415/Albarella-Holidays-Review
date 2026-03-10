import { prisma } from '@/lib/prisma'
import AdvisorForm from '@/components/AdvisorForm'

export default async function AdvisorPage() {
  // Fetch categories for select
  const categories = await prisma.category.findMany()

  return (
    <div>
      <AdvisorForm categories={categories} />
    </div>
  )
}
