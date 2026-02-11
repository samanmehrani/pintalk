import { NextRequest, NextResponse } from "next/server"
import { auth, JwtPayload } from "../../../lib/middlewares/auth"
import { Product } from "../../../lib/models/products"
import { createUploader } from "../../../lib/services/cloudinary"
import { cloudinary } from "../../../lib/services/cloudinary"

const upload = createUploader("brok_products")

export const POST = auth(async (req: NextRequest & { user: JwtPayload }) => {
  const formData = await req.formData()
  const files = formData.getAll("images") as File[]
  if (!files || files.length === 0) {
    return NextResponse.json({ message: "Please upload at least one file." }, { status: 400 })
  }

  const productDataRaw = formData.get("product")?.toString() || '{}'
  const data = JSON.parse(productDataRaw)

  const images = files.map(f => ({ url: f.name, filename: f.name }))

  const product = new Product({
    producer_id: req.user._id,
    ...data,
    images,
  })

  await product.save()
  return NextResponse.json(product, { status: 201 })
})

export const DELETE = auth(async (req: NextRequest & { user: JwtPayload }) => {
  const { product_id } = await req.json()
  const product = await Product.findOneAndDelete({
    _id: product_id,
    producer_id: req.user._id,
  })

  if (!product) return NextResponse.json({ message: "Product not found." }, { status: 404 })

  for (const image of product.images as any) {
    if (image.filename) await cloudinary.uploader.destroy(image.filename)
  }

  return NextResponse.json({ message: "Product and images deleted" }, { status: 200 })
})