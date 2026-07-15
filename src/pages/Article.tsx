import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QualificationForm } from "@/components/QualificationForm";
import { Seo } from "@/components/Seo";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { getArticle } from "@/data/articles";
import { track } from "@/lib/analytics";

const ArticleContent = () => {
  const { lang } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const t = translations.resources;
  const nav = translations.nav;
  const prefix = lang === "en" ? "" : `/${lang}`;
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => {
    track("form_open");
    setFormOpen(true);
  };

  const article = slug ? getArticle(slug) : undefined;
  if (!article) return <Navigate to={`${prefix}/resources`} replace />;

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${article.title[lang]} — Gazzola Solutions`}
        description={article.excerpt[lang]}
        path={`/resources/${article.slug}`}
      />
      <ScrollProgress />
      <Header onGetStarted={openForm} />

      <article className="container max-w-2xl py-12 md:py-16">
        <Link
          to={`${prefix}/resources`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={15} /> {t.backToResources[lang]}
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Clock size={13} className="text-accent" />
            {article.readMinutes} {t.minRead[lang]}
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
            {article.title[lang]}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
            {article.excerpt[lang]}
          </p>
        </motion.div>

        <div className="space-y-8">
          {article.sections.map((section, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
                {section.heading[lang]}
              </h2>
              <p className="text-[15px] md:text-base text-foreground/75 leading-relaxed">
                {section.body[lang]}
              </p>
            </motion.section>
          ))}
        </div>

        {/* Inline CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl noise text-center px-6 py-10 mt-14"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="absolute inset-0 bg-grid" />
          <div className="relative">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-5">
              {t.ctaTitle[lang]}
            </h3>
            <Button
              onClick={openForm}
              className="group h-12 px-8 rounded-full font-bold text-accent-foreground border-0 transition-all hover:scale-[1.03] hover:shadow-[var(--shadow-glow)]"
              style={{ background: "var(--gradient-cta)" }}
            >
              {nav.getStarted[lang]}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </article>

      <Footer />
      <QualificationForm open={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  );
};

const Article = () => (
  <LanguageProvider>
    <ArticleContent />
  </LanguageProvider>
);

export default Article;
