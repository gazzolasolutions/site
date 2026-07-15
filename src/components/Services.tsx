import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Building2, FileText, Shield, BookOpen, Calculator, Landmark, FileCheck, XCircle, RefreshCw, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedTitle } from "@/components/motion/AnimatedTitle";
import { DrawUnderline } from "@/components/motion/DrawUnderline";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const serviceIcons = [Building2, FileText, Shield, BookOpen, Calculator, FileCheck, XCircle, RefreshCw, Landmark];

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  bullets: string[];
  cta: string;
  featured?: boolean;
  subtitle?: string;
  note?: string;
  index: number;
  onCTA?: () => void;
}

function ServiceCard({ icon: Icon, title, bullets, cta, featured, subtitle, note, index, onCTA }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // 3D tilt following the cursor
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 7);
    rotateX.set(-py * 7);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 48, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 3) * 0.09, type: "spring", stiffness: 90, damping: 16 }}
      whileHover={{ y: -8 }}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      className={`group relative rounded-3xl p-6 flex flex-col will-change-transform ${
        featured
          ? "border border-accent/40 shadow-[0_0_50px_hsl(160_51%_58%/0.12)]"
          : "glass border-white/5 hover:border-accent/25 transition-colors duration-300"
      }`}
    >
      {featured && <div className="absolute inset-0 rounded-3xl -z-10" style={{ background: "var(--gradient-featured)" }} />}
      {featured && (
        <span className="absolute -top-3 left-6 max-w-[calc(100%-3rem)] truncate inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold text-accent-foreground" style={{ background: "var(--gradient-cta)" }}>
          <Star className="h-3 w-3" /> {subtitle}
        </span>
      )}
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
          featured ? "" : "bg-white/5 ring-1 ring-white/10"
        }`}
        style={featured ? { background: "var(--gradient-cta)" } : undefined}
      >
        <Icon className={`h-5 w-5 ${featured ? "text-accent-foreground" : "text-accent"}`} />
      </div>
      <h3 className="font-display font-bold text-base md:text-lg text-foreground mb-3 leading-snug">{title}</h3>
      <ul className="space-y-2 mb-5 flex-1">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
            <span className="text-accent mt-0.5 shrink-0">✓</span>
            {b}
          </li>
        ))}
      </ul>
      {note && (
        <p className="text-xs text-muted-foreground/80 bg-white/[0.03] ring-1 ring-white/5 rounded-xl px-3.5 py-2.5 mb-5 leading-relaxed">
          {note}
        </p>
      )}
      <Button
        onClick={onCTA}
        className={`w-full rounded-full font-bold h-11 transition-all ${
          featured
            ? "text-accent-foreground border-0 hover:scale-[1.02] hover:shadow-[var(--shadow-glow)]"
            : "bg-white/5 text-foreground ring-1 ring-white/10 hover:bg-accent hover:text-accent-foreground hover:ring-accent"
        }`}
        style={featured ? { background: "var(--gradient-cta)" } : undefined}
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
    <section className="relative py-16 md:py-24 overflow-hidden" id="services" style={{ background: "linear-gradient(180deg, hsl(180 55% 5%) 0%, hsl(180 60% 7%) 50%, hsl(180 55% 5%) 100%)" }}>
      <div className="aurora-blob animate-aurora w-[500px] h-[500px] top-20 -right-56 opacity-10" style={{ background: "#5DCAA5" }} />
      <div className="container relative">
        <div className="flex flex-col items-center text-center mb-14">
          <AnimatedTitle
            text={t.title[lang]}
            className="font-display text-3xl md:text-4xl font-bold text-foreground max-w-2xl leading-tight"
          />
          <DrawUnderline className="h-3 w-40 mt-2 mb-4" />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-muted-foreground max-w-md mx-auto"
          >
            {t.subtitle[lang]}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <ServiceCard
              key={i}
              index={i}
              icon={serviceIcons[i]}
              title={card.title}
              bullets={card.bullets}
              note={"note" in card ? (card as any).note : undefined}
              subtitle={"subtitle" in card ? (card as any).subtitle : undefined}
              featured={"subtitle" in card}
              cta={card.cta}
              onCTA={onGetStarted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
