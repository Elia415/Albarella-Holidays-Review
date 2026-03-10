import { prisma } from '../lib/prisma'

async function main() {
  // Categories already seeded

  // Sample professionals
  const pros = [
    {
      ragione_sociale: null,
      nome: 'Mario',
      cognome: 'Rossi',
      telefono: '1234567890',
      email: 'mario.rossi@example.com',
      sito_web: 'https://marioidraulico.it',
      indirizzo_completo: 'Via Roma 1, Albarella',
      p_iva: '12345678901',
      indirizzo_albarella: 'Villa 123',
      category_id: 1, // IDRAULICO
      specialist_answers: JSON.stringify({
        specializzazioni: 'Riparazioni idrauliche, installazioni',
        target: 'privati',
        fornitura_materiali: 'Sì',
        rete_contatti: 'Associazioni locali',
        anni_esperienza: '15',
        team: '2 persone',
        stagionalita: 'Tutto l\'anno',
        disponibilita_weekend_festivi: 'sì',
        preavviso_minimo: '24 ore',
        metodo_contatto_preferito: 'telefono',
        sopralluoghi: 'gratis',
        preventivi_scritti: 'sì',
        garanzia_lavori: '2 anni',
        possesso_casa_albarella: 'sì',
        presentazione_personale: 'Esperto idraulico con 15 anni di esperienza.'
      })
    },
    {
      ragione_sociale: 'Elettrica Srl',
      nome: 'Luca',
      cognome: 'Verdi',
      telefono: '0987654321',
      email: 'luca.verdi@example.com',
      sito_web: 'https://elettricaverdi.it',
      indirizzo_completo: 'Via Venezia 2, Albarella',
      p_iva: '09876543210',
      indirizzo_albarella: 'Villa 456',
      category_id: 2, // ELETTRICISTA
      specialist_answers: JSON.stringify({
        specializzazioni: 'Impianti elettrici, domotica',
        target: 'privati',
        fornitura_materiali: 'Sì',
        rete_contatti: 'Fornitori certificati',
        anni_esperienza: '10',
        team: '3 persone',
        stagionalita: 'Primavera-estate',
        disponibilita_weekend_festivi: 'no',
        preavviso_minimo: '48 ore',
        metodo_contatto_preferito: 'email',
        sopralluoghi: 'pagamento',
        preventivi_scritti: 'sì',
        garanzia_lavori: '5 anni',
        possesso_casa_albarella: 'no',
        presentazione_personale: 'Specialista in impianti elettrici.'
      })
    },
    {
      ragione_sociale: null,
      nome: 'Giulia',
      cognome: 'Bianchi',
      telefono: '1122334455',
      email: 'giulia.bianchi@example.com',
      sito_web: null,
      indirizzo_completo: 'Via Milano 3, Albarella',
      p_iva: null,
      indirizzo_albarella: 'Villa 789',
      category_id: 3, // FALEGNAME
      specialist_answers: JSON.stringify({
        specializzazioni: 'Mobili su misura, restauri',
        target: 'privati',
        fornitura_materiali: 'Sì',
        rete_contatti: 'Boschi locali',
        anni_esperienza: '20',
        team: '1 persona',
        stagionalita: 'Autunno-inverno',
        disponibilita_weekend_festivi: 'sì',
        preavviso_minimo: '1 settimana',
        metodo_contatto_preferito: 'telefono',
        sopralluoghi: 'gratis',
        preventivi_scritti: 'sì',
        garanzia_lavori: '1 anno',
        possesso_casa_albarella: 'sì',
        presentazione_personale: 'Artigiana del legno con passione.'
      })
    }
  ]

  for (const pro of pros) {
    await prisma.professional.create({
      data: pro
    })
  }

  // Sample evaluators
  const evaluators = [
    { nome: 'Anna', cognome: 'Neri', email: 'anna.neri@example.com', telefono: '555666777', indirizzo: 'Via Napoli 4, Albarella' },
    { nome: 'Paolo', cognome: 'Gialli', email: 'paolo.gialli@example.com', telefono: '888999000', indirizzo: 'Via Firenze 5, Albarella' }
  ]

  for (const eval_ of evaluators) {
    await prisma.evaluator.create({
      data: eval_
    })
  }

  // Sample reviews
  const reviews = [
    {
      professional_id: 1,
      evaluator_id: 1,
      ratings: JSON.stringify({
        professionalita_tecnica: 5,
        affidabilita_serieta: 4,
        velocita_efficienza: 5,
        tempestivita: 5,
        rapporto_qualita_prezzo: 4,
        chiarezza_comunicazione_preventivo: 5,
        pulizia_ordine: 5,
        cortesia_disponibilita: 5,
        disponibilita_post_intervento: 4,
        valutazione_complessiva: 5
      }),
      intervention_answers: JSON.stringify({
        numero_interventi_totali: '50',
        numero_interventi_ultimi_12_mesi: '20',
        tipologia_frequente: 'Riparazioni rubinetti',
        gestione_urgenze: 'Sempre disponibile',
        complessita_lavori: 'Media',
        manutenzione_ordinaria_straordinaria: 'Entrambe',
        soluzioni_alternative_proposte: 'Sì',
        lavoro_in_team: 'No',
        impianti_tecnologici: 'No',
        risoluzione_imprevisti: 'Buona',
        comunicazione_ritardi: 'Tempestiva',
        istruzioni_post_lavoro: 'Chiare',
        presenza_preventivo: 'Sì'
      }),
      status: 'PUBBLICATO'
    },
    {
      professional_id: 2,
      evaluator_id: 2,
      ratings: JSON.stringify({
        professionalita_tecnica: 4,
        affidabilita_serieta: 5,
        velocita_efficienza: 4,
        tempestivita: 4,
        rapporto_qualita_prezzo: 5,
        chiarezza_comunicazione_preventivo: 4,
        pulizia_ordine: 5,
        cortesia_disponibilita: 4,
        disponibilita_post_intervento: 5,
        valutazione_complessiva: 4
      }),
      intervention_answers: JSON.stringify({
        numero_interventi_totali: '30',
        numero_interventi_ultimi_12_mesi: '15',
        tipologia_frequente: 'Installazioni prese',
        gestione_urgenze: 'Buona',
        complessita_lavori: 'Alta',
        manutenzione_ordinaria_straordinaria: 'Straordinaria',
        soluzioni_alternative_proposte: 'Sì',
        lavoro_in_team: 'Sì',
        impianti_tecnologici: 'Sì',
        risoluzione_imprevisti: 'Ottima',
        comunicazione_ritardi: 'Buona',
        istruzioni_post_lavoro: 'Adeguate',
        presenza_preventivo: 'Sì'
      }),
      status: 'PUBBLICATO'
    },
    {
      professional_id: 3,
      evaluator_id: 1,
      ratings: JSON.stringify({
        professionalita_tecnica: 5,
        affidabilita_serieta: 5,
        velocita_efficienza: 5,
        tempestivita: 5,
        rapporto_qualita_prezzo: 5,
        chiarezza_comunicazione_preventivo: 5,
        pulizia_ordine: 5,
        cortesia_disponibilita: 5,
        disponibilita_post_intervento: 5,
        valutazione_complessiva: 5
      }),
      intervention_answers: JSON.stringify({
        numero_interventi_totali: '100',
        numero_interventi_ultimi_12_mesi: '40',
        tipologia_frequente: 'Mobili cucina',
        gestione_urgenze: 'Eccellente',
        complessita_lavori: 'Alta',
        manutenzione_ordinaria_straordinaria: 'Ordinaria',
        soluzioni_alternative_proposte: 'Sì',
        lavoro_in_team: 'No',
        impianti_tecnologici: 'No',
        risoluzione_imprevisti: 'Perfetta',
        comunicazione_ritardi: 'Nessun ritardo',
        istruzioni_post_lavoro: 'Dettagliate',
        presenza_preventivo: 'Sì'
      }),
      status: 'PUBBLICATO'
    }
  ]

  for (const review of reviews) {
    await prisma.review.create({
      data: review
    })
  }

  console.log('Sample data seeded')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
