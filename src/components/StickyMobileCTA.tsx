import { Phone, MessageSquare, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PHONE_NUMBER = "+17869732556";
const WHATSAPP_URL = "https://wa.me/17869732556";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card/95 backdrop-blur-md shadow-sticky border-t border-border p-3">
      <div className="flex gap-2">
        {/* Call */}
        <a href={`tel:${PHONE_NUMBER}`} className="flex-1">
          <Button variant="outline" className="w-full gap-1.5 h-12 rounded-xl font-semibold text-sm border-accent/30">
            <Phone size={16} className="text-accent" />
            Call
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
          </Button>
        </a>

        {/* SMS */}
        <a href={`sms:${PHONE_NUMBER}`} className="flex-1">
          <Button variant="outline" className="w-full gap-1.5 h-12 rounded-xl font-semibold text-sm border-accent/30">
            <MessageSquare size={16} className="text-accent" />
            SMS
          </Button>
        </a>

        {/* WhatsApp */}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button variant="outline" className="w-full gap-1.5 h-12 rounded-xl font-semibold text-sm border-green-500/30">
            <MessageCircle size={16} className="text-green-600" />
            WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
}