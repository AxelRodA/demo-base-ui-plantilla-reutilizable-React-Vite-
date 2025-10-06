import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const binaryName = process.platform === 'win32' ? 'tailwindcss.cmd' : 'tailwindcss'

export const tailwindBin = resolve(__dirname, '..', 'node_modules', '.bin', binaryName)
