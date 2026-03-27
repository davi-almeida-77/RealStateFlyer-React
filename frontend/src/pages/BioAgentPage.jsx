/**
 * BioAgentPage.jsx
 * 
 * Layout: fullscreen portrait photo as background (like Ali Ali reference)
 * - Photo fills entire viewport, dark + moody
 * - Gradient overlay from left (dark) to right (transparent)
 * - Name huge bottom-right, content bottom-left
 * - Social/contact links top-right
 * - Curtain entrance animation wipes up
 * - All text reveals with clip-path line by line
 */

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import Navbar from '@/components/layout/Navbar'
import { ArrowRight, Mail, Phone, MapPin, Instagram, Linkedin, Award, Star } from 'lucide-react'

const AGENT = {
  firstName:   'MARCUS',
  lastName:    'VELEZ',
  title:       'Senior Real Estate Advisor',
  location:    'New York, NY',
  email:       'marcus@cityarcade.com',
  phone:       '+1 (212) 555-0192',
  since:       'EST. 2011',
  bio:         'Navigating the New York luxury market for over 14 years. Closed $340M+ in residential transactions. Known for discretion, precision and deep architectural knowledge.',
  stats: [
    { val: '14+',  label: 'YRS' },
    { val: '340+', label: 'DEALS' },
    { val: '$2B+', label: 'VALUE' },
    { val: '98%',  label: 'RATING' },
  ],
  specialties: ['Luxury Residential', 'New Development', 'Investment', 'International'],
  // Suits-style professional man — dark, editorial, moody portrait
  photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1800&q=95',
}

/* ── Curtain wipes upward on enter ── */
function Curtain({ onDone }) {
  return (
    <motion.div
      initial={{ y: '0%' }}
      animate={{ y: '-100%' }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      onAnimationComplete={onDone}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: '#0a0a0a', pointerEvents: 'none',
      }}
    />
  )
}

