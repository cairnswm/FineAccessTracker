import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/context/AuthContext';

const CTASection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

  return (
    <Row className="cta-section text-center rounded">
      <Col md={8} className="mx-auto">
        <h2 className="mb-3">Ready to Start Tracking?</h2>
        <p className="lead mb-4">
        Start tracking your app’s usage today with Access Tracker—lightweight, private, and built for developers.
        </p>
        <Button 
          variant="light" 
          size="lg" 
          onClick={handleGetStarted}
          className="px-4"
        >
          Get Started Now
        </Button>
      </Col>
    </Row>
  );
};

export default CTASection;