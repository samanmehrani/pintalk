import { NextResponse } from "next/server"
import { User } from "../../../../lib/models/users"
import { auth } from "../../../../lib/middlewares/auth"

export const GET = auth(async (req) => {
  const user = await User.findById(req.user._id)
  return user
    ? NextResponse.json({ message: "User found" })
    : NextResponse.json({ message: "User not found." }, { status: 404 })
})