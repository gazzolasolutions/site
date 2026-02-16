import { ShieldCheck, Globe, Lock, Star } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { icon: ShieldCheck, label: "Certified Acceptance Agent" },
  { icon: Globe, label: "Multilingual Support" },
  { icon: Lock, label: "Secure & Confidential" },
];

const testimonials = [
  {
    text: "They made the entire ITIN process painless. I kept my passport and got everything done in weeks!",
    name: "Maria S.",
    role: "E-commerce Founder",
  },
  {
    text: "Professional, fast, and they speak my language. Best decision I made for my US business.",
    name: "Carlos R.",
    role: "Tech Entrepreneur",
  },
];

export function TrustSection() {
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="container max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
          Trusted by Entrepreneurs Worldwide
        </h2>

        <div className="grid grid-cols-3 gap-3 mb-12">
          {badges.map((b) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-card shadow-card"
            >
              <b.icon className="h-6 w-6 text-accent" />
              <span className="text-xs font-semibold text-foreground leading-tight">{b.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-5 shadow-card"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">"{t.text}"</p>
              <div>
                <div className="text-sm font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
