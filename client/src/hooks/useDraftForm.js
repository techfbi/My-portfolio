import { useState, useEffect } from "react"

// Persists form field values to localStorage as the user types
// so refreshing the admin add or edit form does not wipe out unsaved input
// storageKey should be unique per form instance, editing project 5 should not share a draft with project 9
const useDraftForm = (storageKey, initialValues) => {
  const [values, setValues] = useState(() => {
    const saved = localStorage.getItem(storageKey)
    return saved ? JSON.parse(saved) : initialValues
  })

  // Every time values change, the draft is written back to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(values))
  }, [values, storageKey])

  // Clears the draft, called after a successful submit so old data does not resurface next time
  const clearDraft = () => {
    localStorage.removeItem(storageKey)
    setValues(initialValues)
  }

  return [values, setValues, clearDraft]
}

export default useDraftForm