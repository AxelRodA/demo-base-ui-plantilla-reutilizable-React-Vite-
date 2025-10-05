import { useContext } from 'react'
import { ToastCtx } from '../components/Toast'
export const useToast = () => useContext(ToastCtx)