/* ── Line reveal — text slides up from clip ── */
function Line({ children, delay = 0, style = {} }) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setGo(true), delay * 1000)
    return () => clearTimeout(t)
  }, [delay])
  return (
    <div style={{ overflow: 'hidden', lineHeight: 'inherit', ...style }}>
      <motion.div
        initial={{ y: '115%' }}
        animate={go ? { y: 0 } : {}}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* ── Fade in ── */
function Fade({ children, delay = 0, style = {} }) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setGo(true), delay * 1000)
    return () => clearTimeout(t)
  }, [delay])
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={go ? { opacity: 1 } : {}}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export default function BioAgentPage() {
  const [done, setDone] = useState(false)

  /* Subtle mouse parallax on photo */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 30, damping: 20 })
  const sy = useSpring(my, { stiffness: 30, damping: 20 })

  useEffect(() => {
    const move = (e) => {
      mx.set(((e.clientX / window.innerWidth)  - 0.5) *  8)
      my.set(((e.clientY / window.innerHeight) - 0.5) *  6)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mx, my])

  return (
    <div style={{ background: '#0a0a0a', height: '100vh', overflow: 'hidden', position: 'relative' }}>

      <Curtain onDone={() => setDone(true)} />
      <Navbar />

      {/* ── FULLSCREEN PHOTO BACKGROUND ── */}
      <motion.div
        initial={{ scale: 1.06, opacity: 0 }}
        animate={done ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 2.0, ease: 'easeOut' }}
        style={{ x: sx, y: sy, position: 'absolute', inset: '-3%', zIndex: 0 }}
      >
        <img
          src={AGENT.photo}
          alt={AGENT.firstName}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            filter: 'grayscale(30%) contrast(1.08) brightness(0.7)',
          }}
        />
      </motion.div>

      {/* ── Gradient overlay — dark left, transparent right ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.75) 35%, rgba(8,8,8,0.2) 65%, transparent 100%)',
      }} />
      {/* Bottom gradient for text legibility */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 40%)',
      }} />

      {/* ── UI LAYER ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        padding: '80px clamp(24px,5vw,80px) clamp(32px,5vh,60px)',
        pointerEvents: 'none',
      }}>

        {/* ── TOP RIGHT — contact links (like Ali Ali) ── */}
        <Fade delay={1.5} style={{
          gridColumn: '2 / 3', gridRow: '1 / 2',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px',
          pointerEvents: 'auto',
        }}>
          {[
            { label: 'Email',    href: 'mailto:' + AGENT.email },
            { label: 'LinkedIn', href: '#' },
            { label: 'Instagram',href: '#' },
          ].map(({ label, href }) => (
            <a key={label} href={href} style={{
              fontFamily: 'Space Mono, monospace', fontSize: '10px',
              letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
            >
              {label}
            </a>
          ))}
        </Fade>

        {/* ── BOTTOM LEFT — main content ── */}
        <div style={{
          gridColumn: '1 / 2', gridRow: '1 / 2',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '20px',
          pointerEvents: 'auto',
        }}>

          {/* Eyebrow */}
          <Line delay={1.05}>
            <span style={{
              fontFamily: 'Space Mono, monospace', fontSize: '10px',
              letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)',
            }}>
              CITY ARCADE · BIO AGENT · {AGENT.since}
            </span>
          </Line>

          {/* Title */}
          <Line delay={1.12}>
            <span style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 'clamp(11px,1vw,13px)',
              letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)',
            }}>
              {AGENT.title} · {AGENT.location}
            </span>
          </Line>

          {/* Bio */}
          <Line delay={1.22}>
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(13px,1.1vw,15px)',
              lineHeight: 1.8, color: 'rgba(255,255,255,0.4)',
              maxWidth: '440px',
            }}>
              {AGENT.bio}
            </p>
          </Line>

          {/* Stats row */}
          <Fade delay={1.35} style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
            {AGENT.stats.map(({ val, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(24px,2.5vw,38px)', color: 'white', lineHeight: 1 }}>
                  {val}
                </span>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)' }}>
                  {label}
                </span>
              </div>
            ))}
          </Fade>

          {/* Specialties */}
          <Fade delay={1.45} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {AGENT.specialties.map(s => (
              <span key={s} style={{
                fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.08em',
                padding: '5px 12px', borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.45)',
                backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.05)',
              }}>{s}</span>
            ))}
          </Fade>

          {/* CTAs */}
          <Fade delay={1.55} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="/contact" style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '13px 26px', borderRadius: '100px',
              background: 'white', color: '#111',
              fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.1em',
              textDecoration: 'none', fontWeight: 700,
            }}>
              GET IN TOUCH <ArrowRight size={13} strokeWidth={2} />
            </a>
            <a href={'tel:' + AGENT.phone} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '13px 22px', borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.08em',
              textDecoration: 'none', backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.04)',
            }}>
              <Phone size={13} strokeWidth={1.5} /> {AGENT.phone}
            </a>
          </Fade>
        </div>

        {/* ── BOTTOM RIGHT — big name ── */}
        <div style={{
          gridColumn: '2 / 3', gridRow: '1 / 2',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end',
          textAlign: 'right', lineHeight: 0.88,
          pointerEvents: 'none',
        }}>
          <Line delay={0.9}>
            <span style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(72px,9vw,144px)',
              color: 'white', letterSpacing: '-0.01em',
              display: 'block',
              /* Subtle text shadow for legibility over photo */
              textShadow: '0 2px 40px rgba(0,0,0,0.5)',
            }}>
              {AGENT.firstName}
            </span>
          </Line>
          <Line delay={1.0}>
            <span style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(72px,9vw,144px)',
              color: 'rgba(255,255,255,0.18)',
              letterSpacing: '-0.01em',
              display: 'block',
            }}>
              {AGENT.lastName}
            </span>
          </Line>
        </div>

      </div>
    </div>
  )
}
