import crypto from 'crypto'
import { env } from '@/lib/env'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const redisPrefix = env.APP_NAME.replace(/\s+/g, '').toUpperCase()

export function normalizeEmail(input: string): string {
  return (input || '').trim().toLowerCase()
}

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email)
}

export function otpKey(email: string) {
  return `${redisPrefix}:otp:${email}`
}

export function otpAttemptsKey(email: string) {
  return `${redisPrefix}:otp:${email}:attempts`
}

export function otpCooldownKey(email: string) {
  return `${redisPrefix}:otp:${email}:cooldown`
}

export function otpVerifiedKey(email: string) {
  return `${redisPrefix}:otp:${email}:verified`
}

export function generateOtpCode(): string {
  return crypto.randomInt(0, 100_000).toString().padStart(5, '0')
}
