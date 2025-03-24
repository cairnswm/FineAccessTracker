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
      {/* Key Benefits Section */}
      <Row className="py-3">
        <Col xs={12}>
          <h2 className="text-center mb-4">Why Choose FineAccessTracker?</h2>
        </Col>
      </Row>
      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="h-100 shadow-sm benefit-card">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <div className="feature-icon bg-primary mx-auto">
                  <BarChartFill size={30} />
                </div>
              </div>
              <Card.Title>Real-time Analytics</Card.Title>
              <Card.Text>
                Monitor application usage in real-time with our intuitive dashboard. Track visits, unique users, and engagement metrics.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm benefit-card">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <div className="feature-icon bg-primary mx-auto">
                  <CodeSlash size={30} />
                </div>
              </div>
              <Card.Title>Simple Integration</Card.Title>
              <Card.Text>
                Add our lightweight component to your application with just a few lines of code. No complex setup required.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm benefit-card">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <div className="feature-icon bg-primary mx-auto">
                  <GeoAltFill size={30} />
                </div>
              </div>
              <Card.Title>Geographic Insights</Card.Title>
              <Card.Text>
                Coming soon: Discover where your users are coming from with IP-based location tracking and visualization.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Integration Demo Section */}
      <Row className="py-4">
        <Col xs={12}>
          <h2 className="text-center mb-4">Easy to Integrate</h2>
          <p className="text-center mb-4">
            Just add our component to your application and you're ready to go.
          </p>
        </Col>
        <Col md={10} className="mx-auto">
          TrackerDemo 
        </Col>
      </Row>

      {/* How It Works Section */}
      <Row className="py-5 bg-light rounded mt-4">
        <Col xs={12}>
          <h2 className="text-center mb-4">How It Works</h2>
        </Col>
        <Col md={10} className="mx-auto">
          <Row className="g-4">
            <Col md={4}>
              <div className="text-center">
                <div className="bg-primary text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <span className="fs-4">1</span>
                </div>
                <h4>Add Our Component</h4>
                <p>Drop our tracking component into your application with minimal code.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <div className="bg-primary text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <span className="fs-4">2</span>
                </div>
                <h4>Configure API Key</h4>
                <p>Set up your unique API key to securely track your application usage.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <div className="bg-primary text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <span className="fs-4">3</span>
                </div>
                <h4>View Analytics</h4>
                <p>Access your dashboard to view comprehensive usage statistics.</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Additional Features Section */}
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
              <SpeedometerFill size={30} className="text-primary me-3" />
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

      {/* CTA Section */}
      <Row className="cta-section text-center rounded">
        <Col md={8} className="mx-auto">
          <h2 className="mb-3">Ready to Start Tracking?</h2>
          <p className="lead mb-4">
            Join thousands of developers who trust FineAccessTracker for their application analytics needs.
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

    </PageLayout>
  );
};

export default LandingPage;