import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Palette, Sparkles, Zap } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and efficient code",
  },
  {
    icon: Palette,
    title: "Creative Design",
    description: "Crafting visually stunning and intuitive interfaces",
  },
  {
    icon: Sparkles,
    title: "Animation Expert",
    description: "Bringing websites to life with smooth animations",
  },
  {
    icon: Zap,
    title: "Performance Focused",
    description: "Optimizing for speed and user experience",
  },
];

const timeline = [
  {
    year: "2024",
    title: "Frontend Developer",
    description: "Building modern web applications with React and TypeScript",
  },
  {
    year: "2023",
    title: "Web Designer",
    description: "Creating immersive digital experiences",
  },
  {
    year: "2022",
    title: "Started Learning",
    description: "Began journey into web development",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
      ref={ref}
      data-testid="section-about"
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
            data-text="About Me"
            data-testid="text-about-title"
          >
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-about-subtitle">
            A passionate developer dedicated to crafting exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-neon-cyan/20 via-neon-magenta/20 to-neon-purple/20 rounded-2xl blur-xl opacity-50" />
              <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 md:p-8" data-testid="card-about-bio">
                <p className="text-lg leading-relaxed text-foreground/90 mb-4" data-testid="text-about-intro">
                  Hey there! I'm <span className="text-neon-cyan font-semibold">Kanishka Sinha</span>, 
                  a frontend developer and web designer with a passion for creating 
                  <span className="text-neon-magenta font-semibold"> immersive digital experiences</span>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4" data-testid="text-about-description">
                  I specialize in building modern, animated, and performant websites 
                  using cutting-edge technologies. My goal is to push the boundaries 
                  of what's possible on the web.
                </p>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-about-interests">
                  When I'm not coding, you'll find me exploring new design trends, 
                  experimenting with 3D graphics, or diving deep into the latest 
                  web technologies.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="group relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-4 hover:border-neon-cyan/50 transition-colors"
                  data-testid={`card-highlight-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <item.icon className="w-6 h-6 text-neon-cyan mb-2 group-hover:text-glow-cyan transition-all" />
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-purple" />

            <div className="space-y-8">
              <h3 className="font-display text-2xl font-bold ml-8 text-neon-cyan" data-testid="text-journey-title">
                Journey
              </h3>
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                  className="relative pl-8"
                  data-testid={`card-timeline-${item.year}`}
                >
                  <div className="absolute left-0 top-2 w-8 h-8 -translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
                      className="w-3 h-3 bg-neon-cyan rounded-full"
                      style={{
                        boxShadow: "0 0 10px hsl(180 100% 50% / 0.5), 0 0 20px hsl(180 100% 50% / 0.3)",
                      }}
                    />
                  </div>
                  <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-4 hover:border-neon-magenta/50 transition-colors">
                    <span className="inline-block px-2 py-1 text-xs font-mono text-neon-magenta bg-neon-magenta/10 rounded mb-2">
                      {item.year}
                    </span>
                    <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute top-1/4 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-neon-cyan/10 rounded-full blur-3xl" />
    </section>
  );
}
