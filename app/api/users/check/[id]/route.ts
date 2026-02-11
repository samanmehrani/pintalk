import { NextRequest, NextResponse, NextFetchEvent } from "next/server"
import jwt from "jsonwebtoken"

export interface JwtPayload {
  _id: string
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

      if (!token) return NextResponse.json({ message: "Access denied." }, { status: 401 })

      const user = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

      return await handler(req as AuthenticatedRequest)
    } catch (err) {
      return NextResponse.json({ message: "Invalid token." }, { status: 401 })
    }
  }
}
