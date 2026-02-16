import { Button } from "@/components/ui/button";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card/95 backdrop-blur-md shadow-sticky border-t border-border p-3">
      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 rounded-xl font-semibold text-base">
        Start Now
      </Button>
    </div>
  );
}
