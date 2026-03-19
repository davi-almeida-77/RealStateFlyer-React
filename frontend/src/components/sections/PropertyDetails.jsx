import { motion } from 'motion/react'
import { BedDouble, Bath, Wind, UtensilsCrossed, Sofa, Dumbbell, Waves, Package, Tv2, DoorOpen, Building2, Sun, BookOpen, Maximize, LayoutGrid } from 'lucide-react'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedText'

const ICON_MAP = { bed: BedDouble, bath: Bath, wind: Wind, utensils: UtensilsCrossed, sofa: Sofa, dumbbell: Dumbbell, waves: Waves, package: Package, tv: Tv2, 'door-open': DoorOpen, 'building-2': Building2, sun: Sun, 'book-open': BookOpen, maximize: Maximize, grid: LayoutGrid }

function AmenityCard({ amenity, index }) {
  const Icon = ICON_MAP[amenity.icon] ?? LayoutGrid
  const isAccent = index === 14
  return (
    <motion.div className={`flex flex-col gap-2.5 p-4 rounded-xl border transition-all duration-200 cursor-default ${isAccent ? 'bg-dark border-dark text-bg' : 'bg-canvas border-black/6 hover:border-dark hover:-translate-y-0.5'}`} whileHover={{ scale: isAccent ? 1 : 1.015 }}>
      <Icon size={20} strokeWidth={1.5} />
      <span className="font-mono text-[10px] tracking-[0.1em] leading-snug">{amenity.label.toUpperCase()}</span>
    </motion.div>
  )
}

export default function PropertyDetails({ property }) {
  const amenities = property?.amenities ?? []
  return (
    <section className="px-6 md:px-12 py-20 bg-bg">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-14">
        <FadeUp><p className="font-mono text-[11px] tracking-[0.2em] text-muted mt-3">OVERVIEW</p></FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display text-right leading-none">
            <span className="block text-[clamp(50px,7vw,108px)] text-dark">PROPERTY</span>
            <span className="block text-[clamp(50px,7vw,108px)] text-ghost">DETAILS</span>
          </h2>
        </FadeUp>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14 items-start">
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-2.5" stagger={0.04} delayChildren={0.1}>
          {amenities.map((am, i) => <StaggerItem key={am.id}><AmenityCard amenity={am} index={i} /></StaggerItem>)}
        </StaggerContainer>
        <FadeUp delay={0.2} className="flex flex-col gap-8">
          <p className="font-display text-[clamp(20px,2.3vw,30px)] leading-snug tracking-wide">
            DREAM HOME WITH THIS PRO<br />DESIGNED <span className="text-dark">5-BEDROOM</span><br />RESIDENCE<br />LOCATED IN THE <span className="text-ghost">HEART OF<br />DOWNTOWN CITY<br />LUXURY AND URBAN<br />LIVING</span>
          </p>
          <motion.button data-hover className="inline-flex items-center gap-2 w-fit px-6 py-2.5 border border-dark rounded-full font-mono text-[11px] tracking-[0.1em] hover:bg-dark hover:text-bg transition-colors duration-200" whileTap={{ scale: 0.96 }}>MAKE AN ENQUIRY</motion.button>
        </FadeUp>
      </div>
    </section>
  )
}
