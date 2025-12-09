import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailRef = useRef<{ x: number; y: number }[]>([]);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      trailRef.current.push({ x: e.clientX, y: e.clientY });
      if (trailRef.current.length > 10) {
        trailRef.current.shift();
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleMouseOut = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
          className="relative"
        >
          <div
            className={`rounded-full transition-all duration-200 ${
              isHovering
                ? "w-10 h-10 bg-neon-cyan/30 border-2 border-neon-cyan"
                : "w-4 h-4 bg-white"
            }`}
            style={{
              boxShadow: isHovering
                ? "0 0 20px hsl(180 100% 50% / 0.5), 0 0 40px hsl(180 100% 50% / 0.3)"
                : "0 0 10px rgba(255,255,255,0.5)",
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 2 : 1,
            opacity: isVisible ? 0.3 : 0,
          }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="w-8 h-8 rounded-full border border-neon-magenta/50"
          style={{
            boxShadow: "0 0 15px hsl(300 100% 50% / 0.3)",
          }}
        />
      </motion.div>

      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
