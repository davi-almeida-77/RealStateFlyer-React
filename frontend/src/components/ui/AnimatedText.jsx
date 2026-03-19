import { motion } from 'motion/react'

export function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}

export function AnimatedWords({ children, delay = 0, className = '' }) {
  const words = String(children).split(' ')
  return (
    <span className={className} aria-label={children}>
      {words.map((word, i) => (
        <motion.span key={i} className="inline-block overflow-hidden" style={{ marginRight: '0.22em' }}>
          <motion.span className="inline-block" initial={{ y: '105%', opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: delay + i * 0.055, ease: [0.16, 1, 0.3, 1] }}>
            {word}
          </motion.span>
        </motion.span>
      ))}
    </span>
  )
}

export function StaggerContainer({ children, className = '', stagger = 0.07, delayChildren = 0 }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren } } }}>
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div className={className} variants={{ hidden: { opacity: 0, y: 18, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }}>
      {children}
    </motion.div>
  )
}
