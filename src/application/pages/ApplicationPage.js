import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import { useApplications } from '../context/ApplicationContext';
import PageLayout from '../../auth/components/pagelayout';
import PageMenu from '../components/pagemenu';
import { BarChartFill, PeopleFill, GeoAltFill, ClockFill } from 'react-bootstrap-icons';

const ApplicationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getApplication } = useApplications();
  
  const application = getApplication(id);
  
  if (!application) {
    return (
      <PageLayout>
        <PageMenu />
        <div className="text-center py-5">
          <h2>Application not found</h2>
          <Button 
            variant="primary" 
            className="mt-3" 
            onClick={() => navigate('/home')}
          >
            Back to Home
          </Button>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <PageMenu />
      <Row className="mb-4">
        <Col>
          <h1>{application.name}</h1>
          <p className="lead">{application.description}</p>
        </Col>
      </Row>
      
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <BarChartFill size={30} className="text-primary mb-3" />
              <h3>{application.stats.totalVisits.toLocaleString()}</h3>
              <Card.Text>Total Visits</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <PeopleFill size={30} className="text-success mb-3" />
              <h3>{application.stats.uniqueVisitors.toLocaleString()}</h3>
              <Card.Text>Unique Visitors</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <GeoAltFill size={30} className="text-danger mb-3" />
              <h3>{application.stats.bounceRate}</h3>
              <Card.Text>Bounce Rate</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <ClockFill size={30} className="text-warning mb-3" />
              <h3>{application.stats.avgSession}</h3>
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
                <li className="mb-2">Copy your API key: <code>{application.apiKey}</code></li>
                <li className="mb-2">Add our tracking component to your application</li>
                <li className="mb-2">Start monitoring your analytics</li>
              </ol>
              <Button variant="primary" onClick={() => navigate('/dashboard')}>
                View Dashboard
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
              <Card.Title>Integration</Card.Title>
              <Card.Text>
                Use the following code snippet to integrate tracking into your application:
              </Card.Text>
              <pre className="bg-light p-3 rounded">
                <code>{`
// React Component Example
import { FineTracker } from '@fine/access-tracker';

function App() {
  return (
    <div className="App">
      {/* Your app content */}
      
      <FineTracker 
        apiKey="${application.apiKey}" 
        trackPageViews={true}
        trackUserLocation={true}
      />
    </div>
  );
}`}</code>
              </pre>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default ApplicationPage;