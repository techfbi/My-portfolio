import { Send } from "lucide-react";
import Reveal from "../components/Reveal";

// This section intentionally diverges from the reference cards layout
// a single focused block reads more confident for a direct call to action
// than three repeated card patterns, which is what the reference used
const Contact = () => {
  return (
    <section id="contact" className="section-x py-24 border-t border-border">
      <Reveal>
        <p className="text-accent text-sm lg:text-base font-body font-medium tracking-wide mb-3">
          Get In Touch
        </p>
        <h2 className="font-heading font-medium lg:font-semibold text-2xl md:text-3xl lg:text-6xl leading-tight mb-6 max-w-2xl">
          <span className="text-heading">Let's build something </span>
          <span className="text-accent">worth shipping</span>
        </h2>
        <p className="font-body text-sm lg:text-base text-body max-w-lg mb-10 leading-relaxed">
          Open to new opportunities, freelance work, interesting problems and
          collaborations. If you have something in mind, reach out directly.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="flex flex-col sm:flex-row gap-4">
        <a
          href="mailto:femiwebfullstack@gmail.com"
          className="text-sm lg:text-base flex items-center justify-center gap-2 bg-accent text-background font-body font-semibold px-8 py-2 rounded-full hover:bg-accent/70 transition-colors duration-200"
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.749L12 10.09l9.615-6.269h.749A1.636 1.636 0 0 1 24 5.457z"></path>
          </svg>
          Send an Email
        </a>
        <a
          href="https://www.linkedin.com/in/johnsonprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm lg:text-base flex items-center justify-center gap-2 border border-border text-heading font-body font-semibold px-8 py-4 rounded-full hover:border-accent transition-colors duration-200"
        >
          <img src="./images/linkedin.svg" alt="linkedin" className="h-5 w-5" />
          Message on LinkedIn
        </a>
        <a
          href="https://wa.me/2349063932266"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm lg:text-base flex items-center justify-center gap-2 border border-border text-heading font-body font-semibold px-8 py-4 rounded-full hover:border-accent transition-colors duration-200"
        >
          <img src="./images/whatsapp.svg" alt="linkedin" className="h-5 w-5" />
          WhatsApp
        </a>
      </Reveal>
    </section>
  );
};

export default Contact;
