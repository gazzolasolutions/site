import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const PHONE_NUMBER = "+17869732556";
const WHATSAPP_URL = "https://wa.me/17869732556";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-14 md:h-16">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="Gazzola Solutions" className="h-8 w-8" />
          <span className="text-lg font-bold text-primary tracking-tight">
            Gazzola<span className="text-accent"> Solutions</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Services</a>
          <a href="#itin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">ITIN</a>
          <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</a>

          <a href={`tel:${PHONE_NUMBER}`} className="group">
            <Button size="sm" variant="outline" className="gap-1.5 border-accent/30 hover:border-accent hover:bg-accent/5 transition-all">
              <Phone size={14} className="text-accent" />
              <span className="text-sm font-semibold">Call Now</span>
              <span className="relative flex h-2 w-2 ml-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
            </Button>
          </a>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="gap-1.5 border-green-500/30 hover:border-green-500 hover:bg-green-500/5 transition-all">
              <MessageCircle size={14} className="text-green-600" />
              <span className="text-sm font-semibold">WhatsApp</span>
            </Button>
          </a>

          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Get Started
          </Button>
        </nav>

        {/* Mobile: just Call icon */}
        <div className="md:hidden">
          <a href={`tel:${PHONE_NUMBER}`}>
            <Button size="icon" variant="ghost" className="relative h-9 w-9">
              <Phone size={18} className="text-accent" />
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}