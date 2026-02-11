import { NextResponse } from "next/server"
import { Post } from "../../../../lib/models/posts"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const page = parseInt(url.searchParams.get("page") || "1")
  const limit = 40
  const skip = (page - 1) * limit

  const posts = await Post.find()
    .populate("author_id", "name username profilePicture -_id")
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(limit)

  return NextResponse.json(posts)
}
