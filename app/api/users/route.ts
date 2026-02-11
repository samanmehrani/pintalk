import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

import { User } from "../../../lib/models/users"
import { accessToken } from "../../../lib/config/env"
import { auth, JwtPayload } from "../../../lib/middlewares/auth"
import { createUploader } from "../../../lib/services/cloudinary"

const upload = createUploader("brok_avatars")

// ───── Register ─────
export async function POST(req: NextRequest) {
  try {
    const { secret, name, username, userType } = await req.json()
    const { email } = jwt.verify(
      secret,
      process.env.EMAIL_VERIFICATION_SECRET!
    ) as { email: string }

    const user = new User({ name, username, userType, email })
    await user.save()

    const token = user.generateAuthToken()
    const res = NextResponse.json(user, { status: 201 })

    res.cookies.set(accessToken.name, token, accessToken.options)
    res.headers.set("Authorization", token)

    return res
  } catch {
    return NextResponse.json(
      { message: "Invalid secret." },
      { status: 400 }
    )
  }
}

// ───── Update profile ─────
export const PUT = auth(async (req: NextRequest & { user: JwtPayload }) => {
  try {
    const formData = await req.formData()

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: formData.get("name"),
        founded: formData.get("founded"),
        industry: formData.get("industry"),
        location: formData.get("location"),
        numberOfLocations: formData.get("numberOfLocations"),
        link: formData.get("link"),
        profilePicture: formData.get("avatar"),
        updated_at: Date.now(),
      },
      { new: true, runValidators: true }
    )

    return updatedUser
      ? NextResponse.json({ user: updatedUser })
      : NextResponse.json({ message: "User not found" }, { status: 404 })
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    )
  }
})

// ───── Delete account ─────
export const DELETE = auth(async (req: NextRequest & { user: JwtPayload }) => {
  const { code } = await req.json()
  if (code !== "11111") {
    return NextResponse.json(
      { message: "Invalid code." },
      { status: 401 }
    )
  }

  const user = await User.findByIdAndDelete(req.user._id)
  return user
    ? NextResponse.json(null, { status: 200 })
    : NextResponse.json({ message: "User not found." }, { status: 404 })
})