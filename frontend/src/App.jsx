import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import HomePage       from '@/pages/HomePage'
import PropertyPage   from '@/pages/PropertyPage'
import ContactPage    from '@/pages/ContactPage'
import CustomCursor   from '@/components/ui/CustomCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'

export default function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <ScrollProgress />
      <Routes>
        <Route path="/"             element={<HomePage />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/contact"      element={<ContactPage />} />
      </Routes>
    </ThemeProvider>
  )
}
