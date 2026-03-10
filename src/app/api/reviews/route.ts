import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    console.log('Received data:', data)

    // Validate required fields
    if (!data.evaluator.nome || !data.evaluator.cognome || !data.evaluator.telefono || !data.evaluator.email ||
        !data.professional.nome || !data.professional.cognome || !data.professional.telefono) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 })
    }

    // Check if evaluator already exists by email
    let evaluator
    try {
      evaluator = await prisma.evaluator.create({
        data: {
          nome: data.evaluator.nome,
          cognome: data.evaluator.cognome,
          email: data.evaluator.email,
          telefono: data.evaluator.telefono,
          indirizzo: `${data.evaluator.citta_residenza}, ${data.evaluator.indirizzo_albarella}`,
          testimonial_choice: data.testimonial_choice || false,
        },
      })
    } catch (error: any) {
      // If evaluator already exists, find them
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        evaluator = await prisma.evaluator.findUnique({
          where: { email: data.evaluator.email }
        })
        if (!evaluator) {
          throw new Error('Evaluator not found after duplicate email error')
        }
      } else {
        throw error
      }
    }

    // Create professional
    const pro = await prisma.professional.create({
      data: {
        ragione_sociale: data.professional.ditta_azienda || null,
        nome: data.professional.nome,
        cognome: data.professional.cognome,
        telefono: data.professional.telefono,
        email: data.professional.email || null,
        sito_web: data.professional.sito || null,
        indirizzo_completo: '', // Non abbiamo più questo campo
        p_iva: null, // Non abbiamo più questo campo
        indirizzo_albarella: data.evaluator.indirizzo_albarella || null,
        category: {
          connect: { id: 1 } // Default category
        }
      },
    })

    // Create review
    const review = await prisma.review.create({
      data: {
        professional_id: pro.id,
        evaluator_id: evaluator.id,
        ratings: JSON.stringify(data.ratings),
        intervention_answers: JSON.stringify(data.intervention),
        status: 'BOZZA',
      },
    })

    return NextResponse.json({ success: true, reviewId: review.id })
  } catch (error) {
    console.error('Error in API route:', error)
    return NextResponse.json({ error: 'Errore nella creazione della recensione' }, { status: 500 })
  }
}
