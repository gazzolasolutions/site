import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const WHATSAPP_URL = "https://wa.me/17869732556";

export function StickyMobileCTA({ onGetStarted }: { onGetStarted?: () => void }) {
  const { lang } = useLanguage();
  const nav = translations.nav;

  // Slide in only after the visitor scrolls past the hero CTAs
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{ y: visible ? 0 : 110, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass border-t border-white/10 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex gap-2">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="shrink-0">
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-white/5 border-white/10">
            <MessageCircle size={18} className="text-accent" />
          </Button>
        </a>
        <Button
          onClick={onGetStarted}
          className="flex-1 h-12 rounded-full font-bold text-sm text-accent-foreground border-0"
          style={{ background: "var(--gradient-cta)" }}
        >
          {nav.getStarted[lang]}
        </Button>
      </div>
    </motion.div>
  );
}
