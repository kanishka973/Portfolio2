import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.3,
        }
      );
    }
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="char inline-block"
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 bg-gradient-radial from-neon-purple/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span 
            className="inline-block px-4 py-2 text-sm font-mono text-neon-cyan border border-neon-cyan/30 rounded-full bg-neon-cyan/5 animate-glow-pulse"
            data-testid="badge-hero-role"
          >
            Frontend Developer & Web Designer
          </span>
        </motion.div>

        <h1
          ref={titleRef}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          data-testid="text-hero-name"
        >
          <span className="block text-glow-cyan">{splitText("Kanishka")}</span>
          <span className="block gradient-text mt-2">{splitText("Sinha")}</span>
        </h1>

        <motion.p
          ref={subtitleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10"
          data-testid="text-hero-tagline"
        >
          Passionate about building{" "}
          <span className="text-neon-magenta">immersive</span>,{" "}
          <span className="text-neon-cyan">animated</span>, and{" "}
          <span className="text-neon-purple">next-gen</span> websites.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="group relative overflow-visible bg-neon-purple hover:bg-neon-purple/90 text-white font-semibold px-8 py-6 text-lg neon-border-purple"
            onClick={() => {
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            data-testid="button-hero-projects"
          >
            <span className="relative z-10">View Projects</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="group border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 px-8 py-6 text-lg"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            data-testid="button-hero-contact"
          >
            Contact Me
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={handleScrollDown}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-muted-foreground hover:text-neon-cyan transition-colors"
            data-testid="button-hero-scroll"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute top-1/4 left-10 w-2 h-2 bg-neon-cyan rounded-full animate-float opacity-60" />
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-neon-magenta rounded-full animate-float opacity-40" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-neon-purple rounded-full animate-float opacity-50" style={{ animationDelay: "2s" }} />
      <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-neon-cyan rounded-full animate-float opacity-70" style={{ animationDelay: "0.5s" }} />
    </section>
  );
}
