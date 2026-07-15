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
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      {/* Top bar with language selector */}
      <div className="container flex items-center justify-center h-8 gap-1 border-b border-white/5">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full transition-colors ${
              lang === l.code
                ? "bg-accent/15 text-accent"
                : "text-muted-foreground hover:bg-white/5"
            }`}
          >
            <span className="text-sm leading-none">{l.flag}</span> {l.label}
          </button>
        ))}
      </div>

      <div className="container flex items-center justify-between h-14 md:h-16">
        <a href="#" className="flex items-center gap-2.5">
          <img src={logo} alt="Gazzola Solutions" className="h-9 w-9" />
          <span className="font-display text-lg font-bold text-foreground tracking-tight">
            Gazzola<span className="text-gradient"> Solutions</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a href={`${lang === "en" ? "" : "/" + lang}/#services`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t.services[lang]}
          </a>
          <a href={`${lang === "en" ? "" : "/" + lang}/#faq`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t.faq[lang]}
          </a>
          <a href={`${lang === "en" ? "" : "/" + lang}/resources`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t.resources[lang]}
          </a>

          <a href={`tel:${PHONE_NUMBER}`} className="group">
            <Button size="sm" variant="outline" className="gap-1.5 rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent/40 transition-all">
              <Phone size={14} className="text-accent" />
              <span className="text-sm font-semibold">{t.callNow[lang]}</span>
              <span className="relative flex h-2 w-2 ml-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
            </Button>
          </a>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="gap-1.5 rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent/40 transition-all">
              <MessageCircle size={14} className="text-accent" />
              <span className="text-sm font-semibold">{t.whatsapp[lang]}</span>
            </Button>
          </a>

          <Button
            size="sm"
            onClick={onGetStarted}
            className="rounded-full font-semibold text-accent-foreground border-0 px-5 transition-transform hover:scale-[1.04]"
            style={{ background: "var(--gradient-cta)" }}
          >
            {t.getStarted[lang]}
          </Button>
        </nav>

        {/* Mobile: WhatsApp icon */}
        <div className="md:hidden flex items-center gap-2">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="icon" variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/5">
              <Phone size={18} className="text-accent" />
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
            </Button>
          </a>
          <Button
            size="sm"
            onClick={onGetStarted}
            className="rounded-full font-semibold text-accent-foreground border-0 px-4 h-9"
            style={{ background: "var(--gradient-cta)" }}
          >
            {t.getStarted[lang]}
          </Button>
        </div>
      </div>
    </header>
  );
}
