import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, ShieldCheck, Star, ArrowRight, Check, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useCalendlyPopup } from "@/hooks/useCalendlyPopup";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function Hero({ onGetStarted }: { onGetStarted?: () => void }) {
  const { lang } = useLanguage();
  const t = translations.hero;
  const trust = translations.trust;
  const how = translations.howItWorks;
  const steps = how.steps[lang];
  const openCalendly = useCalendlyPopup();

  const marqueeItems = [...t.bullets[lang], ...trust.badges[lang]];

  // Parallax: layers drift at different speeds as the hero scrolls away
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden noise" style={{ background: "var(--gradient-hero)" }}>
      {/* Aurora blobs */}
      <motion.div className="aurora-blob animate-aurora w-[500px] h-[500px] -top-40 -right-32 opacity-30" style={{ background: "#1d9e75", y: blob1Y }} />
      <motion.div className="aurora-blob animate-aurora-slow w-[400px] h-[400px] top-1/2 -left-40 opacity-20" style={{ background: "#5DCAA5", y: blob2Y }} />
      <div className="absolute inset-0 bg-grid" />

      <div className="container relative py-14 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-14 items-center">
          <motion.div variants={container} initial="hidden" animate="show" style={{ y: textY, opacity: heroOpacity }}>
            {/* Credential badge */}
            <motion.div variants={item} className="inline-flex items-center gap-2 glass rounded-full pl-1.5 pr-4 py-1.5 mb-6">
              <span className="flex items-center justify-center w-6 h-6 rounded-full" style={{ background: "var(--gradient-cta)" }}>
                <ShieldCheck size={13} className="text-accent-foreground" />
              </span>
              <span className="text-xs font-semibold" style={{ color: "#9FE1CB" }}>
                {trust.badges[lang][0]}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display font-bold text-white leading-[1.08] mb-5"
              style={{ fontSize: "clamp(2.2rem, 3.4vw + 1rem, 3.5rem)" }}
            >
              {t.title[lang]}
            </motion.h1>

            <motion.p variants={item} className="text-base md:text-lg text-white/75 mb-7 leading-relaxed max-w-lg">
              {t.subtitle[lang]}
            </motion.p>

            <motion.ul variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 max-w-md">
              {t.bullets[lang].map((b) => (
                <li key={b} className="flex items-center gap-2.5 glass rounded-xl px-3.5 py-2.5 text-sm text-white/90">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                  {b}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="group text-accent-foreground text-base font-bold h-14 px-8 rounded-full border-0 transition-all hover:scale-[1.03] hover:shadow-[var(--shadow-glow)]"
                style={{ background: "var(--gradient-cta)" }}
              >
                {t.cta[lang]}
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={openCalendly}
                className="glass border-white/15 text-white hover:bg-white/10 hover:text-white text-base h-14 px-8 rounded-full font-semibold"
              >
                {t.consultation[lang]}
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={item} className="flex items-center gap-3 mt-7">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-xs text-white/60 font-medium">
                {translations.finalCTA.subtitle[lang]}
              </span>
            </motion.div>
          </motion.div>

          {/* Visual: formation progress card */}
          <motion.div className="relative flex justify-center md:justify-end px-6 md:px-4" style={{ y: cardY }}>
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              className="relative w-full max-w-[400px]"
            >
              {/* Glow */}
              <div className="absolute -inset-10 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "var(--gradient-cta)" }} />

              {/* Main card */}
              <div className="relative glass rounded-3xl p-6 md:p-7 animate-float shadow-2xl">
                <h2 className="font-display text-lg md:text-xl font-bold text-white leading-snug pb-5 border-b border-white/10">
                  {how.title[lang]}
                </h2>

                <div className="pt-6">
                  {steps.map((s, i) => {
                    const done = i < 2;
                    return (
                      <div key={i} className="relative flex items-start gap-4 pb-6">
                        {i < steps.length - 1 && (
                          <span className="absolute left-[15px] top-9 bottom-0 w-px bg-gradient-to-b from-accent/50 to-accent/10" />
                        )}
                        <span
                          className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${done ? "" : "ring-1 ring-accent/40 bg-accent/10"}`}
                          style={done ? { background: "var(--gradient-cta)" } : undefined}
                        >
                          {done ? (
                            <Check className="h-4 w-4 text-accent-foreground" strokeWidth={3} />
                          ) : (
                            <Rocket className="h-3.5 w-3.5 text-accent" />
                          )}
                        </span>
                        <div className="pt-0.5">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-accent/80 mb-1">
                            {how.step[lang]} {i + 1}
                          </div>
                          <div className="text-sm font-semibold text-white leading-snug mb-0.5">{s.title}</div>
                          <div className="text-xs text-white/55 leading-relaxed">{s.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button
                  onClick={onGetStarted}
                  className="group w-full h-12 rounded-full font-bold text-accent-foreground border-0 transition-all hover:scale-[1.02] hover:shadow-[var(--shadow-glow)]"
                  style={{ background: "var(--gradient-cta)" }}
                >
                  {how.cta[lang]}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Marquee trust strip */}
      <div className="relative border-t border-white/10 py-3.5 overflow-hidden">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((label, i) => (
            <span key={i} className="flex items-center gap-2 px-6 text-xs font-semibold uppercase tracking-widest text-white/50 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
