// Central place for every request the frontend makes to our small server
// keeping this in one file means the base url only needs to change in one place
const BASE_URL = import.meta.env.VITE_API_BASE_URL

// Fetches every project for display on the public site
export const fetchProjects = async () => {
  const response = await fetch(`${BASE_URL}/api/projects`)
  if (!response.ok) throw new Error("Failed to fetch projects")
  return response.json()
}

// Login now returns a token instead of just success true or false
export const verifyAdminPassword = async (password) => {
  const response = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  })
  return response.json()
}

// Token is now sent as an authorization header instead of the password living inside the form data
export const createProject = async (formData, token) => {
  const response = await fetch(`${BASE_URL}/api/projects`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })
  return response.json()
}

// New, updates an existing project, same token pattern
export const updateProject = async (id, formData, token) => {
  const response = await fetch(`${BASE_URL}/api/projects/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })
  return response.json()
}

// New, deletes a project
export const deleteProject = async (id, token) => {
  const response = await fetch(`${BASE_URL}/api/projects/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.json()
}