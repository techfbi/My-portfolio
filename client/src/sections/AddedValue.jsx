import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Images that loop on the right side, each paired with a short caption
// so the rotating visual always has context instead of just floating unlabeled
const showcaseImages = [
  {
    src: "/images/tedx.JPG",
    caption: "Design Lead, TEDx FUTA",
  },
  {
    src: "/images/jci.jpeg",
    caption: "Executive Director, Media & Branding, JCI FUTA",
  },
  {
    src: "/images/flaxallshot.png",
    caption: "Flax - UI/UX Design in Figma",
    link: "https://www.figma.com/proto/ItNxi69UeCtkinKTfJL4vb/Flax-project?node-id=92-1172&t=kaUFMQzLu47bQUSO-1",
  },
];

// This section deliberately breaks from every other section's layout
// no card grid, no centered heading, a two column split instead
// so it reads as a distinct dimension of who you are, not another content block
const AddedValue = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Advances to the next image automatically every few seconds
  // cleanup on unmount stops the interval from continuing to run after leaving the page
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="added-value"
      className="section-x py-24 border-t border-border grid lg:grid-cols-2 gap-12 items-center"
    >
      {/* Left column, the story, quote, and small credential marks */}
      <motion.div
        className="order-2 lg:order-1"
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hidden lg:block text-accent text-xs md:text-sm font-body font-medium tracking-wide mb-3">
          Beyond the Code
        </p>

        <p className="font-body text-body text-xs md:text-sm lg:text-base leading-relaxed mb-6">
          Before I wrote code professionally, I was designing digital
          experiences. I led the design team for TEDx FUTA, served as Executive
          Director for Media and Branding at JCI FUTA,and created identities and
          interfaces for several organizations.That background is why user
          experience has always been at the core of how I build, not an
          afterthought. Flax is a complete example, designed in Figma and built
          by me from pixel to production.
        </p>

        {/* Quote styled distinctly from body text, a left border instead of quotation marks
            keeps it from looking like a decorative pull quote and more like a stated principle */}
        <p className="font-body text-body/70 text-xs md:text-sm leading-snug">
          <blockquote className="border-l-4 border-accent bg-accent/10 pl-4 py-3 mb-8">
            The UI is your product's handshake, it forms a user's opinion before
            they ever trigger a single line of backend code. If that handshake
            is clumsy or slow, users leave, making even the most brilliant
            engineering irrelevant.
          </blockquote>
        </p>

        {/* Small credential marks, logos if you have them, initials as a fallback so nothing breaks
            if a logo file is missing, the design intentionally degrades gracefully instead of showing a broken image */}
        <div className="flex items-center gap-6">
          <img
            src="/images/TEDxLogoonBlack.png"
            alt="TEDx FUTA"
            className="h-4 md:h-6 w-auto opacity-70"
          />
          <img
            src="/images/JCIlogo.png"
            alt="JCI FUTA"
            className="h-5 md:h-7 w-auto opacity-70"
          />
          <span className=" items-center flex align-bottom gap-2 text-body/70 text-sm">
            <img
              src="./images/linkedin.svg"
              alt="linkedin"
              className="h-4 md:h-6 w-auto opacity-70"
            />
            <p>Linkedin-local</p>
          </span>
          <img
            src="/images/logoDark.png"
            alt="JCI FUTA"
            className="h-6 w-auto opacity-70"
          />
        </div>
      </motion.div>

      {/* Right column, looping showcase image with caption, crossfades between images rather than cutting hard */}
      <p className="lg:hidden text-accent text-xs md:text-sm font-body font-medium tracking-wide">
        Beyond the Code
      </p>
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="order-1 lg:order-2 relative aspect-[2/1] rounded-2xl overflow-hidden border border-border"
      >
        {showcaseImages.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.caption}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            fetchpriority="high"
            loading="eager"
            decoding="async"
          />
        ))}

        {/* Caption overlay, changes with the active image, sits on a gradient-free solid dark strip for contrast */}
        <div className="absolute bottom-0 left-0 right-0 bg-background/90 px-4 py-3">
          <p className="font-body text-xs text-body">
            {showcaseImages[activeIndex].caption}

            {showcaseImages[activeIndex].link && (
              <>
                {" • "}
                <a
                  href={showcaseImages[activeIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-moringa hover:text-moringa-deep underline transition-colors"
                >
                  View Prototype
                </a>
              </>
            )}
          </p>
        </div>

        {/* Small dots indicating position in the loop, also clickable to jump directly to an image */}
        <div className="absolute top-4 right-4 flex gap-1.5">
          {showcaseImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                index === activeIndex ? "bg-accent" : "bg-border"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AddedValue;
