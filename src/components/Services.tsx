import { motion } from "framer-motion";
import { Building2, FileText, Shield, BookOpen, Calculator, Landmark, FileCheck, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const serviceIcons = [Building2, FileText, Shield, BookOpen, Calculator, FileCheck, XCircle, RefreshCw, Landmark];

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  bullets: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
  subtitle?: string;
  note?: string;
  onCTA?: () => void;
}

function ServiceCard({ icon: Icon, title, bullets, cta, featured, badge, subtitle, note, onCTA }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-xl p-6 transition-shadow flex flex-col ${
        featured
          ? "bg-card shadow-card-hover border-2 border-accent/30 relative"
          : "bg-card shadow-card border border-border"
      }`}
      style={featured ? { background: "var(--gradient-featured)" } : undefined}
    >
      {badge && (
        <Badge className="absolute -top-3 left-6 bg-accent text-accent-foreground font-semibold px-3">
          <Star className="h-3 w-3 mr-1" /> {badge}
        </Badge>
      )}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${featured ? "bg-accent/15" : "bg-muted"}`}>
        <Icon className={`h-5 w-5 ${featured ? "text-accent" : "text-foreground"}`} />
      </div>
      <h3 className={`font-bold mb-1 ${featured ? "text-lg" : "text-base"} text-foreground`}>{title}</h3>
      {subtitle && <p className="text-xs text-accent font-medium mb-3">{subtitle}</p>}
      <ul className="space-y-2 mb-4 flex-1">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-accent mt-0.5">✓</span>
            {b}
          </li>
        ))}
      </ul>
      {note && (
        <p className="text-xs text-muted-foreground bg-muted/60 rounded-lg px-3 py-2 mb-4 leading-relaxed">
          {note}
        </p>
      )}
      <Button
        onClick={onCTA}
        className={`w-full rounded-xl font-semibold ${
          featured
            ? "bg-accent text-accent-foreground hover:bg-accent/90"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
      >
        {cta}
      </Button>
    </motion.div>
  );
}

export function Services({ onGetStarted }: { onGetStarted?: () => void }) {
  const { lang } = useLanguage();
  const t = translations.services;
  const cards = t.cards[lang];

  return (
    <section className="py-14 md:py-20 bg-muted/50" id="services">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-3">
          {t.title[lang]}
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-md mx-auto">
          {t.subtitle[lang]}
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <ServiceCard
              key={i}
              icon={serviceIcons[i]}
              title={card.title}
              bullets={card.bullets}
              note={"note" in card ? (card as any).note : undefined}
              subtitle={"subtitle" in card ? (card as any).subtitle : undefined}
              cta={card.cta}
              onCTA={onGetStarted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
