import { FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedText'

const NAV_LINKS = ['HOME', 'PROPERTIES', 'BUY', 'RENT', 'CONTACT']

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-16 pb-8 px-6 md:px-10">
      <div className="flex flex-wrap items-center gap-8 mb-16 pb-8 border-b border-white/[0.08]">
        <FadeUp className="flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M11 1L2 7v14h7v-6h4v6h7V7L11 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
          <span className="font-mono text-sm tracking-[0.1em]">CITY ARCADE</span>
        </FadeUp>
        <StaggerContainer className="hidden md:flex gap-8 mx-auto" stagger={0.05} delayChildren={0.1}>
          {NAV_LINKS.map(link => (
            <StaggerItem key={link}><a href="#" className="font-mono text-[11px] tracking-[0.1em] text-white/50 hover:text-white transition-colors duration-200">{link}</a></StaggerItem>
          ))}
        </StaggerContainer>
        <FadeUp delay={0.2} className="flex items-center gap-3 ml-auto">
          {[
            { label: 'Facebook', d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
            { label: 'X', d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
          ].map(({ label, d }) => (
            <a key={label} href="#" aria-label={label} className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center hover:border-white hover:bg-white/[0.08] transition-all duration-200">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>
            </a>
          ))}
        </FadeUp>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 pb-8 border-b border-white/[0.08]">
        <FadeUp delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 mb-3">ADDRESS</p>
          <p className="font-mono text-xs tracking-[0.05em] leading-loose text-white/65">C-67/3, SHAHEED MAZNU RD,<br />RADIO COLONY, SAVAR, DHAKA<br />BANGLADESH</p>
        </FadeUp>
        <FadeUp delay={0.2} className="md:text-right">
          <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 mb-3">CONTACT US</p>
          <p className="font-mono text-xs tracking-[0.05em] leading-loose text-white/65">HAMIDAJANNAT20@GMAIL.COM<br />+ (880) 161-687-6080</p>
        </FadeUp>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-white/30">
        <span className="font-mono text-[10px] tracking-wide">© 2025 CITY ARCADE. ALL RIGHTS RESERVED.</span>
        <span className="font-mono text-[10px] tracking-wide mx-auto hidden md:block">HAMIDA JANNAT — OWNER &amp; DESIGNER OF CITY ARCADE</span>
        <div className="flex gap-5 ml-auto">
          {['PRIVACY POLICY', 'TERMS & CONDITIONS'].map(t => (
            <a key={t} href="#" className="font-mono text-[10px] tracking-wide hover:text-white/70 transition-colors duration-200">{t}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
