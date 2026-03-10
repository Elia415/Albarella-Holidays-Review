'use client'

import { Review, Professional, Evaluator } from '@prisma/client'

interface ReviewWithRelations extends Review {
  professional: Professional
  evaluator: Evaluator
}

interface AdminPanelProps {
  reviews: ReviewWithRelations[]
}

export default function AdminPanel({ reviews }: AdminPanelProps) {
  const updateStatus = async (reviewId: number, status: string) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      alert('Status aggiornato')
      window.location.reload()
    } else {
      alert('Errore')
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Recensioni da Moderare</h2>
      {reviews.map(review => {
        const ratings = JSON.parse(review.ratings as string)
        const avg = Object.values(ratings).reduce((a: number, b: number) => a + b, 0) / Object.values(ratings).length
        return (
          <div key={review.id} className="bg-white p-6 rounded-lg shadow-md border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold">Professionista: {review.professional.nome} {review.professional.cognome}</h3>
                <p>Categoria: {review.professional.category.name}</p>
                <p>Valutazione media: {avg.toFixed(1)} / 5</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Valutatore: {review.evaluator.nome} {review.evaluator.cognome}</h3>
                <p>Email: {review.evaluator.email}</p>
                <p>Status: {review.status}</p>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => updateStatus(review.id, 'IN_LAVORAZIONE')}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                In Lavorazione
              </button>
              <button
                onClick={() => updateStatus(review.id, 'PUBBLICATO')}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Pubblica
              </button>
              <button
                onClick={() => alert('Contatta le parti')}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Contatta
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
