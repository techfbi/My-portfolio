import Reveal from "../components/Reveal";
// About introduces who Oluwafemi is and backs it up with concrete numbers
// left aligned throughout, matching the mobile first alignment decision made earlier
const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "8+", label: "Projects Completed" },
  { value: "Full Stack", label: "Frontend & Backend heavy" },
  { value: "10+", label: "Technologies Used" },
];

const About = () => {
  return (
    <section id="about" className="section-x py-24 border-t border-border">
      <Reveal>
        <p className="text-accent text-sm lg:text-base font-body font-medium tracking-wide mb-3">
          About Me
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column carries the big statement headline */}
          <h2 className="font-heading font-medium lg:font-semibold text-2xl md:text-3xl lg:text-5xl leading-tight">
            <span className="text-heading">Passionate about </span>
            <span className="text-accent">building</span>
            <span className="text-heading"> reliable, scalable software</span>
          </h2>

          {/* Right column carries the descriptive paragraphs, replace with your real bio */}
          <div className="flex flex-col gap-5">
            <p className="font-body text-sm lg:text-base text-body leading-relaxed">
              I hold a B.Tech in Information Technology from the Federal
              University of Technology Akure (FUTA). Since then, I've expanded
              my foundation in software engineering, databases, system design,
              and AI by building production-ready full-stack applications,
              secure authentication systems, and AI-powered solutions. One weird
              thing about me: I genuinely enjoy solving problems. And no, not
              life problems 😂... technology problems. I love breaking down
              complex challenges, experimenting with different approaches, and
              finally getting everything to click. I build applications end to
              end, from intuitive React and TypeScript interfaces to scalable
              backend systems with Node.js, Express.js, PostgreSQL, and MongoDB.
            </p>
            <p className="font-body text-body/70 leading-relaxed">
              <strong>My engineering philosophy</strong> center on clean
              architecture, thoughtful system design, and intuitive user
              experiences with uncompromising security.{" "}
              <i>
                {" "}
                To me, full-stack isn't just a title, it's how I think, build,
                and solve problems.
              </i>
            </p>
          </div>
        </div>
      </Reveal>

      {/* Stats grid, two columns on mobile, four across on desktop */}
      <Reveal
        delay={0.2}
        className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10 mt-16"
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-heading font-extrabold text-2xl md:text-3xl text-accent mb-1">
              {stat.value}
            </p>
            <p className="font-body text-body text-sm">{stat.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
};

export default About;
