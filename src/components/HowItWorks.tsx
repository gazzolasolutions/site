import { motion } from "framer-motion";
import { MessageSquareText, FileCheck, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const icons = [MessageSquareText, FileCheck, Rocket];

export function HowItWorks({ onGetStarted }: { onGetStarted?: () => void }) {
  const { lang } = useLanguage();
  const t = translations.howItWorks;
  const steps = t.steps[lang];

  return (
    <section className="py-14 md:py-20 bg-background" id="how-it-works">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
          {t.title[lang]}
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-card text-center"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                {(() => { const Icon = icons[i]; return <Icon className="h-6 w-6 text-accent" />; })()}
              </div>
              <div className="text-xs font-semibold text-accent mb-1">{t.step[lang]} {i + 1}</div>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 h-11 px-8 rounded-xl font-semibold" onClick={onGetStarted}>
            {t.cta[lang]}
          </Button>
        </div>
      </div>
    </section>
  );
}
