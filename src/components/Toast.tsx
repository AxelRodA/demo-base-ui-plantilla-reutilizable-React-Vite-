import { useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { ToastCtx } from './ToastCtx'

type ToastMsg = { id: number; text: string }


export default function ToastProvider({ children }: PropsWithChildren) {
const [items, setItems] = useState<ToastMsg[]>([])
const push = (text: string) => {
const id = Date.now()
setItems((p) => [...p, { id, text }])
setTimeout(() => setItems((p) => p.filter((i) => i.id !== id)), 3000)
}
const value = useMemo(() => ({ push }), [])
return (
<ToastCtx.Provider value={value}>
{children}
<div className="fixed bottom-4 right-4 space-y-2">
{items.map((i) => (
<div key={i.id} className="px-3 py-2 rounded shadow bg-slate-800 text-white">
{i.text}
</div>
))}
</div>
</ToastCtx.Provider>
)
}