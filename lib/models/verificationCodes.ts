import mongoose, { Schema, Document, Model, model } from "mongoose"

export interface IVerificationCode extends Document {
  email?: string
  code: string
  failed_attempts: number
  created_at: Date
}

const verificationCodeSchema = new Schema<IVerificationCode>({
  email: { type: String },
  code: { type: String, required: true, minlength: 4, maxlength: 10 },
  failed_attempts: { type: Number, default: 0, max: 3 },
  created_at: { type: Date, default: Date.now },
})

export const VerificationCode: Model<IVerificationCode> =
  mongoose.models.VerificationCode ||
  model<IVerificationCode>("VerificationCode", verificationCodeSchema)
