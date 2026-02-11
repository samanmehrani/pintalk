import { NextRequest, NextResponse } from "next/server"
import { auth, JwtPayload } from "../../../../lib/middlewares/auth"
import { Notification } from "../../../../lib/models/notifications"

export const GET = auth(async (req: NextRequest & { user: JwtPayload }) => {
  const url = new URL(req.url)
  const page = parseInt(url.searchParams.get("page") || "1")
  const limit = 20
  const skip = (page - 1) * limit

  const requests = await Notification.find({ sender: req.user._id })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)

  return NextResponse.json(requests)
})

export const DELETE = auth(async (req: NextRequest) => {
  const { requestId } = await req.json()

  const notification = await Notification.findByIdAndDelete(requestId)
  return notification
    ? NextResponse.json(null, { status: 200 })
    : NextResponse.json(null, { status: 404 })
})
