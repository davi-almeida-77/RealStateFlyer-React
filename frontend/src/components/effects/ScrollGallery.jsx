import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SVG_NS    = 'http://www.w3.org/2000/svg'
const GRID_COLS = 14
const GRID_ROWS = 9

function buildLayer(svgEl, maskId, imgSrc, vbW, vbH) {
  svgEl.innerHTML = ''
  svgEl.setAttribute('viewBox', '0 0 ' + vbW + ' ' + vbH)

  const defs   = document.createElementNS(SVG_NS, 'defs')
  const maskEl = document.createElementNS(SVG_NS, 'mask')
  maskEl.setAttribute('id', maskId)

  const base = document.createElementNS(SVG_NS, 'rect')
  base.setAttribute('x', '0'); base.setAttribute('y', '0')
  base.setAttribute('width', String(vbW)); base.setAttribute('height', String(vbH))
  base.setAttribute('fill', 'black')
  maskEl.appendChild(base)

  const cellW = vbW / GRID_COLS
  const cellH = vbH / GRID_ROWS
  const rects = []

  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const r = document.createElementNS(SVG_NS, 'rect')
      r.setAttribute('x',               String(col * cellW))
      r.setAttribute('y',               String(row * cellH))
      r.setAttribute('width',           String(cellW + 0.3))
      r.setAttribute('height',          String(cellH + 0.3))
      r.setAttribute('fill',            'white')
      r.setAttribute('shape-rendering', 'crispEdges')
      gsap.set(r, { scaleY: 0, transformOrigin: '50% 50%' })
      maskEl.appendChild(r)
      rects.push(r)
    }
  }

  defs.appendChild(maskEl)
  svgEl.appendChild(defs)

  const imgEl = document.createElementNS(SVG_NS, 'image')
  imgEl.setAttribute('href',                imgSrc)
  imgEl.setAttribute('x',                   '0'); imgEl.setAttribute('y', '0')
  imgEl.setAttribute('width',               String(vbW))
  imgEl.setAttribute('height',              String(vbH))
  imgEl.setAttribute('preserveAspectRatio', 'xMidYMid slice')
  imgEl.setAttribute('mask',                'url(#' + maskId + ')')
  svgEl.appendChild(imgEl)

  return rects
}

function openGridTl(rects) {
  const shuffled = [...rects].sort(() => Math.random() - 0.5)
  return gsap.timeline().to(shuffled, {
    scaleY: 1, duration: 0.65, ease: 'power2.inOut',
    stagger: { each: 0.008, from: 'random' },
  })
}

function textInTl(el) {
  return gsap.timeline().to(el, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 1.2, ease: 'expo.out' })
}
function textOutTl(el) {
  return gsap.timeline().to(el, { clipPath: 'inset(0% 0% 100% 0%)', y: -28, duration: 1.0, ease: 'power2.inOut' })
}

