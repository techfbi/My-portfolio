import { useState } from "react";
import { motion } from "framer-motion";

// Fixed character limit for the description before truncating
// same number applies to every card, this is what makes the truncation behavior consistent site wide
const DESCRIPTION_LIMIT = 140;

const ProjectCard = ({ project }) => {
  // Tracks whether this specific card's description is expanded
  const [expanded, setExpanded] = useState(false);

  // Only truncate if the description is actually longer than the limit
  // this is what stops read more from showing on short descriptions that never needed it
  const isLong = project.description.length > DESCRIPTION_LIMIT;
  const displayText =
    isLong && !expanded
      ? `${project.description.slice(0, DESCRIPTION_LIMIT).trim()}...`
      : project.description;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="h-full flex flex-col bg-surface border border-border rounded-2xl overflow-hidden"
    >
      {project.image && (
        <div className="w-full aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-heading font-bold text-base md:text-xl text-heading mb-2">
            {project.title}
          </h3>
          {project.type && (
            <span className="shrink-0 font-body text-xs text-accent border border-accent/30 rounded-full px-3 py-1 mb-3">
              {project.type}
            </span>
          )}
        </div>

        <p className="font-body text-body/70 text-xs md:text-sm lg:text-base leading-relaxed h-[110px]">
          {" "}
          {displayText}
          {/* Read more only renders when the text is genuinely truncated, never shows on short descriptions */}
          {isLong && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="text-accent font-medium ml-1 hover:underline"
            >
              Read more
            </button>
          )}
        </p>

        {/* Show less only appears once expanded, gives a way back without losing the card's original compact size */}
        {isLong && expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="text-accent font-medium text-xs md:text-sm mb-3 text-left hover:underline"
          >
            Show less
          </button>
        )}

        <div className="flex flex-wrap gap-2 mt-3 min-h-[88px]">
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
          className="mt-auto font-body text-accent text-xs md:text-sm font-medium hover:underline"
        >
          View Project →
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
