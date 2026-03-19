import { motion } from 'motion/react'
import { FadeUp } from '@/components/ui/AnimatedText'

const FALLBACK = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&q=80',
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80',
]

export default function ExteriorSection({ property }) {
  const images = property?.images?.exterior ?? FALLBACK
  return (
    <section className="px-6 md:px-12 py-16 bg-bg">
      <FadeUp className="mb-8">
        <h3 className="font-display text-[clamp(22px,3.5vw,42px)] tracking-[0.05em]">EXTERIOR</h3>
        <p className="font-mono text-[10px] tracking-[0.18em] text-muted mt-1">EXPLORE THE EXTERIOR OF HAMIDA HOUSE</p>
      </FadeUp>
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        <FadeUp delay={0.1} className="flex flex-col justify-center gap-5 md:w-56 flex-shrink-0">
          <button data-hover className="inline-flex items-center w-fit px-5 py-2 border border-dark rounded-full font-mono text-[10px] tracking-[0.1em] hover:bg-dark hover:text-bg transition-colors duration-200">EXTERIOR DESIGN</button>
          <p className="font-mono text-[11px] tracking-[0.08em] leading-loose text-muted uppercase">The villa combines modern style and strength, creating an elegant home with impressive finishes and a perfect outdoor space.</p>
        </FadeUp>
        <div className="flex gap-2.5 flex-1 h-[360px] md:h-[500px]">
          {images.map((src, i) => {
            const isTall = i === 0 || i === 3
            return (
              <motion.div key={i} className={`relative overflow-hidden rounded-xl flex-1 group ${!isTall ? 'mt-12 self-stretch' : ''}`} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
                <motion.img src={src} alt={`Exterior ${i + 1}`} className="w-full h-full object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-bg/80 backdrop-blur-sm flex items-center justify-center font-mono text-[9px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">{i + 1}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
