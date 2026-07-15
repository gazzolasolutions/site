import { motion } from "framer-motion";
import { MessageSquareText, FileCheck, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const icons = [MessageSquareText, FileCheck, Rocket];

export function HowItWorks({ onGetStarted }: { onGetStarted?: () => void }) {
  const { lang } = useLanguage();
  const t = translations.howItWorks;
  const steps = t.steps[lang];

  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden" id="how-it-works">
      <div className="aurora-blob animate-aurora-slow w-[400px] h-[400px] -bottom-48 right-0 opacity-10" style={{ background: "#1a7a6e" }} />
      <div className="container relative">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-extrabold text-center text-foreground mb-14"
        >
          {t.title[lang]}
        </motion.h2>

        <div className="relative grid md:grid-cols-3 gap-10 md:gap-6 max-w-4xl mx-auto">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-7 left-[16%] right-[16%] h-px bg-gradient-to-r from-accent/10 via-accent/40 to-accent/10" />

          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center group"
              >
                <div className="relative inline-flex mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: "var(--gradient-cta)" }}
                  >
                    <Icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full glass flex items-center justify-center font-display text-[11px] font-bold text-accent">
                    {i + 1}
                  </span>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-accent mb-2">
                  {t.step[lang]} {i + 1}
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px] mx-auto">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            onClick={onGetStarted}
            className="group h-12 px-8 rounded-full font-bold text-accent-foreground border-0 transition-all hover:scale-[1.03] hover:shadow-[var(--shadow-glow)]"
            style={{ background: "var(--gradient-cta)" }}
          >
            {t.cta[lang]}
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
