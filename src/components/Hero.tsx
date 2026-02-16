import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroIllustration from "@/assets/hero-illustration.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

export function Hero({ onGetStarted }: { onGetStarted?: () => void }) {
  const { lang } = useLanguage();
  const t = translations.hero;

  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="container py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary-foreground"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
              {t.title[lang]}
            </h1>
            <p className="text-base md:text-lg opacity-85 mb-6 leading-relaxed max-w-lg">
              {t.subtitle[lang]}
            </p>

            <ul className="space-y-2.5 mb-8">
              {t.bullets[lang].map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm md:text-base">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                  <span className="opacity-90">{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-base font-semibold h-12 px-8 rounded-xl shadow-lg"
                onClick={onGetStarted}
              >
                {t.cta[lang]}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground/40 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 text-base h-12 px-8 rounded-xl"
                onClick={() => document.getElementById("calendly")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t.consultation[lang]}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src={heroIllustration}
              alt={t.imgAlt[lang]}
              className="w-full max-w-sm md:max-w-md"
              loading="eager"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
