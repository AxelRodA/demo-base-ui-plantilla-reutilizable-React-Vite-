import { spawn } from 'node:child_process'
import { runTailwind, spawnTailwind } from './tailwind-runner.mjs'

await runTailwind()

const tailwind = spawnTailwind(['--watch'])
const vite = spawn('vite', {
  stdio: 'inherit',
  shell: true,
})

const terminate = () => {
  tailwind.kill()
  vite.kill()
}

process.on('SIGINT', terminate)
process.on('SIGTERM', terminate)

const trackExit = (code) => {
  if (typeof code === 'number' && code !== 0) {
    process.exitCode = code
  }
}

tailwind.on('exit', (code) => {
  trackExit(code)
  vite.kill()
})

vite.on('exit', (code) => {
  trackExit(code)
  tailwind.kill()
})
