import { motion } from 'motion/react'
import { ShoppingBag, HeartPulse, GraduationCap, Bus, Dumbbell, Briefcase, Coffee, Users, Trees, Activity, MapPin, Landmark, UsersRound, Banknote, Hotel } from 'lucide-react'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedText'

const DEFAULT_ADVANTAGES = [
  { label: 'Shopping', Icon: ShoppingBag }, { label: 'Healthcare', Icon: HeartPulse },
  { label: 'Education', Icon: GraduationCap }, { label: 'Transportation', Icon: Bus },
  { label: 'Recreation', Icon: Dumbbell }, { label: 'Work Hubs', Icon: Briefcase },
  { label: 'Cafés', Icon: Coffee }, { label: 'Social Spots', Icon: Users },
  { label: 'Parks', Icon: Trees }, { label: 'Fitness Centers', Icon: Activity },
  { label: 'Tourist Attractions', Icon: MapPin }, { label: 'Cultural Centers', Icon: Landmark },
  { label: 'Community', Icon: UsersRound }, { label: 'Banking', Icon: Banknote },
  { label: 'Hotels', Icon: Hotel },
]

export default function LocationAdvantages({ property }) {
  const raw = property?.locationAdvantages ?? []
  const advantages = raw.length ? raw.map((item, i) => ({ label: typeof item === 'string' ? item : item.label, Icon: DEFAULT_ADVANTAGES[i]?.Icon ?? MapPin })) : DEFAULT_ADVANTAGES
  return (
    <section className="px-6 md:px-12 py-20 bg-bg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="flex flex-col gap-6">
          <FadeUp>
            <h2 className="font-display text-[clamp(28px,4vw,52px)] leading-tight tracking-wide">LOCATION<br />ADVANTAGES</h2>
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted mt-2">EVERYTHING YOU NEED IS JUST MINUTES AWAY.</p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="font-display text-[clamp(17px,2vw,26px)] leading-relaxed tracking-wide">
              LIVING IN THIS PROPERTY<br />MEANS YOU'RE PERFECTLY<br />POSITIONED<br />TO ENJOY CONVENIENCE, <span className="text-dark font-semibold">COMFORT,<br />AND CONNECTIVITY</span><br /><span className="text-ghost">EVERYTHING YOU NEED IS JUST<br />MINUTES AWAY.</span>
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <motion.button data-hover className="inline-flex items-center gap-2 w-fit px-6 py-2.5 border border-dark rounded-full font-mono text-[11px] tracking-[0.1em] hover:bg-dark hover:text-bg transition-colors duration-200" whileTap={{ scale: 0.96 }}>MAKE AN ENQUIRY</motion.button>
          </FadeUp>
        </div>
        <StaggerContainer className="grid grid-cols-3 gap-2" stagger={0.04} delayChildren={0.1}>
          {advantages.map(({ label, Icon }) => (
            <StaggerItem key={label}>
              <motion.div data-hover className="flex flex-col gap-2.5 p-3.5 bg-canvas rounded-xl border border-black/6 hover:border-dark hover:-translate-y-0.5 transition-all duration-200 cursor-default" whileHover={{ scale: 1.02 }}>
                <Icon size={18} strokeWidth={1.5} className="text-dark" />
                <span className="font-mono text-[9px] tracking-[0.1em] text-muted leading-snug">{label.toUpperCase()}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
