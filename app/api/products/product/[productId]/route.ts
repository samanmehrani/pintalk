import { NextResponse } from "next/server"
import mongoose from "mongoose"
import { Product } from "../../../../../lib/models/products"

export async function GET(_: Request, { params }: { params: { productId: string } }) {
  if (!mongoose.Types.ObjectId.isValid(params.productId)) {
    return NextResponse.json({ message: "Invalid product ID format." }, { status: 400 })
  }

  const product = await Product.findById(params.productId)
    .populate("producer_id", "name username profilePicture -_id")

  return NextResponse.json(product)
}
