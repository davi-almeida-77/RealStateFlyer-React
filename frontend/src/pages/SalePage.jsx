import ListingsLayout from '@/components/listings/ListingsLayout'

const PROPERTIES = [
  { id: 's1', name: 'Hamida Villa',      city: 'Las Vegas',    state: 'NV', type: 'Villa',      rooms: 5, baths: 6, area: 745,  price: 1836000, tag: 'FOR SALE', lat: 36.1889, lng: -115.1745, img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=90' },
  { id: 's2', name: 'Crystal Penthouse', city: 'New York',     state: 'NY', type: 'Penthouse',  rooms: 5, baths: 5, area: 632,  price: 4200000, tag: 'FOR SALE', lat: 40.7580, lng: -73.9855, img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=90' },
  { id: 's3', name: 'Spotlek Grove',     city: 'Scottsdale',   state: 'AZ', type: 'Villa',      rooms: 6, baths: 7, area: 855,  price: 2100000, tag: 'FOR SALE', lat: 33.4942, lng: -111.9261, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=90' },
  { id: 's4', name: 'Pearl Manor',       city: 'Naples',       state: 'FL', type: 'Manor',      rooms: 7, baths: 8, area: 1115, price: 4500000, tag: 'FOR SALE', lat: 26.1420, lng: -81.7948, img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=90' },
  { id: 's5', name: 'Nova Towers',       city: 'Austin',       state: 'TX', type: 'Estate',     rooms: 3, baths: 3, area: 223,  price: 890000,  tag: 'FOR SALE', lat: 30.2672, lng: -97.7431, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=90' },
  { id: 's6', name: 'Manabey Estate',    city: 'Beverly Hills',state: 'CA', type: 'Estate',     rooms: 5, baths: 6, area: 680,  price: 3800000, tag: 'FOR SALE', lat: 34.0736, lng: -118.4004, img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=90' },
  { id: 's7', name: 'Cedar Heights',    city: 'Denver',        state: 'CO', type: 'Villa',      rooms: 4, baths: 4, area: 420,  price: 1250000, tag: 'FOR SALE', lat: 39.7392, lng: -104.9903, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=90' },
  { id: 's8', name: 'Amber Ridge',      city: 'Miami',         state: 'FL', type: 'Villa',      rooms: 4, baths: 5, area: 560,  price: 2750000, tag: 'FOR SALE', lat: 25.7617, lng: -80.1918, img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=90' },
  { id: 's9', name: 'Solstice Park',    city: 'San Francisco', state: 'CA', type: 'Loft',       rooms: 2, baths: 2, area: 185,  price: 1450000, tag: 'FOR SALE', lat: 37.7749, lng: -122.4194, img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=90' },
]

export default function SalePage() {
  return (
    <ListingsLayout
      pageType="sale"
      title="HOMES"
      subtitle="FOR SALE"
      properties={PROPERTIES}
    />
  )
}
