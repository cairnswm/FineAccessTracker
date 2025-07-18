import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PageLayout from "../../auth/components/pagelayout";
import PageMenu from "../components/pagemenu";
import BenefitsSection from "../components/landingpage/BenefitsSection";
import IntegrationSection from "../components/landingpage/IntegrationSection";
import HowItWorksSection from "../components/landingpage/HowItWorksSection";
import FeaturesSection from "../components/landingpage/FeaturesSection";
import PricingSection from "../components/landingpage/PricingSection";
import TrackingInformation from "../components/documentation/TrackingInformation";
import { accessElf } from "../../auth/utils/accessElf";

const AboutPage = () => {
  accessElf.track("about");

  return (
    <PageLayout>
      <PageMenu />
      <Container>
        <Row className="mb-5">
          <Col>
            <h1>About Access Tracker</h1>
            <p className="lead">
              Access Tracker is a powerful analytics platform designed to help
              developers understand how users interact with their applications.
              Our mission is to provide simple yet powerful tracking tools that
              give you actionable insights.
            </p>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col className="d-flex flex-column align-items-center justify-content-center">
            <feedback-elf-review api_key="3686f922-3686f93a-46b0-91b9-6d8a6e00b6c7" />
          </Col>
        </Row>
        {window.location.hostname === "localhost" && (
          <Row className="d-flex flex-row align-items-center justify-content-center mb-5">
            <Col className="text-center">
              <feedback-elf-button
                type="review"
                api_key="3686f922-3686f93a-46b0-91b9-6d8a6e00b6c7"
              />
            </Col>
            <Col className="text-center">
              <feedback-elf-button
                type="bug"
                api_key="3686f922-3686f93a-46b0-91b9-6d8a6e00b6c7"
              />
            </Col>
            <Col className="text-center">
              <feedback-elf-button
                type="feature"
                api_key="3686f922-3686f93a-46b0-91b9-6d8a6e00b6c7"
              />
            </Col>
          </Row>
        )}
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
