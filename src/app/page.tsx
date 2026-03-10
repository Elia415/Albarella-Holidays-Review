'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, CheckCircle, Wrench, Hammer, Zap, Scissors, Sparkles, Droplets, ArrowRight, Search, MapPin, Clock, Shield } from 'lucide-react'

interface Professional {
  id: number
  nome: string
  cognome: string
  category: { name: string }
  reviews: { ratings: string }[]
  specialist_answers?: string
  foto_profilo?: string
}

interface Category {
  id: number
  name: string
}

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  IDRAULICO: Wrench,
  MURATORE: Hammer,
  ELETTRICISTA: Zap,
  FALEGNAME: Hammer,
  ADDETTO_ALLE_PULIZIE: Sparkles,
  ANTENNISTA: Zap,
  PISCINE: Droplets,
  GIARDINIERE: Scissors,
  ALTRO: Sparkles,
}

export default function Home() {
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filter, setFilter] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      const prosRes = await fetch('/api/professionals')
      const prosData = await prosRes.json()
      const filteredPros = prosData.filter((pro: Professional) => pro.reviews.length > 0)
      setProfessionals(filteredPros)

      const catsRes = await fetch('/api/categories')
      const catsData = await catsRes.json()
      setCategories(catsData)
    }
    fetchData()
  }, [])

  const filteredPros = professionals.filter(pro =>
    (filter === '' || pro.category.name === filter) &&
    (search === '' || 
      pro.nome.toLowerCase().includes(search.toLowerCase()) || 
      pro.cognome.toLowerCase().includes(search.toLowerCase()) || 
      `${pro.nome} ${pro.cognome}`.toLowerCase().includes(search.toLowerCase()) ||
      pro.category.name.toLowerCase().includes(search.toLowerCase())
    )
  )

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={16} fill={i < rating ? '#D97706' : 'none'} stroke="#D97706" />
    ))
  }

  const getInitials = (nome: string, cognome: string) => {
    return `${nome.charAt(0)}${cognome.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="relative bg-background py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Condividi e scopri i<br />
                <span className="text-primary">professionisti di Albarella</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Valutati dalla community, verificati e direttamente contattabili. Trova il professionista giusto per la tua casa.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-background rounded-2xl p-8 shadow-xl border border">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" size={24} />
                  <input
                    type="text"
                    placeholder="Trova un elettricista, idraulico..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Box */}
      <section className="relative -mt-8 z-10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-background rounded-2xl p-6 shadow-lg border border">
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Categoria:</span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 text-sm border border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Tutte</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Urgenza:</span>
                <select className="px-3 py-2 text-sm border border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Normale</option>
                  <option>Urgente</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Voto minimo:</span>
                <select className="px-3 py-2 text-sm border border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>3+</option>
                  <option>4+</option>
                  <option>4.5+</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Professionals Section */}
      <section id="professionals" className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              I più affidabili
              <CheckCircle size={20} className="text-primary" />
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
              Professionisti verificati, valutati dalla community e con contatti diretti verificati
            </p>
          </div>
          
          {filteredPros.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPros.slice(0, 6).map(pro => {
                const reviews = pro.reviews
                const avg = reviews.length > 0 ? reviews.reduce((sum, r) => {
                  const ratings = JSON.parse(r.ratings) as Record<string, number>
                  return sum + (Object.values(ratings) as number[]).reduce((a, b) => a + b, 0) / Object.values(ratings).length
                }, 0) / reviews.length : 0
                const isVerified = !!pro.specialist_answers
                return (
                  <div key={pro.id} className="bg-background rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border hover:border-primary/30">
                    <div className="flex items-start mb-4">
                      {pro.foto_profilo ? (
                        <div className="relative">
                          <Image
                            src={pro.foto_profilo}
                            alt={`${pro.nome} ${pro.cognome}`}
                            width={64}
                            height={64}
                            className="rounded-full object-cover border-2 border-primary/20"
                          />
                          {isVerified && <CheckCircle size={20} className="absolute -top-1 -right-1 text-primary bg-background rounded-full" />}
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold border-2 border-primary/20">
                            {getInitials(pro.nome, pro.cognome)}
                          </div>
                          {isVerified && <CheckCircle size={20} className="absolute -top-1 -right-1 text-primary bg-background rounded-full" />}
                        </div>
                      )}
                      <div className="ml-4 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-foreground">{pro.nome} {pro.cognome}</h3>
                        </div>
                        <p className="text-sm text-primary font-medium uppercase">{pro.category.name}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center gap-1 mb-2">
                        {renderStars(Math.round(avg))}
                        <span className="ml-2 text-sm font-bold text-foreground">{avg.toFixed(1)}</span>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>Gentilezza: 4.5/5</div>
                        <div>Qualità/Prezzo: 4.2/5</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <Clock size={12} />
                      <span>Disponibile oggi</span>
                    </div>
                    
                    <button className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-medium hover:bg-primary/90 transition-colors">
                      Contatta ora
                    </button>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16 lg:py-20">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Stiamo selezionando i migliori professionisti per te.</h3>
              <p className="text-muted-foreground mb-8">Hai qualcuno da consigliare?</p>
              <a
                href="/advisor"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Aggiungi un Professionista
                <ArrowRight size={20} />
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
