import React from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import PageLayout from '../../auth/components/pagelayout';
import { 
  BarChartFill, 
  GeoAltFill, 
  CodeSlash, 
  ShieldLockFill, 
  SpeedometerFill, 
  ArrowRepeat 
} from 'react-bootstrap-icons';
import {TrackerDemo } from "../components/TrackerDemo.js";
import './LandingPage.css';

const LandingPage = () => {
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
    <PageLayout>
      {/* Hero Section */}
      <Row className="hero-section text-center rounded">
        <Col md={8} className="mx-auto">
          <h1 className="display-4 fw-bold mb-3">Track Your Application Usage with Ease</h1>
          <p className="lead mb-4">
            FineAccessTracker provides simple, powerful analytics for your web applications.
            Drop in our lightweight component and start tracking user access instantly.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <Button 
              variant="light" 
              size="lg" 
              onClick={handleGetStarted}
              className="px-4 me-sm-3"
            >
              Get Started
            </Button>
            {!user && (
              <Button 
                variant="outline-light" 
                size="lg" 
                onClick={() => navigate('/register')}
                className="px-4"
              >
                Sign Up
              </Button>
            )}
          </div>
        </Col>
      </Row>

    </PageLayout>
  );
};

export default LandingPage;