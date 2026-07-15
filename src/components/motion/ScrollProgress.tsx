import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient progress bar pinned above the header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{ scaleX, background: "var(--gradient-cta)" }}
    />
  );
}
