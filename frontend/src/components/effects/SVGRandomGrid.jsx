import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SVGRandomGrid({ cols = 12, rows = 8, triggerRef, children, className = '' }) {
  const svgRef   = useRef(null)

  useEffect(() => {
    const svg     = svgRef.current
    const trigger = triggerRef?.current
    if (!svg || !trigger) return

    svg.innerHTML = ''

    const NS     = 'http://www.w3.org/2000/svg'
    const defs   = document.createElementNS(NS, 'defs')
    const mask   = document.createElementNS(NS, 'mask')
    mask.setAttribute('id', 'grid-mask')
    defs.appendChild(mask)
    svg.appendChild(defs)

    const cellW = 100 / cols
    const cellH = 100 / rows
    const rects = []

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const rect = document.createElementNS(NS, 'rect')
        rect.setAttribute('x',      String(col * cellW))
        rect.setAttribute('y',      String(row * cellH))
        rect.setAttribute('width',  String(cellW))
        rect.setAttribute('height', String(cellH))
        rect.setAttribute('fill', 'white')
        rect.setAttribute('shape-rendering', 'crispEdges')
        mask.appendChild(rect)
        rects.push(rect)
      }
    }

    const overlay = document.createElementNS(NS, 'rect')
    overlay.setAttribute('width',  '100')
    overlay.setAttribute('height', '100')
    overlay.setAttribute('fill',   '#0a0a0a')
    overlay.setAttribute('mask',   'url(#grid-mask)')
    svg.appendChild(overlay)

    const shuffled = [...rects].sort(() => Math.random() - 0.5)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top top',
        end:   'bottom top',
        scrub: 2.5,
      },
    })

    shuffled.forEach((rect, i) => {
      tl.to(rect, {
        scaleY:          0,
        transformOrigin: '50% 50%',
        duration:        0.8,
        ease:            'power2.inOut',
      }, i * 0.015)
    })

    return () => { tl.kill() }
  }, [triggerRef, cols, rows])

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 z-0">{children}</div>
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      />
    </div>
  )
}
