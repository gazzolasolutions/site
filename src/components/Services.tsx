import { motion } from "framer-motion";
import { Building2, FileText, Shield, BookOpen, Calculator, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  bullets: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
  subtitle?: string;
}

function ServiceCard({ icon: Icon, title, bullets, cta, featured, badge, subtitle }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-xl p-6 transition-shadow ${
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
      <ul className="space-y-2 mb-5">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-accent mt-0.5">✓</span>
            {b}
          </li>
        ))}
      </ul>
      <Button
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

export function Services() {
  return (
    <section className="py-14 md:py-20 bg-muted/50" id="services">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-3">
          Everything You Need to Start Your US Business
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-md mx-auto">
          From formation to tax preparation — we cover it all.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <ServiceCard
            icon={Building2}
            title="Open Your LLC the Right Way"
            bullets={["LLC formation", "State registration", "Operating Agreement"]}
            cta="Open My LLC"
          />
          <ServiceCard
            icon={FileText}
            title="Get Your EIN Without the Headache"
            bullets={["No SSN required", "IRS filing handled", "Secure process"]}
            cta="Apply for EIN"
          />
          <div className="md:col-span-2" id="itin">
            <ServiceCard
              icon={Shield}
              title="Apply for Your ITIN Without Sending Your Passport"
              subtitle="Certified Acceptance Agent Service"
              badge="Most Popular"
              featured
              bullets={[
                "Keep your passport",
                "Avoid long delays",
                "Secure verification",
                "Full support in your language",
              ]}
              cta="Get My ITIN Safely"
            />
          </div>
          <ServiceCard
            icon={BookOpen}
            title="Monthly Bookkeeping That Keeps You Organized"
            bullets={["Monthly review", "Financial reports", "Clean records"]}
            cta="View Plans"
          />
          <ServiceCard
            icon={Calculator}
            title="Professional Tax Preparation"
            bullets={["Individual & business returns", "Compliance guaranteed", "Expert review"]}
            cta="Request Tax Help"
          />
        </div>
      </div>
    </section>
  );
}
