import { motion } from "framer-motion";
import { Building2, FileText, Shield, BookOpen, Calculator, Star, Landmark, FileCheck, XCircle, RefreshCw } from "lucide-react";
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
  note?: string;
  onCTA?: () => void;
}

function ServiceCard({ icon: Icon, title, bullets, cta, featured, badge, subtitle, note, onCTA }: ServiceCardProps) {
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
      <ul className="space-y-2 mb-4">
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
  return (
    <section className="py-14 md:py-20 bg-muted/50" id="services">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-3">
          Everything You Need to Start Your Florida Business
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-md mx-auto">
          From formation to tax preparation — Florida-focused services for non-residents.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <ServiceCard
            icon={Building2}
            title="Open Your Florida LLC the Right Way"
            bullets={["Florida LLC formation", "State registration", "Operating Agreement"]}
            note="Operating Agreements are typically required for multi-member LLCs and optional for single-member LLCs."
            cta="Open My LLC"
            onCTA={onGetStarted}
          />
          <ServiceCard
            icon={FileText}
            title="Get Your EIN Without the Headache"
            bullets={[
              "Every business typically needs an EIN",
              "EIN is separate from ITIN",
              "No SSN required",
              "IRS filing handled for you",
            ]}
            cta="Apply for EIN"
            onCTA={onGetStarted}
          />
          <ServiceCard
            icon={Shield}
            title="Apply for Your ITIN — If You Qualify"
            subtitle="Certified Acceptance Agent Service"
            bullets={[
              "Keep your passport — no mailing required",
              "Avoid long delays",
              "Secure in-person or remote verification",
              "Full support in your language",
            ]}
            note="Not every business owner needs an ITIN. We help determine if this applies to your situation."
            cta="Get My ITIN Safely"
            onCTA={onGetStarted}
          />
          <ServiceCard
            icon={BookOpen}
            title="Monthly Bookkeeping That Keeps You Organized"
            bullets={["Monthly review", "Financial reports", "Clean records"]}
            cta="View Plans"
            onCTA={onGetStarted}
          />
          <ServiceCard
            icon={Calculator}
            title="Professional Tax Preparation"
            bullets={["Individual & business returns", "Expert review", "Serving Florida business owners"]}
            cta="Request Tax Help"
            onCTA={onGetStarted}
          />
          <ServiceCard
            icon={FileCheck}
            title="Annual Report Filing"
            bullets={["Required yearly for Florida LLCs", "Timely filing to avoid penalties", "Hassle-free submission"]}
            cta="File My Annual Report"
            onCTA={onGetStarted}
          />
          <ServiceCard
            icon={XCircle}
            title="Company Dissolution"
            bullets={["Proper legal closure", "State filing handled", "Avoid ongoing obligations"]}
            cta="Dissolve My Company"
            onCTA={onGetStarted}
          />
          <ServiceCard
            icon={RefreshCw}
            title="Company Reinstatement"
            bullets={["Revive your inactive LLC", "Back in good standing", "Full state compliance restored"]}
            cta="Reinstate My Company"
            onCTA={onGetStarted}
          />
          <div className="md:col-span-2">
            <ServiceCard
              icon={Landmark}
              title="Business Bank Account Guidance"
              bullets={[
                "Document checklist",
                "Bank preparation guidance",
                "Requirements explained clearly",
                "Built for Florida business owners",
              ]}
              cta="Get Bank Account Guidance"
              onCTA={onGetStarted}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
