/**
 * PropertyDetailPage.jsx
 * 
 * Individual property page — accessed from /property/:id
 * Pulls property data by ID from a shared data file.
 * 
 * Sections:
 * 1. Hero — fullscreen image with title overlay
 * 2. Details — price, beds, baths, sqft, type, tag
 * 3. Gallery — horizontal scroll of extra images
 * 4. Description — long text
 * 5. Features — grid of amenities
 * 6. Location — embedded Leaflet map
 * 7. CTA — contact / schedule visit
 */

import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useState, useEffect, useRef } from 'react'
import Navbar  from '@/components/layout/Navbar'
import Footer  from '@/components/layout/Footer'
import { FadeUp } from '@/components/ui/AnimatedText'
import {
  MapPin, BedDouble, Bath, Maximize, ArrowLeft,
  ArrowRight, Heart, Share2, Calendar,
  Home, Wifi, Car, Waves, Trees, Shield,
} from 'lucide-react'

/* ── All properties data (combined Sale + Rent) ── */
const ALL_PROPS = [
  { id:'s1', name:'Hamida Villa',      city:'Las Vegas',    state:'NV', type:'Villa',     rooms:5, baths:6, area:745,  price:1836000, tag:'FOR SALE', lat:36.1889, lng:-115.1745, img:'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90','https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=90','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=90','https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=90'], desc:'Hamida Villa is a masterpiece of modern desert architecture. Nestled in the heart of Las Vegas, this 5-bedroom estate blends indoor and outdoor living seamlessly. Floor-to-ceiling glass walls frame panoramic views of the Strip, while the chef\'s kitchen and spa-grade master bath provide unmatched comfort. The infinity pool and cabana make this a true resort-style sanctuary.', features:['Private Pool','Home Theater','Smart Home','Wine Cellar','3-Car Garage','Rooftop Terrace','Chef Kitchen','Spa Bath'] },
  { id:'s2', name:'Crystal Penthouse', city:'New York',     state:'NY', type:'Penthouse', rooms:5, baths:5, area:632,  price:4200000, tag:'FOR SALE', lat:40.7580, lng:-73.9855, img:'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=90','https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=90','https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=90'], desc:'Crystal Penthouse sits atop one of Manhattan\'s most prestigious buildings, offering 360-degree views of Central Park and the city skyline. This fully bespoke residence was designed by award-winning architects with hand-selected materials sourced globally. Private elevator, dedicated concierge and valet parking included.', features:['Private Elevator','Concierge','Valet Parking','Central Park Views','Gym','Sauna','Smart Home','Wine Room'] },
  { id:'s3', name:'Spotlek Grove',     city:'Scottsdale',  state:'AZ', type:'Villa',     rooms:6, baths:7, area:855,  price:2100000, tag:'FOR SALE', lat:33.4942, lng:-111.9261, img:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=90','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=90'], desc:'Spotlek Grove is a stunning villa set in the desert foothills of Scottsdale. Surrounded by natural desert landscape, the property features an expansive outdoor living area with fire pits, pool, and direct access to hiking trails. Six oversized bedrooms ensure comfort for the whole family.', features:['Desert Views','Pool & Spa','Fire Pits','Hiking Access','4-Car Garage','Guest House','Outdoor Kitchen','Home Theater'] },
  { id:'s4', name:'Pearl Manor',       city:'Naples',      state:'FL', type:'Manor',     rooms:7, baths:8, area:1115, price:4500000, tag:'FOR SALE', lat:26.1420, lng:-81.7948, img:'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=90','https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90'], desc:'Pearl Manor is the definition of Florida luxury. This waterfront estate on the Gulf Coast offers a private dock, boat lift, and direct bay access. The 7-bedroom manor features a ballroom-size great room, chef\'s kitchen, and a resort pool with waterfall feature.', features:['Private Dock','Boat Lift','Gulf Access','Ballroom','Resort Pool','Staff Quarters','Home Theater','Generator'] },
  { id:'s5', name:'Nova Towers',       city:'Austin',      state:'TX', type:'Estate',    rooms:3, baths:3, area:223,  price:890000,  tag:'FOR SALE', lat:30.2672, lng:-97.7431, img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=90','https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=90'], desc:'Nova Towers is a sleek modern residence in the heart of Austin\'s most sought-after district. With floor-to-ceiling windows overlooking Lady Bird Lake, this 3-bedroom home combines contemporary design with tech-forward living. Walking distance to the best restaurants, music venues and the trail system.', features:['Lake Views','Smart Home','Rooftop Deck','EV Charging','Concierge','Pool','Gym Access','Dog Friendly'] },
  { id:'s6', name:'Manabey Estate',    city:'Beverly Hills',state:'CA', type:'Estate',    rooms:5, baths:6, area:680,  price:3800000, tag:'FOR SALE', lat:34.0736, lng:-118.4004, img:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=90','https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90'], desc:'Manabey Estate is a classic Beverly Hills compound that has been meticulously renovated. Set behind private gates on a lush half-acre lot, this estate features a guesthouse, tennis court, and screening room. A rare opportunity in one of the world\'s most prestigious zip codes.', features:['Gated Entry','Tennis Court','Guesthouse','Screening Room','Pool & Spa','Cabana','Gym','Wine Cellar'] },
  { id:'s7', name:'Cedar Heights',     city:'Denver',      state:'CO', type:'Villa',     rooms:4, baths:4, area:420,  price:1250000, tag:'FOR SALE', lat:39.7392, lng:-104.9903, img:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=90','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=90'], desc:'Cedar Heights offers mountain modern living at its finest. With sweeping views of the Rockies, this 4-bedroom villa was designed to frame the natural landscape. High ceilings, exposed timber beams, and a two-sided fireplace create warmth and drama in equal measure.', features:['Mountain Views','Ski Access','Hot Tub','Heated Floors','3-Car Garage','Mudroom','Fire Pit','EV Charging'] },
  { id:'s8', name:'Amber Ridge',       city:'Miami',       state:'FL', type:'Villa',     rooms:4, baths:5, area:560,  price:2750000, tag:'FOR SALE', lat:25.7617, lng:-80.1918, img:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=90','https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=90'], desc:'Amber Ridge sits in the exclusive enclave of Coconut Grove with bayfront views and private beach access. This tropical modernist villa features natural stone, teak wood, and lush landscaping that creates a seamless flow between interior and exterior living.', features:['Bayfront Views','Beach Access','Private Pool','Boat Dock','Smart Home','Outdoor Kitchen','Home Theater','Solar Panels'] },
  { id:'s9', name:'Solstice Park',     city:'San Francisco',state:'CA', type:'Loft',     rooms:2, baths:2, area:185,  price:1450000, tag:'FOR SALE', lat:37.7749, lng:-122.4194, img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=90','https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=90'], desc:'Solstice Park is a converted warehouse loft in the heart of SoMa. Original brick walls, 14-foot ceilings, and industrial steel windows combine with modern finishes to create a truly one-of-a-kind living space. Walking distance to tech campuses, dining and BART.', features:['Original Brick','14ft Ceilings','Roof Deck','Bike Storage','EV Charging','Gym','Dog Friendly','Concierge'] },
  { id:'r1', name:'Horizon Suite',     city:'Miami Beach', state:'FL', type:'Suite',     rooms:3, baths:4, area:297,  price:12000,   tag:'FOR RENT', lat:25.7931, lng:-80.1300, img:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=90','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=90'], desc:'Horizon Suite is a premium beachfront residence on Miami Beach\'s most iconic stretch of sand. Wake up to unobstructed ocean views from the master bedroom, enjoy breakfast on the wraparound terrace, or take a private beach chair reserved exclusively for residents.', features:['Oceanfront','Private Beach','Pool','Gym','Concierge','Valet','Restaurant Access','Spa'] },
  { id:'r2', name:'Azure Residence',   city:'San Diego',   state:'CA', type:'Residence', rooms:4, baths:4, area:418,  price:8500,    tag:'FOR RENT', lat:32.7157, lng:-117.1611, img:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=90','https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=90'], desc:'Azure Residence offers sophisticated coastal living in La Jolla. This 4-bedroom home is fully furnished with curated art and designer pieces. Steps from the beach, top-rated restaurants and boutique shopping.', features:['Ocean Views','Furnished','Pool','Parking','Gym','Smart TV','High-Speed WiFi','Beach Gear'] },
  { id:'r3', name:'Vega Loft',         city:'Chicago',     state:'IL', type:'Loft',      rooms:2, baths:2, area:167,  price:4800,    tag:'FOR RENT', lat:41.8781, lng:-87.6298, img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=90','https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=90'], desc:'Vega Loft sits in Chicago\'s vibrant West Loop, walking distance from the city\'s best restaurants and bars. This bright, fully-furnished 2-bedroom loft features 12-foot ceilings, industrial finishes, and stunning skyline views.', features:['Skyline Views','Fully Furnished','Gym','Rooftop','Bike Share','Smart Home','24hr Doorman','EV Charging'] },
  { id:'r4', name:'Crystal Penthouse', city:'New York',    state:'NY', type:'Penthouse', rooms:5, baths:5, area:632,  price:35000,   tag:'FOR RENT', lat:40.7580, lng:-73.9855, img:'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90','https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=90'], desc:'The most exclusive rental in Manhattan. Crystal Penthouse is available for monthly lease to qualified tenants. Private elevator, white-glove concierge, and every amenity imaginable.', features:['Private Elevator','White Glove','Central Park View','Gym','Pool','Sauna','Valet','Wine Room'] },
  { id:'r5', name:'Palm Retreat',      city:'Scottsdale',  state:'AZ', type:'Villa',     rooms:4, baths:4, area:520,  price:9200,    tag:'FOR RENT', lat:33.4942, lng:-111.9261, img:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=90','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=90'], desc:'Palm Retreat is your personal desert oasis in North Scottsdale. Fully furnished and resort-ready, this 4-bedroom villa is perfect for extended stays. Golf, hiking and dining all within minutes.', features:['Desert Views','Private Pool','Golf Access','BBQ','Fire Pit','Fully Furnished','Smart Home','EV Charging'] },
  { id:'r6', name:'Harbor View',       city:'Seattle',     state:'WA', type:'Suite',     rooms:2, baths:2, area:142,  price:5500,    tag:'FOR RENT', lat:47.6062, lng:-122.3321, img:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=90','https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=90'], desc:'Harbor View Suite overlooks Elliott Bay from the heart of downtown Seattle. Fully furnished with Scandinavian-inspired design, this 2-bedroom suite is ideal for executives on extended assignment.', features:['Bay Views','Furnished','Gym','Concierge','Bike Rental','High-Speed WiFi','Smart TV','Parking'] },
  { id:'r7', name:'Dune House',        city:'Las Vegas',   state:'NV', type:'Villa',     rooms:5, baths:5, area:680,  price:15000,   tag:'FOR RENT', lat:36.1699, lng:-115.1398, img:'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90','https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=90'], desc:'Dune House is the ultimate Vegas entertainment villa. With a private club-style pool, DJ booth, outdoor cinema, and direct concierge access to the Strip, this 5-bedroom home is designed for unforgettable experiences.', features:['Private Pool','DJ Booth','Outdoor Cinema','Strip Access','Home Theater','Chef Kitchen','Concierge','Valet'] },
  { id:'r8', name:'Indigo Flat',       city:'Austin',      state:'TX', type:'Loft',      rooms:1, baths:1, area:95,   price:2800,    tag:'FOR RENT', lat:30.2672, lng:-97.7431, img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=90','https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=90'], desc:'Indigo Flat puts you in the middle of Austin\'s thriving East Side. This smartly designed studio apartment is perfect for creatives, remote workers and anyone who wants to experience Austin at its most authentic.', features:['Smart Home','High-Speed WiFi','Furnished','Bike Storage','Dog Friendly','Rooftop Access','EV Charging','Gym'] },
  { id:'r9', name:'Coral Estate',      city:'Naples',      state:'FL', type:'Estate',    rooms:6, baths:6, area:920,  price:22000,   tag:'FOR RENT', lat:26.1420, lng:-81.7948, img:'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1600&q=95', gallery:['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=90','https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=90'], desc:'Coral Estate is a Gulf-front masterpiece in the exclusive Port Royal neighborhood. This 6-bedroom estate features a 120-foot private dock, resort pool, and unobstructed Gulf views from every room.', features:['Gulf Views','Private Dock','Resort Pool','Staff Quarters','Home Theater','Tennis Court','Outdoor Kitchen','Boat Lift'] },
]

const fmt = (n) => n >= 1000000
  ? '$' + (n/1000000).toFixed(2) + 'M'
  : '$' + Number(n).toLocaleString()

const FEATURE_ICONS = {
  'Private Pool': Waves, 'Pool & Spa': Waves, 'Resort Pool': Waves, 'Private Beach': Waves,
  'Smart Home': Wifi, 'High-Speed WiFi': Wifi,
  '3-Car Garage': Car, '4-Car Garage': Car, 'Parking': Car, 'Valet': Car,
  'Garden': Trees, 'Desert Views': Trees, 'Mountain Views': Trees,
  'Concierge': Shield, '24hr Doorman': Shield, 'Gated Entry': Shield,
}

/* ── Simple Leaflet map for property ── */
function PropertyMap({ prop }) {
  const mapRef     = useRef(null)
  const instanceRef = useRef(null)

  useEffect(() => {
    if (!prop?.lat || instanceRef.current) return
    const loadLeaflet = () => {
      if (!window.L) {
        setTimeout(loadLeaflet, 200)
        return
      }
      const L   = window.L
      const map = L.map(mapRef.current, {
        center:      [prop.lat, prop.lng],
        zoom:        14,
        zoomControl: true,
        attributionControl: false,
      })
      L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map)
      const el = document.createElement('div')
      el.style.cssText = 'padding:5px 12px;background:white;border-radius:100px;font-family:Space Mono,monospace;font-size:10px;font-weight:700;color:#111;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,0.3)'
      el.textContent = fmt(prop.price)
      L.marker([prop.lat, prop.lng], {
        icon: L.divIcon({ html: el, className: '', iconSize: [80, 28], iconAnchor: [40, 14] }),
      }).addTo(map)
      instanceRef.current = map
    }
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'; link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }
    if (!window.L) {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = loadLeaflet
      document.head.appendChild(script)
    } else {
      loadLeaflet()
    }
    return () => { if (instanceRef.current) { instanceRef.current.remove(); instanceRef.current = null } }
  }, [prop])

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: '16px', overflow: 'hidden' }}>
      <style>{'.leaflet-container{background:#0a0a0a!important}'}</style>
    </div>
  )
}

