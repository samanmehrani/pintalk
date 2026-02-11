import jwt from "jsonwebtoken"

export const generateVerificationCode = (length = 5): string => {
  const q = 10 ** (length - 1)
  return (Math.floor(Math.random() * 9 * q) + q).toString()
}

export const generateEmailSecret = (email: string): string => {
  return jwt.sign(
    { email },
    process.env.EMAIL_VERIFICATION_SECRET!
  )
}
