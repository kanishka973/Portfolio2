import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 border-t border-border" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <a href="#home" className="font-display text-2xl font-bold gradient-text" data-testid="link-footer-logo">
              KS
            </a>
            <p className="text-sm text-muted-foreground mt-2" data-testid="text-footer-tagline">
              Frontend Developer & Web Designer
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-1 text-sm text-muted-foreground"
            data-testid="text-footer-credits"
          >
            <span>Made with</span>
            <Heart className="w-4 h-4 text-neon-magenta fill-neon-magenta animate-glow-pulse" />
            <span>by Kanishka Sinha</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              className="border-neon-cyan/30 hover:border-neon-cyan/60 hover:bg-neon-cyan/10"
              data-testid="button-scroll-top"
            >
              <ArrowUp className="w-5 h-5 text-neon-cyan" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-border text-center"
        >
          <p className="text-xs text-muted-foreground" data-testid="text-footer-copyright">
            &copy; {new Date().getFullYear()} Kanishka Sinha. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