/* ── Gallery strip ── */
function GalleryStrip({ images, heroImg }) {
  const all = [heroImg, ...images].filter(Boolean)
  const [active, setActive] = useState(0)

  return (
    <div>
      {/* Main image */}
      <div style={{ width: '100%', aspectRatio: '16/7', overflow: 'hidden', borderRadius: '16px', marginBottom: '10px' }}>
        <motion.img
          key={active}
          src={all[active]}
          alt="Property"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      {/* Thumbs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {all.map((img, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            flexShrink: 0,
            width: '80px', height: '56px',
            borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', padding: 0,
            border: i === active ? '2px solid white' : '2px solid transparent',
            transition: 'border-color 0.2s',
          }}>
            <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Page ── */
export default function PropertyDetailPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const [liked,  setLiked]  = useState(false)
  const prop = ALL_PROPS.find(p => p.id === id)

  if (!prop) return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <Navbar />
      <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '48px', color: 'white' }}>PROPERTY NOT FOUND</p>
      <button onClick={() => navigate(-1)} style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px', padding: '10px 24px', cursor: 'pointer' }}>
        ← GO BACK
      </button>
    </div>
  )

  const isRent = prop.tag === 'FOR RENT'

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ── */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(340px, 55vh, 600px)', overflow: 'hidden' }}>
        <img src={prop.img} alt={prop.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />

        {/* Back button */}
        <button onClick={() => navigate(-1)}
          style={{
            position: 'absolute', top: '80px', left: 'clamp(16px,5vw,72px)',
            display: 'flex', alignItems: 'center', gap: '8px',
            fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '100px', padding: '8px 16px', cursor: 'pointer',
          }}>
          <ArrowLeft size={12} strokeWidth={1.5} /> BACK
        </button>

        {/* Actions */}
        <div style={{ position: 'absolute', top: '80px', right: 'clamp(16px,5vw,72px)', display: 'flex', gap: '8px' }}>
          <button onClick={() => setLiked(v => !v)} style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Heart size={14} fill={liked ? 'rgba(255,80,80,0.9)' : 'none'} color={liked ? 'rgba(255,80,80,0.9)' : 'white'} />
          </button>
          <button style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Share2 size={14} color="white" />
          </button>
        </div>

        {/* Title overlay */}
        <div style={{ position: 'absolute', bottom: 'clamp(24px,4vh,48px)', left: 'clamp(16px,5vw,72px)', right: 'clamp(16px,5vw,72px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.14em',
              padding: '5px 14px', borderRadius: '100px',
              background: isRent ? 'rgba(100,160,255,0.2)' : 'rgba(255,255,255,0.12)',
              border: isRent ? '1px solid rgba(100,160,255,0.35)' : '1px solid rgba(255,255,255,0.25)',
              color: isRent ? 'rgba(160,210,255,0.9)' : 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(8px)',
            }}>{prop.tag}</span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={11} strokeWidth={1.5} /> {prop.city}, {prop.state}
            </span>
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px,5.5vw,88px)', color: 'white', lineHeight: 0.9, marginBottom: '12px' }}>
            {prop.name}
            <span style={{ color: 'rgba(255,255,255,0.22)' }}> {prop.type}</span>
          </h1>
          <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(22px,3vw,42px)', color: 'rgba(255,255,255,0.9)' }}>
            {fmt(prop.price)}{isRent ? '/mo' : ''}
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: 'clamp(28px,5vh,56px) clamp(16px,5vw,72px)' }}>

        {/* Stats bar */}
        <div style={{
          display: 'flex', gap: '1px', background: 'rgba(255,255,255,0.07)',
          borderRadius: '14px', overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.07)', marginBottom: '40px', flexWrap: 'wrap',
        }}>
          {[
            { Icon: BedDouble, val: prop.rooms,  label: 'Bedrooms'  },
            { Icon: Bath,      val: prop.baths,  label: 'Bathrooms' },
            { Icon: Maximize,  val: prop.area + ' m²', label: 'Area' },
            { Icon: Home,      val: prop.type,   label: 'Type'      },
          ].map(({ Icon, val, label }) => (
            <div key={label} style={{ flex: '1 1 140px', padding: '18px 20px', background: 'rgba(10,10,10,0.7)', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icon size={13} color="rgba(255,255,255,0.35)" strokeWidth={1.5} />
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>
                  {label.toUpperCase()}
                </span>
              </div>
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(18px,2vw,24px)', color: 'white', letterSpacing: '0.03em' }}>
                {val}
              </span>
            </div>
          ))}
        </div>

        {/* Two column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: 'clamp(24px,5vw,56px)' }}>

          {/* Left col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>

            {/* Gallery */}
            <FadeUp>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(22px,2.5vw,32px)', color: 'white', marginBottom: '16px', letterSpacing: '0.04em' }}>
                GALLERY
              </h2>
              <GalleryStrip images={prop.gallery || []} heroImg={prop.img} />
            </FadeUp>

            {/* Description */}
            <FadeUp delay={0.1}>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(22px,2.5vw,32px)', color: 'white', marginBottom: '14px', letterSpacing: '0.04em' }}>
                ABOUT THIS PROPERTY
              </h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(14px,1.2vw,16px)', lineHeight: 1.85, color: 'rgba(255,255,255,0.45)' }}>
                {prop.desc}
              </p>
            </FadeUp>

            {/* Features */}
            <FadeUp delay={0.15}>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(22px,2.5vw,32px)', color: 'white', marginBottom: '16px', letterSpacing: '0.04em' }}>
                AMENITIES
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: '10px' }}>
                {(prop.features || []).map(feat => {
                  const Icon = FEATURE_ICONS[feat] || Shield
                  return (
                    <div key={feat} style={{
                      display: 'flex', alignItems: 'center', gap: '9px',
                      padding: '12px 14px', borderRadius: '10px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                      <Icon size={13} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.07em', color: 'rgba(255,255,255,0.55)' }}>
                        {feat}
                      </span>
                    </div>
                  )
                })}
              </div>
            </FadeUp>
          </div>

          {/* Right col — sticky */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* CTA card */}
            <FadeUp>
              <div style={{
                position: 'sticky', top: '80px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '16px', padding: 'clamp(20px,3vw,32px)',
                display: 'flex', flexDirection: 'column', gap: '16px',
              }}>
                <div>
                  <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>
                    {isRent ? 'MONTHLY RENTAL' : 'ASKING PRICE'}
                  </p>
                  <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(28px,4vw,48px)', color: 'white', lineHeight: 1 }}>
                    {fmt(prop.price)}{isRent ? '/mo' : ''}
                  </p>
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

                {/* Agent info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.12)' }}>
                    <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80" alt="Agent"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.06em', color: 'white', marginBottom: '2px' }}>Marcus Velez</p>
                    <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)' }}>Senior Real Estate Advisor</p>
                  </div>
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

                {/* CTA buttons */}
                <a href="/contact" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  padding: '15px', borderRadius: '10px',
                  background: 'white', color: '#111',
                  fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '0.12em', fontWeight: 700,
                  textDecoration: 'none',
                }}>
                  <Calendar size={14} strokeWidth={2} />
                  SCHEDULE VISIT
                </a>
                <a href="/agent" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  padding: '14px', borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '0.12em',
                  textDecoration: 'none', background: 'rgba(255,255,255,0.04)',
                }}>
                  CONTACT AGENT
                  <ArrowRight size={13} strokeWidth={1.5} />
                </a>

                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.22)', textAlign: 'center', lineHeight: 1.6 }}>
                  No commitment required · Free consultation · 24h response
                </p>
              </div>
            </FadeUp>

            {/* Map */}
            {prop.lat && (
              <FadeUp delay={0.1}>
                <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(22px,2.5vw,32px)', color: 'white', marginBottom: '14px', letterSpacing: '0.04em' }}>
                  LOCATION
                </h2>
                <div style={{ height: 'clamp(220px,30vh,340px)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <PropertyMap prop={prop} />
                </div>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={11} strokeWidth={1.5} /> {prop.city}, {prop.state}
                </p>
              </FadeUp>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
