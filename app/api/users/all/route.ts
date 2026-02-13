import { NextResponse } from "next/server"
import prisma from "../../../../lib/prisma"
import { auth } from "../../../../lib/middlewares/auth"

export const GET = auth(async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        profilePicture: true,
        posts: { select: { id: true } },
        products: { select: { id: true } },
        created_at: true,
      },
      orderBy: { created_at: "desc" },
    })

    const result = users.map((user) => ({
      name: user.name,
      username: user.username,
      profilePicture: user.profilePicture,
      postCount: user.posts.length,
      productCount: user.products.length,
    }))

    return NextResponse.json(result)
  } catch (error) {
    console.error("GET /api/users summary error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
})
