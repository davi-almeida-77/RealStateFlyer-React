import { motion } from 'motion/react'
import { MapPin, BedDouble, Bath, Maximize } from 'lucide-react'
import { FadeUp } from '@/components/ui/AnimatedText'
import { FEATURED_PROPERTIES } from '@/data/property'

function PropertyCard({ prop, index }) {
  const isRent = prop.status?.includes('for-rent')
  const price  = prop.sellPrice ?? prop.rentPrice ?? 0
  const imgSrc = prop.images?.hero ?? ''
  return (
    <motion.article className="rounded-xl overflow-hidden bg-canvas border border-black/6 transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/10" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -6 }}>
      <div className="relative h-64 overflow-hidden">
        <motion.img src={imgSrc} alt={prop.name} className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-bg/90 backdrop-blur-sm font-mono text-[9px] tracking-[0.12em] font-bold">{isRent ? 'FOR RENT' : 'FOR SALE'}</span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] text-muted mb-2"><MapPin size={11} strokeWidth={1.5} />{prop.location}</div>
        <div className="flex items-baseline justify-between gap-2 mb-4 flex-wrap">
          <h4 className="font-display text-xl tracking-wide leading-tight">{prop.name?.toUpperCase()}</h4>
          <span className="font-display text-lg flex-shrink-0">${price.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {[{ Icon: BedDouble, val: prop.bedrooms }, { Icon: Bath, val: prop.bathrooms }, { Icon: Maximize, val: `${prop.squareFeet ?? prop.sqft}M²` }].map(({ Icon, val }, i) => (
            <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/10 font-mono text-[10px] tracking-[0.08em] text-muted"><Icon size={11} strokeWidth={1.5} />{val}</span>
          ))}
          <motion.a href={`/property/${prop.id}`} data-hover className="ml-auto text-[#4fa3c3] text-xl leading-none" whileHover={{ x: 3, y: -3 }} transition={{ type: 'spring', stiffness: 300 }}>↗</motion.a>
        </div>
      </div>
    </motion.article>
  )
}

export default function FeaturedProperties({ properties }) {
  const items = properties?.length ? properties : FEATURED_PROPERTIES
  return (
    <section className="px-6 md:px-12 py-20 bg-bg">
      <FadeUp className="mb-12">
        <h2 className="font-display text-[clamp(26px,4vw,44px)] tracking-[0.04em]">FEATURED PROPERTIES</h2>
        <p className="font-mono text-[10px] tracking-[0.2em] text-muted mt-1">THIS WEEK'S TOP PICKS</p>
      </FadeUp>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((prop, i) => <PropertyCard key={prop.id} prop={prop} index={i} />)}
      </div>
    </section>
  )
}
