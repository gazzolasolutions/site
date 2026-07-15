import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import { Seo } from "@/components/Seo";
import { LanguageProvider } from "@/i18n/LanguageContext";

interface LegalLayoutProps {
  title: string;
  description: string;
  path: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalLayout({ title, description, path, lastUpdated, children }: LegalLayoutProps) {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Seo title={`${title} — Gazzola Solutions`} description={description} path={path} />

        <header className="sticky top-0 z-50 glass border-b border-white/5">
          <div className="container flex items-center justify-between h-14 md:h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo} alt="Gazzola Solutions" className="h-8 w-8" />
              <span className="font-display text-lg font-bold text-foreground tracking-tight">
                Gazzola<span className="text-gradient"> Solutions</span>
              </span>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft size={15} /> Back to website
            </Link>
          </div>
        </header>

        <main className="container max-w-3xl py-12 md:py-16">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{title}</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: {lastUpdated}</p>
          <div className="space-y-8 text-[15px] leading-relaxed text-foreground/80 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2">
            {children}
          </div>
        </main>

        <footer className="border-t border-white/5 py-8">
          <p className="container text-xs text-muted-foreground/60 text-center">
            © {new Date().getFullYear()} Gazzola Solutions. All rights reserved. This is not legal or tax advice.
          </p>
        </footer>
      </div>
    </LanguageProvider>
  );
}
