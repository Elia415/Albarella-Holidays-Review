'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, User, Briefcase, Star, Clipboard, Grid3X3 } from 'lucide-react'

interface FormData {
  categoria: string
  professional: {
    nome: string
    cognome: string
    telefono: string
    email: string
    sito: string
    ditta_azienda: string
  }
  evaluator: {
    nome: string
    cognome: string
    telefono: string
    email: string
    citta_residenza: string
    indirizzo_albarella: string
  }
  ratings: {
    professionalita_tecnica: number
    affidabilita: number
    velocita: number
    tempestivita: number
    qualita_prezzo: number
    chiarezza_comunicazione: number
    pulizia: number
    cortesia: number
    disponibilita_post: number
    valutazione_complessiva: number
  }
  testimonial_choice: boolean
  intervention: {
    numero_interventi: string
    contatti_ultimi_12_mesi: string
    tipologia_frequente: string
    gestione_emergenze: string
    lavori_complessi: string
    tipo_manutenzione: string
    soluzioni_alternative: string
    team_lavoro: string
    impianti_tecnologici: string
    risoluzione_imprevisti: string
    comunicazione_ritardi: string
    istruzioni_post: string
    preventivo: string
  }
}

const weights = {
  professionalita_tecnica: 0.15,
  affidabilita: 0.15,
  velocita: 0.10,
  tempestivita: 0.10,
  qualita_prezzo: 0.15,
  chiarezza_comunicazione: 0.05,
  pulizia: 0.10,
  cortesia: 0.05,
  disponibilita_post: 0.05,
  valutazione_complessiva: 0.10
}

interface AdvisorFormProps {
  categories: any[]
}

