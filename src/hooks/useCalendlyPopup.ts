import { useEffect, useCallback } from "react";
import { track } from "@/lib/analytics";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

let scriptLoaded = false;

function loadCalendlyScript() {
  if (scriptLoaded) return;
  scriptLoaded = true;

  const link = document.createElement("link");
  link.href = "https://assets.calendly.com/assets/external/widget.css";
  link.rel = "stylesheet";
  document.head.appendChild(link);

  const script = document.createElement("script");
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.async = true;
  document.body.appendChild(script);
}

export function useCalendlyPopup() {
  useEffect(() => {
    loadCalendlyScript();
  }, []);

  const openCalendly = useCallback(() => {
    track("calendly_open");
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/gazzolasolutions/30min?hide_event_type_details=1&hide_gdpr_banner=1",
      });
    } else {
      window.open("https://calendly.com/gazzolasolutions/30min", "_blank");
    }
  }, []);

  return openCalendly;
}
