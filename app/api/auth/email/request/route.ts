import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../../lib/prisma"
import { isMoreThanOneMinute } from "../../../../../lib/helpers/timeComparison"

// import { sendVerificationCode } from "../../../../../../lib/services/nodemailer"
// import { generateVerificationCode } from "../../../../../../lib/helpers/emailVerification"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    let verificationCode = await prisma.verificationCode.findFirst({
      where: { email },
      orderBy: { created_at: "desc" },
    })

    if (!verificationCode || isMoreThanOneMinute(verificationCode.created_at)) {
      // const code = generateVerificationCode()
      const code = "12345"

      // await sendVerificationCode({ email, code })

      verificationCode = await prisma.verificationCode.create({
        data: { email, code },
      })

      return NextResponse.json(null, { status: 200 })
    }

    return NextResponse.json({ message: "Already sent." }, { status: 409 })
  } catch (error) {
    console.error("Error in /api/auth/email/request:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
