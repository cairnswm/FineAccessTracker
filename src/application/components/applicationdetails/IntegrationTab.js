import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AccessTrackerExample from './AccessTrackerExample';
import IntegrationOptions from './integration/IntegrationOptions';
import HowItWorks from './integration/HowItWorks';
import ManualApiIntegration from './integration/ManualApiIntegration';
import TrackingExamples from './integration/TrackingExamples';
import VisibilityTrackerExample from './integration/VisibilityTrackerExample';
import TableOfContents from './integration/TableOfContents';

const IntegrationTab = ({ apiKey }) => {
  return (
    <>
            
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
      
    </>
  );
};

export default IntegrationTab;