import { useState, useEffect } from "react";
import { fetchProjects } from "../data/api";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";

// Number of project cards shown per page before pagination kicks in
const PROJECTS_PER_PAGE = 6;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Loads projects once when the section mounts
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        // Sorts so every project with a thumbnail image leads, image-less projects follow after
        // this keeps the first row visually consistent instead of mixing tall and short cards randomly
        const sorted = [...data].sort((a, b) => {
          if (a.image && !b.image) return -1;
          if (!a.image && b.image) return 1;
          return 0;
        });
        setProjects(sorted);
      } catch (error) {
        console.error("Could not load projects", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const visibleProjects = projects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE,
  );

  return (
    <section id="projects" className="section-x py-24 border-t border-border">
      <Reveal>
        <p className="text-accent text-xs md:text-sm lg:text-base font-body font-medium tracking-wide mb-3">
          My Work
        </p>
        <h2 className="font-heading font-medium lg:font-semibold text-2xl md:text-3xl lg:text-5xl mb-12">
          <span className="text-heading">Selected </span>
          <span className="text-accent">Projects</span>
        </h2>
      </Reveal>

      {loading && (
        <p className="font-body text-xs md:text-sm text-body">
          Loading projects...
        </p>
      )}

      {!loading && projects.length === 0 && (
        <p className="font-body text-body text-xs md:text-sm">
          Projects are on the way, check back soon.
        </p>
      )}

      {/* items-stretch makes every grid cell the same height, which is what
          allows ProjectCard's h-full to actually take effect */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {" "}
        {visibleProjects.map((project, index) => (
          <Reveal key={project._id} delay={(index % 3) * 0.1}>
            <ProjectCard key={project._id} project={project} />
          </Reveal>
        ))}
      </div>

      {/* Pagination only renders if there is more than one page */}
      {totalPages > 1 && (
        <div className="flex items-center gap-3 mt-12">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-full font-body text-sm transition-colors duration-200 ${
                page === currentPage
                  ? "bg-accent text-background"
                  : "border border-border text-body hover:border-accent"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      <p className="font-body text-body text-xs md:text-sm mt-12">
        More of what I've built and experimented with lives on{" "}
        <a
          href="https://github.com/techfbi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          GitHub →
        </a>
      </p>
    </section>
  );
};

export default Projects;
