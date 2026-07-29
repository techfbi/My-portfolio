import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import fs from "fs"
import path from "path"
import jwt from "jsonwebtoken"
import rateLimit from "express-rate-limit"
import { fileURLToPath } from "url"
import { connectDB } from "./db.js"
import Project from "./models/project.js"
import { uploadImageBuffer } from "./cloudinary.js"

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

// Cors is now locked to a single allowed origin instead of accepting requests from anywhere
// this matters most once the site is live, since an open cors policy lets any website on the internet call our api
app.use(cors({ origin: process.env.CLIENT_ORIGIN }))
app.use(express.json())

// Limits login attempts to 5 tries per 15 minutes per ip address
// this is what stops someone from scripting thousands of password guesses against the login route
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many login attempts, please try again later" },
})

// Memory storage keeps the uploaded file as a buffer in memory instead of writing it to disk
// this is what makes cloudinary uploads possible without ever touching the server's file system
const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true)
    } else {
      cb(new Error("Only image files are allowed"))
    }
  },
})

// Verifies a token sent in the authorization header, used to protect every write route below
// this replaces sending the raw password on every request, the token proves you already logged in once
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: "No token provided" })

  const token = authHeader.split(" ")[1]
  try {
    jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ message: "Invalid or expired token" })
  }
}

// Lightweight endpoint with no database call, used purely to keep the server awake
// an external uptime service pings this every few minutes so render never lets the server sleep
app.get("/api/health", (req, res) => {
  res.json({ status: "awake" })
})

app.get("/api/projects", async (req, res) => {
  // Sorts by newest first, mirrors the unshift behaviour the json file version had
  const projects = await Project.find().sort({ createdAt: -1 })
  res.json(projects)
})

// Login now issues a signed token valid for 3 hours instead of just returning true or false
// the frontend stores this token and sends it back on every future admin request until it expires
app.post("/api/admin/login", loginLimiter, (req, res) => {
  const { password } = req.body
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: "Incorrect password" })
  }
  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "3h" })
  res.json({ success: true, token })
})

app.post("/api/projects", requireAuth, upload.single("image"), async (req, res) => {
  try {
    const { title, description, type, stack, link } = req.body

    const imageUrl = req.file ? await uploadImageBuffer(req.file.buffer) : null

    const newProject = await Project.create({
      title,
      description,
      type,
      stack: stack.split(",").map((item) => item.trim()),
      link,
      image: imageUrl,
    })

    res.json({ success: true, project: newProject })
  } catch (error) {
    // Logs the real error message and stack instead of letting it fail silently as an unreadable object
    console.error("Create project failed:", error.message)
    res.status(500).json({ message: error.message || "Something went wrong" })
  }
})

app.put("/api/projects/:id", requireAuth, upload.single("image"), async (req, res) => {
  const { id } = req.params
  const { title, description, type, stack, link, existingImage } = req.body

  // A new upload replaces the old cloudinary url, otherwise the existing url is kept exactly as is
  const imageUrl = req.file ? await uploadImageBuffer(req.file.buffer) : existingImage || null

  const updated = await Project.findByIdAndUpdate(
    id,
    {
      title,
      description,
      type,
      stack: stack.split(",").map((item) => item.trim()),
      link,
      image: imageUrl,
    },
    { new: true }
  )
});

// Deletes a project by id, also new, needed since the admin page now manages existing projects, not just adds
app.delete("/api/projects/:id", requireAuth, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id)
  res.json({ success: true })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})