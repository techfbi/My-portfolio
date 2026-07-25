import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import fs from "fs"
import path from "path"
import jwt from "jsonwebtoken"
import rateLimit from "express-rate-limit"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const projectsPath = path.join(__dirname, "../client/src/data/projects.json")
const uploadsPath = path.join(__dirname, "../client/public/images/projects")

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true })
}

// Cors is now locked to a single allowed origin instead of accepting requests from anywhere
// this matters most once the site is live, since an open cors policy lets any website on the internet call our api
app.use(cors({ origin: process.env.CLIENT_ORIGIN }))
app.use(express.json())
app.use("/images/projects", express.static(uploadsPath))

// Limits login attempts to 5 tries per 15 minutes per ip address
// this is what stops someone from scripting thousands of password guesses against the login route
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many login attempts, please try again later" },
})

// Multer now checks file type and rejects anything that is not an image before it ever touches disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsPath),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`
    cb(null, uniqueName)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8mb hard cap, multer rejects anything larger automatically
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

app.get("/api/projects", (req, res) => {
  const data = fs.readFileSync(projectsPath, "utf-8")
  res.json(JSON.parse(data))
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

// Creating a project now requires a valid token instead of the raw password
app.post("/api/projects", requireAuth, upload.single("image"), (req, res) => {
  const { title, description, type, stack, link } = req.body
  const data = fs.readFileSync(projectsPath, "utf-8")
  const projects = JSON.parse(data)

  const newProject = {
    id: Date.now(),
    title,
    description,
    type,
    stack: stack.split(",").map((item) => item.trim()),
    link,
    image: req.file ? `/images/projects/${req.file.filename}` : null,
  }

  projects.unshift(newProject)
  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2))
  res.json({ success: true, project: newProject })
})

// Updates an existing project by id, this is new, needed for the edit capability
// if a new image is uploaded it replaces the old path, otherwise the existing image stays untouched
app.put("/api/projects/:id", requireAuth, upload.single("image"), (req, res) => {
  const { id } = req.params
  const { title, description, type, stack, link, existingImage } = req.body

  const data = fs.readFileSync(projectsPath, "utf-8")
  const projects = JSON.parse(data)
  const index = projects.findIndex((p) => String(p.id) === id)

  if (index === -1) {
    return res.status(404).json({ message: "Project not found" })
  }

  projects[index] = {
    ...projects[index],
    title,
    description,
    type,
    stack: stack.split(",").map((item) => item.trim()),
    link,
    image: req.file ? `/images/projects/${req.file.filename}` : existingImage || null,
  }

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2))
  res.json({ success: true, project: projects[index] })
})

// Deletes a project by id, also new, needed since the admin page now manages existing projects, not just adds
app.delete("/api/projects/:id", requireAuth, (req, res) => {
  const { id } = req.params
  const data = fs.readFileSync(projectsPath, "utf-8")
  let projects = JSON.parse(data)
  projects = projects.filter((p) => String(p.id) !== id)
  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2))
  res.json({ success: true })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})