import { NextResponse } from "next/server"
import { Product } from "../../../../../lib/models/products"
import { User } from "../../../../../lib/models/users"

export async function GET(_: Request, { params, searchParams }: { params: { userId: string }, searchParams: URLSearchParams }) {
  const page = parseInt(searchParams.get("page") || "1")
  const limit = 12
  const skip = (page - 1) * limit

  const producer = await User.findOne({ username: params.userId })
  if (!producer) return NextResponse.json({ message: "User not found." }, { status: 404 })

  const products = await Product.find({ producer_id: producer._id })
    .populate("producer_id", "name username profilePicture -_id")
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(limit)

  return NextResponse.json(products)
}
