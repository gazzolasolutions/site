import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const COLORS = ["#5DCAA5", "#9FE1CB", "#1d9e75", "#ffffff", "#FFD166"];

interface BurstProps {
  x: string;
  y: string;
  delay: number;
  count?: number;
  radius?: number;
}

function Burst({ x, y, delay, count = 24, radius = 130 }: BurstProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.35;
        const dist = radius * (0.55 + Math.random() * 0.65);
        return {
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          color: COLORS[i % COLORS.length],
          size: 4 + Math.random() * 5,
          duration: 1.2 + Math.random() * 0.5,
        };
      }),
    [count, radius]
  );

  return (
    <div className="absolute" style={{ left: x, top: y }}>
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, background: p.color, boxShadow: `0 0 10px ${p.color}` }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{
            x: p.dx,
            y: [0, p.dy * 0.8, p.dy + 50],
            opacity: [0, 1, 1, 0],
            scale: [0.4, 1, 0.9, 0.2],
          }}
          transition={{ duration: p.duration, delay, ease: [0.12, 0.75, 0.35, 1] }}
        />
      ))}
    </div>
  );
}

/** Celebratory firework bursts — decorative, skipped for reduced-motion users. */
export function Fireworks() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10" aria-hidden>
      <Burst x="50%" y="28%" delay={0.15} />
      <Burst x="20%" y="45%" delay={0.55} count={18} radius={95} />
      <Burst x="80%" y="38%" delay={0.85} count={18} radius={95} />
      <Burst x="35%" y="20%" delay={1.2} count={14} radius={75} />
      <Burst x="68%" y="60%" delay={1.5} count={14} radius={75} />
    </div>
  );
}
