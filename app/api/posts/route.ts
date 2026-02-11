import { NextRequest, NextResponse } from "next/server"
import { auth, JwtPayload } from "../../../lib/middlewares/auth"
import { Post } from "../../../lib/models/posts"

export const POST = auth(async (req: NextRequest & { user: JwtPayload }) => {
  const { text, label } = await req.json()

  const post = new Post({
    text,
    label,
    author_id: req.user._id,
    status: 0,
  })

  await post.save()
  return NextResponse.json(post, { status: 201 })
})

export const DELETE = auth(async (req: NextRequest & { user: JwtPayload }) => {
  const { post_id } = await req.json()

  const post = await Post.findOneAndDelete({
    _id: post_id,
    author_id: req.user._id,
  })

  return post
    ? NextResponse.json(null, { status: 200 })
    : NextResponse.json({ message: "Post not found." }, { status: 404 })
})
