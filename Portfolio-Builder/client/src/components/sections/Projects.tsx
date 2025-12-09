import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    id: 1,
    title: "3D Portfolio Website",
    description:
      "An immersive portfolio website featuring Three.js 3D graphics, particle systems, and smooth page transitions. Built with modern web technologies for maximum performance.",
    image: "linear-gradient(135deg, hsl(270 100% 20%), hsl(300 100% 25%), hsl(270 100% 15%))",
    techStack: ["React", "Three.js", "Framer Motion", "TypeScript"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    description:
      "A modern, responsive dashboard for managing online stores. Features real-time analytics, inventory management, and beautiful data visualizations.",
    image: "linear-gradient(135deg, hsl(180 100% 20%), hsl(200 100% 25%), hsl(180 100% 15%))",
    techStack: ["Next.js", "Tailwind CSS", "Chart.js", "Node.js"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "AI Chat Application",
    description:
      "A real-time chat application powered by AI. Features natural language processing, smart replies, and a sleek, modern interface.",
    image: "linear-gradient(135deg, hsl(300 100% 20%), hsl(320 100% 25%), hsl(300 100% 15%))",
    techStack: ["React", "OpenAI API", "Socket.io", "Express"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Music Visualizer",
    description:
      "An interactive audio visualizer that creates stunning visual effects synchronized with music. Features multiple visualization modes and custom themes.",
    image: "linear-gradient(135deg, hsl(220 100% 20%), hsl(240 100% 25%), hsl(220 100% 15%))",
    techStack: ["Three.js", "Web Audio API", "GLSL", "React"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 overflow-hidden"
      ref={ref}
      data-testid="section-projects"
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
            data-text="Projects"
            data-testid="text-projects-title"
          >
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-projects-subtitle">
            A showcase of my latest work and creative experiments
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-16"
          data-testid="carousel-featured-projects"
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
                style={{ background: featuredProjects[activeIndex].image }}
                data-testid={`slide-project-${featuredProjects[activeIndex].id}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge variant="secondary" className="mb-4 bg-neon-purple/20 text-neon-purple border-neon-purple/30" data-testid="badge-featured">
                      Featured
                    </Badge>
                    <h3 className="font-display text-2xl md:text-4xl font-bold mb-3 text-glow-cyan" data-testid="text-featured-project-title">
                      {featuredProjects[activeIndex].title}
                    </h3>
                    <p className="text-muted-foreground max-w-2xl mb-4 text-sm md:text-base" data-testid="text-featured-project-description">
                      {featuredProjects[activeIndex].description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredProjects[activeIndex].techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-neon-cyan/30 text-neon-cyan text-xs"
                          data-testid={`badge-tech-${tech.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        className="bg-neon-cyan hover:bg-neon-cyan/90 text-background"
                        data-testid={`button-demo-project-${featuredProjects[activeIndex].id}`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border hover:border-neon-magenta/50"
                        data-testid={`button-github-project-${featuredProjects[activeIndex].id}`}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <Button
              size="icon"
              variant="ghost"
              onClick={prevProject}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm hover:bg-background/70 z-10"
              data-testid="button-carousel-prev"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={nextProject}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm hover:bg-background/70 z-10"
              data-testid="button-carousel-next"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-8 bg-neon-cyan"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  data-testid={`button-carousel-dot-${index}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-display text-2xl font-bold mb-8 text-center" data-testid="text-other-projects-title">
            Other Projects
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative"
                data-testid={`card-project-${project.id}`}
              >
                <div
                  className={`absolute -inset-0.5 rounded-xl blur-sm transition-opacity duration-300 ${
                    hoveredId === project.id ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ background: project.image }}
                />
                <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-neon-magenta/50 transition-colors">
                  <div
                    className="h-32 relative"
                    style={{ background: project.image }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>
                  <div className="p-6">
                    <h4 className="font-display text-xl font-bold mb-2 group-hover:text-neon-cyan transition-colors" data-testid={`text-project-title-${project.id}`}>
                      {project.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2" data-testid={`text-project-description-${project.id}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-border text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 3 && (
                        <Badge variant="outline" className="border-border text-xs">
                          +{project.techStack.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-1 hover:text-neon-cyan hover:bg-neon-cyan/10"
                        data-testid={`button-demo-other-${project.id}`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-1 hover:text-neon-magenta hover:bg-neon-magenta/10"
                        data-testid={`button-github-other-${project.id}`}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/4 left-0 w-72 h-72 bg-neon-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl" />
    </section>
  );
}
