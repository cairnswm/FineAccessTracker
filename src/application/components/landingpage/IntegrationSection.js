import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TrackerExample from '../TrackerExample';

const IntegrationSection = () => {
  return (
    <Row className="py-4">
      <Col xs={12}>
        <h2 className="text-center mb-4">Easy to Integrate</h2>
        <p className="text-center mb-4">
          Just add our component to your application and you're ready to go.
        </p>
      </Col>
      <Col md={10} className="mx-auto">
        <TrackerExample />
      </Col>
    </Row>
  );
};

export default IntegrationSection;