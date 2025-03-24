import React from 'react';
import PageLayout from '../../auth/components/pagelayout';
import PageMenu from '../components/pagemenu';
import HeroSection from '../components/landingpage/HeroSection';
import BenefitsSection from '../components/landingpage/BenefitsSection';
import IntegrationSection from '../components/landingpage/IntegrationSection';
import HowItWorksSection from '../components/landingpage/HowItWorksSection';
import FeaturesSection from '../components/landingpage/FeaturesSection';
import PricingSection from '../components/landingpage/PricingSection';
import CTASection from '../components/landingpage/CTASection';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <PageLayout>
      <PageMenu />
      <HeroSection />
      <BenefitsSection />
      <IntegrationSection />
      <HowItWorksSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </PageLayout>
  );
};

export default LandingPage;