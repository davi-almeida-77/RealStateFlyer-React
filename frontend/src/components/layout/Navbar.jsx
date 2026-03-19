import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, User, Menu, X } from 'lucide-react'
import { useScrollY } from '@/hooks/useScrollY'

const NAV_LINKS = [
  { label: 'HOME',       href: '#' },
  { label: 'PROPERTIES', href: '#', active: true },
  { label: 'BUY',        href: '#' },
  { label: 'RENT',       href: '#' },
  { label: 'FIND AGENT', href: '#' },
  { label: 'CONTACT',    href: '#' },
]

export default function Navbar() {
  const scrollY  = useScrollY()
  const scrolled = scrollY > 20
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className={`fixed top-0 left-0 right-0 z-[100] h-16 flex items-center gap-6 px-6 md:px-10 transition-all duration-300 ${scrolled ? 'bg-bg/95 backdrop-blur-md border-b border-black/8 shadow-sm' : 'bg-bg/80 backdrop-blur-sm'}`}>
        <a href="/" className="flex-shrink-0" data-hover>
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            <path d="M11 1L2 7v14h7v-6h4v6h7V7L11 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </a>
        <ul className="hidden md:flex items-center gap-0.5 mx-auto list-none m-0 p-0">
          {NAV_LINKS.map((link, i) => (
            <li key={link.label} className="flex items-center">
              <a href={link.href} data-hover className={`px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] transition-colors duration-200 ${link.active ? 'text-dark font-bold' : 'text-muted hover:text-dark'}`}>{link.label}</a>
              {i < NAV_LINKS.length - 1 && <span className="text-muted/60 text-xs select-none">+</span>}
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-2 ml-auto">
          <button data-hover aria-label="Search" className="w-9 h-9 rounded-full border border-dark flex items-center justify-center hover:bg-dark hover:text-bg transition-colors duration-200"><Search size={15} /></button>
          <button data-hover className="flex items-center gap-2 px-4 py-[7px] border border-dark rounded-full font-mono text-[11px] tracking-[0.07em] hover:bg-dark hover:text-bg transition-colors duration-200"><User size={13} />SIGN IN</button>
        </div>
        <button className="ml-auto md:hidden flex flex-col gap-[5px] p-1" onClick={() => setOpen(v => !v)} aria-label="Menu" data-hover>
          <motion.span className="block w-5 h-px bg-dark rounded-full" animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} transition={{ duration: 0.25 }} />
          <motion.span className="block w-5 h-px bg-dark rounded-full" animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.2 }} />
          <motion.span className="block w-5 h-px bg-dark rounded-full" animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} transition={{ duration: 0.25 }} />
        </button>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }} className="fixed top-16 left-0 right-0 z-[99] bg-bg/98 backdrop-blur-xl border-b border-black/8 px-6 py-6 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <a key={link.label} href={link.href} onClick={() => setOpen(false)} className={`py-3 border-b border-black/5 font-mono text-sm tracking-[0.1em] ${link.active ? 'text-dark font-bold' : 'text-muted'}`}>{link.label}</a>
            ))}
            <div className="flex gap-3 pt-4">
              <button className="w-9 h-9 rounded-full border border-dark flex items-center justify-center"><Search size={15} /></button>
              <button className="flex items-center gap-2 px-4 py-2 border border-dark rounded-full font-mono text-[11px] tracking-wider"><User size={13} /> SIGN IN</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
