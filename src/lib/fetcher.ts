export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'


const BASE_URL = import.meta.env.VITE_API_BASE || ''


export async function api<T>(
url: string,
options: RequestInit & { method?: HttpMethod } = {}
): Promise<T> {
const controller = new AbortController()
const id = setTimeout(() => controller.abort(), 15000)
try {
const res = await fetch(BASE_URL + url, {
headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
...options,
signal: controller.signal,
})
if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
return (await res.json()) as T
} finally {
clearTimeout(id)
}
}