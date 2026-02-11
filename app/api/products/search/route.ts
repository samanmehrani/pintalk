import { NextResponse } from "next/server"
import { Product } from "../../../../lib/models/products"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const label = url.searchParams.get("label")
  if (!label) return NextResponse.json([])

  const page = parseInt(url.searchParams.get("page") || "1")
  const limit = 20
  const skip = (page - 1) * limit

  const products = await Product.find({
    $or: [
      { label: new RegExp(label, "i") },
      { name: new RegExp(label, "i") },
    ],
  })
    .populate("producer_id", "name username profilePicture -_id")
    .skip(skip)
    .limit(limit)

  return NextResponse.json(products)
}
