import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

export function FAQ() {
  const { lang } = useLanguage();
  const t = translations.faq;
  const faqs = t.items[lang];

  return (
    <section className="py-14 md:py-20 bg-muted/50" id="faq">
      <div className="container max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
          {t.title[lang]}
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card rounded-xl px-5 shadow-card border-none"
            >
              <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
