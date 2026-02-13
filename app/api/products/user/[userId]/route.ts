import { NextResponse } from "next/server"
import prisma from "../../../../../lib/prisma"

interface GetProductsParams {
  params: { userId: string }
  searchParams: URLSearchParams
}

export async function GET(
  _: Request,
  { params, searchParams }: GetProductsParams
) {
  try {
    const page = Number(searchParams.get("page") || "1")
    const limit = 12
    const skip = (page - 1) * limit

    const producer = await prisma.user.findUnique({
      where: { username: params.userId },
      select: { id: true, name: true, username: true, profilePicture: true },
    })

    if (!producer) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      )
    }

    const products = await prisma.product.findMany({
      where: { producer_id: producer.id },
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
    console.error("GET /api/products/user error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
