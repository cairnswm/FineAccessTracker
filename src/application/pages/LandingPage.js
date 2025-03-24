import React from 'react';
import PageLayout from '../../auth/components/pagelayout';
import {
  HeroSection,
  BenefitsSection,
  IntegrationSection,
  HowItWorksSection,
  FeaturesSection,
  CTASection
} from '../components/landingpage';
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