import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import type { Lang } from "@/i18n/translations";

const SITE = "https://gazzolasolutions.com";

const META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Gazzola Solutions — Start Your Florida Company | LLC, EIN & ITIN",
    description:
      "Florida company formation for non-residents. LLC, EIN, and ITIN without mailing your passport — Certified Acceptance Agent with support in English, Spanish, and Portuguese.",
  },
  es: {
    title: "Gazzola Solutions — Abra Su Empresa en Florida | LLC, EIN e ITIN",
    description:
      "Formación de empresas en Florida para no residentes. LLC, EIN e ITIN sin enviar su pasaporte — Agente de Aceptación Certificado con soporte en español, inglés y portugués.",
  },
  pt: {
    title: "Gazzola Solutions — Abra Sua Empresa na Flórida | LLC, EIN e ITIN",
    description:
      "Abertura de empresas na Flórida para não residentes. LLC, EIN e ITIN sem enviar seu passaporte — Agente de Aceitação Certificado com suporte em português, inglês e espanhol.",
  },
};

const LANG_PREFIX: Record<Lang, string> = { en: "", es: "/es", pt: "/pt" };

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"][data-seo]`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    else el.setAttribute("data-seo", "");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(id: string, data: object) {
  let el = document.head.querySelector<HTMLScriptElement>(`script[data-seo-jsonld="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-seo-jsonld", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

interface SeoProps {
  /** Override the localized default title. */
  title?: string;
  /** Override the localized default description. */
  description?: string;
  /** Path without language prefix, e.g. "/resources". Defaults to the landing page. */
  path?: string;
  /** Include FAQPage structured data (landing page only). */
  withFaqSchema?: boolean;
}

export function Seo({ title, description, path = "", withFaqSchema = false }: SeoProps) {
  const { lang } = useLanguage();

  useEffect(() => {
    const meta = META[lang];
    const pageTitle = title ?? meta.title;
    const pageDescription = description ?? meta.description;
    const canonical = `${SITE}${LANG_PREFIX[lang]}${path}` || SITE;

    document.title = pageTitle;
    document.documentElement.lang = lang;
    setMeta("name", "description", pageDescription);
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", pageDescription);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", `${SITE}/og-image.png`);
    setMeta("name", "twitter:title", pageTitle);
    setMeta("name", "twitter:description", pageDescription);
    setMeta("name", "twitter:image", `${SITE}/og-image.png`);
    setLink("canonical", canonical);

    // hreflang alternates for this path
    (Object.keys(LANG_PREFIX) as Lang[]).forEach((l) => {
      setLink("alternate", `${SITE}${LANG_PREFIX[l]}${path}` || SITE, l);
    });
    setLink("alternate", `${SITE}${path}` || SITE, "x-default");

    // Organization / professional service
    setJsonLd("business", {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Gazzola Solutions",
      url: SITE,
      logo: `${SITE}/favicon.png`,
      image: `${SITE}/og-image.png`,
      description: META.en.description,
      email: "gazzolasolutions@gmail.com",
      telephone: "+1-786-973-2556",
      areaServed: { "@type": "State", name: "Florida" },
      availableLanguage: ["English", "Spanish", "Portuguese"],
      sameAs: [
        "https://www.linkedin.com/company/gazzolasolutions/",
        "https://www.instagram.com/gazzolasolutions/",
      ],
    });

    if (withFaqSchema) {
      setJsonLd("faq", {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: translations.faq.items[lang].map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
    }
  }, [lang, title, description, path, withFaqSchema]);

  return null;
}
