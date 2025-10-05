import { useState } from 'react'
import { useToast } from '../hooks/userToast'
import { api } from '../lib/fetcher'


export default function FormDemo() {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const { push } = useToast()


const onSubmit = async (e: React.FormEvent) => {
e.preventDefault()
try {
await api('/echo', { method: 'POST', body: JSON.stringify({ name, email }) })
push('Guardado')
} catch (err) {
push('Error al guardar')
}
}


const Field = (props: { label: string; children: React.ReactNode }) => (
<label className="mb-3 block">
<span className="mb-1 block text-sm opacity-80">{props.label}</span>
{props.children}
</label>
)


return (
<form onSubmit={onSubmit} className="space-y-4">
<Field label="Nombre">
<input
className="w-full rounded border bg-transparent px-3 py-2 outline-none focus:ring"
value={name}
onChange={(e) => setName(e.target.value)}
/>
</Field>
<Field label="Email">
<input
type="email"
className="w-full rounded border bg-transparent px-3 py-2 outline-none focus:ring"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
</Field>
<button className="rounded bg-slate-900 px-4 py-2 text-white dark:bg-slate-700">Guardar</button>
</form>
)
}