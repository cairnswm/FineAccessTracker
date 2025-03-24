import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AccessTrackerExample from './AccessTrackerExample';
import IntegrationOptions from './integration/IntegrationOptions';
import HowItWorks from './integration/HowItWorks';
import ManualApiIntegration from './integration/ManualApiIntegration';
import TrackingExamples from './integration/TrackingExamples';

const IntegrationTab = ({ apiKey }) => {
  return (
    <>
      <Row className="mb-4">
        <Col>
          <IntegrationOptions />
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <HowItWorks apiKey={apiKey} />
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <AccessTrackerExample apiKey={apiKey} />
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <ManualApiIntegration apiKey={apiKey} />
        </Col>
      </Row>
      
      <TrackingExamples apiKey={apiKey} />
    </>
  );
};

export default IntegrationTab;