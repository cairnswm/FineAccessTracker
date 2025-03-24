import React from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Check2, X } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/context/AuthContext';
import './PricingSection.css';

const PricingSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/home');
    } else {
      navigate('/register');
    }
  };

  const handleUpgrade = () => {
    if (user) {
      navigate('/subscriptions');
    } else {
      navigate('/register');
    }
  };

  return (
    <Row className="py-5" id="pricing">
      <Col xs={12} className="text-center mb-4">
        <h2>Simple, Transparent Pricing</h2>
        <p className="lead">Choose the plan that's right for your needs</p>
      </Col>
      
      <Col md={4} className="mb-4">
        <Card className="h-100 shadow pricing-card">
          <Card.Header className="bg-light text-center py-3">
            <h3 className="mb-0">Free</h3>
            <div className="mt-2">
              <Badge bg="success">Get Started</Badge>
            </div>
          </Card.Header>
          <Card.Body className="d-flex flex-column">
            <div className="pricing-price text-center mb-4">
              <span className="display-4">$0</span>
              <span className="text-muted">/month</span>
            </div>
            
            <ul className="pricing-features list-unstyled">
              <li className="d-flex align-items-center mb-3">
                <Check2 className="text-success me-2" size={20} />
                <span>Track up to 1,000 interactions</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <Check2 className="text-success me-2" size={20} />
                <span>Basic analytics dashboard</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <Check2 className="text-success me-2" size={20} />
                <span>Page-level tracking</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <Check2 className="text-success me-2" size={20} />
                <span>Item-level tracking</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <X className="text-danger me-2" size={20} />
                <span className="text-muted">Data older than 7 days is deleted</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <X className="text-danger me-2" size={20} />
                <span className="text-muted">No geo-location tracking</span>
              </li>
            </ul>
            
            <div className="mt-auto">
              <Button 
                variant="outline-primary" 
                size="lg" 
                className="w-100"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={4} className="mb-4">
        <Card className="h-100 shadow pricing-card border-primary">
          <Card.Header className="bg-primary text-white text-center py-3">
            <h3 className="mb-0">Basic</h3>
            <div className="mt-2">
              <Badge bg="light" text="dark">Most Popular</Badge>
            </div>
          </Card.Header>
          <Card.Body className="d-flex flex-column">
            <div className="pricing-price text-center mb-4">
              <span className="display-4">$19</span>
              <span className="text-muted">/month</span>
            </div>
            
            <ul className="pricing-features list-unstyled">
              <li className="d-flex align-items-center mb-3">
                <Check2 className="text-success me-2" size={20} />
                <span><strong>Unlimited</strong> interactions</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <Check2 className="text-success me-2" size={20} />
                <span>Advanced analytics dashboard</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <Check2 className="text-success me-2" size={20} />
                <span>Page-level tracking</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <Check2 className="text-success me-2" size={20} />
                <span>Item-level tracking</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <Check2 className="text-success me-2" size={20} />
                <span>Geo-location tracking</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <X className="text-danger me-2" size={20} />
                <span className="text-muted">Data older than 30 days is deleted</span>
              </li>
            </ul>
            
            <div className="mt-auto">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-100"
                onClick={handleUpgrade}
              >
                Upgrade Now
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={4} className="mb-4">
        <Card className="h-100 shadow pricing-card border-dark">
          <Card.Header className="bg-dark text-white text-center py-3">
            <h3 className="mb-0">Pro</h3>
            <div className="mt-2">
              <Badge bg="warning" text="dark">Enterprise Ready</Badge>
            </div>
          </Card.Header>
          <Card.Body className="d-flex flex-column">
            <div className="pricing-price text-center mb-4">
              <span className="display-4">$49</span>
              <span className="text-muted">/month</span>
            </div>
            
            <ul className="pricing-features list-unstyled">
              <li className="d-flex align-items-center mb-3">
                <Check2 className="text-success me-2" size={20} />
                <span><strong>Unlimited</strong> interactions</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <Check2 className="text-success me-2" size={20} />
                <span>Premium analytics dashboard</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <Check2 className="text-success me-2" size={20} />
                <span>Page-level tracking</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <Check2 className="text-success me-2" size={20} />
                <span>Item-level tracking</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <Check2 className="text-success me-2" size={20} />
                <span>Advanced geo-location insights</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <Check2 className="text-success me-2" size={20} />
                <span><strong>Unlimited</strong> data retention</span>
              </li>
            </ul>
            
            <div className="mt-auto">
              <Button 
                variant="dark" 
                size="lg" 
                className="w-100"
                onClick={handleUpgrade}
              >
                Go Pro
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default PricingSection;