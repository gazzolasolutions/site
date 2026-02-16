import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const titles = {
  en: "Book Your Free Consultation",
  es: "Reserve Su Consulta Gratuita",
  pt: "Agende Sua Consulta Gratuita",
};

const subtitles = {
  en: "Pick a time that works for you — we'll walk you through everything.",
  es: "Elija un horario que le convenga — le guiaremos en todo.",
  pt: "Escolha um horário que funcione para você — vamos te guiar em tudo.",
};

export function CalendlyEmbed() {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="calendly" className="py-16 md:py-24 bg-muted/50">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
            {titles[lang]}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {subtitles[lang]}
          </p>
        </div>
        <div
          ref={containerRef}
          className="calendly-inline-widget mx-auto rounded-xl overflow-hidden"
          data-url="https://calendly.com/gazzolasolutions/30min"
          style={{ minWidth: "320px", height: "700px", maxWidth: "800px" }}
        />
      </motion.div>
    </section>
  );
}
