'use client'

import { motion, AnimatePresence } from 'framer-motion'

import EmailInput from '@/app/_ui/auth/email-input'
import CodeInput from '@/app/_ui/auth/code-input'
import SignupForm from '@/app/_ui/auth/signup-from'

export default function AuthSteps(props) {
  const { activeIndex } = props

  return (
    <AnimatePresence mode="wait">
      {activeIndex === 0 && (
        <motion.div
          key="email"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
        >
          <EmailInput {...props} />
        </motion.div>
      )}

      {activeIndex === 1 && (
        <motion.div
          key="code"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
        >
          <CodeInput {...props} />
        </motion.div>
      )}

      {activeIndex === 2 && (
        <motion.div
          key="signup"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
        >
          <SignupForm {...props} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}