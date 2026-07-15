import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedTitle } from "@/components/motion/AnimatedTitle";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

export function FAQ() {
  const { lang } = useLanguage();
  const t = translations.faq;
  const faqs = t.items[lang];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden" id="faq" style={{ background: "linear-gradient(180deg, hsl(180 55% 5%) 0%, hsl(180 60% 7%) 100%)" }}>
      <div className="container max-w-2xl relative">
        <AnimatedTitle
          text={t.title[lang]}
          className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-10"
        />
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <AccordionItem
                value={`faq-${i}`}
                className="glass rounded-2xl px-5 md:px-6 border-white/5 data-[state=open]:border-accent/30 transition-colors"
              >
                <AccordionTrigger className="text-sm md:text-base font-semibold text-foreground hover:no-underline hover:text-accent py-5 text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-[15px] text-muted-foreground pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
