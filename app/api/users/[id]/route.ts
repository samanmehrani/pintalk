import { NextResponse } from "next/server"
import prisma from "../../../../lib/prisma"

interface GetUserParams {
  params: { id: string }
}

export async function GET(
  _: Request,
  { params }: GetUserParams
) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: params.id },
      select: {
        name: true,
        username: true,
        profilePicture: true,
        userType: true,
        founded: true,
        industry: true,
        isAdmin: true,
        bio: true,
        location: true,
        numberOfLocations: true,
        link: true,
        created_at: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("GET /api/users/[id] error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
