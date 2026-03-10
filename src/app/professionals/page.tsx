import { prisma } from '@/lib/prisma'

export default async function ProfessionalsPage() {
  const professionals = await prisma.professional.findMany({
    include: {
      reviews: {
        where: { status: 'PUBBLICATO' },
      },
      category: true,
    },
  })

  const prosWithStats = professionals.map(pro => {
    const reviews = pro.reviews
    const count = reviews.length
    if (count === 0) return null
    const total = reviews.reduce((sum, r) => {
      const ratings = JSON.parse(r.ratings as string)
      return sum + Object.values(ratings).reduce((a: number, b: number) => a + b, 0) / Object.values(ratings).length
    }, 0)
    const avg = total / count
    return { ...pro, reviewCount: count, averageRating: avg }
  }).filter(Boolean).sort((a, b) => b!.reviewCount - a!.reviewCount || b!.averageRating - a!.averageRating)

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-aqua">Professionisti</h1>
      <div className="space-y-4">
        {prosWithStats.map(pro => (
          <div key={pro!.id} className="bg-white p-4 rounded-lg shadow-md border border-aqua">
            <h2 className="text-xl font-semibold">{pro!.nome} {pro!.cognome}</h2>
            <p>Categoria: {pro!.category.name}</p>
            <p>Valutazione media: {pro!.averageRating.toFixed(1)} / 5</p>
            <p>Recensioni: {pro!.reviewCount}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
