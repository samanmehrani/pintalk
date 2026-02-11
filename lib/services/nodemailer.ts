import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface VerificationMailOptions {
  email: string
  code: string
}

export const sendVerificationCode = async ({ email, code }: VerificationMailOptions) => {
  console.log("Verification code:", code)

  const mailOptions = {
    from: "Verify Code Sender",
    to: email,
    subject: "Verification Code",
    text: `Your verification Code is: ${code}`,
    html: `<b>Your verification Code is: ${code}</b>`,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error("Error sending email:", error)
  }
}