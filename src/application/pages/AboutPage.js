import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PageLayout from '../../auth/components/pagelayout';
import PageMenu from '../components/pagemenu';
import BenefitsSection from '../components/landingpage/BenefitsSection';
import IntegrationSection from '../components/landingpage/IntegrationSection';
import HowItWorksSection from '../components/landingpage/HowItWorksSection';
import FeaturesSection from '../components/landingpage/FeaturesSection';
import PricingSection from '../components/landingpage/PricingSection';
import TrackingInformation from '../components/documentation/TrackingInformation';

const AboutPage = () => {
  return (
    <PageLayout>
      <PageMenu />
      <Container>
        <Row className="mb-5">
          <Col>
            <h1>About Access Tracker</h1>
            <p className="lead">
              Access Tracker is a powerful analytics platform designed to help developers 
              understand how users interact with their applications. Our mission is to provide 
              simple yet powerful tracking tools that give you actionable insights.
            </p>
          </Col>
        </Row>
        
        <Row className="mb-5">
          <Col>
            <TrackingInformation />
          </Col>
        </Row>
        
        <BenefitsSection />
        <IntegrationSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingSection />
      </Container>
    </PageLayout>
  );
};

export default AboutPage;