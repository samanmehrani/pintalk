import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { auth, JwtPayload } from "../../../lib/middlewares/auth"
import { Notification } from "../../../lib/models/notifications"
import { Product } from "../../../lib/models/products"
import { User } from "../../../lib/models/users"

export const POST = auth(async (req: NextRequest & { user: JwtPayload }) => {
  const { message, productId, sender_name, sender_username } = await req.json()

  if (!productId || !message) {
    return NextResponse.json({ message: "All fields are required." }, { status: 400 })
  }

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return NextResponse.json({ message: "Invalid product ID format." }, { status: 400 })
  }

  const product = await Product.findById(productId).populate("producer_id", "name username -_id")
  if (!product) return NextResponse.json({ message: "Product not found." }, { status: 404 })

  const notification = new Notification({
    message,
    sender_name,
    sender_username,
    product: product._id,
    sender: req.user._id,
    recever: (product.producer_id as any).username,
    status: 0,
  })

  await notification.save()
  return NextResponse.json(notification)
})

export const GET = auth(async (req: NextRequest & { user: JwtPayload }) => {
  const url = new URL(req.url)
  const page = parseInt(url.searchParams.get("page") || "1")
  const limit = 20
  const skip = (page - 1) * limit

  const user = await User.findById(req.user._id)

  const notifications = await Notification.find({ recever: user?.username })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)

  return NextResponse.json(notifications)
})
