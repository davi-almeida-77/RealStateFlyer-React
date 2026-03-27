/**
 * ListingsFilters.jsx
 * Barra de filtros no topo da página, estilo da home.
 * Sticky — fica fixo ao scrollar.
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, ChevronDown, SlidersHorizontal, LayoutGrid, List, X } from 'lucide-react'

const PRICE_OPTIONS  = ['Any Price', 'Under $500K', '$500K–$1M', '$1M–$2M', '$2M+']
const BED_OPTIONS    = ['Any Beds', '1–2 Beds', '2–3 Beds', '3–5 Beds', '5+ Beds']
const TYPE_OPTIONS   = ['All Types', 'Villa', 'Penthouse', 'Estate', 'Loft', 'Suite']
const SORT_OPTIONS   = ['Newest', 'Price: Low–High', 'Price: High–Low', 'Most Popular']

function DropdownFilter({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const isActive = value !== options[0]

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '9px 16px', borderRadius: '100px', cursor: 'pointer',
          fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.08em',
          background: isActive ? 'white' : 'rgba(255,255,255,0.06)',
          color: isActive ? '#111' : 'rgba(255,255,255,0.7)',
          border: isActive ? '1px solid white' : '1px solid rgba(255,255,255,0.12)',
          transition: 'all 0.2s', whiteSpace: 'nowrap',
        }}
      >
        {value}
        <ChevronDown size={12} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute', top: '110%', left: 0, zIndex: 100,
              background: 'rgba(12,12,12,0.97)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
              overflow: 'hidden', minWidth: '160px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            }}
          >
            {options.map(opt => (
              <button key={opt} onClick={() => { onChange(opt); setOpen(false) }}
                style={{
                  display: 'block', width: '100%', padding: '10px 16px', textAlign: 'left',
                  fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.06em',
                  color: opt === value ? 'white' : 'rgba(255,255,255,0.5)',
                  background: opt === value ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.background = opt === value ? 'rgba(255,255,255,0.08)' : 'transparent'; e.currentTarget.style.color = opt === value ? 'white' : 'rgba(255,255,255,0.5)' }}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ListingsFilters({
  query, setQuery,
  price, setPrice,
  beds, setBeds,
  type, setType,
  sort, setSort,
  view, setView,
  total,
  pageType = 'sale',
}) {
  const hasFilters = price !== PRICE_OPTIONS[0] || beds !== BED_OPTIONS[0] || type !== TYPE_OPTIONS[0]

  return (
    <div style={{
      position: 'sticky', top: '64px', zIndex: 80,
      background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      padding: '12px clamp(16px,4vw,56px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>

        {/* Search */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <Search size={13} style={{
            position: 'absolute', left: '13px', top: '50%',
            transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none',
          }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by location..."
            style={{
              padding: '9px 16px 9px 36px', width: '220px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px',
              fontFamily: 'Space Mono, monospace', fontSize: '10px',
              letterSpacing: '0.06em', color: 'white', outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e  => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
            onBlur={e   => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
        </div>

        {/* Dropdown filters */}
        <DropdownFilter label="Price"  options={PRICE_OPTIONS} value={price} onChange={setPrice} />
        <DropdownFilter label="Beds"   options={BED_OPTIONS}   value={beds}  onChange={setBeds}  />
        <DropdownFilter label="Type"   options={TYPE_OPTIONS}  value={type}  onChange={setType}  />

        {/* More filters pill */}
        <button style={{
          display: 'flex', alignItems: 'center', gap: '7px',
          padding: '9px 16px', borderRadius: '100px', cursor: 'pointer',
          fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.08em',
          background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}>
          <SlidersHorizontal size={12} strokeWidth={1.5} />
          More Filters
        </button>

        {/* Clear filters */}
        {hasFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setPrice(PRICE_OPTIONS[0]); setBeds(BED_OPTIONS[0]); setType(TYPE_OPTIONS[0]); setQuery('') }}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 14px', borderRadius: '100px', cursor: 'pointer',
              fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.1em',
              color: 'rgba(255,100,100,0.75)', background: 'rgba(255,80,80,0.06)',
              border: '1px solid rgba(255,80,80,0.15)',
            }}
          >
            <X size={10} /> CLEAR
          </motion.button>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Result count */}
        <span style={{
          fontFamily: 'Space Mono, monospace', fontSize: '9px',
          letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)',
        }}>
          {total} PROPERTIES
        </span>

        {/* Sort */}
        <DropdownFilter label="Sort" options={SORT_OPTIONS} value={sort} onChange={setSort} />

        {/* View toggle */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', padding: '3px' }}>
          {[
            { v: 'grid', Icon: LayoutGrid },
            { v: 'list', Icon: List },
          ].map(({ v, Icon }) => (
            <button key={v} onClick={() => setView(v)} style={{
              width: '30px', height: '30px', borderRadius: '100px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: view === v ? 'white' : 'transparent',
              color: view === v ? '#111' : 'rgba(255,255,255,0.45)',
              border: 'none', cursor: 'pointer', transition: 'all 0.2s',
            }}>
              <Icon size={13} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
