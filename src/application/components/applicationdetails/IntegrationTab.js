import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AccessTrackerExample from './AccessTrackerExample';
import HowItWorks from './integration/HowItWorks';

const IntegrationTab = ({ apiKey }) => {
  return (
    <>
      <Row className="mb-4">
        <Col>
          <HowItWorks apiKey={apiKey} />
        </Col>
      </Row>
    </>
  );
};

export default IntegrationTab;