import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"

dotenv.config()

// Configures the cloudinary sdk once, every upload elsewhere in the app reuses this same configured instance
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Takes a file buffer, the kind multer gives us when using memory storage instead of disk storage
// and uploads it to cloudinary, returning the final hosted image url
// wrapped in a promise since cloudinary's upload_stream uses the older callback style internally
export const uploadImageBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "portfolio-projects" },
      (error, result) => {
        if (error) return reject(error)
        resolve(result.secure_url)
      }
    )
    stream.end(buffer)
  })
}