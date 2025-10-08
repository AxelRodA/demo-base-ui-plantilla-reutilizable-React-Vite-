type Props = { theme: 'light' | 'dark'; onToggleTheme: () => void }

export default function Navbar({ theme, onToggleTheme }: Props) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/10 bg-white/60 backdrop-blur-xl transition-colors dark:border-slate-800/30 dark:bg-slate-950/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <div className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 text-base font-bold text-white shadow-lg shadow-blue-500/30">
            UI
          </span>
          <div className="leading-tight">
            <p>demo-base-ui</p>
            <span className="text-xs font-normal uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Plantilla</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a className="transition hover:text-blue-500 dark:hover:text-sky-400" href="#">
            Inicio
          </a>
          <a className="transition hover:text-blue-500 dark:hover:text-sky-400" href="#demo">
            Demo
          </a>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-sm transition hover:border-blue-500/60 hover:text-blue-600 hover:shadow-lg dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-sky-400/60 dark:hover:text-sky-300"
            onClick={onToggleTheme}
          >
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400" />
            {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          </button>
        </div>
      </nav>
    </header>
  )
}
