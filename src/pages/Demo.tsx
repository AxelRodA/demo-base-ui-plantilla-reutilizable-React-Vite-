import { useEffect, useState } from 'react'

import DataTable from '../components/DataTable'
import FormDemo from '../components/Form'
import Loader from '../components/Loader'
import Modal from '../components/Modal'
import { api } from '../lib/fetcher'

type UserRow = { id: number; name: string; email: string }

export default function Demo() {
  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(false)

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

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Demo base</h1>
        <button className="rounded border px-3 py-1" onClick={() => setOpen(true)}>
          Nuevo
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <DataTable
          columns={[
            { key: 'id', title: 'ID' },
            { key: 'name', title: 'Nombre' },
            { key: 'email', title: 'Email' },
          ]}
          data={rows}
        />
      )}

      <Modal open={open} title="Crear registro" onClose={() => setOpen(false)}>
        <FormDemo />
      </Modal>
    </section>
  )
}
