import { Code2, Server, Database, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
// Hero always fills the full viewport height on every screen size
// portrait stays fixed to the viewport height and never shrinks on tablet or desktop
// text and service cards are the flexible columns that resize around it
// on mobile everything stacks, portrait on top, centered
const services = [
  {
    icon: Code2,
    title: "Frontend Development",
    detail: "React.js, TypeScript, Tailwind CSS, modern UI libraries",
  },
  {
    icon: Server,
    title: "Backend Development",
    detail: "Node.js, API Design, Express js",
  },
  {
    icon: Database,
    title: "Database Design",
    detail:
      "Relational and NoSQL database design, schema architecture, query optimization, PostgreSQL, MongoDB.",
  },
  {
    icon: Sparkles,
    title: "AI Solutions",
    detail:
      "LLM Integration, Langchain, prompt engineering, AI automation, multimodal AI, Conversational AI, Retrieval-Augmented Generation (RAG).",
  },
];

const Hero = () => {
  return (
    // min-h-screen forces full viewport height at every breakpoint, flex centers content vertically when there is extra room
    <section
      id="home"
      className="hero-landscape section-x relative h-screen flex flex-col md:flex-row md:items-center md:justify-between md:h-auto md:min-h-screen pt-20 md:pt-10 lg:pt-0 pb-8 md:pb-0 gap-4 md:gap-4"
    >
      {/* Portrait is a background layer, absolutely positioned and centered
          it sits outside the flex flow entirely so it never affects the width of the columns beside it
          resizing the viewport only moves its centered position, never its size, only mobile keeps it in normal flow at the top */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
        className="hidden md:flex mt-[10px] lg:mt-[80px] absolute inset-0 items-center justify-center pointer-events-none z-0"
      >
        {" "}
        <div
          className="md:hidden lg:block absolute w-16 h-16 rounded-full border border-accent/40"
          style={{ top: "20%", right: "25%" }}
        />
        <div
          className="md:hidden lg:block absolute w-3 h-3 rounded-full bg-accent"
          style={{ top: "20%", right: "25%" }}
        />
        <img
          src="/images/portrait.png"
          alt="Portrait of Oluwafemi Johnson"
          className="h-[85vh] w-auto object-cover hero-portrait-fade"
          fetchpriority="high"
          loading="eager"
          decoding="async"
        />
      </motion.div>
      {/* Text column, relative and z-10 lifts it above the background portrait
          md:w-full with justify-between on the parent handles left right spacing, this column no longer shrinks for the image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="hero-text order-2 md:order-1 relative z-10 md:w-[50%] lg:w-[34%] hero-landscape-text flex-1 md:flex-none flex flex-col justify-center md:block min-h-0"
      >
        {" "}
        <p className="text-accent text-sm lg:text-base font-body font-medium tracking-wide mb-3">
          Hi, I'm
        </p>
        <h1 className="font-heading text-4xl md:text-2xl lg:text-6xl leading-[1.05] mb-2">
          <span className="text-heading font-extrabold block">Oluwafemi</span>
          <span className="text-accent font-extrabold block">Johnson</span>
        </h1>
        <h2 className="font-body text-xs md:text-sm lg:text-lg text-body font-medium mb-4">
          Full Stack Software Engineer
        </h2>
        <p className="font-body w-[90%] md:w-[100%] text-body/70 text-xs md:text-sm lg:text-base leading-relaxed mb-5 md:mb-8">
          Full stack means I don't hand off problems, I own them end to end,
          from database schema to Interactive UIs. Security built in at every
          layer, clean architecture and thoughtful system design throughout. I
          care just as much about all of it.
        </p>
        <div className="flex items-center gap-6 mb-6 md:mb-8">
          <a
            href="mailto:femiwebfullstack@gmail.com"
            className="bg-accent text-xs md:text-sm lg:text-base text-background font-body font-semibold px-4 lg:px-6 py-2 lg:py-3 rounded-full hover:bg-accent/90 transition-colors duration-200"
          >
            Available for work →
          </a>
          <a
            href="/Oluwafemi_Johnson_Fullstack_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs md:text-sm lg:text-base text-heading underline underline-offset-4 decoration-muted hover:decoration-accent transition-colors duration-200"
          >
            Resume ↓
          </a>
        </div>
        <div className="flex items-center gap-4 mb-[100px] md:mb-0">
          <a
            href="https://github.com/techfbi"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent transition-colors duration-200"
          >
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"></path>
            </svg>
          </a>
          <a
            href="https://x.com/ojayy__x?s=21"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent transition-colors duration-200"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </a>
          <a
            href="mailto:femiwebfullstack@gmail.com"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent transition-colors duration-200"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.749L12 10.09l9.615-6.269h.749A1.636 1.636 0 0 1 24 5.457z"></path>
            </svg>
          </a>
        </div>
      </motion.div>

      {/* Mobile only portrait, stays in normal document flow and stacks above the text
          this is separate from the desktop background version above, which is why desktop hides this with md:hidden
          height reduced and shrink-0 added so it never eats into the space the text and social row below need */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="order-1 md:hidden shrink-0 flex justify-center relative"
      >
        {" "}
        <img
          src="/images/portrait.png"
          alt="Portrait of Oluwafemi Johnson"
          className="hero-mobile-image h-[45vh] w-auto object-contain hero-portrait-fade"
          fetchpriority="high"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* Service cards column, relative and z-10 lifts it above the background portrait, fixed percentage width, unrelated to the image size */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="hero-services order-3 relative z-10 md:w-[44%] lg:w-[34%] hidden md:flex flex-col items-start md:items-end gap-6 md:ml-auto"
      >
        {" "}
        <span className=" md:hidden lg:flex items-center gap-2 border border-border rounded-full px-4 py-2 font-body text-xs lg:text-sm text-heading">
          <span className="w-2 h-2 rounded-full bg-accent" />
          Available for work
        </span>
        <div className="flex flex-col gap-4 w-full">
          {services.map((service, index) => {
            // Grabs the icon component itself so it can be rendered as a tag below
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.7 + index * 0.1,
                  ease: "easeOut",
                }}
                className="flex items-start gap-3 bg-surface border border-border rounded-xl p-4"
              >
                {/* Icon sits in its own small circle to the left, matching the reference layout */}
                <span className="shrink-0 w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                  <Icon size={16} className="text-accent" />
                </span>
                <div>
                  <h3 className="font-heading font-bold text-xs lg:text-sm text-heading mb-1">
                    {service.title}
                  </h3>
                  <p className="font-body text-[10px] lg:text-xs text-body">
                    {service.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
