import mongoose from "mongoose"

let isConnected = false

export async function connectMongo() {
  if (isConnected) {
    return
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL!)
    isConnected = true
    console.log("Connected to MongoDB.")
  } catch (err) {
    console.error("MongoDB connection failed")
  }
}
