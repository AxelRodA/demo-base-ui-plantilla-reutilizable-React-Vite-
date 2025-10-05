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
      <div className="fixed bottom-4 right-4 space-y-2">
        {items.map((item) => (
          <div key={item.id} className="rounded bg-slate-800 px-3 py-2 text-white shadow">
            {item.text}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}
