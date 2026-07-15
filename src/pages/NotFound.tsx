import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden noise" style={{ background: "var(--gradient-hero)" }}>
      <div className="aurora-blob animate-aurora w-[400px] h-[400px] -top-32 -right-24 opacity-25" style={{ background: "#1d9e75" }} />
      <div className="aurora-blob animate-aurora-slow w-[300px] h-[300px] bottom-0 -left-24 opacity-20" style={{ background: "#5DCAA5" }} />
      <div className="absolute inset-0 bg-grid" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative text-center px-6"
      >
        <img src={logo} alt="Gazzola Solutions" className="h-12 w-12 mx-auto mb-6 animate-float" />
        <h1 className="font-display font-bold text-white mb-3" style={{ fontSize: "clamp(4rem, 10vw, 7rem)", lineHeight: 1 }}>
          4<span className="text-gradient">0</span>4
        </h1>
        <p className="text-white/70 text-lg mb-8">Oops! This page doesn't exist.</p>
        <Link to="/">
          <Button
            className="group h-12 px-8 rounded-full font-bold text-accent-foreground border-0 transition-all hover:scale-[1.03] hover:shadow-[var(--shadow-glow)]"
            style={{ background: "var(--gradient-cta)" }}
          >
            <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
