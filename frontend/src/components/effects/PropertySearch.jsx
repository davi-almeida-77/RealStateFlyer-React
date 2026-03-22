/**
 * PropertySearch.jsx
 * Dark property search & filter UI inspired by the Horizon Grove design.
 * Features: room filter, price range, area range, tag filters, property cards with floor plans.
 */

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, SlidersHorizontal, LayoutGrid, List, MapPin, BedDouble, Bath, Maximize, ArrowRight, ChevronDown } from 'lucide-react'

/* ── Mock property data ── */
const PROPERTIES = [
  {
    id: 'p1', name: 'Hamida Villa', city: 'Las Vegas', state: 'NV',
    type: 'Villa', rooms: 5, baths: 6, area: 745, price: 1836000, pricePerSqm: 2465,
    floor: 3, tag: 'FOR SALE', features: ['Balcony', 'Terrace', 'Wardrobe'],
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=90',
    plan: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&q=80',
  },
  {
    id: 'p2', name: 'Manabey Estate', city: 'Beverly Hills', state: 'CA',
    type: 'Estate', rooms: 5, baths: 6, area: 680, price: 300000, pricePerSqm: 441,
    floor: 2, tag: 'FOR SALE', features: ['Balcony', 'Renovated'],
    img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=90',
    plan: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&q=80',
  },
  {
    id: 'p3', name: 'Horizon Suite', city: 'Miami', state: 'FL',
    type: 'Suite', rooms: 3, baths: 4, area: 297, price: 800000, pricePerSqm: 2694,
    floor: 12, tag: 'FOR RENT', features: ['Balcony', '2+ bathrooms'],
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=90',
    plan: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&q=80',
  },
  {
    id: 'p4', name: 'Crystal Penthouse', city: 'New York', state: 'NY',
    type: 'Penthouse', rooms: 5, baths: 5, area: 632, price: 4200000, pricePerSqm: 6646,
    floor: 42, tag: 'FOR SALE', features: ['Penthouse', 'Terrace', '2+ bathrooms'],
    img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=90',
    plan: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&q=80',
  },
  {
    id: 'p5', name: 'Spotlek Grove', city: 'Scottsdale', state: 'AZ',
    type: 'Villa', rooms: 6, baths: 7, area: 855, price: 2100000, pricePerSqm: 2456,
    floor: 1, tag: 'FOR SALE', features: ['Terrace', 'Wardrobe', 'Renovated'],
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=90',
    plan: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&q=80',
  },
  {
    id: 'p6', name: 'Azure Residence', city: 'San Diego', state: 'CA',
    type: 'Residence', rooms: 4, baths: 4, area: 418, price: 1350000, pricePerSqm: 3229,
    floor: 7, tag: 'FOR RENT', features: ['Balcony', 'Installment'],
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=90',
    plan: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&q=80',
  },
  {
    id: 'p7', name: 'Pearl Manor', city: 'Naples', state: 'FL',
    type: 'Manor', rooms: 7, baths: 8, area: 1115, price: 4500000, pricePerSqm: 4036,
    floor: 2, tag: 'FOR SALE', features: ['Terrace', 'Wardrobe', 'Balcony'],
    img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=90',
    plan: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&q=80',
  },
  {
    id: 'p8', name: 'Vega Loft', city: 'Chicago', state: 'IL',
    type: 'Loft', rooms: 2, baths: 2, area: 167, price: 580000, pricePerSqm: 3473,
    floor: 18, tag: 'FOR RENT', features: ['Renovated', '2+ bathrooms'],
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=90',
    plan: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&q=80',
  },
]

const ALL_FEATURES = ['Penthouse', 'Terrace', 'Balcony', 'Renovated', '2+ bathrooms', 'Installment', 'Wardrobe']
const ROOM_OPTIONS = ['All', '2', '3', '4', '5', '6+']

const fmt = (n) => '$' + n.toLocaleString('en-US')
const fmtM2 = (n) => n + ' m²'

/* ── Range Slider ── */
function RangeSlider({ label, min, max, value, onChange, format }) {
  const pctLow  = ((value[0] - min) / (max - min)) * 100
  const pctHigh = ((value[1] - min) / (max - min)) * 100

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
          {label}
        </span>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>
          {format(value[0])} — {format(value[1])}
        </span>
      </div>
      <div style={{ position: 'relative', height: '20px', display: 'flex', alignItems: 'center' }}>
        {/* Track */}
        <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.12)', borderRadius: '2px' }} />
        {/* Active range */}
        <div style={{
          position: 'absolute',
          left: pctLow + '%',
          width: (pctHigh - pctLow) + '%',
          height: '2px',
          background: 'white',
          borderRadius: '2px',
        }} />
        {/* Low thumb */}
        <input type="range" min={min} max={max} value={value[0]}
          onChange={e => onChange([+e.target.value, value[1]])}
          style={{ position: 'absolute', width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, height: '20px' }} />
        <div style={{
          position: 'absolute',
          left: 'calc(' + pctLow + '% - 6px)',
          width: '12px', height: '12px',
          background: 'white', borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.3)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />
        {/* High thumb */}
        <input type="range" min={min} max={max} value={value[1]}
          onChange={e => onChange([value[0], +e.target.value])}
          style={{ position: 'absolute', width: '100%', opacity: 0, cursor: 'pointer', zIndex: 3, height: '20px' }} />
        <div style={{
          position: 'absolute',
          left: 'calc(' + pctHigh + '% - 6px)',
          width: '12px', height: '12px',
          background: 'white', borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.3)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />
      </div>
    </div>
  )
}

