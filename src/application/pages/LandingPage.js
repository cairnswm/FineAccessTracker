import React from 'react';
import PageLayout from '../../auth/components/pagelayout';
import HeroSection from '../components/landingpage/HeroSection';
import BenefitsSection from '../components/landingpage/BenefitsSection';
import IntegrationSection from '../components/landingpage/IntegrationSection';
import HowItWorksSection from '../components/landingpage/HowItWorksSection';
import FeaturesSection from '../components/landingpage/FeaturesSection';
import CTASection from '../components/landingpage/CTASection';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <PageLayout>
      <HeroSection />
      <BenefitsSection />
      <IntegrationSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
    </PageLayout>
  );
};

export default LandingPage;