import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import type { Lang } from "@/i18n/translations";

const PHONE_NUMBER = "+17869732556";
const WHATSAPP_URL = "https://wa.me/17869732556";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "pt", label: "PT", flag: "🇧🇷" },
];

export function Header({ onGetStarted }: { onGetStarted?: () => void }) {
  const { lang, setLang } = useLanguage();
  const t = translations.nav;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      {/* Top bar with language selector */}
      <div className="container flex items-center justify-center h-8 gap-1 border-b border-border/50">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors ${
              lang === l.code
                ? "bg-accent/10 text-accent"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <span className="text-sm leading-none">{l.flag}</span> {l.label}
          </button>
        ))}
      </div>

      <div className="container flex items-center justify-between h-14 md:h-16">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="Gazzola Solutions" className="h-8 w-8" />
          <span className="text-lg font-bold text-primary tracking-tight">
            Gazzola<span className="text-accent"> Solutions</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t.services[lang]}</a>
          <a href="#itin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t.itin[lang]}</a>
          <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t.faq[lang]}</a>
          <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t.contact[lang]}</a>

          <a href={`tel:${PHONE_NUMBER}`} className="group">
            <Button size="sm" variant="outline" className="gap-1.5 border-accent/30 hover:border-accent hover:bg-accent/5 transition-all">
              <Phone size={14} className="text-accent" />
              <span className="text-sm font-semibold">{t.callNow[lang]}</span>
              <span className="relative flex h-2 w-2 ml-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
            </Button>
          </a>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="gap-1.5 border-green-500/30 hover:border-green-500 hover:bg-green-500/5 transition-all">
              <MessageCircle size={14} className="text-green-600" />
              <span className="text-sm font-semibold">{t.whatsapp[lang]}</span>
            </Button>
          </a>

          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={onGetStarted}>
            {t.getStarted[lang]}
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
