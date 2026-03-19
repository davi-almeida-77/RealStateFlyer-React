import { motion } from 'motion/react'
import { FadeUp } from '@/components/ui/AnimatedText'

const FALLBACK = [
  { label: 'Kitchen',         url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' },
  { label: 'Spacious Living', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80' },
  { label: 'Master Bedroom',  url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80' },
  { label: 'Luxury Bath',     url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80' },
]

export default function InteriorSection({ property }) {
  const images = property?.images?.interior ?? FALLBACK
  return (
    <section className="px-6 md:px-12 py-16 bg-bg">
      <FadeUp className="mb-8">
        <h3 className="font-display text-[clamp(22px,3.5vw,42px)] tracking-[0.05em]">INTERIOR</h3>
        <p className="font-mono text-[10px] tracking-[0.18em] text-muted mt-1">EXPLORE THE INTERIOR OF HAMIDA HOUSE</p>
      </FadeUp>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:h-[420px]">
        {images.map((img, i) => {
          const isWide = i === 1
          return (
            <motion.div key={i} className={`relative overflow-hidden rounded-xl group h-52 md:h-full ${isWide ? 'md:col-span-2' : ''}`} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
              <motion.img src={img.url} alt={img.label} className="w-full h-full object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/55 to-transparent flex items-end justify-between p-5 transition-opacity duration-300 ${isWide ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <span className="font-display text-white text-xl tracking-[0.06em]">{img.label.toUpperCase()}</span>
                {isWide && <motion.a href="#" data-hover className="text-white text-xl" whileHover={{ x: 3, y: -3 }} transition={{ type: 'spring', stiffness: 300 }}>↗</motion.a>}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
