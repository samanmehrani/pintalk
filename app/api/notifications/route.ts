import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../lib/prisma"
import { auth, JwtPayload } from "../../../lib/middlewares/auth"

type AuthRequest = NextRequest & { user: JwtPayload }

export const POST = auth(async (req: AuthRequest) => {
  try {
    const { message, productId, sender_name, sender_username } =
      await req.json()

    if (!productId || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      )
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        producer: {
          select: { username: true },
        },
      },
    })

    if (!product) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 }
      )
    }

    const notification = await prisma.notification.create({
      data: {
        message,
        sender_name,
        sender_username,
        product: product.id,
        sender: req.user.userId,
        recever: product.producer.username,
        status: 0,
      },
    })

    return NextResponse.json(notification, { status: 201 })
  } catch (error) {
    console.error("POST /api/notifications error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
})

export const GET = auth(async (req: AuthRequest) => {
  try {
    const url = new URL(req.url)
    const page = Number(url.searchParams.get("page") || "1")
    const limit = 20
    const skip = (page - 1) * limit

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { username: true },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 })
    }

    const notifications = await prisma.notification.findMany({
      where: { recever: user.username },
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
    })

    return NextResponse.json(notifications)
  } catch (error) {
    console.error("GET /api/notifications error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
})