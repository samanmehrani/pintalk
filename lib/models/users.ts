import mongoose, { Schema, Document, Model, model } from "mongoose"
import jwt from "jsonwebtoken"

export interface IUser extends Document {
  name?: string
  username: string
  email: string
  created_at: Date
  updated_at?: Date
  profilePicture?: string
  userType?: string
  founded?: string
  industry?: string
  isAdmin: boolean
  bio?: string
  location?: string
  numberOfLocations?: string
  link?: string
  status: number
  generateAuthToken: () => string
}

const userSchema = new Schema<IUser>({
  name: { type: String, minlength: 2, maxlength: 50, default: null },
  username: { type: String, required: true, minlength: 5, maxlength: 20, unique: true },
  email: { type: String, required: true, minlength: 4, maxlength: 255, unique: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
  profilePicture: { type: String, default: null },
  userType: { type: String, default: null },
  founded: { type: String, default: null },
  industry: { type: String, default: null },
  isAdmin: { type: Boolean, default: false },
  bio: { type: String, maxlength: 150, default: null },
  location: { type: String, maxlength: 50, default: null },
  numberOfLocations: { type: String, maxlength: 100, default: null },
  link: { type: String, default: null },
  status: { type: Number, default: 0 },
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY!)
  return token
}

export const User: Model<IUser> = mongoose.models.User || model<IUser>("User", userSchema)