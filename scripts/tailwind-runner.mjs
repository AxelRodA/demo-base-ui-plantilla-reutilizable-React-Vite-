import { spawn } from 'node:child_process'
import { tailwindBin } from './tailwind-bin.mjs'

export const baseArgs = ['-i', './src/styles/globals.css', '-o', './src/styles/tailwind.css']

export function runTailwind(additionalArgs = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(tailwindBin, [...baseArgs, ...additionalArgs], {
      stdio: 'inherit',
      shell: process.platform === 'win32',
    })

    child.on('error', (error) => reject(error))
    child.on('exit', (code) => {
      if (code === 0) {
        resolve(undefined)
      } else {
        reject(new Error(`Tailwind CLI exited with code ${code ?? 'null'}`))
      }
    })
  })
}

export function spawnTailwind(additionalArgs = []) {
  return spawn(tailwindBin, [...baseArgs, ...additionalArgs], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })
}
