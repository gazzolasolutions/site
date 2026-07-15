/**
 * GA4 wrapper. Loads only when VITE_GA_MEASUREMENT_ID is set (e.g. "G-XXXXXXXXXX"
 * in Vercel env vars), so local dev and preview builds stay tracker-free.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

export function initAnalytics() {
  if (!GA_ID) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  // Track contact-intent clicks anywhere on the page
  document.addEventListener(
    "click",
    (e) => {
      const anchor = (e.target as HTMLElement).closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href.startsWith("tel:")) track("call_click");
      else if (href.includes("wa.me") || href.includes("whatsapp")) track("whatsapp_click");
      else if (href.startsWith("mailto:")) track("email_click");
    },
    { capture: true }
  );
}

/** Fire a GA4 event. Safe no-op when analytics is not loaded. */
export function track(event: string, params?: Record<string, unknown>) {
  window.gtag?.("event", event, params);
}
