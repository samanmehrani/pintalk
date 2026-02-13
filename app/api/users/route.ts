import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import prisma from "../../../lib/prisma"
import { accessToken } from "../../../lib/config/env"
import { auth, JwtPayload } from "../../../lib/middlewares/auth"
import { createUploader } from "../../../lib/services/cloudinary"

const upload = createUploader("brok_avatars")

// ───── Register ─────
export async function POST(req: NextRequest) {
  try {
    const { secret, name, username, userType } = await req.json()

    const emailSecret = process.env.EMAIL_VERIFICATION_SECRET
    const jwtSecret = process.env.JWT_SECRET

    if (!emailSecret || !jwtSecret) {
      throw new Error("Missing environment secrets")
    }

    const { email } = jwt.verify(secret, emailSecret) as { email: string }

    const user = await prisma.user.create({
      data: { name, username, userType, email },
    })

    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtSecret,
      { expiresIn: "7d" }
    )

    const res = NextResponse.json(user, { status: 201 })

    res.cookies.set(accessToken.name, token, accessToken.options)
    res.headers.set("Authorization", token)

    return res
  } catch (error) {
    console.error("Error in /api/users POST:", error)
    return NextResponse.json({ message: "Invalid secret." }, { status: 400 })
  }
}

// ───── Update profile ─────
export const PUT = auth(async (req: NextRequest & { user: JwtPayload }) => {
  try {
    const formData = await req.formData()

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name: formData.get("name") as string | null,
        founded: formData.get("founded") as string | null,
        industry: formData.get("industry") as string | null,
        location: formData.get("location") as string | null,
        numberOfLocations: formData.get("numberOfLocations") as string | null,
        link: formData.get("link") as string | null,
        profilePicture: formData.get("avatar") as string | null,
        updated_at: new Date(),
      },
    })

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error("Error in /api/auth PUT:", error)
    return NextResponse.json({ message: "An error occurred", error }, { status: 500 })
  }
})

// ───── Delete account ─────
export const DELETE = auth(async (req: NextRequest & { user: JwtPayload }) => {
  try {
    const { code } = await req.json()
    if (code !== "11111") {
      return NextResponse.json({ message: "Invalid code." }, { status: 401 })
    }

    const deletedUser = await prisma.user.delete({
      where: { id: req.user.id },
    })

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error("Error in /api/auth DELETE:", error)
    return NextResponse.json({ message: "User not found." }, { status: 404 })
  }
})
