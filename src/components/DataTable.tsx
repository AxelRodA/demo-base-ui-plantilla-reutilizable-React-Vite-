type Col<T> = { key: keyof T; title: string; render?: (row: T) => React.ReactNode }
export default function DataTable<T extends { id?: string | number }>({ columns, data }: {
columns: Col<T>[]
data: T[]
}) {
return (
<div className="overflow-x-auto">
<table className="min-w-full text-sm">
<thead className="bg-slate-100 dark:bg-slate-700">
<tr>
{columns.map((c) => (
<th key={String(c.key)} className="px-3 py-2 text-left font-semibold">{c.title}</th>
))}
</tr>
</thead>
<tbody>
{data.map((row, i) => (
<tr key={row.id !== undefined ? String(row.id) : `row-${i}`} className="border-b border-slate-200/40 dark:border-slate-700/40">
{columns.map((c) => (
<td key={String(c.key)} className="px-3 py-2">
{c.render ? c.render(row) : String(row[c.key])}
</td>
))}
</tr>
))}
</tbody>
</table>
</div>
)
}