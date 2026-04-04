import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingsFilters  from './ListingsFilters'
import ListingsGrid     from './ListingsGrid'
import ListingsMap      from './ListingsMap'
import NeighborhoodInfo from './NeighborhoodInfo'
import Navbar           from '@/components/layout/Navbar'
import Footer           from '@/components/layout/Footer'

export default function ListingsLayout({ pageType, title, subtitle, properties }) {
  const navigate = useNavigate()

  const [selected,         setSelected]        = useState(null)
  const [showNeighborhood, setShowNeighborhood] = useState(false)
  const [query,  setQuery]  = useState('')
  const [price,  setPrice]  = useState('Any Price')
  const [beds,   setBeds]   = useState('Any Beds')
  const [type,   setType]   = useState('All Types')
  const [view,   setView]   = useState('grid')

  const filtered = useMemo(() => properties.filter(p => {
    if (query) {
      const q = query.toLowerCase()
      if (!p.name.toLowerCase().includes(q) && !p.city.toLowerCase().includes(q)) return false
    }
    if (price === 'Under $500K'   && p.price >= 500000)                          return false
    if (price === '$500K\u20131M' && (p.price < 500000  || p.price >= 1000000)) return false
    if (price === '$1M\u20132M'   && (p.price < 1000000 || p.price >= 2000000)) return false
    if (price === '$2M+'          && p.price < 2000000)                          return false
    if (beds === '1\u20132 Beds' && (p.rooms < 1 || p.rooms > 2)) return false
    if (beds === '2\u20133 Beds' && (p.rooms < 2 || p.rooms > 3)) return false
    if (beds === '3\u20135 Beds' && (p.rooms < 3 || p.rooms > 5)) return false
    if (beds === '5+ Beds' && p.rooms < 5)                         return false
    if (type !== 'All Types' && p.type !== type) return false
    return true
  }), [properties, query, price, beds, type])

  // When selected changes: hide panel, wait for GTA animation, then show
  useEffect(() => {
    setShowNeighborhood(false)
    if (!selected) return
    const id = setTimeout(() => setShowNeighborhood(true), 2400)
    return () => clearTimeout(id)
  }, [selected])

  function handleSelect(prop) {
    if (selected?.id === prop.id) {
      setSelected(null)
      setTimeout(() => setSelected(prop), 0)
    } else {
      setSelected(prop)
    }
  }

  function handleViewProperty(id) {
    navigate('/property/' + id)
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ padding: 'clamp(72px,9vh,110px) clamp(16px,5vw,72px) clamp(16px,3vh,28px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.28)', marginBottom: '8px' }}>
          CITY ARCADE · {pageType === 'rent' ? 'FOR RENT' : 'FOR SALE'}
        </p>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(36px,5.5vw,80px)', lineHeight: 0.92, color: 'white', marginBottom: '10px' }}>
          {title} {subtitle}
        </h1>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.28)' }}>
          {filtered.length} properties · Click card to see on map · VIEW to open
        </p>
      </div>

      {/* Filters */}
      <ListingsFilters
        query={query} setQuery={setQuery} price={price} setPrice={setPrice}
        beds={beds} setBeds={setBeds} type={type} setType={setType}
        view={view} setView={setView} total={filtered.length}
      />

      {/* Split layout — map is STICKY (respects layout flow, no filter overlap) */}
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>

        {/* Grid */}
        <div style={{ flex: '1 1 58%', minWidth: 0, padding: 'clamp(14px,2vw,24px)', background: '#0a0a0a' }}>
          <ListingsGrid
            properties={filtered}
            selectedProp={selected}
            onSelect={handleSelect}
            onViewProperty={handleViewProperty}
          />
        </div>

        {/* Map — sticky so it starts BELOW filters, not overlapping them */}
        <div
          className="listings-map-panel"
          style={{
            flex: '0 0 42%',
            position: 'sticky',
            top: '64px',
            height: 'calc(100vh - 64px)',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
            background: '#080808',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: '12px', borderRadius: '12px', overflow: 'hidden' }}>
            <ListingsMap selectedProp={selected} allProps={filtered} />
          </div>
        </div>
      </div>

      <Footer />

      {/*
        NeighborhoodInfo — FIXED independently to true viewport bottom-right.
        Separate from map container so overflow:hidden doesn't clip the animation.
        Mounts only when showNeighborhood=true (after 2400ms GTA animation).
        @keyframes slideUpPanel drives the entrance animation.
      */}
      {showNeighborhood && selected && (
        <div
          className="listings-neighborhood-panel"
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: '42%',
            zIndex: 30,
            padding: '0 12px 12px 12px',
            animation: 'slideUpPanel 0.5s cubic-bezier(0.16,1,0.3,1) both',
          }}
        >
          <NeighborhoodInfo
            prop={selected}
            onClose={() => setShowNeighborhood(false)}
          />
        </div>
      )}

      <style>{`
        @keyframes slideUpPanel {
          from { transform: translateY(100%); }
          to   { transform: translateY(0%);   }
        }
        @media (max-width: 768px) {
          .listings-map-panel         { display: none !important; }
          .listings-neighborhood-panel { display: none !important; }
        }
      `}</style>
    </div>
  )
}
