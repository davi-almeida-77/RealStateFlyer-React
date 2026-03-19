import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { AnimatedWords, FadeUp } from '@/components/ui/AnimatedText'

const SPECS = [
  { label: 'LAS VEGAS, USA', fill: 55 },
  { label: '5 BEDROOMS',     fill: 70 },
  { label: '6 BATHROOMS',    fill: 85 },
  { label: '8000 SQ FT',     fill: 90 },
]

export default function HeroSection({ property }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const rent    = property?.rentPrice ?? 400
  const sellFmt = (property?.sellPrice ?? 1836000).toLocaleString('en-IN')
  const heroImg  = property?.images?.hero  ?? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85'
  const thumbImg = property?.images?.thumb ?? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80'

  return (
    <section ref={heroRef} className="grid grid-cols-1 md:grid-cols-2 min-h-screen pt-16 overflow-hidden bg-bg">
      <div className="flex flex-col gap-6 px-6 md:px-12 py-12 relative z-10">
        <h1 className="flex flex-col leading-none -mb-1">
          <AnimatedWords delay={0.1} className="font-display text-[clamp(64px,8.5vw,120px)] text-dark block">HAMIDA</AnimatedWords>
          <motion.span className="font-display text-[clamp(64px,8.5vw,120px)] text-ghost self-end block leading-none" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>VILLA</motion.span>
        </h1>
        <FadeUp delay={0.5}>
          <p className="font-mono text-[10px] tracking-[0.14em] text-muted mb-1.5">FOR RENT</p>
          <span className="inline-flex items-center px-5 py-2 border border-dark rounded-full font-mono text-[13px] font-bold tracking-[0.07em]">${rent} / NIGHT</span>
        </FadeUp>
        <FadeUp delay={0.62} className="flex items-baseline gap-3 flex-wrap">
          <span className="font-mono text-[11px] tracking-[0.1em] text-muted">FOR SELL —</span>
          <span className="font-display text-[clamp(28px,3.5vw,46px)]">${sellFmt}</span>
        </FadeUp>
        <FadeUp delay={0.74}>
          <div className="w-48 h-36 rounded-xl overflow-hidden border border-black/10 relative flex-shrink-0">
            <img src={thumbImg} alt="Villa thumbnail" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/15" />
          </div>
        </FadeUp>
        <FadeUp delay={0.86} className="flex flex-col gap-3 mt-auto">
          {SPECS.map(({ label, fill }, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.08em] w-36 flex-shrink-0">{label}</span>
              <div className="flex-1 h-px bg-black/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-dark rounded-full" initial={{ width: 0 }} whileInView={{ width: `${fill}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }} />
              </div>
            </div>
          ))}
        </FadeUp>
      </div>
      <div className="relative overflow-hidden h-[55vw] md:h-auto">
        <motion.div className="absolute inset-0" style={{ y: imgY }}>
          <img src={heroImg} alt="Hamida Villa" className="w-full h-full object-cover scale-110" />
        </motion.div>
        <motion.div className="absolute bottom-10 left-10 bg-bg/90 backdrop-blur-sm rounded-xl px-5 py-3 flex flex-col" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <span className="font-mono text-[9px] tracking-[0.16em] text-muted">PREMIUM</span>
          <strong className="font-display text-3xl leading-none">VILLA</strong>
        </motion.div>
        <div className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/60">SCROLL</span>
          <motion.div className="w-px h-10 bg-white/50 origin-top" animate={{ scaleY: [1, 0.4, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
      </div>
    </section>
  )
}
