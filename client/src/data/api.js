// Central place for every request the frontend makes to our small server
// keeping this in one file means the base url only needs to change in one place
const BASE_URL = import.meta.env.VITE_API_BASE_URL

// Retries a fetch a few times with a short delay between attempts
// this exists specifically for render's free tier cold start, where the very first request
// can fail outright while the server is still waking up, a short retry rides through that gap
const fetchWithRetry = async (url, retries = 3, delayMs = 1500) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url)
      if (response.ok) return response
      // A non ok response still counts as a real reply from an awake server, no need to retry that
      if (attempt === retries) throw new Error("Failed to fetch projects")
    } catch (error) {
      // Only waits and retries on a genuine network failure, which is what a sleeping server causes
      if (attempt === retries) throw error
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }
}

export const fetchProjects = async () => {
  const response = await fetchWithRetry(`${BASE_URL}/api/projects`)
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