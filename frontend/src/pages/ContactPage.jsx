import { useState } from 'react'
import { motion } from 'motion/react'
import Navbar from '@/components/layout/Navbar'
import { MapPin, Mail, Phone, Send, User, MessageSquare } from 'lucide-react'

function ContactCard() {
  const [form,    setForm]    = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [focused, setFocused] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true) }, 1800)
  }

  const iStyle = (key) => ({
    width: '100%', padding: '13px 14px 13px 38px',
    background:   focused === key ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
    border:       focused === key ? '1px solid rgba(255,255,255,0.28)' : '1px solid rgba(255,255,255,0.09)',
    borderRadius: '10px', fontFamily: 'Space Mono, monospace',
    fontSize: '11px', letterSpacing: '0.05em', color: 'white',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s, background 0.2s',
  })

  return (
    <div style={{
      width: '100%',
      background: 'rgba(8,8,12,0.82)',
      backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)',
      border: '1px solid rgba(255,255,255,0.09)',
      borderRadius: '20px', padding: 'clamp(24px,5vw,44px)', boxSizing: 'border-box',
    }}>
      <p style={{ fontFamily:'Space Mono,monospace', fontSize:'10px', letterSpacing:'0.25em', color:'rgba(255,255,255,0.28)', marginBottom:'10px' }}>
        CITY ARCADE
      </p>
      <h2 style={{ fontFamily:'Bebas Neue,sans-serif', fontSize:'clamp(44px,6vw,72px)', color:'white', lineHeight:0.88, marginBottom:'20px' }}>
        GET IN<br /><span style={{ color:'rgba(255,255,255,0.15)' }}>TOUCH</span>
      </h2>

      <div style={{ display:'flex', flexDirection:'column', gap:'9px', marginBottom:'22px' }}>
        {[
          { Icon: MapPin, text: 'New York, NY · USA' },
          { Icon: Mail,   text: 'hello@cityarcade.com' },
          { Icon: Phone,  text: '+1 (212) 555-0100' },
        ].map(({ Icon, text }) => (
          <div key={text} style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ width:'27px', height:'27px', borderRadius:'50%', flexShrink:0, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.09)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon size={11} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
            </div>
            <span style={{ fontFamily:'Space Mono,monospace', fontSize:'10px', letterSpacing:'0.06em', color:'rgba(255,255,255,0.38)' }}>{text}</span>
          </div>
        ))}
      </div>

      <div style={{ height:'1px', background:'rgba(255,255,255,0.07)', marginBottom:'22px' }} />

      {sent ? (
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} style={{ textAlign:'center', padding:'28px 0' }}>
          <div style={{ width:'46px', height:'46px', borderRadius:'50%', margin:'0 auto 14px', background:'rgba(200,200,200,0.08)', border:'1px solid rgba(200,200,200,0.18)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px' }}>
            OK
          </div>
          <p style={{ fontFamily:'Bebas Neue,sans-serif', fontSize:'26px', color:'white', marginBottom:'6px' }}>MESSAGE SENT</p>
          <p style={{ fontFamily:'Space Mono,monospace', fontSize:'9px', letterSpacing:'0.1em', color:'rgba(255,255,255,0.3)' }}>We will reply within 24 hours.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:'10px' }}>
            <div style={{ position:'relative' }}>
              <User size={12} color="rgba(255,255,255,0.22)" strokeWidth={1.5} style={{ position:'absolute', left:'13px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} />
              <input type="text" placeholder="YOUR NAME" required value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                style={iStyle('name')} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
            </div>
            <div style={{ position:'relative' }}>
              <Mail size={12} color="rgba(255,255,255,0.22)" strokeWidth={1.5} style={{ position:'absolute', left:'13px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} />
              <input type="email" placeholder="YOUR EMAIL" required value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={iStyle('email')} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
            </div>
          </div>
          <div style={{ position:'relative' }}>
            <Phone size={12} color="rgba(255,255,255,0.22)" strokeWidth={1.5} style={{ position:'absolute', left:'13px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} />
            <input type="tel" placeholder="PHONE (OPTIONAL)" value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              style={iStyle('phone')} onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} />
          </div>
          <div style={{ position:'relative' }}>
            <MessageSquare size={12} color="rgba(255,255,255,0.22)" strokeWidth={1.5} style={{ position:'absolute', left:'13px', top:'14px', pointerEvents:'none' }} />
            <textarea placeholder="YOUR MESSAGE" required rows={4} value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              style={{ ...iStyle('message'), resize:'none', lineHeight:1.7, paddingTop:'13px' }}
              onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} />
          </div>
          <motion.button type="submit" disabled={sending}
            whileHover={!sending ? { scale:1.01 } : {}}
            whileTap={!sending ? { scale:0.98 } : {}}
            style={{ marginTop:'4px', padding:'15px', background:'white', color:'#111', border:'none', borderRadius:'10px', fontFamily:'Space Mono,monospace', fontSize:'12px', letterSpacing:'0.12em', fontWeight:700, cursor:sending ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', width:'100%', opacity:sending ? 0.8 : 1 }}>
            {sending ? (
              <>
                <motion.div animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:'linear' }}
                  style={{ width:'13px', height:'13px', border:'2px solid rgba(0,0,0,0.15)', borderTopColor:'#111', borderRadius:'50%' }} />
                SENDING...
              </>
            ) : (
              <>SEND MESSAGE <Send size={13} strokeWidth={2} /></>
            )}
          </motion.button>
        </form>
      )}
    </div>
  )
}

export default function ContactPage() {
  return (
    <div style={{ background:'#0a0a0a', minHeight:'100vh', position:'relative', overflow:'hidden' }}>

      {/* Grid background — same as home */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <Navbar />

      <div style={{
        position: 'relative', zIndex: 5,
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: 'clamp(80px,10vh,100px) clamp(16px,5vw,80px) clamp(32px,5vh,60px)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'clamp(32px,6vw,80px)',
          width: '100%', maxWidth: '1300px', margin: '0 auto', flexWrap: 'wrap',
        }}>

          {/* Ghost label */}
          <div style={{ flex:'1 1 200px', minWidth:0, paddingBottom:'clamp(0px,3vh,40px)', alignSelf:'flex-end', userSelect:'none', pointerEvents:'none' }}>
            <p style={{ fontFamily:'Space Mono,monospace', fontSize:'10px', letterSpacing:'0.2em', color:'rgba(255,255,255,0.12)', marginBottom:'10px' }}>
              NEW YORK  USA
            </p>
            <h1 style={{ fontFamily:'Bebas Neue,sans-serif', fontSize:'clamp(48px,7vw,110px)', color:'rgba(255,255,255,0.04)', lineHeight:0.88, letterSpacing:'-0.01em' }}>
              CITY<br />ARCADE
            </h1>
            <p style={{ fontFamily:'Space Mono,monospace', fontSize:'10px', letterSpacing:'0.12em', color:'rgba(255,255,255,0.08)', marginTop:'14px', lineHeight:1.8 }}>
              YOUR TRUSTED PARTNER<br />IN LUXURY REAL ESTATE
            </p>
          </div>

          {/* Card */}
          <motion.div
            initial={{ opacity:0, y:28 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.9, ease:[0.16,1,0.3,1], delay:0.2 }}
            style={{ flex:'1 1 340px', minWidth:0, width:'100%', maxWidth:'500px' }}
          >
            <ContactCard />
          </motion.div>
        </div>
      </div>

      <style>{`
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); font-size: 11px; letter-spacing: 0.05em; }
        @media (max-width: 640px) { input, textarea { font-size: 16px !important; } }
      `}</style>
    </div>
  )
}
