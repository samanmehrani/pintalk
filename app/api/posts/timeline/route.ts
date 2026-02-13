import { NextResponse } from "next/server"
import prisma from "../../../../lib/prisma"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const page = Number(url.searchParams.get("page") || "1")
    const limit = 40
    const skip = (page - 1) * limit

    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { name: true, username: true, profilePicture: true },
        },
      },
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("GET /api/posts error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}