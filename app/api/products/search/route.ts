import { NextResponse } from "next/server"
import prisma from "../../../../lib/prisma"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const label = url.searchParams.get("label")

    if (!label) return NextResponse.json([])

    const page = Number(url.searchParams.get("page") || "1")
    const limit = 20
    const skip = (page - 1) * limit

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { label: { contains: label, mode: "insensitive" } },
          { name: { contains: label, mode: "insensitive" } },
        ],
      },
      include: {
        producer: {
          select: { name: true, username: true, profilePicture: true },
        },
      },
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("GET /api/products/search error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}