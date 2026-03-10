import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const professionals = await prisma.professional.findMany({
      include: {
        category: true,
        reviews: {
          where: { status: 'PUBBLICATO' },
        },
      },
    })
    return NextResponse.json(professionals)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Errore nel recupero' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const pro = await prisma.professional.create({
      data: {
        ragione_sociale: data.ragione_sociale || null,
        nome: data.nome,
        cognome: data.cognome,
        telefono: data.telefono,
        email: data.email,
        sito_web: data.sito_web || null,
        indirizzo_completo: data.indirizzo_completo,
        p_iva: data.p_iva || null,
        indirizzo_albarella: data.indirizzo_albarella || null,
        category_id: parseInt(data.category_id),
        specialist_answers: JSON.stringify(data.specialist_answers),
      },
    })

    return NextResponse.json({ success: true, professionalId: pro.id })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Errore nella registrazione' }, { status: 500 })
  }
}
