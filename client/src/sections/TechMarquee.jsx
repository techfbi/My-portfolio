import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiTailwindcss,
  SiFirebase,
  SiSupabase,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiExpress,
  SiPostman,
  SiFigma,
  SiRedis,
} from "react-icons/si";
import { Sparkles, Lock } from "lucide-react";

// Each tech carries its own official brand color, pulled straight from the icon set
// AI has no single brand logo, so it uses a generic icon with the accent color instead
const technologies = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
  { name: "Express", icon: SiExpress, color: "#FFFFFF" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  //{ name: "OAuth", icon: Lock, color: "#C19A6B" },
  { name: "AI Integration", icon: Sparkles, color: "#C19A6B" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Redis", icon: SiRedis, color: "#FF4438" },
];

const TechMarquee = () => {
  return (
    <section className="section-x py-20 border-t border-border overflow-hidden">
      <p className="text-accent text-xs md:text-sm lg:text-base font-body font-medium tracking-wide mb-3">
        Technologies & Tools
      </p>
      <h2 className="font-heading font-medium lg:font-semibold text-2xl md:text-3xl lg:text-5xl mb-12 leading-tight">
        <span className="text-heading">Tools I </span>
        <span className="text-accent">Work With</span>
      </h2>

      {/* Full bleed wrapper, negative margin cancels the section padding so the strip can scroll edge to edge */}
      <div className="relative -mx-6 md:-mx-16 overflow-hidden">
        {/* Fades the strip edges into the background so items don't cut off abruptly */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Track holds two copies of the list back to back, animation slides exactly one copy's width
            this makes the loop seamless, when copy one fully exits, copy two is already in its place */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...technologies, ...technologies].map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={`${tech.name}-${index}`}
                className="flex items-center gap-3 px-5 md:px-8"
              >
                <Icon
                  size="1em"
                  className="text-[20px] lg:text-[28px]"
                  style={{ color: tech.color }}
                />
                <span className="font-body text-body text-xs md:text-sm lg:text-base whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
