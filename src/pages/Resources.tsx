import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QualificationForm } from "@/components/QualificationForm";
import { Seo } from "@/components/Seo";
import { AnimatedTitle } from "@/components/motion/AnimatedTitle";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { ARTICLES } from "@/data/articles";
import { track } from "@/lib/analytics";

const ResourcesContent = () => {
  const { lang } = useLanguage();
  const t = translations.resources;
  const prefix = lang === "en" ? "" : `/${lang}`;
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => {
    track("form_open");
    setFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${t.title[lang]} — Gazzola Solutions`}
        description={t.subtitle[lang]}
        path="/resources"
      />
      <ScrollProgress />
      <Header onGetStarted={openForm} />

      <section className="relative overflow-hidden noise py-14 md:py-20" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 bg-grid" />
        <div className="container relative text-center">
          <AnimatedTitle
            text={t.title[lang]}
            className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
          />
          <p className="text-white/70 max-w-md mx-auto">{t.subtitle[lang]}</p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container max-w-3xl space-y-6">
          {ARTICLES.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`${prefix}/resources/${article.slug}`}
                className="group block glass rounded-3xl p-6 md:p-8 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Clock size={13} className="text-accent" />
                  {article.readMinutes} {t.minRead[lang]}
                </div>
                <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 leading-snug group-hover:text-accent transition-colors">
                  {article.title[lang]}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
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
      </section>

      <Footer />
      <QualificationForm open={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  );
};

const Resources = () => (
  <LanguageProvider>
    <ResourcesContent />
  </LanguageProvider>
);

export default Resources;
