import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'motion/react'
import Navbar             from '@/components/layout/Navbar'
import Footer             from '@/components/layout/Footer'
import HeroSection        from '@/components/sections/HeroSection'
import PropertyDetails    from '@/components/sections/PropertyDetails'
import InteriorSection    from '@/components/sections/InteriorSection'
import ExteriorSection    from '@/components/sections/ExteriorSection'
import LocationAdvantages from '@/components/sections/LocationAdvantages'
import FeaturedProperties from '@/components/sections/FeaturedProperties'
import { HAMIDA_VILLA, FEATURED_PROPERTIES } from '@/data/property'

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export default function PropertyPage() {
  const { id = 'hamida-villa' } = useParams()
  const [property, setProperty] = useState(null)
  const [featured, setFeatured] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    Promise.all([
      axios.get(`${API}/api/properties/${id}`).catch(() => null),
      axios.get(`${API}/api/properties/featured`).catch(() => null),
    ]).then(([propRes, featRes]) => {
      if (!active) return
      setProperty(propRes?.data?.data ?? HAMIDA_VILLA)
      setFeatured(featRes?.data?.data ?? FEATURED_PROPERTIES)
    }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <motion.div className="flex flex-col items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="w-9 h-9 rounded-full border border-dark border-t-transparent" animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }} />
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted">LOADING</p>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <Navbar />
      <main>
        <HeroSection        property={property} />
        <PropertyDetails    property={property} />
        <InteriorSection    property={property} />
        <ExteriorSection    property={property} />
        <LocationAdvantages property={property} />
        <FeaturedProperties properties={featured.filter(p => p.id !== id)} />
      </main>
      <Footer />
    </motion.div>
  )
}
