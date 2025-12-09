import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiGit,
  SiJavascript,
  SiFigma,
  SiThreedotjs,
  SiFramer,
  SiVercel,
  SiVite,
} from "react-icons/si";

const skillCategories = [
  {
    title: "Frontend",
    color: "cyan",
    skills: [
      { name: "React", icon: SiReact, level: 95 },
      { name: "Next.js", icon: SiNextdotjs, level: 90 },
      { name: "TypeScript", icon: SiTypescript, level: 88 },
      { name: "JavaScript", icon: SiJavascript, level: 95 },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 92 },
    ],
  },
  {
    title: "Animation & 3D",
    color: "magenta",
    skills: [
      { name: "Three.js", icon: SiThreedotjs, level: 85 },
      { name: "Framer Motion", icon: SiFramer, level: 90 },
      { name: "GSAP", icon: null, level: 88 },
    ],
  },
  {
    title: "Tools & Platforms",
    color: "purple",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, level: 85 },
      { name: "Git", icon: SiGit, level: 90 },
      { name: "Figma", icon: SiFigma, level: 80 },
      { name: "Vercel", icon: SiVercel, level: 88 },
      { name: "Vite", icon: SiVite, level: 92 },
    ],
  },
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "cyan":
      return {
        text: "text-neon-cyan",
        bg: "bg-neon-cyan",
        border: "border-neon-cyan/30 hover:border-neon-cyan/60",
        glow: "shadow-neon-cyan",
      };
    case "magenta":
      return {
        text: "text-neon-magenta",
        bg: "bg-neon-magenta",
        border: "border-neon-magenta/30 hover:border-neon-magenta/60",
        glow: "shadow-neon-magenta",
      };
    case "purple":
      return {
        text: "text-neon-purple",
        bg: "bg-neon-purple",
        border: "border-neon-purple/30 hover:border-neon-purple/60",
        glow: "shadow-neon-purple",
      };
    default:
      return {
        text: "text-neon-cyan",
        bg: "bg-neon-cyan",
        border: "border-neon-cyan/30",
        glow: "shadow-neon-cyan",
      };
  }
};

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-rave"
      ref={ref}
      data-testid="section-skills"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="glitch font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            data-text="Skills"
            data-testid="text-skills-title"
          >
            <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-skills-subtitle">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const colors = getColorClasses(category.color);
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.15 }}
                className="relative group"
                data-testid={`card-skill-category-${category.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-transparent via-${category.color === "cyan" ? "neon-cyan" : category.color === "magenta" ? "neon-magenta" : "neon-purple"}/20 to-transparent rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 h-full">
                  <h3 className={`font-display text-xl font-bold mb-6 ${colors.text}`} data-testid={`text-category-${category.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    {category.title}
                  </h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: categoryIndex * 0.15 + skillIndex * 0.08,
                        }}
                        className={`group/skill relative border ${colors.border} rounded-lg p-4 transition-all duration-300`}
                        data-testid={`card-skill-${skill.name.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            {skill.icon ? (
                              <skill.icon className={`w-5 h-5 ${colors.text}`} />
                            ) : (
                              <div className={`w-5 h-5 ${colors.bg} rounded-sm opacity-80`} />
                            )}
                            <span className="font-medium" data-testid={`text-skill-name-${skill.name.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}>{skill.name}</span>
                          </div>
                          <span className={`text-sm font-mono ${colors.text}`} data-testid={`text-skill-level-${skill.name.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{
                              duration: 1,
                              delay: categoryIndex * 0.15 + skillIndex * 0.1,
                              ease: "easeOut",
                            }}
                            className={`h-full ${colors.bg} rounded-full`}
                            style={{
                              boxShadow: `0 0 10px hsl(var(--neon-${category.color}))`,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6" data-testid="text-skills-learning">
            Always learning and exploring new technologies
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["WebGL", "Shaders", "Web Audio API", "PWA", "WebRTC"].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                className="px-4 py-2 text-sm font-mono border border-border rounded-full bg-card/30 hover:border-neon-cyan/50 transition-colors"
                data-testid={`badge-tech-${tech.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/3 left-0 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-neon-cyan/5 rounded-full blur-3xl" />
    </section>
  );
}
