import { useEffect, useState } from 'react'

import ToastProvider from './components/Toast'
import Demo from './pages/Demo'

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
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
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 text-slate-900 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-black dark:text-slate-100">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.2),_transparent_50%)] opacity-60 dark:opacity-70"
          aria-hidden
        />
        <main className="relative flex min-h-screen items-center justify-center px-6 py-12">
          <Demo theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        </main>
      </div>
    </ToastProvider>
  )
}
