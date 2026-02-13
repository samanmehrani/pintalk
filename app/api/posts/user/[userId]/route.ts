import { NextResponse } from "next/server"
import prisma from "../../../../../lib/prisma"

interface GetPostsParams {
  params: { userId: string }
  searchParams: URLSearchParams
}

export async function GET(
  _: Request,
  { params, searchParams }: GetPostsParams
) {
  try {
    const page = Number(searchParams.get("page") || "1")
    const limit = 20
    const skip = (page - 1) * limit

    const author = await prisma.user.findUnique({
      where: { username: params.userId },
      select: { id: true, name: true, username: true, profilePicture: true },
    })

    if (!author) {
      return NextResponse.json(
        { message: "Post not found." },
        { status: 404 }
      )
    }

    const posts = await prisma.post.findMany({
      where: { author_id: author.id },
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
    console.error("GET /api/posts/user error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
