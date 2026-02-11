import { NextRequest, NextResponse, NextFetchEvent } from "next/server"
import jwt from "jsonwebtoken"

export interface JwtPayload {
  _id: string
  email: string
  username?: string
  [key: string]: any
}

// Middleware wrapper
export const auth = <T extends NextRequest>(
  handler: (req: T & { user: JwtPayload }) => Promise<NextResponse>
) => {
  return async (req: T, ev?: NextFetchEvent) => {
    try {
      const token =
        req.cookies.get("access_token")?.value ||
        req.headers.get("Authorization")?.replace("Bearer ", "")

      if (!token)
        return NextResponse.json({ message: "Access denied." }, { status: 401 })

      const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY!) as JwtPayload

      return await handler(req as T & { user: JwtPayload })
    } catch (err) {
      return NextResponse.json({ message: "Invalid token." }, { status: 401 })
    }
  }
}
