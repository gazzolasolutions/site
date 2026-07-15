import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useCalendlyPopup } from "@/hooks/useCalendlyPopup";

export function FinalCTA({ onGetStarted }: { onGetStarted?: () => void }) {
  const { lang } = useLanguage();
  const t = translations.finalCTA;
  const openCalendly = useCalendlyPopup();

  // Panel grows and straightens as it enters the viewport.
  // Completes early (by ~1/3 of the way in) so it is never left dim
  // on viewports where the panel can't reach the center of the screen.
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.95, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.35], [5, 0]);

  return (
    <section className="py-16 md:py-24 bg-background" style={{ perspective: "1200px" }}>
      <div className="container" ref={ref}>
        <motion.div
          style={{ background: "var(--gradient-hero)", scale, rotateX, transformPerspective: 1200 }}
          className="relative overflow-hidden rounded-[2.5rem] noise text-center px-6 py-16 md:py-24 will-change-transform"
        >
          <div className="aurora-blob animate-aurora w-[400px] h-[400px] -top-32 left-1/4 opacity-30" style={{ background: "#1d9e75" }} />
          <div className="aurora-blob animate-aurora-slow w-[300px] h-[300px] -bottom-24 right-1/4 opacity-25" style={{ background: "#5DCAA5" }} />
          <div className="absolute inset-0 bg-grid" />

          <div className="relative">
            <h2
              className="font-display font-extrabold text-white mb-4 max-w-2xl mx-auto leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3.5vw + 0.5rem, 3rem)" }}
            >
              {t.title[lang]}
            </h2>
            <p className="text-white/70 mb-9 max-w-md mx-auto text-base md:text-lg">
              {t.subtitle[lang]}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="group text-accent-foreground h-14 px-9 rounded-full font-bold text-base border-0 transition-all hover:scale-[1.03] hover:shadow-[var(--shadow-glow)]"
                style={{ background: "var(--gradient-cta)" }}
              >
                {t.cta[lang]}
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={openCalendly}
                className="glass border-white/15 text-white hover:bg-white/10 hover:text-white h-14 px-9 rounded-full text-base font-semibold"
              >
                {t.consultation[lang]}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
