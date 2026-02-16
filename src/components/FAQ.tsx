import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do I need an ITIN to open an LLC?",
    a: "Not necessarily. Many business owners only need an EIN to get started. We help you determine whether an ITIN applies to your situation.",
  },
  {
    q: "Do I need to send my passport to the IRS?",
    a: "No. As a Certified Acceptance Agent, we verify your documents in person or remotely, so your passport never leaves your hands.",
  },
  {
    q: "Do you only work with Florida companies?",
    a: "Yes, we are currently focused on Florida business formations to provide the best possible service and expertise.",
  },
  {
    q: "Do I need to live in Florida?",
    a: "No. Non-residents can open a Florida LLC from anywhere in the world.",
  },
  {
    q: "How long does it take?",
    a: "Florida LLC formation takes 1–2 weeks. ITIN processing is typically 8–12 weeks after submission to the IRS.",
  },
  {
    q: "Do I need an SSN?",
    a: "No. We help non-residents who don't have an SSN get their EIN and, if needed, their ITIN.",
  },
  {
    q: "What languages do you support?",
    a: "We offer full support in English, Portuguese, and Spanish to ensure clear communication throughout the process.",
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
