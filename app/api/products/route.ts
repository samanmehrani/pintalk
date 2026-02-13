import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../lib/prisma"
import { auth, JwtPayload } from "../../../lib/middlewares/auth"
import { createUploader, cloudinary } from "../../../lib/services/cloudinary"

const upload = createUploader("brok_products")

type ProductImage = { url: string; filename: string }

export const POST = auth(async (req: NextRequest & { user: JwtPayload }) => {
  try {
    const formData = await req.formData()
    const files = formData.getAll("images") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: "Please upload at least one file." },
        { status: 400 }
      )
    }

    const productDataRaw = formData.get("product")?.toString() || "{}"
    const data = JSON.parse(productDataRaw)

    const images: ProductImage[] = files.map((f) => ({
      url: f.name,
      filename: f.name,
    }))

    const product = await prisma.product.create({
      data: {
        producer_id: req.user.userId,
        ...data,
        images,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("POST /api/products error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
})

export const DELETE = auth(async (req: NextRequest & { user: JwtPayload }) => {
  try {
    const { product_id } = await req.json()

    if (!product_id) {
      return NextResponse.json(
        { message: "product_id is required." },
        { status: 400 }
      )
    }

    const deleted = await prisma.product.findUnique({
      where: { id: product_id },
    })

    if (!deleted || deleted.producer_id !== req.user.userId) {
      return NextResponse.json({ message: "Product not found." }, { status: 404 })
    }

    await prisma.product.delete({ where: { id: product_id } })

    if (deleted.images && Array.isArray(deleted.images)) {
      for (const image of deleted.images as ProductImage[]) {
        if (image.filename) {
          await cloudinary.uploader.destroy(image.filename)
        }
      }
    }

    return NextResponse.json(
      { message: "Product and images deleted" },
      { status: 200 }
    )
  } catch (error) {
    console.error("DELETE /api/products error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
})