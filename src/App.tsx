import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import ToastProvider from './components/Toast'
import Demo from './pages/Demo'

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  )

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <ToastProvider>
      <div className="min-h-screen">
        <Navbar theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        <main className="mx-auto max-w-6xl p-4">
          <Demo />
        </main>
      </div>
    </ToastProvider>
  )
}
