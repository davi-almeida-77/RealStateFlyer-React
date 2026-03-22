import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react'

export default function SlidingContactPanel() {
  const containerRef = useRef(null)
  const [onRight, setOnRight] = useState(false)
  const [sent,    setSent]    = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      setOnRight(e.clientX < window.innerWidth / 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-dark">
      <Background onRight={onRight} />

      <motion.div
        className="absolute top-0 h-full w-1/2 bg-bg z-10 flex flex-col justify-center px-10 md:px-14"
        animate={{ x: onRight ? '100%' : '0%' }}
        transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 1 }}
      >
        <div className="mb-10">
          <p className="font-mono text-[10px] tracking-[0.25em] text-muted mb-2">CITY ARCADE</p>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-none text-dark">
            GET IN<br />TOUCH
          </h2>
          <div className="w-12 h-px bg-dark mt-4" />
        </div>

        <div className="flex flex-col gap-3 mb-10">
          {[
            { Icon: MapPin, text: 'C-67/3, Savar, Dhaka, Bangladesh' },
            { Icon: Mail,   text: 'hamidajannat20@gmail.com' },
            { Icon: Phone,  text: '+880 161-687-6080' },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-dark/20 flex items-center justify-center flex-shrink-0">
                <Icon size={12} strokeWidth={1.5} className="text-muted" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.08em] text-muted">{text}</span>
            </div>
          ))}
        </div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-3 py-10"
          >
            <div className="w-12 h-12 rounded-full border border-dark flex items-center justify-center">
              <Send size={18} strokeWidth={1.5} />
            </div>
            <p className="font-display text-2xl tracking-wide">MESSAGE SENT</p>
            <p className="font-mono text-[10px] tracking-widest text-muted">WE'LL BE IN TOUCH SOON</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <User size={13} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input required type="text" placeholder="YOUR NAME"
                className="w-full pl-9 pr-4 py-3 bg-transparent border border-dark/15 rounded-lg font-mono text-[11px] tracking-[0.1em] text-dark placeholder:text-muted/60 focus:outline-none focus:border-dark transition-colors duration-200" />
            </div>
            <div className="relative">
              <Mail size={13} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input required type="email" placeholder="YOUR EMAIL"
                className="w-full pl-9 pr-4 py-3 bg-transparent border border-dark/15 rounded-lg font-mono text-[11px] tracking-[0.1em] text-dark placeholder:text-muted/60 focus:outline-none focus:border-dark transition-colors duration-200" />
            </div>
            <div className="relative">
              <Phone size={13} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input type="tel" placeholder="PHONE (OPTIONAL)"
                className="w-full pl-9 pr-4 py-3 bg-transparent border border-dark/15 rounded-lg font-mono text-[11px] tracking-[0.1em] text-dark placeholder:text-muted/60 focus:outline-none focus:border-dark transition-colors duration-200" />
            </div>
            <div className="relative">
              <MessageSquare size={13} strokeWidth={1.5} className="absolute left-3 top-4 text-muted" />
              <textarea required rows={4} placeholder="YOUR MESSAGE"
                className="w-full pl-9 pr-4 py-3 bg-transparent border border-dark/15 rounded-lg font-mono text-[11px] tracking-[0.1em] text-dark placeholder:text-muted/60 focus:outline-none focus:border-dark transition-colors duration-200 resize-none" />
            </div>
            <motion.button type="submit" data-hover whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-dark text-bg rounded-lg font-mono text-[11px] tracking-[0.18em] flex items-center justify-center gap-3 hover:bg-dark/80 transition-colors duration-200">
              SEND MESSAGE
              <Send size={13} strokeWidth={1.5} />
            </motion.button>
          </form>
        )}
      </motion.div>

      <CursorHint onRight={onRight} />
    </div>
  )
}

function Background({ onRight }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, particles = [], rafId

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    const mkParticle = () => ({
      x: Math.random() * (W || 800), y: Math.random() * (H || 600),
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.2 + 0.4, a: Math.random() * 0.5 + 0.2,
    })

    resize()
    for (let i = 0; i < 90; i++) particles.push(mkParticle())
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.a})`
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 90) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${0.1 * (1 - d / 90)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      rafId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className={`absolute top-1/2 -translate-y-1/2 z-[5] flex flex-col gap-4 transition-all duration-700 ${onRight ? 'left-8 md:left-14' : 'right-8 md:right-14 text-right'}`}>
        <p className="font-mono text-[10px] tracking-[0.3em] text-white/40">LAS VEGAS, USA</p>
        <h2 className="font-display text-[clamp(40px,6vw,80px)] text-white leading-none">CITY<br />ARCADE</h2>
        <p className="font-mono text-[11px] tracking-[0.12em] text-white/50 max-w-[220px]">YOUR TRUSTED PARTNER<br />IN LUXURY REAL ESTATE</p>
      </div>
    </>
  )
}

function CursorHint({ onRight }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3"
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="font-mono text-[9px] tracking-[0.2em] text-white/50">MOVE CURSOR</span>
      <motion.span className="text-white/50 text-sm"
        animate={{ x: onRight ? [0, 6, 0] : [0, -6, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
        {onRight ? '→' : '←'}
      </motion.span>
    </motion.div>
  )
}
