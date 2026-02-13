import { NextResponse } from "next/server"
import { accessToken } from "../../../../lib/config/env"
import { auth } from "../../../../lib/middlewares/auth"

export const POST = auth(async (_req: Request) => {
  try {
    const response = NextResponse.json(null, { status: 200 })

    response.cookies.set(accessToken.name, "", {
      path: "/",
      maxAge: 0,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    })

    return response
  } catch (error) {
    console.error("POST /api/auth/logout error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
})
