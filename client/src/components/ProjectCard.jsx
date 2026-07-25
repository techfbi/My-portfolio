import { motion } from "framer-motion";
// A single project card, image box only renders if an image exists
// fixed height on the text area keeps all cards the same height regardless of content length
const ProjectCard = ({ project }) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col bg-surface border border-border rounded-2xl overflow-hidden h-full"
    >
      {/* Image only shows if this project has one, backend only projects skip this entirely */}
      {project.image && (
        <div className="w-full aspect-video overflow-hidden">
          <img
            src={`${BASE_URL}${project.image}`}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-heading font-bold text-base md:text-xl text-heading mb-2">
          {project.title}
        </h3>

        {/* flex-1 pushes the stack pills and link to the bottom, keeping card heights aligned */}
        <p className="font-body text-body text-sm lg:text-base leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-4 mb-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-body bg-[#221E18] text-xs text-body border border-border rounded-full px-3 py-1"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-accent text-xs md:text-sm font-medium hover:underline"
        >
          View Project →
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
