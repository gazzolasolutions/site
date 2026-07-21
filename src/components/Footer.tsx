import { Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

function WhatsAppIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/gazzolasolutions/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/gazzolasolutions/", label: "Instagram" },
  { icon: WhatsAppIcon, href: "https://api.whatsapp.com/send?phone=7869732556", label: "WhatsApp" },
];

export function Footer() {
  const { lang } = useLanguage();
  const t = translations.footer;
  const nav = translations.nav;

  return (
    <footer className="relative py-12 md:py-14" id="contact" style={{ background: "hsl(180 60% 4%)" }}>
      {/* Gradient hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img src={logo} alt="Gazzola Solutions" className="h-8 w-8" />
              <span className="font-display text-lg font-bold text-foreground">
                Gazzola<span className="text-gradient"> Solutions</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t.tagline[lang]}
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm mb-4 text-foreground">{t.quickLinks[lang]}</h4>
            <nav className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <a href={`${lang === "en" ? "" : "/" + lang}/#services`} className="hover:text-accent transition-colors w-fit">{nav.services[lang]}</a>
              <a href={`${lang === "en" ? "" : "/" + lang}/#faq`} className="hover:text-accent transition-colors w-fit">{nav.faq[lang]}</a>
              <a href={`${lang === "en" ? "" : "/" + lang}/resources`} className="hover:text-accent transition-colors w-fit">{nav.resources[lang]}</a>
              <a href="/privacy" className="hover:text-accent transition-colors w-fit">{nav.privacy[lang]}</a>
              <a href="/terms" className="hover:text-accent transition-colors w-fit">{nav.terms[lang]}</a>
            </nav>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm mb-4 text-foreground">{t.contactTitle[lang]}</h4>
            <div className="flex flex-col gap-1.5">
              <a href="tel:+17869732556" className="text-sm text-muted-foreground hover:text-accent transition-colors w-fit">
                (786) 973-2556
              </a>
              <a href="mailto:gazzolasolutions@gmail.com" className="text-sm text-muted-foreground hover:text-accent transition-colors w-fit">
                gazzolasolutions@gmail.com
              </a>
            </div>
            <div className="flex gap-3 mt-5">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center transition-all hover:border-accent/40 hover:scale-110"
                >
                  <Icon size={17} className="text-accent" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 mt-10 pt-6 text-xs text-muted-foreground/60 text-center">
          © {new Date().getFullYear()} {t.copyright[lang]}
        </div>
      </div>
    </footer>
  );
}
