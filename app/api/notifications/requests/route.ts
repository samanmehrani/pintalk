import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../lib/prisma"
import { auth, JwtPayload } from "../../../../lib/middlewares/auth"

type AuthRequest = NextRequest & { user: JwtPayload }

export const GET = auth(async (req: AuthRequest) => {
  try {
    const url = new URL(req.url)
    const page = Number(url.searchParams.get("page") || "1")
    const limit = 20
    const skip = (page - 1) * limit

    const notifications = await prisma.notification.findMany({
      where: { sender: req.user.userId },
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
    })

    return NextResponse.json(notifications)
  } catch (error) {
    console.error("GET /api/notifications/sent error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
})

export const DELETE = auth(async (req: AuthRequest) => {
  try {
    const { requestId } = await req.json()

    if (!requestId) {
      return NextResponse.json(
        { message: "requestId is required." },
        { status: 400 }
      )
    }

    const notification = await prisma.notification.delete({
      where: { id: requestId },
    })

    return NextResponse.json(notification, { status: 200 })
  } catch (error) {
    console.error("DELETE /api/notifications/sent error:", error)

    if (error instanceof Error && error.message.includes("Record to delete not found")) {
      return NextResponse.json(
        { message: "Notification not found." },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
})
