import { NextResponse } from "next/server"
import prisma from "../../../../../lib/prisma"

interface GetProductParams {
  params: { productId: string }
}

export async function GET(
  _: Request,
  { params }: GetProductParams
) {
  try {
    if (!params.productId) {
      return NextResponse.json(
        { message: "Product ID is required." },
        { status: 400 }
      )
    }

    const product = await prisma.product.findUnique({
      where: { id: params.productId },
      include: {
        producer: {
          select: { name: true, username: true, profilePicture: true },
        },
      },
    })

    if (!product) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("GET /api/products/[productId] error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}