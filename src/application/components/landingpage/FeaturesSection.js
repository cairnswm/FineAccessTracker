import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { 
  ShieldLockFill, 
  Speedometer, 
  ArrowRepeat, 
  GeoAltFill 
} from 'react-bootstrap-icons';

const FeaturesSection = () => {
  return (
    <Row className="py-5">
      <Col xs={12}>
        <h2 className="text-center mb-4">More Powerful Features</h2>
      </Col>
      <Col md={6}>
        <div className="d-flex mb-4">
          <div className="flex-shrink-0">
            <ShieldLockFill size={30} className="text-primary me-3" />
          </div>
          <div>
            <h4>Privacy Focused</h4>
            <p>We prioritize user privacy and comply with data protection regulations. Only collect what you need.</p>
          </div>
        </div>
        <div className="d-flex mb-4">
          <div className="flex-shrink-0">
            <Speedometer size={30} className="text-primary me-3" />
          </div>
          <div>
            <h4>Lightweight Performance</h4>
            <p>Our tracking component is designed to be lightweight and won't impact your application's performance.</p>
          </div>
        </div>
      </Col>
      <Col md={6}>
        <div className="d-flex mb-4">
          <div className="flex-shrink-0">
            <ArrowRepeat size={30} className="text-primary me-3" />
          </div>
          <div>
            <h4>Regular Updates</h4>
            <p>We're constantly improving our platform with new features and enhancements based on user feedback.</p>
          </div>
        </div>
        <div className="d-flex mb-4">
          <div className="flex-shrink-0">
            <GeoAltFill size={30} className="text-primary me-3" />
          </div>
          <div>
            <h4>Advanced Location Analytics</h4>
            <p>Coming soon: Detailed geographic insights to understand your global user distribution.</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default FeaturesSection;