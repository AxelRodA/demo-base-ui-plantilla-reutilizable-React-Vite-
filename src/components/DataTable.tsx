import type { ReactNode } from 'react'

type ColumnAlignment = 'left' | 'center' | 'right'

type Col<T> = {
  key: keyof T | string
  title: string
  align?: ColumnAlignment
  render?: (row: T) => ReactNode
}

type DataTableProps<T extends { id?: string | number }> = {
  columns: Col<T>[]
  data: T[]
  emptyMessage?: string
}

const alignmentClass = (align: ColumnAlignment = 'left') => {
  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'
  return 'text-left'
}

export default function DataTable<T extends { id?: string | number }>({ columns, data, emptyMessage }: DataTableProps<T>) {
  return (
    <div className="overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-white/70 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 backdrop-blur-sm dark:bg-slate-900/40 dark:text-slate-300">
          <tr>
            {columns.map((c) => (
              <th key={String(c.key)} className={`px-5 py-4 ${alignmentClass(c.align)}`}>
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200/40 text-slate-600 dark:divide-slate-800/50 dark:text-slate-200">
          {data.map((row, i) => (
            <tr
              key={row.id !== undefined ? String(row.id) : `row-${i}`}
              className="transition-colors hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
            >
              {columns.map((c) => {
                const key = c.key as keyof T
                return (
                  <td key={String(c.key)} className={`px-5 py-4 align-middle ${alignmentClass(c.align)} text-[15px]`}>
                    {c.render ? c.render(row) : String(row[key] ?? '')}
                  </td>
                )
              })}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td className="px-5 py-12 text-center text-sm text-slate-400 dark:text-slate-500" colSpan={columns.length}>
                {emptyMessage ?? 'No hay información disponible todavía.'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
