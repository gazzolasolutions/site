import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Direction = "up" | "left" | "diagonal";

const CLIP: Record<Direction, { from: string; to: string }> = {
  up: { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
  left: { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
  diagonal: {
    from: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    to: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  },
};

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}

/** Reveals its child with a clip-path wipe as it scrolls into view. */
export function Reveal({ children, direction = "up", delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  const clip = CLIP[direction];
  return (
    <motion.div
      className={className}
      initial={{ clipPath: clip.from }}
      whileInView={{ clipPath: clip.to }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay }}
      style={{ willChange: "clip-path" }}
    >
      {children}
    </motion.div>
  );
}
