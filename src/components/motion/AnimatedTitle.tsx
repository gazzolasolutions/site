import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

/** Section heading that reveals word by word — rise + unblur. */
export function AnimatedTitle({ text, className }: AnimatedTitleProps) {
  const words = text.split(" ");

  return (
    <h2 className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: i * 0.055, ease: EASE }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </h2>
  );
}
