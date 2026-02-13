import { NextResponse } from "next/server"
import prisma from "../../../../lib/prisma"
import { auth } from "../../../../lib/middlewares/auth"

export const GET = auth(async (req) => {
  try {
    const url = new URL(req.url)
    const page = Number(url.searchParams.get("page") || "1")
    const limit = 20
    const skip = (page - 1) * limit

    const type = url.searchParams.get("type")
    const hscode = url.searchParams.get("hscode")
    const country = url.searchParams.get("country")
    const partner = url.searchParams.get("partner")

    const where: any = {}
    if (type) where.type = { equals: type, mode: "insensitive" }
    if (hscode) where.hscode = { equals: hscode, mode: "insensitive" }
    if (country) where.country = { equals: country, mode: "insensitive" }
    if (partner) where.partner = { equals: partner, mode: "insensitive" }

    if (Object.keys(where).length === 0) {
      return NextResponse.json(
        { message: "No filters provided." },
        { status: 400 }
      )
    }

    const products = await prisma.product.findMany({
      where,
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
    console.error("GET /api/products/filter error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
})