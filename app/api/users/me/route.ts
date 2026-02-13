import { NextResponse } from "next/server"
import prisma from "../../../../lib/prisma"
import { auth } from "../../../../lib/middlewares/auth"

export const GET = auth(async (req) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    })

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "User found" })
  } catch (error) {
    console.error("GET /api/user error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
})
