import { useEffect, useState } from 'react'
export default function useTheme() {
const [theme, setTheme] = useState<'light' | 'dark'>(
window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
)
useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
}, [theme])
return { theme, setTheme }
}