import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import PageLayout from '../../auth/components/pagelayout';
import PageMenu from '../components/pagemenu';
import MobileMenu from '../components/mobilemenu';
import { BarChartFill, PeopleFill, GeoAltFill, ClockFill } from 'react-bootstrap-icons';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <PageLayout>
      <PageMenu />
      <Row className="mb-4">
        <Col>
          <h1>Welcome to FineAccessTracker, {user?.firstname || 'User'}!</h1>
          <p className="lead">Track and analyze your application usage with ease.</p>
        </Col>
      </Row>
      
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <BarChartFill size={30} className="text-primary mb-3" />
              <h3>0</h3>
              <Card.Text>Total Visits</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <PeopleFill size={30} className="text-success mb-3" />
              <h3>0</h3>
              <Card.Text>Unique Visitors</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <GeoAltFill size={30} className="text-danger mb-3" />
              <h3>0</h3>
              <Card.Text>Locations</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100 shadow-sm"><Card.Body>
              <ClockFill size={30} className="text-warning mb-3" />
              <h3>0</h3>
              <Card.Text>Avg. Time on Site</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Getting Started</Card.Title>
              <Card.Text>
                Follow these steps to start tracking your application usage:
              </Card.Text>
              <ol>
                <li className="mb-2">Create a new application in your dashboard</li>
                <li className="mb-2">Get your unique API key</li>
                <li className="mb-2">Add our tracking component to your application</li>
                <li className="mb-2">Start monitoring your analytics</li>
              </ol>
              <Button variant="primary" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Recent Activity</Card.Title>
              <Card.Text className="text-muted">
                No recent activity to display. Add the tracking component to your application to start collecting data.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Your Applications</Card.Title>
              <Card.Text className="text-muted">
                You haven't added any applications yet. Create your first application to get started.
              </Card.Text>
              <Button variant="outline-primary" size="sm">
                Add Application
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default HomePage;