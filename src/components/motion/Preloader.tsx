import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import logo from "@/assets/logo.png";

const SESSION_KEY = "gs_preloaded";

/**
 * Short branded intro: logo pops in over a brand-gradient panel, then the
 * panel wipes up to reveal the page. Shows once per session, and is skipped
 * entirely for reduced-motion users.
 */
export function Preloader() {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem(SESSION_KEY) === "1";
  });

  useEffect(() => {
    if (done) return;
    if (reduceMotion) {
      setDone(true);
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }
    // Lock scroll while the intro plays
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 1500);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [done, reduceMotion]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden noise"
          style={{ background: "var(--gradient-hero)" }}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="aurora-blob animate-aurora w-[380px] h-[380px] opacity-30" style={{ background: "#1d9e75" }} />

          <div className="relative flex flex-col items-center gap-5">
            <motion.img
              src={logo}
              alt="Gazzola Solutions"
              className="h-16 w-16"
              initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
            />
            <div className="overflow-hidden">
              <motion.span
                className="block font-display text-lg font-bold text-white tracking-tight"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              >
                Gazzola<span className="text-gradient"> Solutions</span>
              </motion.span>
            </div>
            {/* Loading bar */}
            <div className="w-32 h-0.5 bg-white/15 rounded-full overflow-hidden">
              <motion.div
                className="h-full"
                style={{ background: "var(--gradient-cta)" }}
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
