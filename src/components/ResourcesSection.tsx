import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { AnimatedTitle } from "@/components/motion/AnimatedTitle";
import { DrawUnderline } from "@/components/motion/DrawUnderline";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { ARTICLES } from "@/data/articles";

export function ResourcesSection() {
  const { lang } = useLanguage();
  const t = translations.resources;
  const prefix = lang === "en" ? "" : `/${lang}`;

  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden" id="resources">
      <div className="aurora-blob animate-aurora-slow w-[400px] h-[400px] -top-40 -left-48 opacity-10" style={{ background: "#1a7a6e" }} />
      <div className="container relative">
        <div className="flex flex-col items-center text-center mb-12">
          <AnimatedTitle
            text={t.title[lang]}
            className="font-display text-3xl md:text-4xl font-bold text-foreground"
          />
          <DrawUnderline className="h-3 w-28 mt-2 mb-4" />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-muted-foreground max-w-md mx-auto"
          >
            {t.subtitle[lang]}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {ARTICLES.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 90, damping: 16 }}
            >
              <Link
                to={`${prefix}/resources/${article.slug}`}
                className="group flex flex-col h-full glass rounded-3xl p-6 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Clock size={13} className="text-accent" />
                  {article.readMinutes} {t.minRead[lang]}
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2 leading-snug group-hover:text-accent transition-colors">
                  {article.title[lang]}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {article.excerpt[lang]}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-accent">
                  {t.readArticle[lang]}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
