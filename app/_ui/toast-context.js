'use client'

import { createContext, useContext, useState } from 'react'
import { classNames } from '@/app/_lib/general'
import { v4 as uuidv4 } from 'uuid'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = ({ message,
    type,
    description,
    duration = 4000,
    position = 'bottom-24 left-3 md:bottom-3 md:left-6'
  }) => {
    const id = uuidv4()
    setToasts((prev) => [
      ...prev,
      { id, message, description, type, position },
    ])

    setTimeout(() => {
      removeToast(id)
    }, duration)
  }


  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Group by position */}
      {[...new Set(toasts.map((t) => t.position))].map((position, index) => (
        <div
          key={index}
          className={classNames(
            position,
            "fixed space-y-2 z-50 max-w-[90vw] sm:max-w-sm"
          )}
        >
          {toasts.filter((t) => t.position === position).map((toast) => (
            <div
              key={toast.id}
              className={classNames(
                toast.type === 'success' && 'bg-white border text-green-600',
                toast.type === 'error' && 'bg-white border text-red-600',
                toast.type === 'warning' && 'bg-gray-600 text-white',
                "grid px-4 py-3 shadow rounded-3xl bg-opacity-75 backdrop-blur-md animate-fade-in-out transition-all"
              )}
            >
              <p className='flex items-center gap-x-1 text-sm'>
                {toast.type === 'success' ? (
                  <CheckCircleIcon className='size-5 mb-1' />
                ) : (
                  <ExclamationCircleIcon className='size-5 mb-1' />
                )}
                {toast.message}
              </p>
              <p className='text-xs'>{toast.description}</p>
            </div>
          ))}
        </div>
      ))}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('"The useToast hook must be used inside a ToastProvider component."')
  }
  return context
}