export default function AdvisorForm({ categories }: AdvisorFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    categoria: '',
    professional: {
      nome: '',
      cognome: '',
      telefono: '',
      email: '',
      sito: '',
      ditta_azienda: ''
    },
    evaluator: {
      nome: '',
      cognome: '',
      telefono: '',
      email: '',
      citta_residenza: '',
      indirizzo_albarella: ''
    },
    ratings: {
      professionalita_tecnica: 0,
      affidabilita: 0,
      velocita: 0,
      tempestivita: 0,
      qualita_prezzo: 0,
      chiarezza_comunicazione: 0,
      pulizia: 0,
      cortesia: 0,
      disponibilita_post: 0,
      valutazione_complessiva: 0
    },
    testimonial_choice: false,
    intervention: {
      numero_interventi: '',
      contatti_ultimi_12_mesi: '',
      tipologia_frequente: '',
      gestione_emergenze: '',
      lavori_complessi: '',
      tipo_manutenzione: '',
      soluzioni_alternative: '',
      team_lavoro: '',
      impianti_tecnologici: '',
      risoluzione_imprevisti: '',
      comunicazione_ritardi: '',
      istruzioni_post: '',
      preventivo: ''
    }
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 5
  const progressPercentage = (currentStep / totalSteps) * 100

  const updateFormData = (section: keyof FormData, field: string, value: any) => {
    setFormData(prev => {
      const sectionData = prev[section]
      if (typeof sectionData === 'object' && sectionData !== null) {
        return {
          ...prev,
          [section]: {
            ...sectionData,
            [field]: value
          }
        }
      }
      return {
        ...prev,
        [section]: value
      }
    })
  }

  const calculateWeightedAverage = () => {
    let total = 0
    Object.entries(weights).forEach(([key, weight]) => {
      total += (formData.ratings[key as keyof typeof formData.ratings] || 0) * weight
    })
    return total
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      console.log('Submitting form data:', formData)
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          average_rating: calculateWeightedAverage()
        }),
      })

      console.log('Response status:', response.status)
      
      if (response.ok) {
        console.log('Form submitted successfully')
        setIsSubmitted(true)
      } else {
        console.error('Form submission failed:', response.statusText)
        alert('Errore durante l\'invio del form. Riprova più tardi.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Errore durante l\'invio del form. Riprova più tardi.')
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Grazie per la tua recensione!</h2>
          <p className="text-gray-600 mb-6">
            La tua recensione è in fase di controllo da parte del nostro team e sarà pubblicata il prima possibile.
          </p>
          <a 
            href="/" 
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Torna alla homepage
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Passo {currentStep} di {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round(progressPercentage)}% completato</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Proponi un Professionista</h1>
          <p className="text-gray-600">Compila il form per proporre un nuovo professionista.</p>
        </div>
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Grid3X3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Categorie</h2>
                <p className="text-gray-600">Seleziona la categoria del professionista</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Idraulico', 'Muratore', 'Elettricista', 'Falegname', 'Addetto alle Pulizie', 'Antennista', 'Piscine', 'Giardiniere'].map((categoria) => (
                <button
                  key={categoria}
                  type="button"
                  onClick={() => updateFormData('categoria', 'categoria', categoria)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.categoria === categoria ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium text-gray-900">{categoria}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Anagrafica Professionista</h2>
                <p className="text-gray-600">Dati del professionista che vuoi recensire</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                  <input type="text" value={formData.professional.nome} onChange={(e) => updateFormData('professional', 'nome', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cognome *</label>
                  <input type="text" value={formData.professional.cognome} onChange={(e) => updateFormData('professional', 'cognome', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefono *</label>
                  <input type="tel" value={formData.professional.telefono} onChange={(e) => updateFormData('professional', 'telefono', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={formData.professional.email} onChange={(e) => updateFormData('professional', 'email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sito web</label>
                  <input type="url" value={formData.professional.sito} onChange={(e) => updateFormData('professional', 'sito', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ditta/Azienda</label>
                  <input type="text" value={formData.professional.ditta_azienda} onChange={(e) => updateFormData('professional', 'ditta_azienda', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Anagrafica Valutatore</h2>
                <p className="text-gray-600">I tuoi dati per la verifica della recensione</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                  <input type="text" value={formData.evaluator.nome} onChange={(e) => updateFormData('evaluator', 'nome', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cognome *</label>
                  <input type="text" value={formData.evaluator.cognome} onChange={(e) => updateFormData('evaluator', 'cognome', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefono *</label>
                  <input type="tel" value={formData.evaluator.telefono} onChange={(e) => updateFormData('evaluator', 'telefono', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" value={formData.evaluator.email} onChange={(e) => updateFormData('evaluator', 'email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Città di residenza *</label>
                  <input type="text" value={formData.evaluator.citta_residenza} onChange={(e) => updateFormData('evaluator', 'citta_residenza', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Indirizzo Albarella *</label>
                  <input type="text" value={formData.evaluator.indirizzo_albarella} onChange={(e) => updateFormData('evaluator', 'indirizzo_albarella', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center">
                  <input type="checkbox" id="testimonial" checked={formData.testimonial_choice} onChange={(e) => updateFormData('testimonial_choice', 'testimonial_choice', e.target.checked)} className="mr-3 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                  <label htmlFor="testimonial" className="text-sm text-gray-700">
                    <span className="font-medium">Acconsento a rendere pubblico il mio nome</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Valutazione</h2>
                <p className="text-gray-600">Valuta il professionista su 10 parametri (da 1 a 5 stelle)</p>
              </div>
            </div>
            <div className="space-y-4">
              {Object.entries({
                professionalita_tecnica: 'Professionalità tecnica',
                affidabilita: 'Affidabilità / serietà',
                velocita: 'Velocità / efficienza',
                tempestivita: 'Tempestività',
                qualita_prezzo: 'Rapporto qualità-prezzo',
                chiarezza_comunicazione: 'Chiarezza della comunicazione / preventivo',
                pulizia: 'Pulizia / ordine sul posto di lavoro',
                cortesia: 'Cortesia e disponibilità',
                disponibilita_post: 'Disponibilità post-intervento',
                valutazione_complessiva: 'VALUTAZIONE COMPLESSIVA'
              }).map(([key, label]) => (
                <div key={key} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">{label}</label>
                    <span className="text-sm text-gray-500">Peso: {Math.round(weights[key as keyof typeof weights] * 100)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => updateFormData('ratings', key, star)} className="p-1">
                        <Star className={`w-6 h-6 ${star <= (formData.ratings[key as keyof typeof formData.ratings] || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{formData.ratings[key as keyof typeof formData.ratings] || 0}/5</span>
                  </div>
                </div>
              ))}
              <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Media ponderata:</span>
                  <span className="text-xl font-bold text-primary">{calculateWeightedAverage().toFixed(2)}/5</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Clipboard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Domande sull'Intervento</h2>
                <p className="text-gray-600">Dettagli sul lavoro svolto</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quanti interventi ti ha svolto questo professionista per te?</label>
                <input type="number" value={formData.intervention.numero_interventi} onChange={(e) => updateFormData('intervention', 'numero_interventi', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Negli ultimi 12 mesi, quante volte lo hai contattato per lavori diversi?</label>
                <input type="number" value={formData.intervention.contatti_ultimi_12_mesi} onChange={(e) => updateFormData('intervention', 'contatti_ultimi_12_mesi', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qual è stata la tipologia più frequente di intervento svolto?</label>
                <input type="text" value={formData.intervention.tipologia_frequente} onChange={(e) => updateFormData('intervention', 'tipologia_frequente', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ha gestito anche interventi di emergenza o urgenza?</label>
                <select value={formData.intervention.gestione_emergenze} onChange={(e) => updateFormData('intervention', 'gestione_emergenze', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ha eseguito lavori su progetti complessi o grandi ristrutturazioni?</label>
                <select value={formData.intervention.lavori_complessi} onChange={(e) => updateFormData('intervention', 'lavori_complessi', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gli interventi erano di manutenzione ordinaria o straordinaria?</label>
                <select value={formData.intervention.tipo_manutenzione} onChange={(e) => updateFormData('intervention', 'tipo_manutenzione', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="ordinaria">Ordinaria</option>
                  <option value="straordinaria">Straordinaria</option>
                  <option value="entrambi">Entrambi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ha mai consigliato soluzioni alternative o più efficienti?</label>
                <select value={formData.intervention.soluzioni_alternative} onChange={(e) => updateFormData('intervention', 'soluzioni_alternative', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gli interventi hanno richiesto più professionisti o solo lui/lei?</label>
                <select value={formData.intervention.team_lavoro} onChange={(e) => updateFormData('intervention', 'team_lavoro', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="da-solo">Da solo col suo team</option>
                  <option value="con-altri">Ho ingaggiato anche altri</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ha eseguito lavori su impianti tecnologici (domotica, wifi, elettronica, idraulica avanzata)?</label>
                <select value={formData.intervention.impianti_tecnologici} onChange={(e) => updateFormData('intervention', 'impianti_tecnologici', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">È stato in grado di risolvere problemi imprevisti durante l'intervento?</label>
                <select value={formData.intervention.risoluzione_imprevisti} onChange={(e) => updateFormData('intervention', 'risoluzione_imprevisti', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                  <option value="non-si-sono-presentati">Non si sono presentati imprevisti</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ha comunicato aggiornamenti se ci sono stati ritardi o problemi?</label>
                <select value={formData.intervention.comunicazione_ritardi} onChange={(e) => updateFormData('intervention', 'comunicazione_ritardi', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ti ha fornito istruzioni per la manutenzione post-intervento?</label>
                <select value={formData.intervention.istruzioni_post} onChange={(e) => updateFormData('intervention', 'istruzioni_post', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ha formulato un preventivo prima dell'intervento?</label>
                <select value={formData.intervention.preventivo} onChange={(e) => updateFormData('intervention', 'preventivo', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="non-lo-ho-chiesto-io">No lo ho chiesto io</option>
                  <option value="no-non-ha-formulato">No, non ha formulato preventivo</option>
                  <option value="si-ha-formulato">Sì, ha formulato preventivo</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
              currentStep === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Indietro
          </button>

          <button
            onClick={currentStep === totalSteps ? handleSubmit : handleNext}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            {currentStep === totalSteps ? 'Invia' : 'Prosegui'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
