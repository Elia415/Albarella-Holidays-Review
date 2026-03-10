import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()
    await prisma.review.update({
      where: { id: parseInt(params.id) },
      data: { status },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Errore nell\'aggiornamento' }, { status: 500 })
  }
}
