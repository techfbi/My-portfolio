import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

// Links map the visible label to the section id it should scroll to
// home scrolls to the very top, others scroll to their section by id
const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  // Tracks whether the page has scrolled at all, used to slightly darken the pill on scroll
  const [scrolled, setScrolled] = useState(false);

  // Tracks whether the mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // Listens to scroll position and flips scrolled once the user moves past the top
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scrolls to a section by id, home is treated as the top of the page
  const scrollToSection = (id) => {
    setMenuOpen(false);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-2 left-0 right-0 z-50 flex justify-center px-4">
      {/* The pill itself, glass effect comes from backdrop blur plus a translucent background
          so content scrolling underneath is visible but softened */}
      <nav
        className={`flex items-center justify-between w-full max-w-[95vw] rounded-lg px-6 py-3 backdrop-blur-lg border border-border transition-colors duration-300 ${
          scrolled ? "bg-surface/70" : "bg-surface/40"
        }`}
      >
        {/* Logo mark, as instructed this reads O.jayy instead of a full name */}
        <button
          onClick={() => scrollToSection("home")}
          className="font-heading font-bold text-heading text-xs md:text-sm lg:text-lg"
        >
          O.jayy<span className="text-accent">.</span>
        </button>

        {/* Center links, hidden on mobile, shown from medium screens up */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-body text-body text-sm hover:text-heading transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Let's Connect points to LinkedIn, opens in a new tab since its an outbound link */}
        <a
          href="https://www.linkedin.com/in/johnsonprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block font-body text-sm font-medium text-heading border border-border rounded-full px-5 py-2 hover:border-accent transition-colors duration-200"
        >
          Let's Connect →
        </a>

        {/* Mobile menu toggle, only visible below medium screens */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-heading"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown, only rendered when open, sits below the pill */}
      {menuOpen && (
        <div className="absolute top-20 w-[calc(100%-2rem)] max-w-5xl rounded-3xl bg-surface/95 backdrop-blur-lg border border-border p-6 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-body text-body text-left text-base hover:text-heading transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://www.linkedin.com/in/johnsonprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-heading border border-border rounded-full px-5 py-2 text-center mt-2"
          >
            Let's Connect →
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
