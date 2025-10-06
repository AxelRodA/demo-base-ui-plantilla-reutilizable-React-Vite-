import { createContext } from 'react'

export type ToastContextValue = {
  push: (text: string) => void
}

export const ToastCtx = createContext<ToastContextValue | undefined>(undefined)
