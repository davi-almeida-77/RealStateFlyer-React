/**
 * NeighborhoodInfo.jsx
 * Slide up panel quando uma propriedade é selecionada.
 * Mostra skeleton enquanto GeoAPI não está integrada.
 * Estrutura pronta para receber dados reais.
 */

import { motion, AnimatePresence } from 'motion/react'
import { Train, Shield, Trees, Coffee, GraduationCap, Activity, X, MapPin } from 'lucide-react'

/* Skeleton data — substituir por GeoAPI depois */
const MOCK_DATA = {
  transit:    { score: 82, label: 'Excellent transit',  detail: 'Metro, Bus lines, Bike lanes' },
  safety:     { score: 91, label: 'Very safe area',     detail: 'Low crime index — top 10%' },
  nature:     { score: 74, label: 'Green area',         detail: '3 parks within 500m' },
  lifestyle:  { score: 88, label: 'Vibrant lifestyle',  detail: 'Restaurants, cafes, nightlife' },
  education:  { score: 79, label: 'Good schools',       detail: '5 schools within 1km' },
  health:     { score: 85, label: 'Healthcare nearby',  detail: 'Hospital 1.2km, Clinics 3' },
}

const CATEGORIES = [
  { key: 'transit',   Icon: Train,          label: 'Transit' },
  { key: 'safety',    Icon: Shield,         label: 'Safety' },
  { key: 'nature',    Icon: Trees,          label: 'Nature' },
  { key: 'lifestyle', Icon: Coffee,         label: 'Lifestyle' },
  { key: 'education', Icon: GraduationCap,  label: 'Education' },
  { key: 'health',    Icon: Activity,       label: 'Health' },
]

function ScoreBar({ score, color = 'rgba(255,255,255,0.9)' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{
        flex: 1, height: '3px', background: 'rgba(255,255,255,0.08)',
        borderRadius: '2px', overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: score + '%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ height: '100%', background: color, borderRadius: '2px' }}
        />
      </div>
      <span style={{
        fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px',
        color, minWidth: '32px', textAlign: 'right',
      }}>{score}</span>
    </div>
  )
}

function SkeletonBar() {
  return (
    <div style={{
      height: '3px', borderRadius: '2px',
      background: 'rgba(255,255,255,0.06)',
      overflow: 'hidden', position: 'relative',
    }}>
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
        }}
      />
    </div>
  )
}

export default function NeighborhoodInfo({ prop, onClose, loading = false }) {
  if (!prop) return null

  const scoreColor = (score) => {
    if (score >= 85) return 'rgba(120,220,120,0.9)'
    if (score >= 70) return 'rgba(255,220,80,0.9)'
    return 'rgba(255,120,80,0.9)'
  }

  return (
    <motion.div
      key={prop.id}
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'rgba(12,12,12,0.97)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px 16px 0 0',
        padding: '20px 20px 24px',
        zIndex: 50,
        maxHeight: '55%',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <MapPin size={11} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
            <span style={{
              fontFamily: 'Space Mono, monospace', fontSize: '9px',
              letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)',
            }}>
              {prop.city}, {prop.state}
            </span>
          </div>
          <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', color: 'white', lineHeight: 1 }}>
            WHY BUY HERE?
          </p>
        </div>

        {/* GeoAPI badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '4px 10px', borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.04)',
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: loading ? 'rgba(255,200,60,0.8)' : 'rgba(120,220,120,0.8)',
              animation: loading ? 'pulse 1s infinite' : 'none',
            }} />
            <span style={{
              fontFamily: 'Space Mono, monospace', fontSize: '8px',
              letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)',
            }}>
              {loading ? 'LOADING DATA...' : 'GEO DATA'}
            </span>
          </div>

          <button onClick={onClose} style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <X size={12} color="rgba(255,255,255,0.5)" />
          </button>
        </div>
      </div>

      {/* Score grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {CATEGORIES.map(({ key, Icon, label }) => {
          const data = MOCK_DATA[key]
          return (
            <div key={key} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px', padding: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px' }}>
                <Icon size={13} color="rgba(255,255,255,0.45)" strokeWidth={1.5} />
                <span style={{
                  fontFamily: 'Space Mono, monospace', fontSize: '9px',
                  letterSpacing: '0.1em', color: 'rgba(255,255,255,0.45)',
                }}>
                  {label.toUpperCase()}
                </span>
              </div>

              {loading ? (
                <>
                  <SkeletonBar />
                  <div style={{ height: '8px', width: '60%', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', marginTop: '8px' }} />
                </>
              ) : (
                <>
                  <ScoreBar score={data.score} color={scoreColor(data.score)} />
                  <p style={{
                    fontFamily: 'Space Mono, monospace', fontSize: '8px',
                    letterSpacing: '0.06em', color: 'rgba(255,255,255,0.3)',
                    marginTop: '6px', lineHeight: 1.5,
                  }}>
                    {data.detail}
                  </p>
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* GeoAPI placeholder note */}
      <div style={{
        marginTop: '14px', padding: '10px 14px',
        background: 'rgba(255,200,60,0.05)',
        border: '1px solid rgba(255,200,60,0.1)',
        borderRadius: '8px',
      }}>
        <p style={{
          fontFamily: 'Space Mono, monospace', fontSize: '8px',
          letterSpacing: '0.08em', color: 'rgba(255,200,60,0.5)',
          lineHeight: 1.6,
        }}>
          ⚡ SKELETON DATA — GeoAPI integration pending.
          Real transit, safety and lifestyle scores will be fetched live.
        </p>
      </div>

      <style>{`@keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }`}</style>
    </motion.div>
  )
}
