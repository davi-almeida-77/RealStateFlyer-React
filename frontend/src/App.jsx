import { Routes, Route } from 'react-router-dom'
import PropertyPage from '@/pages/PropertyPage'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'

export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Routes>
        <Route path="/"             element={<PropertyPage />} />
        <Route path="/property/:id" element={<PropertyPage />} />
      </Routes>
    </>
  )
}
