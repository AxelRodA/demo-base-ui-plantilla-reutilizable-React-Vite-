import { FC } from 'react'


type Props = { theme: 'light' | 'dark'; onToggleTheme: () => void }


const Navbar: FC<Props> = ({ theme, onToggleTheme }) => (
<header className="sticky top-0 z-10 border-b border-slate-200/20 backdrop-blur bg-white/70 dark:bg-slate-900/70">
<nav className="max-w-6xl mx-auto flex items-center justify-between p-3">
<div className="font-bold">demo-base-ui</div>
<div className="flex gap-3 items-center">
<a className="text-sm" href="#">Home</a>
<a className="text-sm" href="#">Demo</a>
<button className="text-sm px-3 py-1 rounded border" onClick={onToggleTheme}>
{theme === 'dark' ? 'Claro' : 'Oscuro'}
</button>
</div>
</nav>
</header>
)


export default Navbar