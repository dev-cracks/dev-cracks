import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { EcosystemSection } from '../components/EcosystemSection';
import { ModulesSection } from '../components/ModulesSection';
import { BenefitsSection } from '../components/BenefitsSection';
import { IndustryFocusSection } from '../components/IndustryFocusSection';
import { TrustSection } from '../components/TrustSection';
import { PricingSection } from '../components/PricingSection';
import { CTASection } from '../components/CTASection';

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <EcosystemSection />
        <ModulesSection />
        <BenefitsSection />
        <IndustryFocusSection />
        <TrustSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

