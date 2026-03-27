import { AnimatePresence } from 'motion/react'
import ListingCard from './ListingCard'

export default function ListingsGrid({ properties, selectedProp, onSelect, onViewProperty }) {
  if (!properties.length) return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'300px', gap:'12px' }}>
      <span style={{ fontSize:'32px' }}>🏚</span>
      <p style={{ fontFamily:'Space Mono,monospace', fontSize:'11px', letterSpacing:'0.15em', color:'rgba(255,255,255,0.3)' }}>
        NO PROPERTIES FOUND
      </p>
    </div>
  )

  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'14px', padding:'4px' }}>
      <AnimatePresence>
        {properties.map(prop => (
          <ListingCard
            key={prop.id}
            prop={prop}
            isSelected={selectedProp?.id === prop.id}
            onSelect={onSelect}
            onViewProperty={onViewProperty}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
