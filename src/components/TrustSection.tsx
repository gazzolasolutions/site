import { ShieldCheck, Globe, Lock, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const badgeIcons = [ShieldCheck, Globe, Lock];

export function TrustSection() {
  const { lang } = useLanguage();
  const t = translations.trust;
  const badgeLabels = t.badges[lang];
  const testimonials = t.testimonials[lang];

  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="container max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
          {t.title[lang]}
        </h2>

        <div className="grid grid-cols-3 gap-3 mb-12">
          {badgeLabels.map((label, i) => {
            const Icon = badgeIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-card shadow-card"
              >
                <Icon className="h-6 w-6 text-accent" />
                <span className="text-xs font-semibold text-foreground leading-tight">{label}</span>
              </motion.div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-5 shadow-card"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">"{t.text}"</p>
              <div>
                <div className="text-sm font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
