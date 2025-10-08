import { useEffect, useMemo, useState, type ReactNode } from 'react'

import DataTable from '../components/DataTable'
import FormDemo from '../components/Form'
import Loader from '../components/Loader'
import Modal from '../components/Modal'
import { api } from '../lib/fetcher'

type UserRow = { id: number; name: string; email: string }

type Props = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const SearchIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
    <path
      d="M14.167 14.167 18 18m-2.333-9.333a5.833 5.833 0 1 1-11.667 0 5.833 5.833 0 0 1 11.667 0Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const PlusIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
    <path d="M10 4.167v11.666M4.167 10h11.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const EditIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
    <path
      d="M11.542 5.5 4.375 12.667l-.709 3.041 3.042-.708L13.875 7.833m-2.333-2.333 1.458-1.459a1.75 1.75 0 1 1 2.474 2.475L14.5 7.166m-2.333-2.333L14.5 7.166"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const TrashIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
    <path
      d="M15.5 6.167h-11m2.333 0V4.5a1.167 1.167 0 0 1 1.167-1.167h4a1.167 1.167 0 0 1 1.167 1.167v1.667m-5.834 4.666v3.5m3.334-3.5v3.5M4.5 6.167l.7 8.75a1.167 1.167 0 0 0 1.162 1.083h7.276a1.167 1.167 0 0 0 1.162-1.083l.7-8.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ActionButton = ({ label, children }: { label: string; children: ReactNode }) => (
  <button
    type="button"
    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 bg-white/70 text-slate-500 transition hover:border-blue-500/50 hover:text-blue-500 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-sky-400/60 dark:hover:text-sky-300"
    aria-label={label}
  >
    {children}
  </button>
)

export default function Demo({ theme, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    void (async () => {
      setLoading(true)
      try {
        const data = await api<UserRow[]>('/users')
        setRows(data)
      } catch {
        setRows([
          { id: 1, name: 'Ana', email: 'ana@mail.com' },
          { id: 2, name: 'Luis', email: 'luis@mail.com' },
        ])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const filteredRows = useMemo(() => {
    if (!search) return rows
    return rows.filter((row) =>
      [row.name, row.email, row.id].some((value) => String(value).toLowerCase().includes(search.toLowerCase()))
    )
  }, [rows, search])

  return (
    <section id="demo" className="relative w-full max-w-3xl">
      <div className="pointer-events-none absolute -inset-x-6 -top-16 h-40 rounded-full bg-gradient-to-r from-blue-400/25 via-sky-400/20 to-cyan-300/20 blur-3xl dark:from-blue-500/25 dark:via-sky-500/25 dark:to-cyan-400/20" />

      <div className="relative overflow-hidden rounded-[32px] border border-slate-200/60 bg-white/80 p-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-2xl dark:border-slate-800/60 dark:bg-slate-950/50 dark:shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)]">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-400 text-lg font-semibold text-white shadow-lg shadow-blue-500/30">
              A
            </span>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Project Admin</h1>
              <p className="text-sm text-slate-500 dark:text-slate-300">Gestiona tus usuarios y sus permisos con un panel cuidado.</p>
            </div>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 shadow-sm transition hover:border-blue-500/50 hover:text-blue-500 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-sky-400/60 dark:hover:text-sky-300"
            onClick={onToggleTheme}
            type="button"
          >
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400" />
            {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          </button>
        </header>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-500 hover:via-sky-500 hover:to-cyan-300"
            onClick={() => setOpen(true)}
            type="button"
          >
            <PlusIcon />
            Nuevo registro
          </button>

          <label className="relative flex w-full items-center sm:max-w-xs">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </span>
            <input
              className="w-full rounded-full border border-slate-200/70 bg-white/70 py-2 pl-11 pr-4 text-sm text-slate-600 shadow-inner shadow-slate-200/80 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-400/30 dark:border-slate-700/70 dark:bg-slate-900/60 dark:text-slate-200 dark:focus:border-sky-400/60 dark:focus:ring-sky-400/25"
              placeholder="Buscar usuario"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              type="search"
            />
          </label>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/50">
          {loading ? (
            <div className="flex h-44 items-center justify-center">
              <Loader />
            </div>
          ) : (
            <DataTable
              columns={[
                { key: 'id', title: 'ID', align: 'left' },
                { key: 'name', title: 'Nombre', align: 'left' },
                { key: 'email', title: 'Email', align: 'left' },
                {
                  key: 'actions',
                  title: 'Acciones',
                  align: 'right',
                  render: () => (
                    <div className="flex items-center justify-end gap-2">
                      <ActionButton label="Editar">
                        <EditIcon />
                      </ActionButton>
                      <ActionButton label="Eliminar">
                        <TrashIcon />
                      </ActionButton>
                    </div>
                  ),
                },
              ]}
              data={filteredRows}
              emptyMessage={
                search ? 'No se encontraron coincidencias para tu búsqueda.' : 'No hay registros disponibles todavía.'
              }
            />
          )}
        </div>
      </div>

      <Modal open={open} title="Crear registro" onClose={() => setOpen(false)}>
        <FormDemo />
      </Modal>
    </section>
  )
}
