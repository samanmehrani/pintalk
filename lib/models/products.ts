import mongoose, { Schema, Document, Model, model } from "mongoose"

export interface IProduct extends Document {
  producer_id: mongoose.Schema.Types.ObjectId
  name?: string
  price?: string
  label?: string
  details?: object
  hscode?: string
  currency?: string
  country?: string
  region?: string
  type?: string
  description?: string
  productType?: string
  count?: number
  rating?: number
  images?: object
  colors?: object
  status?: number
  created_at: Date
}

const productSchema = new Schema<IProduct>({
  producer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String },
  price: { type: String },
  label: { type: String },
  details: { type: Object, default: null },
  hscode: { type: String },
  currency: { type: String },
  country: { type: String },
  region: { type: String },
  type: { type: String },
  description: { type: String },
  productType: { type: String },
  count: { type: Number, default: 0 },
  rating: { type: Number },
  images: { type: Object },
  colors: { type: Object, default: null },
  status: { type: Number },
  created_at: { type: Date, default: Date.now },
})

export const Product: Model<IProduct> = mongoose.models.Product || model<IProduct>("Product", productSchema)