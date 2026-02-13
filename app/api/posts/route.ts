import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../lib/prisma"
import { auth, JwtPayload } from "../../../lib/middlewares/auth"

type AuthRequest = NextRequest & { user: JwtPayload }

export const POST = auth(async (req: AuthRequest) => {
  try {
    const { text, label } = await req.json()

    if (!text) {
      return NextResponse.json(
        { message: "Text is required." },
        { status: 400 }
      )
    }

    const post = await prisma.post.create({
      data: {
        text,
        label,
        author_id: req.user.userId,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("POST /api/posts error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
})

export const DELETE = auth(async (req: AuthRequest) => {
  try {
    const { post_id } = await req.json()

    if (!post_id) {
      return NextResponse.json(
        { message: "post_id is required." },
        { status: 400 }
      )
    }

    const post = await prisma.post.deleteMany({
      where: {
        id: post_id,
        author_id: req.user.userId,
      },
    })

    if (post.count === 0) {
      return NextResponse.json({ message: "Post not found." }, { status: 404 })
    }

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error("DELETE /api/posts error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
})