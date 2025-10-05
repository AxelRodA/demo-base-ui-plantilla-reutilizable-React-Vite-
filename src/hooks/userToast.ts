import { useContext } from 'react'

import { ToastCtx } from '../components/ToastCtx'

export const useToast = () => {
  const context = useContext(ToastCtx)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
