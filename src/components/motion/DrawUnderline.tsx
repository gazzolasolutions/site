import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface DrawUnderlineProps {
  className?: string;
}

/**
 * A clean, confident underline that draws itself on scroll into view.
 * Uses a non-scaling stroke so it never distorts at any width, plus a
 * mint gradient for a refined brand accent.
 */
export function DrawUnderline({ className }: DrawUnderlineProps) {
  const reduceMotion = useReducedMotion();
  const gid = useId();

  return (
    <svg
      className={className}
      viewBox="0 0 200 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9FE1CB" />
          <stop offset="55%" stopColor="#5DCAA5" />
          <stop offset="100%" stopColor="#1d9e75" />
        </linearGradient>
      </defs>
      <motion.path
        d="M3 6 Q100 2 197 5"
        stroke={`url(#${gid})`}
        strokeWidth="4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />
    </svg>
  );
}
