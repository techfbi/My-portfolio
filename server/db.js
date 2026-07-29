import mongoose from "mongoose"

// Keeps a single shared connection instead of opening a new one on every request
// which would quickly exhaust the connection limit on a free tier cluster
let isConnected = false

export const connectDB = async () => {
  if (isConnected) return

  await mongoose.connect(process.env.MONGODB_URI)
  isConnected = true
  console.log("MongoDB connected")
}