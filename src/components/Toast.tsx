import { useCallback, useMemo, useState, type PropsWithChildren } from 'react'

import { ToastCtx, type ToastContextValue } from './ToastCtx'

type ToastMsg = { id: number; text: string }

export default function ToastProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<ToastMsg[]>([])

  const push = useCallback<ToastContextValue['push']>((text) => {
    const id = Date.now()
    setItems((previous) => [...previous, { id, text }])
    setTimeout(() => setItems((previous) => previous.filter((item) => item.id !== id)), 3000)
  }, [])

  const value = useMemo(() => ({ push }), [push])

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div className="fixed bottom-6 right-6 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-2xl border border-slate-800/40 bg-slate-900/80 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-slate-950/30 backdrop-blur"
          >
            {item.text}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}
