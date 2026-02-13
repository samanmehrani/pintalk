import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string

export function signAccessToken(payload: {
  userId: string
  email: string
}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}
