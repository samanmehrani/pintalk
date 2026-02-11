import mongoose, { Schema, Document, Model, model } from "mongoose"

export interface IPost extends Document {
  author_id: mongoose.Schema.Types.ObjectId
  text?: string
  label?: string
  created_at: Date
  updated_at?: Date
}

const postSchema = new Schema<IPost>({
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, minlength: 1, maxlength: 1000 },
  label: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
})

export const Post: Model<IPost> = mongoose.models.Post || model<IPost>("Post", postSchema)
