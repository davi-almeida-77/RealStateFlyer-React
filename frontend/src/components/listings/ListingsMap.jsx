import { useEffect, useRef } from 'react'

const COORDS = {
  's1':{ lat:36.1889, lng:-115.1745 }, 's2':{ lat:40.7580, lng:-73.9855  },
  's3':{ lat:33.4942, lng:-111.9261 }, 's4':{ lat:26.1420, lng:-81.7948  },
  's5':{ lat:30.2672, lng:-97.7431  }, 's6':{ lat:34.0736, lng:-118.4004 },
  's7':{ lat:39.7392, lng:-104.9903 }, 's8':{ lat:25.7617, lng:-80.1918  },
  's9':{ lat:37.7749, lng:-122.4194 }, 'r1':{ lat:25.7931, lng:-80.1300  },
  'r2':{ lat:32.7157, lng:-117.1611 }, 'r3':{ lat:41.8781, lng:-87.6298  },
  'r4':{ lat:40.7580, lng:-73.9855  }, 'r5':{ lat:33.4942, lng:-111.9261 },
  'r6':{ lat:47.6062, lng:-122.3321 }, 'r7':{ lat:36.1699, lng:-115.1398 },
  'r8':{ lat:30.2672, lng:-97.7431  }, 'r9':{ lat:26.1420, lng:-81.7948  },
}

const fmt = (n) => n >= 1000000
  ? '$' + (n / 1000000).toFixed(1) + 'M'
  : '$' + Math.round(n / 1000) + 'K'

export default function ListingsMap({ selectedProp, allProps }) {
  const containerRef = useRef(null)
  const mapRef       = useRef(null)   // Leaflet map instance
  const markersRef   = useRef({})     // id → { marker, el }
  const readyRef     = useRef(false)  // Leaflet fully loaded + map created
  const pendingRef   = useRef(null)   // selectedProp waiting for ready

  /* ── Load Leaflet once ── */
  useEffect(() => {
    let cancelled = false

    function initMap() {
      if (cancelled || !containerRef.current) return
      try {
        const L   = window.L
        const map = L.map(containerRef.current, {
          center: [37.5, -100], zoom: 4,
          zoomControl: true, attributionControl: false,
        })
        L.tileLayer(
          'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
          { maxZoom: 19 }
        ).addTo(map)

        mapRef.current = map

        // Add pins for all properties
        ;(allProps || []).forEach(prop => {
          const coords = COORDS[prop.id]
          if (!coords) return
          try {
            const el = document.createElement('div')
            el.style.cssText = [
              'padding:4px 10px',
              'background:rgba(20,20,20,0.9)',
              'border:1px solid rgba(255,255,255,0.2)',
              'border-radius:100px',
              'font-family:Space Mono,monospace',
              'font-size:10px',
              'font-weight:700',
              'color:white',
              'white-space:nowrap',
              'cursor:pointer',
              'transition:all 0.2s',
            ].join(';')
            el.textContent = fmt(prop.price)
            const marker = L.marker([coords.lat, coords.lng], {
              icon: L.divIcon({ html: el, className: '', iconSize: [80, 26], iconAnchor: [40, 13] }),
            }).addTo(map)
            markersRef.current[prop.id] = { marker, el }
          } catch (_) {}
        })

        readyRef.current = true

        // If a selection was waiting, apply it now
        if (pendingRef.current) {
          flyTo(pendingRef.current)
          pendingRef.current = null
        }
      } catch (err) {
        console.warn('ListingsMap init error:', err)
      }
    }

    function loadLeaflet() {
      if (cancelled) return
      if (window.L) { initMap(); return }
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = () => { if (!cancelled) initMap() }
      script.onerror = () => console.warn('Leaflet failed to load')
      document.head.appendChild(script)
    }

    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'; link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    loadLeaflet()

    return () => {
      cancelled = true
      readyRef.current = false
      if (mapRef.current) {
        try { mapRef.current.remove() } catch (_) {}
        mapRef.current = null
      }
      markersRef.current = {}
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── GTA fly animation ── */
  function flyTo(prop) {
    if (!mapRef.current || !prop) return
    const coords = COORDS[prop.id]
    if (!coords) return

    try {
      // Reset all markers
      Object.values(markersRef.current).forEach(({ el }) => {
        el.style.background  = 'rgba(20,20,20,0.9)'
        el.style.borderColor = 'rgba(255,255,255,0.2)'
        el.style.color       = 'white'
        el.style.transform   = 'scale(1)'
      })

      // Step 1 — zoom out to USA
      mapRef.current.flyTo([37.5, -100], 4, { duration: 0.8, easeLinearity: 0.5 })

      // Step 2 — fly to property
      setTimeout(() => {
        if (!mapRef.current) return
        try {
          mapRef.current.flyTo([coords.lat, coords.lng], 13, { duration: 1.2, easeLinearity: 0.3 })
        } catch (_) {}

        // Step 3 — highlight pin
        setTimeout(() => {
          const m = markersRef.current[prop.id]
          if (m) {
            m.el.style.background  = 'white'
            m.el.style.borderColor = 'white'
            m.el.style.color       = '#111'
            m.el.style.transform   = 'scale(1.15)'
          }
        }, 1400)
      }, 900)
    } catch (err) {
      console.warn('flyTo error:', err)
    }
  }

  /* ── React to selectedProp changes ── */
  useEffect(() => {
    if (!selectedProp) return
    if (readyRef.current) {
      flyTo(selectedProp)
    } else {
      // Map not ready yet — queue it
      pendingRef.current = selectedProp
    }
  }, [selectedProp]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <style>{'.leaflet-container { background: #0a0a0a !important; }'}</style>
    </div>
  )
}
