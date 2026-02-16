import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useCalendlyPopup } from "@/hooks/useCalendlyPopup";

export function FinalCTA({ onGetStarted }: { onGetStarted?: () => void }) {
  const { lang } = useLanguage();
  const t = translations.finalCTA;
  const openCalendly = useCalendlyPopup();

  return (
    <section className="py-16 md:py-24" style={{ background: "var(--gradient-hero)" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container text-center"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
          {t.title[lang]}
        </h2>
        <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
          {t.subtitle[lang]}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 rounded-xl font-semibold text-base"
            onClick={onGetStarted}
          >
            {t.cta[lang]}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 h-12 px-8 rounded-xl text-base font-semibold bg-transparent"
            onClick={openCalendly}
          >
            {t.consultation[lang]}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
