import { useState } from "react";
import { motion } from "framer-motion";

// Fixed character limit for the description before truncating
// same number applies to every card, this is what makes the truncation behavior consistent site wide
const DESCRIPTION_LIMIT = 140;

const ProjectCard = ({ project }) => {
  // Tracks whether this specific card's description is expanded
  const [expanded, setExpanded] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);

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
      className="flex h-full flex-col rounded-2xl border border-border bg-surface overflow-hidden"
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

        <div className="min-h-[95px] mb-1">
          <p className="font-body text-body/70 text-xs md:text-sm lg:text-base leading-relaxed">
            {displayText}

            {isLong && !expanded && (
              <button
                onClick={() => setExpanded(true)}
                className="text-accent font-medium ml-1 hover:underline"
              >
                Read more
              </button>
            )}
          </p>

          {isLong && expanded && (
            <button
              onClick={() => setExpanded(false)}
              className="mt-2 mb-2 text-accent font-medium text-xs md:text-sm hover:underline"
            >
              Show less
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {(showAllTags ? project.stack : project.stack.slice(0, 7)).map(
            (tech) => (
              <span
                key={tech}
                className="inline-flex items-center justify-center h-8 px-3 rounded-full border border-border bg-[#221E18] text-xs text-body leading-none whitespace-nowrap"
              >
                {tech}
              </span>
            ),
          )}

          {project.stack.length > 7 && (
            <button
              type="button"
              onClick={() => setShowAllTags(!showAllTags)}
              className="inline-flex items-center justify-center h-8 px-3 rounded-full border border-accent/40 text-xs text-accent hover:bg-accent/10 transition-colors"
            >
              {showAllTags ? "Show less" : `+${project.stack.length - 7} more`}
            </button>
          )}
        </div>

        <a
          href={project.link}
          className="mt-auto font-body text-accent text-xs md:text-sm font-medium hover:underline"
        >
          View Project →
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
