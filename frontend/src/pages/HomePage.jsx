import { useEffect } from 'react'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollGallery from '@/components/effects/ScrollGallery'
import PropertySearch from '@/components/effects/PropertySearch'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedText'
import { ArrowRight, ChevronDown, Star, Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ── 9 slides with 4K images + city + state ── */
const ALL_SLIDES = [
  {
    id: 's1', title: 'HAMIDA', sub: 'VILLA',
    city: 'Las Vegas', state: 'NV',
    tag: 'FOR SALE', price: '$1,836,000', beds: 5, baths: 6, sqft: 8000,
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=3840&q=95',
  },
  {
    id: 'r1', title: 'HORIZON', sub: 'SUITE',
    city: 'Miami Beach', state: 'FL',
    tag: 'FOR RENT', price: '$400/night', beds: 3, baths: 4, sqft: 3200,
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=3840&q=95',
  },
  {
    id: 's2', title: 'MANABEY', sub: 'ESTATE',
    city: 'Beverly Hills', state: 'CA',
    tag: 'FOR SALE', price: '$300,000', beds: 5, baths: 6, sqft: 680,
    img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=3840&q=95',
  },
  {
    id: 'r2', title: 'CRYSTAL', sub: 'PENTHOUSE',
    city: 'New York', state: 'NY',
    tag: 'FOR RENT', price: '$1,200/night', beds: 5, baths: 5, sqft: 6800,
    img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=3840&q=95',
  },
  {
    id: 's3', title: 'SPOTLEK', sub: 'GROVE',
    city: 'Scottsdale', state: 'AZ',
    tag: 'FOR SALE', price: '$2,100,000', beds: 6, baths: 7, sqft: 9200,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=3840&q=95',
  },
  {
    id: 'r3', title: 'AZURE', sub: 'RESIDENCE',
    city: 'San Diego', state: 'CA',
    tag: 'FOR RENT', price: '$800/night', beds: 4, baths: 4, sqft: 4500,
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=3840&q=95',
  },
  {
    id: 's4', title: 'PEARL', sub: 'MANOR',
    city: 'Naples', state: 'FL',
    tag: 'FOR SALE', price: '$4,500,000', beds: 7, baths: 8, sqft: 12000,
    img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=3840&q=95',
  },
  {
    id: 'r4', title: 'VEGA', sub: 'LOFT',
    city: 'Chicago', state: 'IL',
    tag: 'FOR RENT', price: '$350/night', beds: 2, baths: 2, sqft: 1800,
    img: 'https://wallpapercat.com/w/full/6/8/e/743660-3840x2160-desktop-4k-house-wallpaper-photo.jpg',
  },
  {
    id: 's5', title: 'NOVA', sub: 'TOWERS',
    city: 'Austin', state: 'TX',
    tag: 'FOR SALE', price: '$890,000', beds: 3, baths: 3, sqft: 2400,
    img: 'https://4kwallpapers.com/images/walls/thumbs_3t/3530.jpg',
  },
]

const TESTIMONIALS = [
  {
    id: 1, name: 'Sarah Mitchell', role: 'Tech Executive', location: 'San Francisco, CA',
    rating: 5, avatar: 'SM', property: 'Hamida Villa — $1.8M',
    text: 'City Arcade found us our dream home in under 3 weeks. The process was seamless, transparent, and their knowledge of the Las Vegas luxury market is unmatched.',
  },
  {
    id: 2, name: 'James & Laura Chen', role: 'Entrepreneurs', location: 'New York, NY',
    rating: 5, avatar: 'JL', property: 'Crystal Penthouse — $1,200/night',
    text: 'We had very specific requirements and City Arcade delivered beyond expectations. The platform made it easy to compare properties and understand pricing without pressure.',
  },
  {
    id: 3, name: 'Viktor Hoffman', role: 'Retired Investor', location: 'Zurich, Switzerland',
    rating: 5, avatar: 'VH', property: 'Pearl Manor — $4.5M',
    text: 'As an international buyer, I needed a team I could trust completely. City Arcade handled everything with remarkable professionalism. The results speak for themselves.',
  },
  {
    id: 4, name: 'Ana Flores', role: 'Interior Designer', location: 'Miami, FL',
    rating: 5, avatar: 'AF', property: 'Spotlek Grove — $2.1M',
    text: 'The attention to architectural detail and curated listings is exceptional. Every property they showed me had soul — not just square footage. Finally, a real estate platform with taste.',
  },
]

function HeroIntro() {
  return (
    <section className="relative w-full flex flex-col justify-center overflow-hidden"
      style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />
      <div className="relative z-10 px-8 md:px-14">
        <motion.p className="font-mono text-[10px] tracking-[0.35em] mb-8"
          style={{ color: 'rgba(255,255,255,0.3)' }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}>
          CITY ARCADE · LUXURY REAL ESTATE · EST. 2013
        </motion.p>
        <h1 className="font-display leading-none mb-8" style={{ fontSize: 'clamp(60px, 10.5vw, 150px)' }}>
          <div className="overflow-hidden">
            <motion.span className="block text-white" initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              FIND YOUR
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span className="block" style={{ color: 'rgba(255,255,255,0.18)' }}
              initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              DREAM HOME
            </motion.span>
          </div>
        </h1>
        <motion.p className="font-body text-lg leading-relaxed max-w-sm mb-12"
          style={{ color: 'rgba(255,255,255,0.35)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}>
          Premium properties for those who appreciate architecture, luxury and the art of refined living.
        </motion.p>
        <motion.div className="flex items-center gap-5 flex-wrap"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}>
          <a href="/property/hamida-villa" data-hover
            className="flex items-center gap-3 px-7 py-3.5 bg-white text-dark rounded-full font-mono text-[11px] tracking-widest hover:bg-white/90 transition-colors">
            EXPLORE PROPERTIES <ArrowRight size={13} strokeWidth={1.5} />
          </a>
          <a href="/contact" data-hover
            className="flex items-center gap-2 font-mono text-[11px] tracking-widest hover:opacity-70 transition-opacity"
            style={{ color: 'rgba(255,255,255,0.35)' }}>
            CONTACT US <ArrowRight size={12} strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 5, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
        <span className="font-mono text-[9px] tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.25)' }}>SCROLL</span>
        <ChevronDown size={14} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.25)' }} />
      </motion.div>
      <motion.div className="absolute bottom-10 right-8 md:right-14 flex gap-8"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }}>
        {[{ val: '340+', label: 'SOLD' }, { val: '12Y', label: 'EXPERIENCE' }, { val: '98%', label: 'SATISFACTION' }].map(({ val, label }) => (
          <div key={label} className="flex flex-col items-end gap-0.5">
            <span className="font-display text-2xl text-white leading-none">{val}</span>
            <span className="font-mono text-[8px] tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.2)' }}>{label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="px-8 md:px-14 py-28" style={{ background: '#0f0f0f' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <FadeUp>
          <p className="font-mono text-[10px] tracking-[0.25em] mb-4" style={{ color: 'rgba(255,255,255,0.25)' }}>01 | ABOUT</p>
          <h2 className="font-display text-white leading-tight mb-6" style={{ fontSize: 'clamp(34px,4.5vw,60px)' }}>
            A NEW ERA OF<br />
            <span style={{ color: 'rgba(255,255,255,0.18)' }}>RESIDENTIAL LIVING</span>
          </h2>
          <p className="font-body leading-relaxed mb-8 max-w-md" style={{ color: 'rgba(255,255,255,0.38)', fontSize: '16px' }}>
            We curate premium properties immersed in nature, defined by clean architecture and quiet sophistication.
          </p>
          <div className="flex gap-3 flex-wrap">
            {['Residential Design', 'Architecture', 'Real Estate', 'Luxury Living'].map(tag => (
              <span key={tag} className="px-4 py-1.5 rounded-full border font-mono text-[9px] tracking-widest"
                style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }}>{tag}</span>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <img src="https://images.pexels.com/photos/5869891/pexels-photo-5869891.jpeg?_gl=1*xy402v*_ga*MTYzMTc5MDY2NC4xNzc0MjE5NjA5*_ga_8JE65Q40S6*czE3NzQyMTk2MDgkbzEkZzEkdDE3NzQyMTk2MjYkajQyJGwwJGgw"
              alt="About" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.4), transparent 60%)' }} />
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function StatsBar() {
  return (
    <section className="px-8 md:px-14 py-16"
      style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { val: '340+', label: 'PROPERTIES SOLD' },
          { val: '$2B+', label: 'TOTAL VALUE' },
          { val: '12',   label: 'YEARS EXPERIENCE' },
          { val: '98%',  label: 'CLIENT SATISFACTION' },
        ].map(({ val, label }, i) => (
          <FadeUp key={label} delay={i * 0.1} className="flex flex-col gap-1">
            <span className="font-display text-white leading-none" style={{ fontSize: 'clamp(34px, 4vw, 52px)' }}>{val}</span>
            <span className="font-mono text-[9px] tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.22)' }}>{label}</span>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="px-8 md:px-14 py-28" style={{ background: '#0a0a0a' }}>
      <FadeUp className="mb-16">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] mb-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
              05 | CLIENT STORIES
            </p>
            <h2 className="font-display text-white leading-none" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
              WHAT OUR<br />
              <span style={{ color: 'rgba(255,255,255,0.18)' }}>CLIENTS SAY</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="rgba(255,200,60,0.9)" color="rgba(255,200,60,0.9)" />)}
            <span className="font-mono text-[11px] tracking-widest ml-2" style={{ color: 'rgba(255,255,255,0.35)' }}>4.9 / 5.0</span>
          </div>
        </div>
      </FadeUp>
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5" stagger={0.1}>
        {TESTIMONIALS.map((t, i) => (
          <StaggerItem key={t.id}>
            <div className="relative flex flex-col gap-5 p-7 rounded-2xl" style={{
              background: i === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
              border: i === 0 ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ color: 'rgba(255,255,255,0.1)' }}><Quote size={28} strokeWidth={1} /></div>
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={12} fill="rgba(255,200,60,0.8)" color="transparent" />)}
              </div>
              <p className="font-body leading-relaxed flex-1"
                style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.7 }}>
                "{t.text}"
              </p>
              <div className="flex items-center justify-between flex-wrap gap-3 pt-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-[11px] font-bold"
                    style={{
                      background: i % 2 === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(160,210,255,0.1)',
                      color: i % 2 === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(160,210,255,0.7)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}>{t.avatar}</div>
                  <div>
                    <p className="font-mono text-[12px] tracking-wide text-white/80">{t.name}</p>
                    <p className="font-mono text-[9px] tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {t.role} · {t.location}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[9px] tracking-widest px-3 py-1.5 rounded-full"
                  style={{ color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                  {t.property}
                </span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
      <FadeUp delay={0.3} className="flex justify-center mt-14">
        <a href="/contact" data-hover
          className="flex items-center gap-3 px-8 py-4 rounded-full font-mono text-[11px] tracking-widest transition-all duration-200"
          style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'white' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}>
          START YOUR JOURNEY <ArrowRight size={13} strokeWidth={1.5} />
        </a>
      </FadeUp>
    </section>
  )
}

export default function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy() }
  }, [])

  return (
    <div style={{ background: '#0a0a0a' }}>
      <Navbar />

      {/* 01 — Hero */}
      <HeroIntro />

      {/* 02 — Properties Gallery (1 component, 9 slides, 4K) */}
      <div style={{ background: '#0a0a0a' }}>
        <div style={{ padding: 'clamp(40px,5vw,72px) clamp(24px,5vw,80px) 0' }}>
          <FadeUp>
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '20px' }}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.25)' }}>
                02 | PROPERTIES
              </span>
              <span className="font-display ml-4" style={{ fontSize: 'clamp(24px,3vw,40px)', color: 'rgba(255,255,255,0.07)', letterSpacing: '0.04em' }}>
                FOR SALE &amp; FOR RENT
              </span>
            </div>
          </FadeUp>
        </div>
        <ScrollGallery slides={ALL_SLIDES} />
      </div>

      {/* 03 — Search & Filter */}
      <PropertySearch />

      {/* 04 — About */}
      <AboutSection />

      {/* 05 — Stats */}
      <StatsBar />

      {/* 06 — Testimonials */}
      <TestimonialsSection />

      <Footer />
    </div>
  )
}
