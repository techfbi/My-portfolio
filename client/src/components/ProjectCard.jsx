import { motion } from "framer-motion";

// Card now sizes to its own content instead of being forced to match the tallest card in its row
// this is intentional since some projects have images and long descriptions, others do not
// forcing equal height was creating large empty gaps on shorter cards, letting them size naturally reads as clean instead of broken
const ProjectCard = ({ project }) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col bg-surface border border-border rounded-2xl overflow-hidden"
    >
      {project.image && (
        <div className="w-full aspect-video overflow-hidden">
          <img
            src={`${BASE_URL}${project.image}`}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col p-6">
        {/* Type tag sits above the title, small and quiet, gives quick context before reading the description */}

        <div className="flex justify-between">
          <h3 className="font-heading font-bold text-base md:text-xl text-heading mb-2">
            {project.title}
          </h3>
          {project.type && (
            <span className="self-start font-body text-xs text-accent border border-accent/30 rounded-full px-3 py-1 mb-3">
              {project.type}
            </span>
          )}
        </div>

        <p className="font-body text-body text-sm lg:text-base leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
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
