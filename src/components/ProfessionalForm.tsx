'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, User, Briefcase, Clock, Settings, MapPin, FileText } from 'lucide-react'

interface ProfessionalFormData {
  attivita_competenze: {
    professione_principale: string
    tipologie_intervento: string
    interventi_non_eseguiti: string
    specializzazioni: string
    tipo_clientela: string
    tipo_manutenzione: string
    tipo_progetti: string
    fornitura_materiali: string
    contatto_altri_professionisti: string
  }
  esperienza: {
    anni_attivita: string
    persone_team: string
    periodo_lavoro: string
    interventi_mese: string
    interventi_albarella_anno: string
  }
  disponibilita: {
    emergenze: string
    weekend_festivi: string
    preavviso_minimo: string
    metodo_contatto: string
    fasce_orarie: string
  }
  modalita_operative: {
    sopralluoghi: string
    costo_sopralluogo: string
    preventivi_scritti: string
    tempo_preventivo: string
    garanzia_interventi: string
  }
  albarella: {
    casa_albarella: string
    presentazione: string
  }
}

interface ProfessionalFormProps {
  categories?: any[]
}

export default function ProfessionalForm({ categories }: ProfessionalFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const [formData, setFormData] = useState<ProfessionalFormData>({
    attivita_competenze: {
      professione_principale: '',
      tipologie_intervento: '',
      interventi_non_eseguiti: '',
      specializzazioni: '',
      tipo_clientela: '',
      tipo_manutenzione: '',
      tipo_progetti: '',
      fornitura_materiali: '',
      contatto_altri_professionisti: ''
    },
    esperienza: {
      anni_attivita: '',
      persone_team: '',
      periodo_lavoro: '',
      interventi_mese: '',
      interventi_albarella_anno: ''
    },
    disponibilita: {
      emergenze: '',
      weekend_festivi: '',
      preavviso_minimo: '',
      metodo_contatto: '',
      fasce_orarie: ''
    },
    modalita_operative: {
      sopralluoghi: '',
      costo_sopralluogo: '',
      preventivi_scritti: '',
      tempo_preventivo: '',
      garanzia_interventi: ''
    },
    albarella: {
      casa_albarella: '',
      presentazione: ''
    }
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 5
  const progressPercentage = isClient ? (currentStep / totalSteps) * 100 : 0

  const updateFormData = (section: keyof ProfessionalFormData, field: string, value: any) => {
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
      // TODO: Implement API call to submit professional form
      console.log('Professional form data:', formData)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento...</p>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Grazie per la tua registrazione!</h2>
          <p className="text-gray-600 mb-6">
            La tua richiesta è in fase di verifica da parte del nostro team e ti contatteremo il prima possibile.
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Diventa un Professionista</h1>
          <p className="text-gray-600">Compila il form per registrarti come professionista su Albarella Holidays.</p>
        </div>

        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Attività e Competenze</h2>
                <p className="text-gray-600">Descrivi la tua professione e le tue competenze</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qual è la tua professione principale?</label>
                <input type="text" value={formData.attivita_competenze.professione_principale} onChange={(e) => updateFormData('attivita_competenze', 'professione_principale', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quali tipologie di intervento svolgi abitualmente?</label>
                <textarea value={formData.attivita_competenze.tipologie_intervento} onChange={(e) => updateFormData('attivita_competenze', 'tipologie_intervento', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" rows={3} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quali interventi NON esegui?</label>
                <textarea value={formData.attivita_competenze.interventi_non_eseguiti} onChange={(e) => updateFormData('attivita_competenze', 'interventi_non_eseguiti', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hai una o più specializzazioni tecniche? Quali?</label>
                <textarea value={formData.attivita_competenze.specializzazioni} onChange={(e) => updateFormData('attivita_competenze', 'specializzazioni', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lavori più spesso su abitazioni private, aziende o condomìni?</label>
                <select value={formData.attivita_competenze.tipo_clientela} onChange={(e) => updateFormData('attivita_competenze', 'tipo_clientela', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="abitazioni-private">Abitazioni private</option>
                  <option value="aziende">Aziende</option>
                  <option value="condomini">Condomìni</option>
                  <option value="tutti">Tutti</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gestisci lavori di manutenzione ordinaria, straordinaria o entrambe?</label>
                <select value={formData.attivita_competenze.tipo_manutenzione} onChange={(e) => updateFormData('attivita_competenze', 'tipo_manutenzione', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="ordinaria">Manutenzione ordinaria</option>
                  <option value="straordinaria">Manutenzione straordinaria</option>
                  <option value="entrambe">Entrambe</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Segui progetti completi o solo singole fasi del lavoro?</label>
                <select value={formData.attivita_competenze.tipo_progetti} onChange={(e) => updateFormData('attivita_competenze', 'tipo_progetti', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="progetti-completi">Progetti completi</option>
                  <option value="singole-fasi">Singole fasi</option>
                  <option value="entrambi">Entrambi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ti occupi anche della fornitura dei materiali?</label>
                <select value={formData.attivita_competenze.fornitura_materiali} onChange={(e) => updateFormData('attivita_competenze', 'fornitura_materiali', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sei disponibile a contattare altri professionisti (muratori, architetti, tecnici)?</label>
                <select value={formData.attivita_competenze.contatto_altri_professionisti} onChange={(e) => updateFormData('attivita_competenze', 'contatto_altri_professionisti', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Esperienza</h2>
                <p className="text-gray-600">Racconta la tua esperienza professionale</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Da quanti anni svolgi questa attività?</label>
                <input type="number" value={formData.esperienza.anni_attivita} onChange={(e) => updateFormData('esperienza', 'anni_attivita', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quante persone lavorano abitualmente con te?</label>
                <input type="number" value={formData.esperienza.persone_team} onChange={(e) => updateFormData('esperienza', 'persone_team', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Operi tutto l'anno o solo in determinati periodi?</label>
                <select value={formData.esperienza.periodo_lavoro} onChange={(e) => updateFormData('esperienza', 'periodo_lavoro', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="tutto-lanno">Tutto l'anno</option>
                  <option value="periodi-specifici">Solo in periodi specifici</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">In media, quanti interventi esegui al mese?</label>
                <input type="number" value={formData.esperienza.interventi_mese} onChange={(e) => updateFormData('esperienza', 'interventi_mese', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quanti interventi hai eseguito ad Albarella nell'ultimo anno?</label>
                <input type="number" value={formData.esperienza.interventi_albarella_anno} onChange={(e) => updateFormData('esperienza', 'interventi_albarella_anno', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Disponibilità</h2>
                <p className="text-gray-600">Indica la tua disponibilità lavorativa</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sei disponibile per interventi di emergenza?</label>
                <select value={formData.disponibilita.emergenze} onChange={(e) => updateFormData('disponibilita', 'emergenze', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lavori anche nei fine settimana o festivi?</label>
                <select value={formData.disponibilita.weekend_festivi} onChange={(e) => updateFormData('disponibilita', 'weekend_festivi', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qual è il preavviso minimo con cui puoi intervenire?</label>
                <select value={formData.disponibilita.preavviso_minimo} onChange={(e) => updateFormData('disponibilita', 'preavviso_minimo', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="immediato">Immediato</option>
                  <option value="2-ore">2 ore</option>
                  <option value="4-ore">4 ore</option>
                  <option value="giorno">1 giorno</option>
                  <option value="2-giorni">2 giorni</option>
                  <option value="settimana">1 settimana</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qual è il metodo migliore per contattarti?</label>
                <select value={formData.disponibilita.metodo_contatto} onChange={(e) => updateFormData('disponibilita', 'metodo_contatto', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="telefono">Telefono</option>
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="sms">SMS</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">In quali fasce orarie preferisci essere contattato?</label>
                <select value={formData.disponibilita.fasce_orarie} onChange={(e) => updateFormData('disponibilita', 'fasce_orarie', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="mattina">Mattina (8:00-12:00)</option>
                  <option value="pomeriggio">Pomeriggio (14:00-18:00)</option>
                  <option value="sera">Sera (18:00-20:00)</option>
                  <option value="tutto-giorno">Tutto il giorno</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Modalità Operative</h2>
                <p className="text-gray-600">Descrivi come lavori</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Effettui sopralluoghi preliminari?</label>
                <select value={formData.modalita_operative.sopralluoghi} onChange={(e) => updateFormData('modalita_operative', 'sopralluoghi', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Il sopralluogo è gratuito o a pagamento?</label>
                <select value={formData.modalita_operative.costo_sopralluogo} onChange={(e) => updateFormData('modalita_operative', 'costo_sopralluogo', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="gratuito">Gratuito</option>
                  <option value="pagamento">A pagamento</option>
                  <option value="rimborsabile">Rimborsabile se si accetta il lavoro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fornisci preventivi scritti?</label>
                <select value={formData.modalita_operative.preventivi_scritti} onChange={(e) => updateFormData('modalita_operative', 'preventivi_scritti', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">In quanto tempo mediamente invii un preventivo?</label>
                <select value={formData.modalita_operative.tempo_preventivo} onChange={(e) => updateFormData('modalita_operative', 'tempo_preventivo', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="immediato">Immediato</option>
                  <option value="stesso-giorno">Stesso giorno</option>
                  <option value="24-ore">24 ore</option>
                  <option value="48-ore">48 ore</option>
                  <option value="3-giorni">3 giorni</option>
                  <option value="settimana">1 settimana</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Offri garanzia sugli interventi effettuati?</label>
                <select value={formData.modalita_operative.garanzia_interventi} onChange={(e) => updateFormData('modalita_operative', 'garanzia_interventi', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Albarella</h2>
                <p className="text-gray-600">Informazioni su Albarella e presentazione</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hai la casa ad Albarella?</label>
                <select value={formData.albarella.casa_albarella} onChange={(e) => updateFormData('albarella', 'casa_albarella', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Seleziona</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vuoi fare una tua presentazione?</label>
                <textarea value={formData.albarella.presentazione} onChange={(e) => updateFormData('albarella', 'presentazione', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" rows={5} placeholder="Racconta qualcosa di te, della tua esperienza e perché i clienti dovrebbero sceglierti..." />
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
