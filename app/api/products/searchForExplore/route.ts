import { NextResponse } from "next/server"
import { Product } from "../../../../lib/models/products"
import { auth } from "../../../../lib/middlewares/auth"

export const GET = auth(async (req) => {
  const url = new URL(req.url)
  const page = parseInt(url.searchParams.get("page") || "1")
  const limit = 20
  const skip = (page - 1) * limit

  const query: any = {}
  const type = url.searchParams.get("type")
  const hscode = url.searchParams.get("hscode")
  const country = url.searchParams.get("country")
  const partner = url.searchParams.get("partner")

  if (type) query.type = new RegExp(`^${type}$`, "i")
  if (hscode) query.hscode = new RegExp(`^${hscode}$`, "i")
  if (country) query.country = new RegExp(`^${country}$`, "i")
  if (partner) query.partner = new RegExp(`^${partner}$`, "i")

  if (!Object.keys(query).length) {
    return NextResponse.json({ message: "No filters provided." }, { status: 400 })
  }

  const products = await Product.find(query)
    .populate("producer_id", "name username profilePicture -_id")
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(limit)

  return NextResponse.json(products)
})
