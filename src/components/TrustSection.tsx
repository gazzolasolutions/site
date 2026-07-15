import { useEffect, useState } from "react";
import { ShieldCheck, Globe, Lock, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedTitle } from "@/components/motion/AnimatedTitle";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const badgeIcons = [ShieldCheck, Globe, Lock];

const PAIR_SIZE = 2;
const ROTATE_MS = 7000;

export function TrustSection() {
  const { lang } = useLanguage();
  const t = translations.trust;
  const badgeLabels = t.badges[lang];
  const testimonials = t.testimonials[lang];

  const pageCount = Math.ceil(testimonials.length / PAIR_SIZE);
  const [page, setPage] = useState(0);

  // Rotate testimonials periodically
  useEffect(() => {
    const id = setInterval(() => setPage((p) => (p + 1) % pageCount), ROTATE_MS);
    return () => clearInterval(id);
  }, [pageCount]);

  const visible = testimonials.slice(page * PAIR_SIZE, page * PAIR_SIZE + PAIR_SIZE);

  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      <div className="container max-w-4xl relative">
        <AnimatedTitle
          text={t.title[lang]}
          className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-12"
        />

        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-14">
          {badgeLabels.map((label, i) => {
            const Icon = badgeIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 24 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 140, damping: 14 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="flex flex-col items-center text-center gap-2.5 p-4 md:p-6 rounded-2xl glass hover:border-accent/25 transition-colors"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: "var(--gradient-cta)" }}>
                  <Icon className="h-5 w-5 text-accent-foreground" />
                </span>
                <span className="text-xs md:text-sm font-semibold text-foreground leading-tight">{label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Rotating testimonials */}
        <div className="relative min-h-[240px] md:min-h-[210px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 64 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -64 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-2 gap-5"
            >
              {visible.map((tm) => (
                <motion.div
                  key={tm.name}
                  whileHover={{ y: -6 }}
                  className="relative glass rounded-3xl p-6 md:p-7 hover:border-accent/25 transition-colors"
                >
                  <Quote className="absolute top-5 right-6 h-8 w-8 text-accent/15" />
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-5">"{tm.text}"</p>
                  <div className="flex items-center gap-3">
                    <span
                      className="flex items-center justify-center w-9 h-9 rounded-full font-display text-sm font-bold text-accent-foreground"
                      style={{ background: "var(--gradient-cta)" }}
                    >
                      {tm.name.charAt(0)}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-foreground">{tm.name}</div>
                      <div className="text-xs text-muted-foreground">{tm.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Page dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(pageCount)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Testimonials ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === page ? "w-6 bg-accent" : "w-2 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
