import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, rafId

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`
        dotRef.current.style.top  = `${my}px`
      }
    }

    const animate = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`
        ringRef.current.style.top  = `${ry}px`
      }
      rafId = requestAnimationFrame(animate)
    }

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }

    window.addEventListener('mousemove', onMove)
    animate()
    const t = setTimeout(attachHover, 600)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      clearTimeout(t)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-dark" />
      <div ref={ringRef} className={`fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border border-dark transition-[width,height,opacity] duration-200 ${hovered ? 'w-14 h-14 opacity-50' : 'w-9 h-9 opacity-100'}`} />
    </>
  )
}