export default function ScrollGallery({ slides }) {
  const stageRef  = useRef(null)
  const svgRefs   = useRef([])
  const txtRefs   = useRef([])
  const cityRefs  = useRef([])
  const fillRefs  = useRef([])
  const masterRef = useRef(null)
  const count     = slides.length

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const W   = window.innerWidth
    const H   = window.innerHeight
    const vbW = 100
    const vbH = (H / W) * 100

    const allRects = svgRefs.current.map((svg, i) => {
      if (!svg) return []
      const maskId = 'sg-mask-' + i + '-' + Math.random().toString(36).slice(2)
      return buildLayer(svg, maskId, slides[i].img, vbW, vbH)
    })

    // Init text + city — start hidden
    txtRefs.current.forEach(el => { if (el) gsap.set(el,  { clipPath: 'inset(100% 0% 0% 0%)', y: 36 }) })
    cityRefs.current.forEach(el => { if (el) gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)', y: 20 }) })

    if (masterRef.current) masterRef.current.kill()

    const master = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start:   'top top',
        end:     'bottom bottom',
        scrub:   2.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    allRects.forEach((rects, i) => {
      if (!rects.length) return

      // Open grid
      master.add(openGridTl(rects))

      // City label animates in at the SAME TIME as grid starts opening
      if (cityRefs.current[i]) {
        master.add(
          gsap.timeline().to(cityRefs.current[i], { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 0.8, ease: 'expo.out' }),
          '<0.05'
        )
      }

      // Main text in — slightly after grid starts
      if (txtRefs.current[i]) {
        master.add(textInTl(txtRefs.current[i]), '<0.15')
      }

      // Text + city out before next image
      if (i < count - 1) {
        if (txtRefs.current[i]) master.add(textOutTl(txtRefs.current[i]), '+=0.55')
        if (cityRefs.current[i]) {
          master.add(
            gsap.timeline().to(cityRefs.current[i], { clipPath: 'inset(0% 0% 100% 0%)', y: -16, duration: 0.8, ease: 'power2.inOut' }),
            '<0.1'
          )
        }
      }
    })

    masterRef.current = master

    // Progress bar
    const pbST = ScrollTrigger.create({
      trigger: stage,
      start: 'top top', end: 'bottom bottom', scrub: 0.3,
      onUpdate: (self) => {
        fillRefs.current.filter(Boolean).forEach((fill, i) => {
          let p = (self.progress - i / count) * count
          p = Math.max(0, Math.min(1, p))
          fill.style.width = (p * 100) + '%'
        })
      },
    })

    return () => {
      if (masterRef.current) masterRef.current.kill()
      pbST.kill()
    }
  }, [slides, count])

  return (
    <section
      ref={stageRef}
      style={{ height: count * 160 + 'vh', position: 'relative', background: '#0a0a0a' }}
    >
      <div style={{ position: 'sticky', top: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>

        {/* SVG image layers */}
        {slides.map((slide, i) => (
          <svg
            key={slide.id || i}
            ref={el => { svgRefs.current[i] = el }}
            preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          />
        ))}

        {/* Gradient */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
        }} />

        {/* Text overlays */}
        {slides.map((slide, i) => (
          <div key={'txt-' + i} style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: 'clamp(28px, 4vw, 72px)',
            paddingBottom: 'clamp(72px, 9vh, 130px)',
            zIndex: 20, pointerEvents: 'none',
          }}>

            {/* City — top of content, animates in first */}
            <div
              ref={el => { cityRefs.current[i] = el }}
              style={{
                marginBottom: '12px',
                clipPath: 'inset(100% 0% 0% 0%)',
              }}
            >
              <span style={{
                fontFamily:    'Space Mono, monospace',
                fontSize:      'clamp(10px, 1vw, 13px)',
                letterSpacing: '0.2em',
                color:         'rgba(255,255,255,0.45)',
                display:       'flex',
                alignItems:    'center',
                gap:           '6px',
              }}>
                📍 {slide.city}
                {slide.state && (
                  <span style={{ color: 'rgba(255,255,255,0.25)' }}>{slide.state}</span>
                )}
              </span>
            </div>

            {/* Main content block */}
            <div
              ref={el => { txtRefs.current[i] = el }}
              style={{ clipPath: 'inset(100% 0% 0% 0%)', pointerEvents: 'auto' }}
            >
              {/* Tags row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.15em',
                  color: slide.tag === 'FOR RENT' ? 'rgba(160,210,255,0.85)' : 'rgba(255,255,255,0.7)',
                  padding: '5px 14px', borderRadius: '100px',
                  border: slide.tag === 'FOR RENT' ? '1px solid rgba(160,210,255,0.3)' : '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  background: slide.tag === 'FOR RENT' ? 'rgba(160,210,255,0.08)' : 'rgba(255,255,255,0.06)',
                }}>{slide.tag}</span>
                <span style={{
                  fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.28)',
                }}>
                  {String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </span>
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(60px, 8.5vw, 130px)',
                lineHeight: 0.9, letterSpacing: '-0.01em', marginBottom: '14px', color: 'white',
              }}>
                {slide.title}
                <span style={{ color: 'rgba(255,255,255,0.2)' }}> {slide.sub}</span>
              </h2>

              {/* Info row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: 'clamp(20px, 2.2vw, 32px)', color: 'rgba(255,255,255,0.88)',
                }}>{slide.price}</span>
                {slide.beds && (
                  <span style={{
                    fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.08em',
                    color: 'rgba(255,255,255,0.42)', padding: '4px 12px', borderRadius: '100px',
                    border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                  }}>{slide.beds}bd · {slide.baths}ba · {slide.sqft?.toLocaleString()} ft</span>
                )}
                <a href={slide.href || '/property/hamida-villa'} style={{
                  marginLeft: 'auto', fontFamily: 'Space Mono, monospace', fontSize: '11px',
                  letterSpacing: '0.1em', color: '#111', background: 'white',
                  padding: '10px 22px', borderRadius: '100px', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>VIEW →</a>
              </div>
            </div>
          </div>
        ))}

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: 'clamp(20px, 3vw, 48px)', display: 'flex', gap: '10px', zIndex: 30,
        }}>
          {slides.map((_, i) => (
            <div key={'pb-' + i} style={{
              flex: 1, height: '2px', background: 'rgba(255,255,255,0.18)',
              overflow: 'hidden', position: 'relative', borderRadius: '2px',
            }}>
              <div ref={el => { fillRefs.current[i] = el }} style={{
                position: 'absolute', top: 0, left: 0, width: '0%', height: '100%',
                background: 'white', borderRadius: '2px',
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
