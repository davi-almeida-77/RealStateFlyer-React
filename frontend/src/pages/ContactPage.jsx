import Navbar from '@/components/layout/Navbar'
import SlidingContactPanel from '@/components/effects/SlidingContactPanel'

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        <SlidingContactPanel />
      </main>
    </div>
  )
}
