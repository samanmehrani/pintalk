import { NextResponse } from "next/server"
import prisma from "../../../../lib/prisma"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const page = Number(url.searchParams.get("page") || "1")
    const limit = 20
    const skip = (page - 1) * limit

    const products = await prisma.product.findMany({
      include: {
        producer: {
          select: { name: true, username: true, profilePicture: true },
        },
      },
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("GET /api/products error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}