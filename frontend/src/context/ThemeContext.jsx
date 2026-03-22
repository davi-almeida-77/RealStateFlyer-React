import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.style.setProperty('--bg-page',   '#0a0a0a')
      root.style.setProperty('--bg-card',   'rgba(255,255,255,0.04)')
      root.style.setProperty('--text-main', '#ffffff')
      root.style.setProperty('--text-muted','rgba(255,255,255,0.38)')
      root.style.setProperty('--border',    'rgba(255,255,255,0.08)')
      document.body.style.background = '#0a0a0a'
      document.body.style.color      = '#ffffff'
      root.setAttribute('data-theme', 'dark')
    } else {
      root.style.setProperty('--bg-page',   '#f0f0ec')
      root.style.setProperty('--bg-card',   'rgba(0,0,0,0.03)')
      root.style.setProperty('--text-main', '#111111')
      root.style.setProperty('--text-muted','rgba(0,0,0,0.5)')
      root.style.setProperty('--border',    'rgba(0,0,0,0.08)')
      document.body.style.background = '#f0f0ec'
      document.body.style.color      = '#111111'
      root.setAttribute('data-theme', 'light')
    }
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, setDark, toggle: () => setDark(v => !v) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
