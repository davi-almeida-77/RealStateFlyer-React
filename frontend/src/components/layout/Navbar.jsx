import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, User, Sun, Moon } from 'lucide-react'
import { useScrollY } from '@/hooks/useScrollY'
import { useTheme } from '@/context/ThemeContext'

const NAV_LINKS = [
  { label: 'HOME',      href: '/' },
  { label: 'PROPERTIES',href: '/property/hamida-villa', active: true },
  { label: 'BUY',       href: '#' },
  { label: 'RENT',      href: '#' },
  { label: 'BIO AGENT', href: '#' },
  { label: 'CONTACT',   href: '/contact' },
]

export default function Navbar() {
  const scrollY        = useScrollY()
  const scrolled       = scrollY > 20
  const [open, setOpen] = useState(false)
  const { dark, toggle } = useTheme()

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navBg      = dark
    ? scrolled ? 'rgba(10,10,10,0.97)' : 'rgba(10,10,10,0.7)'
    : scrolled ? 'rgba(240,240,236,0.97)' : 'rgba(240,240,236,0.8)'
  const textMuted  = dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'
  const textStrong = dark ? '#ffffff' : '#111111'
  const border     = dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center gap-6 px-6 md:px-10"
        style={{
          background: navBg,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid ' + border : 'none',
          transition: 'background 0.35s',
        }}
      >
        <a href="/" className="flex-shrink-0" data-hover>
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            <path d="M11 1L2 7v14h7v-6h4v6h7V7L11 1z"
              stroke={textStrong} strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </a>

        <ul className="hidden md:flex items-center gap-0.5 mx-auto list-none m-0 p-0">
          {NAV_LINKS.map((link, i) => (
            <li key={link.label} className="flex items-center">
              <a href={link.href} data-hover
                className="px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] rounded-md transition-all duration-150"
                style={{ color: link.active ? textStrong : textMuted, fontWeight: link.active ? 700 : 400 }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = textStrong
                  e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = link.active ? textStrong : textMuted
                  e.currentTarget.style.background = 'transparent'
                }}
              >{link.label}</a>
              {i < NAV_LINKS.length - 1 && (
                <span style={{ color: textMuted, fontSize: '11px', opacity: 0.4, userSelect: 'none' }}>+</span>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2 ml-auto">
          {/* Theme toggle — affects entire site via ThemeContext */}
          <motion.button
            data-hover aria-label="Toggle theme"
            onClick={toggle}
            whileTap={{ scale: 0.88, rotate: 15 }}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ border: '1px solid ' + border }}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <AnimatePresence mode="wait">
              {dark ? (
                <motion.span key="sun"
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Sun size={14} color={textStrong} />
                </motion.span>
              ) : (
                <motion.span key="moon"
                  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Moon size={14} color={textStrong} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <button data-hover aria-label="Search"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ border: '1px solid ' + border }}>
            <Search size={14} color={textStrong} />
          </button>

          <button data-hover
            className="flex items-center gap-2 px-4 py-[7px] rounded-full font-mono text-[11px] tracking-[0.07em] transition-all duration-200"
            style={{ border: '1px solid ' + border, color: textStrong }}>
            <User size={13} />SIGN IN
          </button>
        </div>

        <button className="ml-auto md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setOpen(v => !v)} aria-label="Menu" data-hover>
          <motion.span className="block w-5 rounded-full" style={{ height: '1px', background: textStrong }}
            animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} transition={{ duration: 0.25 }} />
          <motion.span className="block w-5 rounded-full" style={{ height: '1px', background: textStrong }}
            animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.2 }} />
          <motion.span className="block w-5 rounded-full" style={{ height: '1px', background: textStrong }}
            animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} transition={{ duration: 0.25 }} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 left-0 right-0 z-[99] px-6 py-5 flex flex-col gap-1"
            style={{ background: navBg, backdropFilter: 'blur(20px)', borderBottom: '1px solid ' + border }}
          >
            {NAV_LINKS.map(link => (
              <a key={link.label} href={link.href} onClick={() => setOpen(false)}
                className="py-3 font-mono text-sm tracking-[0.1em]"
                style={{ color: link.active ? textStrong : textMuted, fontWeight: link.active ? 700 : 400, borderBottom: '1px solid ' + border }}>
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 pt-3 items-center">
              <button onClick={toggle}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ border: '1px solid ' + border }}>
                {dark ? <Sun size={14} color={textStrong} /> : <Moon size={14} color={textStrong} />}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11px] tracking-wider"
                style={{ border: '1px solid ' + border, color: textStrong }}>
                <User size={13} /> SIGN IN
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
