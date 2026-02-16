import { motion } from "framer-motion";
import { MessageSquareText, FileCheck, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: MessageSquareText,
    title: "Tell Us About Your Business",
    desc: "Share your goals and we'll map the best path forward.",
  },
  {
    icon: FileCheck,
    title: "We Handle the Paperwork",
    desc: "Our team takes care of filing, compliance, and approvals.",
  },
  {
    icon: Rocket,
    title: "Your US Business Is Ready",
    desc: "Start operating your US company with full confidence.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-14 md:py-20 bg-background" id="how-it-works">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
          How It Works in 3 Simple Steps
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-card text-center"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-6 w-6 text-accent" />
              </div>
              <div className="text-xs font-semibold text-accent mb-1">Step {i + 1}</div>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 h-11 px-8 rounded-xl font-semibold">
            Start Your Application
          </Button>
        </div>
      </div>
    </section>
  );
}
