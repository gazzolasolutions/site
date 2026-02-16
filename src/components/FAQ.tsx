import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do I need to send my passport?",
    a: "No. As a Certified Acceptance Agent, we verify your documents in person or remotely, so your passport never leaves your hands.",
  },
  {
    q: "Do I need to live in the US?",
    a: "No. You can form a US company and apply for an ITIN from anywhere in the world.",
  },
  {
    q: "How long does it take?",
    a: "LLC formation takes 1-2 weeks depending on the state. ITIN processing is typically 8-12 weeks after submission to the IRS.",
  },
  {
    q: "Do I need an SSN?",
    a: "No. We help non-residents who don't have an SSN get their EIN and ITIN.",
  },
  {
    q: "What languages do you support?",
    a: "We offer full support in English, Spanish, and Portuguese to ensure clear communication throughout the process.",
  },
];

export function FAQ() {
  return (
    <section className="py-14 md:py-20 bg-muted/50" id="faq">
      <div className="container max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
          Frequently Asked Questions
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
