import mongoose from "mongoose"

// Defines the shape every project document must follow in the database
// this replaces the plain json array we were reading and writing to a file before
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String },
  stack: [{ type: String }],
  link: { type: String, required: true },
  image: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
})

// Mongoose caches models internally, this pattern stops a duplicate model error
// when the file gets imported more than once during development with nodemon restarting
export default mongoose.models.Project || mongoose.model("Project", projectSchema)