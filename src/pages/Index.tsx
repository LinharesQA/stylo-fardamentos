import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { DiferenciaisSection } from "@/components/DiferenciaisSection";
import { ProcessoSection } from "@/components/ProcessoSection";
import { ProdutosServicosSection } from "@/components/ProdutosServicosSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { useAnalytics } from "@/hooks/useAnalytics";

const Index = () => {
  // Initialize analytics tracking
  useAnalytics();

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <DiferenciaisSection />
      <ProcessoSection />
      <ProdutosServicosSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
