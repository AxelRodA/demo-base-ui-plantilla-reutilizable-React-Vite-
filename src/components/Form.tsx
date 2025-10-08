import { useState, type FormEvent, type ReactNode } from 'react'

import { useToast } from '../hooks/userToast'
import { api } from '../lib/fetcher'

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </span>
      {children}
    </label>
  )
}

export default function FormDemo() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { push } = useToast()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await api('/echo', { method: 'POST', body: JSON.stringify({ name, email }) })
      push('Guardado')
    } catch (err) {
      push('Error al guardar')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Field label="Nombre">
        <input
          className="w-full rounded-2xl border border-slate-200/60 bg-white/80 px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-500/70 focus:ring-2 focus:ring-blue-400/40 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-100 dark:focus:border-sky-400/70 dark:focus:ring-sky-400/30"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Field>
      <Field label="Email">
        <input
          type="email"
          className="w-full rounded-2xl border border-slate-200/60 bg-white/80 px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-500/70 focus:ring-2 focus:ring-blue-400/40 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-100 dark:focus:border-sky-400/70 dark:focus:ring-sky-400/30"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Field>
      <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-500 hover:via-sky-500 hover:to-cyan-300">
        Guardar
      </button>
    </form>
  )
}
