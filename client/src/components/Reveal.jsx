import { motion } from "framer-motion";

// Shared wrapper for the scroll triggered fade up used across About, Projects, Skills, Contact
// keeps the same timing and easing everywhere instead of retyping motion props in every section
// whileInView plus viewport once true means it plays the first time it enters view and never again
const Reveal = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
