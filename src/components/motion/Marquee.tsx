import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  wrap,
} from "framer-motion";

interface MarqueeProps {
  items: string[];
  /** Base pixels per second when idle. */
  baseSpeed?: number;
}

/**
 * Infinite marquee that auto-scrolls and speeds up (and flips direction) with
 * scroll velocity — the more you scroll, the faster the strip races.
 */
export function Marquee({ items, baseSpeed = 40 }: MarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });

  // Two copies sit side by side; wrap within -50%..0 for a seamless loop.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseSpeed * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * Math.abs(vf);
    // Convert px/s intent to a small percentage step
    baseX.set(baseX.get() + moveBy * 0.02);
  });

  const row = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <motion.div className="flex whitespace-nowrap w-max" style={{ x }}>
        {row.map((label, i) => (
          <span
            key={i}
            className="flex items-center gap-2 px-6 text-xs font-semibold uppercase tracking-widest text-white/50"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            {label}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
