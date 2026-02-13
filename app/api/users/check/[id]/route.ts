import { NextRequest, NextResponse, NextFetchEvent } from "next/server"
import jwt from "jsonwebtoken"

export interface JwtPayload {
  userId: string
  email: string
  username?: string
  [key: string]: any
}

export type AuthenticatedRequest = NextRequest & { user: JwtPayload }

export const auth = (
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
) => {
  return async (req: NextRequest, ev?: NextFetchEvent) => {
    try {
      const token =
        req.cookies.get("accessToken")?.value ||
        req.headers.get("Authorization")?.replace("Bearer ", "")

      if (!token) {
        return NextResponse.json({ message: "Access denied." }, { status: 401 })
      }

      const user = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

      if (!user || !user.userId) {
        return NextResponse.json({ message: "Invalid token." }, { status: 401 })
      }

      return await handler(req as AuthenticatedRequest & { user: JwtPayload })
    } catch (err) {
      console.error("Auth middleware error:", err)
      return NextResponse.json({ message: "Invalid token." }, { status: 401 })
    }
  }
}
