import ListingsLayout from '@/components/listings/ListingsLayout'

const PROPERTIES = [
  { id: 'r1', name: 'Horizon Suite',     city: 'Miami Beach',  state: 'FL', type: 'Suite',     rooms: 3, baths: 4, area: 297, price: 12000,  tag: 'FOR RENT', lat: 25.7931, lng: -80.1300, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=90' },
  { id: 'r2', name: 'Azure Residence',   city: 'San Diego',    state: 'CA', type: 'Residence', rooms: 4, baths: 4, area: 418, price: 8500,   tag: 'FOR RENT', lat: 32.7157, lng: -117.1611, img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=90' },
  { id: 'r3', name: 'Vega Loft',         city: 'Chicago',      state: 'IL', type: 'Loft',      rooms: 2, baths: 2, area: 167, price: 4800,   tag: 'FOR RENT', lat: 41.8781, lng: -87.6298, img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=90' },
  { id: 'r4', name: 'Crystal Penthouse', city: 'New York',     state: 'NY', type: 'Penthouse', rooms: 5, baths: 5, area: 632, price: 35000,  tag: 'FOR RENT', lat: 40.7580, lng: -73.9855, img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=90' },
  { id: 'r5', name: 'Palm Retreat',      city: 'Scottsdale',   state: 'AZ', type: 'Villa',     rooms: 4, baths: 4, area: 520, price: 9200,   tag: 'FOR RENT', lat: 33.4942, lng: -111.9261, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=90' },
  { id: 'r6', name: 'Harbor View',       city: 'Seattle',      state: 'WA', type: 'Suite',     rooms: 2, baths: 2, area: 142, price: 5500,   tag: 'FOR RENT', lat: 47.6062, lng: -122.3321, img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=90' },
  { id: 'r7', name: 'Dune House',        city: 'Las Vegas',    state: 'NV', type: 'Villa',     rooms: 5, baths: 5, area: 680, price: 15000,  tag: 'FOR RENT', lat: 36.1699, lng: -115.1398, img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=90' },
  { id: 'r8', name: 'Indigo Flat',       city: 'Austin',       state: 'TX', type: 'Loft',      rooms: 1, baths: 1, area: 95,  price: 2800,   tag: 'FOR RENT', lat: 30.2672, lng: -97.7431, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=90' },
  { id: 'r9', name: 'Coral Estate',      city: 'Naples',       state: 'FL', type: 'Estate',    rooms: 6, baths: 6, area: 920, price: 22000,  tag: 'FOR RENT', lat: 26.1420, lng: -81.7948, img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=90' },
]

export default function RentPage() {
  return (
    <ListingsLayout
      pageType="rent"
      title="HOMES"
      subtitle="FOR RENT"
      properties={PROPERTIES}
    />
  )
}
