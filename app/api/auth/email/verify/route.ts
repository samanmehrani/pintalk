import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

import { User } from "../../../../../lib/models/users"
import { VerificationCode } from "../../../../../lib/models/verificationCodes"

import { generateEmailSecret } from "../../../../../lib/helpers/emailVerification"
import { isMoreThanOneMinute } from "../../../../../lib/helpers/timeComparison"

import { accessToken } from "../../../../../lib/config/env"

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json()

    const verificationCode = await VerificationCode.findOne({ email })
      .sort({ created_at: -1 })

    if (
      !verificationCode ||
      isMoreThanOneMinute(verificationCode.created_at)
    ) {
      return NextResponse.json(
        { message: "Invalid code." },
        { status: 401 }
      )
    }

    if (verificationCode.failed_attempts >= 6) {
      return NextResponse.json(
        { message: "Too many attempts." },
        { status: 401 }
      )
    }

    if (verificationCode.code !== code) {
      verificationCode.failed_attempts += 1
      await verificationCode.save()

      return NextResponse.json(
        { message: "Invalid code." },
        { status: 401 }
      )
    }

    const user = await User.findOne({ email })

    if (!user) {
      const emailSecret = generateEmailSecret(email)
      return NextResponse.json({ email_secret: emailSecret })
    }

    const token = user.generateAuthToken()

    const response = NextResponse.json(user, { status: 200 })

    response.cookies.set(
      accessToken.name,
      token,
      accessToken.options
    )

    response.headers.set("Authorization", token)

    return response
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}