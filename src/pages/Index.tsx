import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { TrustSection } from "@/components/TrustSection";
import { FAQ } from "@/components/FAQ";
import { ResourcesSection } from "@/components/ResourcesSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { QualificationForm } from "@/components/QualificationForm";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Preloader } from "@/components/motion/Preloader";
import { Seo } from "@/components/Seo";
import { track } from "@/lib/analytics";

import { LanguageProvider } from "@/i18n/LanguageContext";

const IndexContent = () => {
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => {
    track("form_open");
    setFormOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-background pb-16 md:pb-0">
        <Preloader />
        <Seo withFaqSchema />
        <SmoothScroll />
        <ScrollProgress />
        <Header onGetStarted={openForm} />
        <Hero onGetStarted={openForm} />
        <Services onGetStarted={openForm} />
        <TrustSection />
        <FAQ />
        <ResourcesSection />
        <FinalCTA onGetStarted={openForm} />
        <Footer />
        <StickyMobileCTA onGetStarted={openForm} />
        <QualificationForm open={formOpen} onClose={() => setFormOpen(false)} />
      </div>
    </>
  );
};

const Index = () => (
  <LanguageProvider>
    <IndexContent />
  </LanguageProvider>
);

export default Index;
