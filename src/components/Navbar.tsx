type Props = { theme: 'light' | 'dark'; onToggleTheme: () => void }

export default function Navbar({ theme, onToggleTheme }: Props) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/20 bg-white/70 backdrop-blur dark:bg-slate-900/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-3">
        <div className="font-bold">demo-base-ui</div>
        <div className="flex items-center gap-3">
          <a className="text-sm" href="#">
            Home
          </a>
          <a className="text-sm" href="#">
            Demo
          </a>
          <button className="rounded border px-3 py-1 text-sm" onClick={onToggleTheme}>
            {theme === 'dark' ? 'Claro' : 'Oscuro'}
          </button>
        </div>
      </nav>
    </header>
  )
}
