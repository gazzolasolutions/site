import { Linkedin, Instagram, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/gazzolasolutions/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/gazzolasolutions/", label: "Instagram" },
  { icon: MessageCircle, href: "https://api.whatsapp.com/send?phone=7869732556", label: "WhatsApp" },
];

export function Footer() {
  const { lang } = useLanguage();
  const t = translations.footer;
  const nav = translations.nav;

  return (
    <footer className="bg-primary text-primary-foreground py-10" id="contact">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-lg font-bold mb-2">
              Gazzola<span className="text-accent"> Solutions</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              {t.tagline[lang]}
            </p>
            <div className="flex gap-3 mt-4">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                >
                  <Icon size={18} className="text-primary-foreground/80" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">{t.quickLinks[lang]}</h4>
            <nav className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <a href="#services" className="hover:text-primary-foreground transition-colors">{nav.services[lang]}</a>
              <a href="#itin" className="hover:text-primary-foreground transition-colors">{nav.itin[lang]}</a>
              <a href="#faq" className="hover:text-primary-foreground transition-colors">{nav.faq[lang]}</a>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">{t.contactTitle[lang]}</h4>
            <p className="text-sm text-primary-foreground/70">gazzolasolutions@gmail.com</p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-xs text-primary-foreground/50 text-center">
          © {new Date().getFullYear()} {t.copyright[lang]}
        </div>
      </div>
    </footer>
  );
}
