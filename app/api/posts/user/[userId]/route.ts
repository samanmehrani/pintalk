import { NextResponse } from "next/server"
import { Post } from "../../../../../lib/models/posts"
import { User } from "../../../../../lib/models/users"

export async function GET(_: Request, { params, searchParams }: { params: { userId: string }, searchParams: URLSearchParams }) {
  const page = parseInt(searchParams.get("page") || "1")
  const limit = 20
  const skip = (page - 1) * limit

  const author = await User.findOne({ username: params.userId })
  if (!author) return NextResponse.json({ message: "Post not found." }, { status: 404 })

  const posts = await Post.find({ author_id: author._id })
    .populate("author_id", "name username profilePicture -_id")
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(limit)

  return NextResponse.json(posts)
}
