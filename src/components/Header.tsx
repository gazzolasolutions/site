import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
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

const EASE = [0.22, 1, 0.36, 1] as const;

export function Header({ onGetStarted }: { onGetStarted?: () => void }) {
  const { lang, setLang } = useLanguage();
  const t = translations.nav;
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const prefix = lang === "en" ? "" : `/${lang}`;
  const isHome = ["/", "/es", "/pt"].includes(location.pathname);
  // On the home page use in-page hashes (smooth scroll); elsewhere link back home.
  const sectionHref = (id: string) => (isHome ? `#${id}` : `${prefix}/#${id}`);

  const navLinks = [
    { label: t.services[lang], href: sectionHref("services") },
    { label: t.faq[lang], href: sectionHref("faq") },
    { label: t.resources[lang], href: sectionHref("resources") },
  ];

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      {/* Top bar with language selector */}
      <div className="container flex items-center justify-center h-8 gap-1 border-b border-white/5">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full transition-colors ${
              lang === l.code ? "bg-accent/15 text-accent" : "text-muted-foreground hover:bg-white/5"
            }`}
          >
            <span className="text-sm leading-none">{l.flag}</span> {l.label}
          </button>
        ))}
      </div>

      <div className="container flex items-center justify-between h-14 md:h-16">
        <a href={prefix || "/"} className="flex items-center gap-2 md:gap-2.5 shrink-0">
          <img src={logo} alt="Gazzola Solutions" className="h-8 w-8 md:h-9 md:w-9" />
          <span className="font-display text-base md:text-lg font-bold text-foreground tracking-tight leading-none whitespace-nowrap">
            Gazzola<span className="text-gradient"> Solutions</span>
          </span>
        </a>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            size="sm"
            onClick={onGetStarted}
            className="rounded-full font-semibold text-accent-foreground border-0 px-4 md:px-5 h-9 transition-transform hover:scale-[1.04]"
            style={{ background: "var(--gradient-cta)" }}
          >
            {t.getStarted[lang]}
          </Button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex items-center justify-center h-10 w-10 rounded-full glass hover:border-accent/40 transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={18} className="text-foreground" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={18} className="text-foreground" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Slide-in menu (portaled to body so it escapes the header's backdrop-filter) */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              data-lenis-prevent
            />
            <motion.aside
              className="fixed top-0 right-0 bottom-0 z-50 w-[300px] max-w-[85vw] border-l border-white/10 backdrop-blur-xl flex flex-col p-6 pt-5"
              style={{ background: "hsl(180 46% 7% / 0.98)" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: EASE }}
              data-lenis-prevent
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-sm font-bold text-muted-foreground uppercase tracking-widest">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={18} className="text-foreground" />
                </button>
              </div>

              <nav className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: EASE }}
                    className="group flex items-center justify-between py-3.5 border-b border-white/5 font-display text-xl font-bold text-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
                  </motion.a>
                ))}
              </nav>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="mt-8 flex flex-col gap-2.5"
              >
                <a href={`tel:${PHONE_NUMBER}`}>
                  <Button variant="outline" className="w-full justify-start gap-2.5 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent/40">
                    <Phone size={16} className="text-accent" />
                    {t.callNow[lang]}
                  </Button>
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full justify-start gap-2.5 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent/40">
                    <MessageCircle size={16} className="text-accent" />
                    {t.whatsapp[lang]}
                  </Button>
                </a>
              </motion.div>

              {/* Legal */}
              <div className="mt-auto pt-6 flex items-center gap-4 text-xs text-muted-foreground/70">
                <a href="/privacy" className="hover:text-accent transition-colors">{t.privacy[lang]}</a>
                <a href="/terms" className="hover:text-accent transition-colors">{t.terms[lang]}</a>
              </div>
            </motion.aside>
          </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
