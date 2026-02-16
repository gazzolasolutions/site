import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

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
