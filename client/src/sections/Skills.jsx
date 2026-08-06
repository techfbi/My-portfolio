import Reveal from "../components/Reveal";
// Grouped by category, matches the layout from your reference screenshot
// stack reflects your real tools, React and Node instead of the reference person's stack
const skillGroups = [
  {
    category: "Frontend",
    skills: ["React", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "TypeScript", "REST APIs", "OAuth"],
  },
  {
    category: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "AI",
    skills: [
      "Prompt Engineering",
      "LLM Integration",
      "Retrieval-Augmented Generation",
      "Conversational AI",
    ],
  },
  {
    category: "Tools & Others",
    skills: ["Git", "Postman", "Cloudflare"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section-x py-24 border-t border-border">
      <Reveal>
        <p className="text-accent text-xs md:text-sm lg:text-base font-body font-medium tracking-wide mb-3">
          What I Work With
        </p>
        <h2 className="font-heading font-medium lg:font-semibold text-2xl md:text-3xl lg:text-5xl mb-16">
          <span className="text-heading">My </span>
          <span className="text-accent">Tech Stack</span>
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
        {skillGroups.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.1}>
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <h3 className="font-heading font-bold text-base lg:text-lg text-heading">
                {group.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-body text-xs md:text-sm text-body border border-border rounded-full px-4 py-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Skills;
