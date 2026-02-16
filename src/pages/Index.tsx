import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Services } from "@/components/Services";
import { TrustSection } from "@/components/TrustSection";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { QualificationForm } from "@/components/QualificationForm";

import { LanguageProvider } from "@/i18n/LanguageContext";

const Index = () => {
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => setFormOpen(true);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background pb-16 md:pb-0">
        <Header onGetStarted={openForm} />
        <Hero onGetStarted={openForm} />
        <HowItWorks onGetStarted={openForm} />
        <Services onGetStarted={openForm} />
        <TrustSection />
        <FAQ />
        
        <FinalCTA onGetStarted={openForm} />
        <Footer />
        <StickyMobileCTA />
        <QualificationForm open={formOpen} onClose={() => setFormOpen(false)} />
      </div>
    </LanguageProvider>
  );
};

export default Index;
