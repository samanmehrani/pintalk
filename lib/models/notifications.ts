import mongoose, { Schema, Document, Model, model } from "mongoose"

export interface INotification extends Document {
  sender: mongoose.Schema.Types.ObjectId
  sender_name?: string
  sender_username?: string
  recever: string
  message?: string
  status?: number
  product: mongoose.Schema.Types.ObjectId
  created_at: Date
  updated_at?: Date
}

const notificationSchema = new Schema<INotification>({
  sender: { type: mongoose.Schema.Types.ObjectId, index: true },
  sender_name: { type: String },
  sender_username: { type: String },
  recever: { type: String },
  message: { type: String },
  status: { type: Number },
  product: { type: mongoose.Schema.Types.ObjectId, index: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
})

export const Notification: Model<INotification> =
  mongoose.models.Notification || model<INotification>("Notification", notificationSchema)