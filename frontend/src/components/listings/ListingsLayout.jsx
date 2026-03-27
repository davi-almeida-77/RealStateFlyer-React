import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import ListingsFilters  from './ListingsFilters'
import ListingsGrid     from './ListingsGrid'
import ListingsMap      from './ListingsMap'
import NeighborhoodInfo from './NeighborhoodInfo'
import Navbar           from '@/components/layout/Navbar'
import Footer           from '@/components/layout/Footer'
import { FadeUp }       from '@/components/ui/AnimatedText'

export default function ListingsLayout({ pageType, title, subtitle, properties }) {
  const navigate = useNavigate()

  const [selected,         setSelected]        = useState(null)
  const [query,            setQuery]           = useState('')
  const [price,            setPrice]           = useState('Any Price')
  const [beds,             setBeds]            = useState('Any Beds')
  const [type,             setType]            = useState('All Types')
  const [sort,             setSort]            = useState('Newest')
  const [view,             setView]            = useState('grid')
  const [showNeighborhood, setShowNeighborhood] = useState(false)

  const filtered = useMemo(() => {
    return properties.filter(p => {
      if (query) {
        const q = query.toLowerCase()
        if (!p.name.toLowerCase().includes(q) && !p.city.toLowerCase().includes(q)) return false
      }
      if (price !== 'Any Price') {
        if (price === 'Under $500K'  && p.price >= 500000)                         return false
        if (price === '$500K–$1M'    && (p.price < 500000  || p.price >= 1000000)) return false
        if (price === '$1M–$2M'      && (p.price < 1000000 || p.price >= 2000000)) return false
        if (price === '$2M+'         && p.price < 2000000)                         return false
      }
      if (beds !== 'Any Beds') {
        if (beds === '1–2 Beds' && (p.rooms < 1 || p.rooms > 2)) return false
        if (beds === '2–3 Beds' && (p.rooms < 2 || p.rooms > 3)) return false
        if (beds === '3–5 Beds' && (p.rooms < 3 || p.rooms > 5)) return false
        if (beds === '5+ Beds'  && p.rooms < 5)                   return false
      }
      if (type !== 'All Types' && p.type !== type) return false
      return true
    })
  }, [properties, query, price, beds, type])

  // Card body click → select for map animation only (stay on page)
  function handleCardClick(prop) {
    setSelected(prop)
    setShowNeighborhood(true)
  }

  // VIEW button → navigate directly, no modal
  function handleViewProperty(id) {
    navigate('/property/' + id)
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ padding:'clamp(72px,9vh,110px) clamp(16px,5vw,72px) clamp(16px,3vh,28px)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <FadeUp>
          <p style={{ fontFamily:'Space Mono,monospace', fontSize:'10px', letterSpacing:'0.25em', color:'rgba(255,255,255,0.28)', marginBottom:'8px' }}>
            CITY ARCADE  {pageType === 'rent' ? 'FOR RENT' : 'FOR SALE'}
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1 style={{ fontFamily:'Bebas Neue,sans-serif', fontSize:'clamp(36px,5.5vw,80px)', lineHeight:0.92, color:'white', marginBottom:'10px' }}>
            {title} {subtitle}
          </h1>
        </FadeUp>
        <FadeUp delay={0.14}>
          <div style={{ display:'flex', alignItems:'center', gap:'14px', flexWrap:'wrap' }}>
            <p style={{ fontFamily:'Space Mono,monospace', fontSize:'10px', letterSpacing:'0.08em', color:'rgba(255,255,255,0.28)' }}>
              {filtered.length} properties
            </p>
            <div style={{ width:'1px', height:'10px', background:'rgba(255,255,255,0.1)' }} />
            <p style={{ fontFamily:'Space Mono,monospace', fontSize:'10px', letterSpacing:'0.08em', color:'rgba(255,255,255,0.28)' }}>
              Click card to locate on map  VIEW to open property
            </p>
          </div>
        </FadeUp>
      </div>

      {/* Filters */}
      <ListingsFilters
        query={query} setQuery={setQuery}
        price={price} setPrice={setPrice}
        beds={beds}   setBeds={setBeds}
        type={type}   setType={setType}
        sort={sort}   setSort={setSort}
        view={view}   setView={setView}
        total={filtered.length}
        pageType={pageType}
      />

      {/* Split */}
      <div style={{ display:'flex', alignItems:'flex-start', minHeight:'60vh' }}>

        {/* Grid */}
        <div style={{ flex:'1 1 58%', minWidth:'0', padding:'clamp(14px,2vw,24px)', background:'#0a0a0a' }}>
          {view === 'grid' ? (
            <ListingsGrid
              properties={filtered}
              selectedProp={selected}
              onSelect={handleCardClick}
              onViewProperty={handleViewProperty}
            />
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              <AnimatePresence>
                {filtered.map(prop => (
                  <motion.div key={prop.id}
                    initial={{ opacity:0, x:-14 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0 }}
                    onClick={() => handleCardClick(prop)}
                    style={{
                      display:'flex', gap:'14px', padding:'14px',
                      background: selected?.id === prop.id ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                      border: selected?.id === prop.id ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.07)',
                      borderRadius:'12px', cursor:'pointer', transition:'all 0.2s',
                    }}>
                    <img src={prop.img} alt={prop.name} style={{ width:'88px', height:'68px', borderRadius:'8px', objectFit:'cover', flexShrink:0 }} />
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontFamily:'Space Mono,monospace', fontSize:'9px', letterSpacing:'0.1em', color:'rgba(255,255,255,0.35)', marginBottom:'4px' }}>
                        {prop.city}, {prop.state}
                      </p>
                      <p style={{ fontFamily:'Bebas Neue,sans-serif', fontSize:'17px', color:'white', lineHeight:1.1, marginBottom:'4px' }}>{prop.name}</p>
                      <p style={{ fontFamily:'Space Mono,monospace', fontSize:'9px', color:'rgba(255,255,255,0.38)' }}>{prop.rooms} BR  {prop.baths} BA  {prop.area} m2</p>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'space-between', flexShrink:0 }}>
                      <span style={{ fontFamily:'Space Mono,monospace', fontSize:'9px', padding:'3px 8px', borderRadius:'100px', border:'1px solid rgba(255,255,255,0.12)', color: prop.tag === 'FOR RENT' ? 'rgba(160,210,255,0.8)' : 'rgba(255,255,255,0.6)' }}>
                        {prop.tag}
                      </span>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'4px' }}>
                        <p style={{ fontFamily:'Bebas Neue,sans-serif', fontSize:'19px', color:'white' }}>${Number(prop.price).toLocaleString()}</p>
                        <button onClick={e => { e.stopPropagation(); handleViewProperty(prop.id) }}
                          style={{ fontFamily:'Space Mono,monospace', fontSize:'9px', letterSpacing:'0.08em', color:'rgba(255,255,255,0.45)', background:'transparent', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'100px', padding:'4px 10px', cursor:'pointer' }}>
                          VIEW
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Map sticky */}
        <div className="listings-map-panel" style={{ flex:'0 0 42%', position:'sticky', top:'64px', height:'calc(100vh - 64px)', borderLeft:'1px solid rgba(255,255,255,0.06)', background:'#080808', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:'12px' }}>
            <ListingsMap selectedProp={selected} allProps={filtered} />
            <AnimatePresence>
              {showNeighborhood && selected && (
                <NeighborhoodInfo
                  prop={selected}
                  onClose={() => setShowNeighborhood(false)}
                  onViewProperty={handleViewProperty}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile map */}
      <div className="listings-map-mobile" style={{ display:'none', height:'60vw', minHeight:'260px', maxHeight:'400px', position:'relative', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ position:'absolute', inset:'12px' }}>
          <ListingsMap selectedProp={selected} allProps={filtered} />
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .listings-map-panel  { display: none !important; }
          .listings-map-mobile { display: block !important; }
        }
      `}</style>
    </div>
  )
}
