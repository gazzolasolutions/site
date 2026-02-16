import { useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "ITIN", href: "#itin" },
  { label: "EIN", href: "#services" },
  { label: "LLC Formation", href: "#services" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const PHONE_NUMBER = "+17869732556";
const PHONE_DISPLAY = "(786) 973-2556";
const WHATSAPP_URL = "https://wa.me/17869732556";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}

          {/* Call Now */}
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

          {/* WhatsApp */}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="gap-1.5 border-green-500/30 hover:border-green-500 hover:bg-green-500/5 transition-all">
              <MessageCircle size={14} className="text-green-600" />
              <span className="text-sm font-semibold">WhatsApp</span>
            </Button>
          </a>

          {/* Get Started */}
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Get Started
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Call Now icon */}
          <a href={`tel:${PHONE_NUMBER}`}>
            <Button size="icon" variant="ghost" className="relative h-9 w-9">
              <Phone size={18} className="text-accent" />
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
            </Button>
          </a>

          <button
            className="p-2 -mr-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card pb-4">
          <nav className="container flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="py-3 px-3 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}

            <div className="border-t border-border mt-2 pt-3 flex flex-col gap-2">
              {/* Call Now */}
              <a href={`tel:${PHONE_NUMBER}`} onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full gap-2 h-11 border-accent/30">
                  <Phone size={16} className="text-accent" />
                  Call Now — {PHONE_DISPLAY}
                  <span className="relative flex h-2 w-2 ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                </Button>
              </a>

              {/* WhatsApp */}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full gap-2 h-11 border-green-500/30">
                  <MessageCircle size={16} className="text-green-600" />
                  WhatsApp Us
                </Button>
              </a>

              {/* Get Started */}
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-11">
                Get Started
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-2">
              Live Support Available
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
