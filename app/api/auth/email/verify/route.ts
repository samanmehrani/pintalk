import prisma from "../../../../../lib/prisma"
import { NextRequest, NextResponse } from "next/server"

import { accessToken } from "../../../../../lib/config/env"

import { signAccessToken } from "../../../../../lib/helpers/jwt"
import { generateEmailSecret } from "../../../../../lib/helpers/emailVerification"
import { isMoreThanOneMinute } from "../../../../../lib/helpers/timeComparison"

type VerifyRequestBody = {
  email: string
  code: string
}

export async function POST(req: NextRequest) {
  try {
    const body: VerifyRequestBody = await req.json()
    const { email, code } = body

    if (!email || !code) {
      return NextResponse.json(
        { message: "Email and code are required." },
        { status: 400 }
      )
    }

    const verificationCode = await prisma.verificationCode.findFirst({
      where: { email },
      orderBy: { created_at: "desc" },
    })

    if (!verificationCode) {
      return NextResponse.json({ message: "Invalid code." }, { status: 401 })
    }

    if (isMoreThanOneMinute(verificationCode.created_at)) {
      return NextResponse.json({ message: "Code expired." }, { status: 401 })
    }

    if (verificationCode.failed_attempts >= 6) {
      return NextResponse.json(
        { message: "Too many attempts." },
        { status: 429 }
      )
    }

    if (verificationCode.code !== code) {
      await prisma.verificationCode.update({
        where: { id: verificationCode.id },
        data: { failed_attempts: { increment: 1 } },
      })

      return NextResponse.json({ message: "Invalid code." }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      const emailSecret = generateEmailSecret(email)
      return NextResponse.json({ email_secret: emailSecret })
    }

    const token = signAccessToken({
      userId: user.id,
      email: user.email,
    })

    const response = NextResponse.json(
      {
        id: user.id,
        email: user.email,
      },
      { status: 200 }
    )

    response.cookies.set(accessToken.name, token, accessToken.options)
    response.headers.set("Authorization", `Bearer ${token}`)

    return response
  } catch (error) {
    console.error("Error in /api/auth/email/verify:", error)

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}