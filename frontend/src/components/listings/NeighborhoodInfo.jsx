import { motion } from 'motion/react'
import { Train, Shield, Trees, Coffee, GraduationCap, Activity, X, MapPin } from 'lucide-react'

const MOCK_DATA = {
  transit:   { score: 82, detail: 'Metro, Bus lines, Bike lanes' },
  safety:    { score: 91, detail: 'Low crime index — top 10%' },
  nature:    { score: 74, detail: '3 parks within 500m' },
  lifestyle: { score: 88, detail: 'Restaurants, cafes, nightlife' },
  education: { score: 79, detail: '5 schools within 1km' },
  health:    { score: 85, detail: 'Hospital 1.2km, Clinics 3' },
}

const CATEGORIES = [
  { key: 'transit',   Icon: Train,         label: 'TRANSIT'   },
  { key: 'safety',    Icon: Shield,        label: 'SAFETY'    },
  { key: 'nature',    Icon: Trees,         label: 'NATURE'    },
  { key: 'lifestyle', Icon: Coffee,        label: 'LIFESTYLE' },
  { key: 'education', Icon: GraduationCap, label: 'EDUCATION' },
  { key: 'health',    Icon: Activity,      label: 'HEALTH'    },
]

function scoreColor(s) {
  if (s >= 85) return 'rgba(120,220,120,0.9)'
  if (s >= 70) return 'rgba(255,220,80,0.9)'
  return 'rgba(255,120,80,0.9)'
}

// No show prop — parent mounts/unmounts this component.
// CSS keyframe on parent handles slide-up.
export default function NeighborhoodInfo({ prop, onClose }) {
  if (!prop) return null

  return (
    <div style={{
      background:     'rgba(12,12,12,0.97)',
      backdropFilter: 'blur(20px)',
      borderTop:      '1px solid rgba(255,255,255,0.1)',
      borderRadius:   '16px 16px 0 0',
      padding:        '20px 20px 24px',
      maxHeight:      'calc(100vh - 120px)',
      overflowY:      'auto',
    }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'16px' }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'4px' }}>
            <MapPin size={11} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
            <span style={{ fontFamily:'Space Mono,monospace', fontSize:'9px', letterSpacing:'0.15em', color:'rgba(255,255,255,0.4)' }}>
              {prop.city}, {prop.state}
            </span>
          </div>
          <p style={{ fontFamily:'Bebas Neue,sans-serif', fontSize:'20px', color:'white', lineHeight:1 }}>
            WHY BUY HERE?
          </p>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'6px', padding:'4px 10px', borderRadius:'100px', border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.04)' }}>
            <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'rgba(120,220,120,0.8)' }} />
            <span style={{ fontFamily:'Space Mono,monospace', fontSize:'8px', letterSpacing:'0.1em', color:'rgba(255,255,255,0.35)' }}>GEO DATA</span>
          </div>
          <button onClick={onClose} style={{ width:'28px', height:'28px', borderRadius:'50%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <X size={12} color="rgba(255,255,255,0.5)" />
          </button>
        </div>
      </div>

      {/* Score grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
        {CATEGORIES.map(({ key, Icon, label }) => {
          const { score, detail } = MOCK_DATA[key]
          const color = scoreColor(score)
          return (
            <div key={key} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'10px', padding:'12px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'7px', marginBottom:'8px' }}>
                <Icon size={13} color="rgba(255,255,255,0.45)" strokeWidth={1.5} />
                <span style={{ fontFamily:'Space Mono,monospace', fontSize:'9px', letterSpacing:'0.1em', color:'rgba(255,255,255,0.45)' }}>{label}</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <div style={{ flex:1, height:'3px', background:'rgba(255,255,255,0.08)', borderRadius:'2px', overflow:'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: score + '%' }}
                    transition={{ duration: 0.8, ease:[0.16,1,0.3,1], delay: 0.2 }}
                    style={{ height:'100%', background: color, borderRadius:'2px' }}
                  />
                </div>
                <span style={{ fontFamily:'Bebas Neue,sans-serif', fontSize:'16px', color, minWidth:'32px', textAlign:'right' }}>{score}</span>
              </div>
              <p style={{ fontFamily:'Space Mono,monospace', fontSize:'8px', letterSpacing:'0.06em', color:'rgba(255,255,255,0.3)', marginTop:'6px', lineHeight:1.5 }}>
                {detail}
              </p>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop:'14px', padding:'10px 14px', background:'rgba(255,200,60,0.05)', border:'1px solid rgba(255,200,60,0.1)', borderRadius:'8px' }}>
        <p style={{ fontFamily:'Space Mono,monospace', fontSize:'8px', letterSpacing:'0.08em', color:'rgba(255,200,60,0.5)', lineHeight:1.6 }}>
          SKELETON DATA — GeoAPI integration pending. Real scores will be fetched live.
        </p>
      </div>
    </div>
  )
}
