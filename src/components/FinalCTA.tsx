import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="py-16 md:py-24" style={{ background: "var(--gradient-hero)" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container text-center"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Start Your US Business the Right Way?
        </h2>
        <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
          Join hundreds of entrepreneurs who trusted us to launch their US businesses.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 rounded-xl font-semibold text-base"
          >
            Start Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-12 px-8 rounded-xl text-base"
          >
            Book Consultation
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
