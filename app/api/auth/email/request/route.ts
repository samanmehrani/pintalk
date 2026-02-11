import { NextRequest, NextResponse } from "next/server"

import { VerificationCode } from "../../../../../lib/models/verificationCodes"
// import { generateVerificationCode } from "../../../../../../lib/helpers/emailVerification"
import { isMoreThanOneMinute } from "../../../../../lib/helpers/timeComparison"
// import { sendVerificationCode } from "../../../../../../lib/services/nodemailer"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    let verificationCode = await VerificationCode.findOne({ email })
      .sort({ created_at: -1 })

    if (!verificationCode || isMoreThanOneMinute(verificationCode.created_at)) {
      // const code = generateVerificationCode()
      const code = "12345"

      // await sendVerificationCode({ email, code })

      verificationCode = new VerificationCode({ email, code })
      await verificationCode.save()

      return NextResponse.json(null, { status: 200 })
    }

    return NextResponse.json(
      { message: "Already sent." },
      { status: 409 }
    )
  } catch (error) {
    console.error("Error in /api/auth/email/request:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}