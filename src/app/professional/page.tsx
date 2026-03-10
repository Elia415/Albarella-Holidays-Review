import { prisma } from '@/lib/prisma'
import ProfessionalForm from '@/components/ProfessionalForm'

export default async function ProfessionalPage() {
  // Fetch categories
  const categories = await prisma.category.findMany()

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-aqua">Registrazione Professionista</h1>
      <p className="text-lg mb-8 text-gray-700">
        Registrati per completare il tuo profilo e ricevere recensioni dalla comunità.
      </p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ProfessionalForm categories={categories} />
      </div>
    </div>
  )
}
