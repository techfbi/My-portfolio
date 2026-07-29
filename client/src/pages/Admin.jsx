import { useState, useEffect } from "react";
import {
  fetchProjects,
  verifyAdminPassword,
  createProject,
  updateProject,
  deleteProject,
} from "../data/api";
import useAdminAuth from "../hooks/useAdminAuth";
import useDraftForm from "../hooks/useDraftForm";

const emptyProject = {
  title: "",
  description: "",
  type: "",
  stack: [],
  link: "",
  existingImage: null,
};

const Admin = () => {
  const { token, checked, login, logout } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Null means the add new project form is showing, an id means we are editing that specific project
  const [editingId, setEditingId] = useState(null);

  // Draft key changes based on whether we are adding or editing a specific project
  // this keeps each form's unsaved input separate so switching between edits does not mix data
  const draftKey = editingId ? `admin_draft_${editingId}` : "admin_draft_new";
  const [formValues, setFormValues, clearDraft] = useDraftForm(
    draftKey,
    emptyProject,
  );

  const [stackInput, setStackInput] = useState("");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Loads the project list once a valid token exists, used both for the initial load and after any change
  const loadProjects = async () => {
    setLoadingProjects(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError("Could not load projects");
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    if (token) loadProjects();
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const result = await verifyAdminPassword(password);
    if (result.success) {
      login(result.token);
    } else {
      setError(result.message || "Incorrect password");
    }
  };

  const toggleStack = (item) => {
    setFormValues((prev) => ({
      ...prev,
      stack: prev.stack.includes(item)
        ? prev.stack.filter((s) => s !== item)
        : [...prev.stack, item],
    }));
  };

  // Loads an existing project's values into the form, switching the page into edit mode
  const startEditing = (project) => {
    setEditingId(project._id);
    setFormValues({
      title: project.title,
      description: project.description,
      type: project.type || "",
      stack: project.stack,
      link: project.link,
      existingImage: project.image,
    });
    setImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEditing = () => {
    setEditingId(null);
    clearDraft();
    setImage(null);
  };

  const handleDelete = async (id) => {
    // Confirm avoids an accidental delete since there is no undo once a project is removed from the json file
    if (!window.confirm("Delete this project? This cannot be undone.")) return;
    await deleteProject(id, token);
    loadProjects();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage("");

    const data = new FormData();
    data.append("title", formValues.title);
    data.append("description", formValues.description);
    data.append("type", formValues.type);
    data.append("stack", formValues.stack.join(","));
    data.append("link", formValues.link);
    if (formValues.existingImage)
      data.append("existingImage", formValues.existingImage);
    if (image) data.append("image", image);

    try {
      if (editingId) {
        await updateProject(editingId, data, token);
        setSuccessMessage("Project updated");
      } else {
        await createProject(data, token);
        setSuccessMessage("Project added");
      }
      clearDraft();
      setImage(null);
      setEditingId(null);
      loadProjects();
    } catch (err) {
      setError("Something went wrong, please try again");
    } finally {
      setSubmitting(false);
    }
  };

  // Waits for the localStorage check to finish before deciding what to render
  // without this the password screen would flash briefly even when a valid session already exists
  if (!checked) return null;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-surface border border-border rounded-2xl p-8"
        >
          <h1 className="font-heading font-bold text-2xl text-heading mb-6">
            Admin Access
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full text-[16px] bg-background border border-border rounded-lg px-4 py-3 text-heading font-body mb-4 focus:outline-none focus:border-accent"
          />
          {error && (
            <p className="text-red-400 font-body text-sm mb-4">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-accent text-background font-body font-semibold py-3 rounded-lg hover:bg-accent/90 transition-colors duration-200"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 md:px-16 py-16 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-heading font-bold text-3xl text-heading">
          {editingId ? "Edit Project" : "Add New Project"}
        </h1>
        <button
          onClick={logout}
          className="font-body text-sm text-body hover:text-heading transition-colors duration-200"
        >
          Log out
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-16">
        <div>
          <label className="font-body text-sm text-body block mb-2">
            Project Title
          </label>
          <input
            type="text"
            value={formValues.title}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, title: e.target.value }))
            }
            required
            className="w-full text-[16px] bg-surface border border-border rounded-lg px-4 py-3 text-heading font-body focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="font-body text-sm text-body block mb-2">
            Project Details
          </label>
          <textarea
            value={formValues.description}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            required
            rows={4}
            className="w-full text-[16px] bg-surface border border-border rounded-lg px-4 py-3 text-heading font-body focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          {/* Datalist gives suggestions from common types while still letting you type anything not listed
              this matches how the stack input works, a fixed dropdown would block a type you haven't used yet */}
          <label className="font-body text-sm text-body block mb-2">
            Project Type
          </label>
          <input
            type="text"
            list="project-type-options"
            value={formValues.type}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, type: e.target.value }))
            }
            placeholder="e.g. Frontend, Backend, Full Stack, CMS"
            className="w-full text-[16px] bg-surface border border-border rounded-lg px-4 py-3 text-heading font-body focus:outline-none focus:border-accent"
          />
          <datalist id="project-type-options">
            <option value="Frontend" />
            <option value="Backend" />
            <option value="Full Stack" />
            <option value="CMS" />
            <option value="Mobile" />
            <option value="AI" />
          </datalist>
        </div>

        <div>
          <label className="font-body text-sm text-body block mb-2">
            Stack Used
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formValues.stack.map((item) => (
              <span
                key={item}
                onClick={() => toggleStack(item)}
                className="font-body text-sm rounded-full px-4 py-2 bg-accent text-background cursor-pointer"
              >
                {item} ✕
              </span>
            ))}
          </div>
          <input
            type="text"
            value={stackInput}
            onChange={(e) => setStackInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const trimmed = stackInput.trim();
                if (trimmed && !formValues.stack.includes(trimmed)) {
                  setFormValues((prev) => ({
                    ...prev,
                    stack: [...prev.stack, trimmed],
                  }));
                }
                setStackInput("");
              }
            }}
            placeholder="Type a technology and press enter"
            className="w-full text-[16px] bg-surface border border-border rounded-lg px-4 py-3 text-heading font-body focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="font-body text-sm text-body block mb-2">
            Project Image{" "}
            {formValues.existingImage &&
              "(uploading a new one replaces the current image)"}
          </label>
          {formValues.existingImage && !image && (
            <img
              src={formValues.existingImage}
              alt="Current project"
              className="w-32 h-20 object-cover rounded-lg mb-3 border border-border"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-[16px] font-body text-body"
          />
        </div>

        <div>
          <label className="font-body text-sm text-body block mb-2">
            Project Link
          </label>
          <input
            type="url"
            value={formValues.link}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, link: e.target.value }))
            }
            required
            className="w-full text-[16px] bg-surface border border-border rounded-lg px-4 py-3 text-heading font-body focus:outline-none focus:border-accent"
          />
        </div>

        {successMessage && (
          <p className="text-accent font-body text-sm">{successMessage}</p>
        )}
        {error && <p className="text-red-400 font-body text-sm">{error}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-accent text-background font-body font-semibold px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors duration-200 disabled:opacity-50"
          >
            {submitting
              ? "Saving..."
              : editingId
                ? "Update Project"
                : "Add Project"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEditing}
              className="font-body text-body px-6 py-3 border border-border rounded-lg hover:border-accent transition-colors duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Existing projects list, each one editable or deletable directly from here */}
      <h2 className="font-heading font-bold text-2xl text-heading mb-6">
        Existing Projects
      </h2>

      {loadingProjects && <p className="font-body text-body">Loading...</p>}

      <div className="flex flex-col gap-3">
        {projects.map((project) => (
          <div
            key={project._id}
            className="flex items-center justify-between bg-surface border border-border rounded-xl px-5 py-4"
          >
            <div>
              <p className="font-heading font-bold text-heading text-sm">
                {project.title}
              </p>
              <p className="font-body text-body text-xs">
                {project.stack.join(", ")}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => startEditing(project)}
                className="font-body text-sm text-accent hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="font-body text-sm text-red-400 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
