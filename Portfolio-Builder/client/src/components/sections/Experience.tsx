import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    company: "Tech Innovators Inc.",
    location: "Remote",
    duration: "2023 - Present",
    description:
      "Leading frontend development for enterprise-level web applications. Implementing modern UI/UX patterns and mentoring junior developers.",
    responsibilities: [
      "Architecting scalable React applications",
      "Implementing Three.js 3D visualizations",
      "Performance optimization and code reviews",
      "Mentoring team members",
    ],
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Digital Agency Co.",
    location: "Bangalore, India",
    duration: "2022 - 2023",
    description:
      "Developed interactive websites and web applications for various clients. Focused on creating engaging user experiences with smooth animations.",
    responsibilities: [
      "Building responsive web applications",
      "Creating animation-rich interfaces",
      "Client collaboration and requirements gathering",
      "Cross-browser compatibility testing",
    ],
  },
  {
    id: 3,
    role: "Junior Web Developer",
    company: "StartUp Labs",
    location: "Mumbai, India",
    duration: "2021 - 2022",
    description:
      "Started my professional journey building websites and learning modern web technologies. Gained hands-on experience with React and JavaScript.",
    responsibilities: [
      "Developing landing pages and portfolios",
      "Learning React and TypeScript",
      "Collaborating with design team",
      "Bug fixing and maintenance",
    ],
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-rave"
      ref={ref}
      data-testid="section-experience"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="glitch font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            data-text="Experience"
            data-testid="text-experience-title"
          >
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-experience-subtitle">
            My professional journey in web development
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-purple"
            />
          </div>

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                data-testid={`card-experience-${exp.id}`}
              >
                <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 md:-translate-x-1/2 top-0">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
                    className="w-4 h-4 bg-neon-cyan rounded-full"
                    style={{
                      boxShadow: "0 0 15px hsl(180 100% 50% / 0.5), 0 0 30px hsl(180 100% 50% / 0.3)",
                    }}
                  />
                </div>

                <div className={`flex-1 pl-16 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div
                    className={`group relative bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-neon-cyan/50 transition-all duration-300 ${
                      index % 2 === 0 ? "md:ml-auto" : ""
                    }`}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan/20 via-neon-magenta/10 to-neon-purple/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className={`flex items-center gap-2 mb-2 text-sm text-muted-foreground ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                        <Calendar className="w-4 h-4 text-neon-magenta" />
                        <span data-testid={`text-exp-duration-${exp.id}`}>{exp.duration}</span>
                      </div>

                      <h3 className="font-display text-xl md:text-2xl font-bold text-neon-cyan mb-1" data-testid={`text-exp-role-${exp.id}`}>
                        {exp.role}
                      </h3>

                      <div className={`flex items-center gap-4 mb-4 text-sm ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4 text-neon-magenta" />
                          <span data-testid={`text-exp-company-${exp.id}`}>{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span data-testid={`text-exp-location-${exp.id}`}>{exp.location}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 text-sm" data-testid={`text-exp-description-${exp.id}`}>
                        {exp.description}
                      </p>

                      <ul className={`space-y-2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                        {exp.responsibilities.map((resp, respIndex) => (
                          <motion.li
                            key={respIndex}
                            initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.2 + respIndex * 0.1 + 0.3 }}
                            className={`flex items-center gap-2 text-sm ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                            data-testid={`text-exp-resp-${exp.id}-${respIndex}`}
                          >
                            <span className="w-1.5 h-1.5 bg-neon-purple rounded-full flex-shrink-0" />
                            <span>{resp}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-1/3 right-0 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl" />
    </section>
  );
}
