import { useState } from "react";
import { Menu, X } from "lucide-react";
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
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Get Started
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 -mr-2 text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
            <Button className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90">
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
