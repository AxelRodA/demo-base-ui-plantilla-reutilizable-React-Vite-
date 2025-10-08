import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{ open: boolean; title?: string; onClose: () => void }>

export default function Modal({ open, title, onClose, children }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-200/30 bg-gradient-to-br from-white via-slate-50 to-white p-6 shadow-2xl shadow-slate-950/30 dark:border-slate-700/50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        {title && <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>}
        <div className="space-y-5">{children}</div>
      </div>
    </div>
  )
}
