import { useState } from 'react'
import { motion } from 'motion/react'
import { MapPin, BedDouble, Bath, Heart, ExternalLink } from 'lucide-react'

const fmt = (n) => '$' + Number(n).toLocaleString('en-US')

export default function ListingCard({ prop, isSelected, onSelect, onViewProperty }) {
  const [liked,   setLiked]   = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(prop)}
      style={{
        background:   isSelected ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.04)',
        border:       isSelected
          ? '1px solid rgba(255,255,255,0.35)'
          : hovered ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        overflow:     'hidden',
        cursor:       'pointer',
        transform:    hovered && !isSelected ? 'translateY(-3px)' : 'translateY(0)',
        transition:   'border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s',
        boxShadow:    isSelected ? '0 0 0 1px rgba(255,255,255,0.15), 0 16px 40px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img src={prop.img} alt={prop.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.5s ease',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)', pointerEvents:'none' }} />

        {/* Price */}
        <div style={{ position:'absolute', bottom:'12px', left:'12px', background:'rgba(10,10,10,0.85)', backdropFilter:'blur(8px)', borderRadius:'8px', padding:'5px 10px', fontFamily:'Bebas Neue,sans-serif', fontSize:'15px', color:'white', letterSpacing:'0.05em', border:'1px solid rgba(255,255,255,0.1)', pointerEvents:'none' }}>
          {fmt(prop.price)}
        </div>

        {/* Tag */}
        <div style={{ position:'absolute', top:'12px', left:'12px', fontFamily:'Space Mono,monospace', fontSize:'9px', letterSpacing:'0.12em', padding:'4px 10px', borderRadius:'100px', background: prop.tag === 'FOR RENT' ? 'rgba(100,160,255,0.2)' : 'rgba(255,255,255,0.12)', border: prop.tag === 'FOR RENT' ? '1px solid rgba(100,160,255,0.35)' : '1px solid rgba(255,255,255,0.2)', color: prop.tag === 'FOR RENT' ? 'rgba(160,210,255,0.9)' : 'rgba(255,255,255,0.85)', backdropFilter:'blur(8px)', pointerEvents:'none' }}>
          {prop.tag}
        </div>

        {/* Like */}
        <button onClick={e => { e.stopPropagation(); setLiked(v => !v) }}
          style={{ position:'absolute', top:'10px', right:'10px', width:'32px', height:'32px', borderRadius:'50%', background:'rgba(10,10,10,0.7)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
          <Heart size={13} fill={liked ? 'rgba(255,80,80,0.9)' : 'none'} color={liked ? 'rgba(255,80,80,0.9)' : 'rgba(255,255,255,0.6)'} />
        </button>

        {isSelected && <div style={{ position:'absolute', inset:0, border:'2px solid rgba(255,255,255,0.4)', pointerEvents:'none' }} />}
      </div>

      {/* Info */}
      <div style={{ padding:'14px 16px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'5px', marginBottom:'5px' }}>
          <MapPin size={10} color="rgba(255,255,255,0.35)" strokeWidth={1.5} />
          <span style={{ fontFamily:'Space Mono,monospace', fontSize:'9px', letterSpacing:'0.1em', color:'rgba(255,255,255,0.35)' }}>
            {prop.city}, {prop.state}
          </span>
        </div>

        <p style={{ fontFamily:'Bebas Neue,sans-serif', fontSize:'19px', color:'white', lineHeight:1.1, marginBottom:'10px' }}>
          {prop.name}
        </p>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'8px' }}>
          <div style={{ display:'flex', gap:'8px' }}>
            {[{ Icon: BedDouble, val: prop.rooms + ' BD' }, { Icon: Bath, val: prop.baths + ' BA' }].map(({ Icon, val }) => (
              <span key={val} style={{ display:'flex', alignItems:'center', gap:'4px', fontFamily:'Space Mono,monospace', fontSize:'9px', letterSpacing:'0.06em', color:'rgba(255,255,255,0.4)' }}>
                <Icon size={11} strokeWidth={1.5} color="rgba(255,255,255,0.35)" /> {val}
              </span>
            ))}
          </div>

          {/* VIEW — only this navigates */}
          <button
            onClick={e => { e.stopPropagation(); onViewProperty(prop.id) }}
            style={{ display:'flex', alignItems:'center', gap:'5px', fontFamily:'Space Mono,monospace', fontSize:'9px', letterSpacing:'0.08em', color:'rgba(255,255,255,0.5)', background:'transparent', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'100px', padding:'5px 12px', cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.3)'; e.currentTarget.style.color='white' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='rgba(255,255,255,0.5)' }}
          >
            <ExternalLink size={10} strokeWidth={1.5} /> VIEW
          </button>
        </div>
      </div>
    </motion.div>
  )
}