/* ── Property Card ── */
function PropertyCard({ prop, view }) {
  const [hovered, setHovered] = useState(false)

  if (view === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="flex items-center gap-5 p-4 rounded-xl transition-all duration-200"
        style={{
          background: hovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
          <img src={prop.img} alt={prop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', color: 'white', marginBottom: '2px' }}>{prop.name}</p>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{prop.city}, {prop.state}</p>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>{prop.rooms} BR · {prop.area} m²</span>
          <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', color: 'white' }}>{fmt(prop.price)}</span>
          <span style={{
            fontFamily: 'Space Mono, monospace', fontSize: '9px', padding: '4px 10px',
            borderRadius: '100px', border: '1px solid rgba(255,255,255,0.15)',
            color: prop.tag === 'FOR RENT' ? 'rgba(160,210,255,0.8)' : 'rgba(255,255,255,0.65)',
          }}>{prop.tag}</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: hovered ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.2s, transform 0.2s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img src={prop.img} alt={prop.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
        }} />
        {/* Tags */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          <span style={{
            fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.1em',
            padding: '4px 10px', borderRadius: '100px',
            background: prop.tag === 'FOR RENT' ? 'rgba(100,160,255,0.2)' : 'rgba(255,255,255,0.12)',
            border: prop.tag === 'FOR RENT' ? '1px solid rgba(100,160,255,0.3)' : '1px solid rgba(255,255,255,0.2)',
            color: prop.tag === 'FOR RENT' ? 'rgba(160,210,255,0.9)' : 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(8px)',
          }}>{prop.tag}</span>
          {prop.features[0] && (
            <span style={{
              fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.08em',
              padding: '4px 10px', borderRadius: '100px',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)',
            }}>{prop.features[0]}</span>
          )}
        </div>
        {/* Floor */}
        <div style={{
          position: 'absolute', bottom: '10px', right: '12px',
          fontFamily: 'Space Mono, monospace', fontSize: '9px',
          color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em',
        }}>
          FL {prop.floor}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '16px' }}>
        <p style={{
          fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.35)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          📍 {prop.city}, {prop.state}
        </p>
        <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', color: 'white', marginBottom: '10px', lineHeight: 1.1 }}>
          {prop.name}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
          {[
            { label: prop.rooms + ' BR', icon: '🛏' },
            { label: prop.area + ' m²', icon: '📐' },
            { label: prop.baths + ' BA', icon: '🚿' },
          ].map(({ label, icon }) => (
            <span key={label} style={{
              fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.08em',
              padding: '3px 10px', borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)',
            }}>{label}</span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', color: 'white', lineHeight: 1 }}>
              {fmt(prop.price)}
            </p>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>
              {fmt(prop.pricePerSqm)} /m²
            </p>
          </div>
          <a href="#" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.5)',
            padding: '8px 16px', borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.12)',
            textDecoration: 'none', transition: 'all 0.2s',
          }}>
            VIEW →
          </a>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main Component ── */
export default function PropertySearch() {
  const [rooms,    setRooms]    = useState('All')
  const [price,    setPrice]    = useState([200000, 5000000])
  const [area,     setArea]     = useState([50, 1200])
  const [tags,     setTags]     = useState([])
  const [view,     setView]     = useState('cards')
  const [query,    setQuery]    = useState('')
  const [showAll,  setShowAll]  = useState(false)

  const toggleTag = (tag) => setTags(t => t.includes(tag) ? t.filter(x => x !== tag) : [...t, tag])

  const filtered = useMemo(() => {
    return PROPERTIES.filter(p => {
      if (rooms !== 'All') {
        if (rooms === '6+') { if (p.rooms < 6) return false }
        else { if (p.rooms !== +rooms) return false }
      }
      if (p.price < price[0] || p.price > price[1]) return false
      if (p.area  < area[0]  || p.area  > area[1])  return false
      if (tags.length > 0 && !tags.some(t => p.features.includes(t))) return false
      if (query) {
        const q = query.toLowerCase()
        if (!p.name.toLowerCase().includes(q) && !p.city.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [rooms, price, area, tags, query])

  const displayed = showAll ? filtered : filtered.slice(0, 6)

  return (
    <section style={{ background: '#0a0a0a', padding: 'clamp(60px, 7vw, 100px) clamp(24px, 5vw, 80px)' }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: '48px' }}>
        <p style={{
          fontFamily: 'Space Mono, monospace', fontSize: '10px',
          letterSpacing: '0.25em', color: 'rgba(255,255,255,0.25)',
          marginBottom: '16px',
        }}>
          03 | SEARCH PROPERTIES
        </p>
        <h2 style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 'clamp(44px, 6.5vw, 96px)',
          lineHeight: 0.9,
          color: 'white',
          marginBottom: '6px',
        }}>
          LET YOUR SPACE
          <br />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '16px' }}>
            FIND YOU
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '14px', height: '14px', borderRadius: '50%',
                background: 'rgba(255,200,60,0.9)',
                boxShadow: '0 0 20px rgba(255,200,60,0.5)',
                display: 'inline-block',
              }} />
              <span style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(14px, 1.5vw, 20px)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.02em',
                lineHeight: 1.3,
              }}>
                and bring<br />you peace
              </span>
            </span>
          </span>
        </h2>
      </div>

      {/* ── Filter Panel ── */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '28px',
      }}>
        {/* Row 1: search + rooms + ranges + popular */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr 1fr auto', gap: '24px', alignItems: 'end', marginBottom: '20px', flexWrap: 'wrap' }}>

          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={12} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search city or property..."
              style={{
                width: '100%', padding: '10px 12px 10px 32px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontFamily: 'Space Mono, monospace', fontSize: '10px',
                color: 'white', outline: 'none',
                letterSpacing: '0.06em',
              }}
            />
          </div>

          {/* Rooms */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)' }}>ROOMS</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {ROOM_OPTIONS.map(r => (
                <button key={r} onClick={() => setRooms(r)} style={{
                  padding: '6px 12px', borderRadius: '8px', cursor: 'pointer',
                  fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.06em',
                  background: rooms === r ? 'white' : 'rgba(255,255,255,0.05)',
                  color: rooms === r ? '#111' : 'rgba(255,255,255,0.5)',
                  border: rooms === r ? '1px solid white' : '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.15s',
                }}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Price range */}
          <RangeSlider label="PRICE IN $" min={100000} max={5000000}
            value={price} onChange={setPrice} format={n => '$' + (n/1000).toFixed(0) + 'K'} />

          {/* Area range */}
          <RangeSlider label="AREA M²" min={50} max={1200}
            value={area} onChange={setArea} format={n => n + ' m²'} />

          {/* View toggle + popular */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)' }}>
              POPULAR
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['2-BR', 'Balcony'].map(tag => (
                <button key={tag} onClick={() => toggleTag(tag === '2-BR' ? 'Balcony' : tag)} style={{
                  padding: '6px 12px', borderRadius: '8px', cursor: 'pointer',
                  fontFamily: 'Space Mono, monospace', fontSize: '9px',
                  background: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}>{tag}</button>
              ))}
              <button onClick={() => setView('cards')} style={{
                padding: '6px 10px', borderRadius: '8px', cursor: 'pointer',
                background: view === 'cards' ? 'white' : 'rgba(255,255,255,0.05)',
                color: view === 'cards' ? '#111' : 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <LayoutGrid size={12} />
              </button>
              <button onClick={() => setView('list')} style={{
                padding: '6px 10px', borderRadius: '8px', cursor: 'pointer',
                background: view === 'list' ? 'white' : 'rgba(255,255,255,0.05)',
                color: view === 'list' ? '#111' : 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <List size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: feature tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginRight: '4px' }}>
            FILTERS:
          </span>
          {ALL_FEATURES.map(tag => (
            <button key={tag} onClick={() => toggleTag(tag)} style={{
              padding: '5px 14px', borderRadius: '100px', cursor: 'pointer',
              fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.08em',
              background: tags.includes(tag) ? 'rgba(255,255,255,0.15)' : 'transparent',
              color: tags.includes(tag) ? 'white' : 'rgba(255,255,255,0.45)',
              border: tags.includes(tag) ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.15s',
            }}>
              {tag}
            </button>
          ))}
          {(tags.length > 0 || query) && (
            <button onClick={() => { setTags([]); setQuery('') }} style={{
              padding: '5px 14px', borderRadius: '100px', cursor: 'pointer',
              fontFamily: 'Space Mono, monospace', fontSize: '9px',
              color: 'rgba(255,100,100,0.7)', border: '1px solid rgba(255,100,100,0.2)',
              background: 'transparent',
            }}>
              CLEAR ×
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)' }}>
          [ Found <span style={{ color: 'white' }}>{filtered.length}</span> Results ]
        </p>
        <a href="#" style={{
          fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          View All Floor Plans →
        </a>
      </div>

      {/* Cards / List */}
      <AnimatePresence mode="popLayout">
        {view === 'cards' ? (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}
          >
            {displayed.map(p => <PropertyCard key={p.id} prop={p} view="cards" />)}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            {displayed.map(p => <PropertyCard key={p.id} prop={p} view="list" />)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show more / less */}
      {filtered.length > 6 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
          <button
            onClick={() => setShowAll(v => !v)}
            style={{
              fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.5)', background: 'transparent',
              padding: '12px 32px', borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
          >
            {showAll ? 'SHOW LESS ↑' : 'SHOW ALL ' + filtered.length + ' PROPERTIES ↓'}
          </button>
        </div>
      )}

    </section>
  )
}
