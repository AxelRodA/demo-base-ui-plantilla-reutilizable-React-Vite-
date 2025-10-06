import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{ open: boolean; title?: string; onClose: () => void }>

export default function Modal({ open, title, onClose, children }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800">
        {title && <h3 className="mb-2 text-lg font-semibold">{title}</h3>}
        {children}
      </div>
    </div>
  )
}
