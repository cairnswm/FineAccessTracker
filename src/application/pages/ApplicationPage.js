import React, { useState } from 'react';
import { Row, Col, Card, Button, Nav, Tab } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import { useApplications } from '../context/ApplicationContext';
import PageLayout from '../../auth/components/pagelayout';
import PageMenu from '../components/pagemenu';
import TrackingOverview from '../components/tracking/TrackingOverview';
import PageTrackingTable from '../components/tracking/PageTrackingTable';
import ItemTrackingTable from '../components/tracking/ItemTrackingTable';
import TrackingCodeSnippet from '../components/tracking/TrackingCodeSnippet';
import ActivityTable from '../components/tracking/ActivityTable';
import { CodeSlash, BarChartFill, FileEarmarkText, ClockFill } from 'react-bootstrap-icons';

const ApplicationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const { 
    getApplication, 
    getPageTrackingByAppId, 
    getItemTrackingByAppIdAndPage,
    getActivityTracking
  } = useApplications();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPage, setSelectedPage] = useState(null);
  
  const application = getApplication(id);
  const pageTrackingData = getPageTrackingByAppId(parseInt(id));
  const itemTrackingData = selectedPage 
    ? getItemTrackingByAppIdAndPage(parseInt(id), selectedPage) 
    : [];
  const activityData = getActivityTracking({ applicationId: parseInt(id) }).slice(0, 10);
  
  if (!application) {
    return (
      <PageLayout>
        <PageMenu />
        <div className="text-center py-5">
          <h2>Application not found</h2>
          <Button 
            variant="primary" 
            className="mt-3 d-inline-flex align-items-center"
            onClick={() => navigate('/home')}
          >
            <span>Back to Home</span>
          </Button>
        </div>
      </PageLayout>
    );
  }
  
  const handleViewItems = (page) => {
    setSelectedPage(page);
  };
  
  const handleBackToPages = () => {
    setSelectedPage(null);
  };
  
  return (
    <PageLayout>
      <PageMenu />
      <Row className="mb-4">
        <Col>
          <h1>{application.name}</h1>
          <p className="lead">{application.description}</p>
        </Col>
        <Col xs="auto">
          <Button 
            variant="outline-secondary" 
            onClick={() => navigate('/applications')}
            className="d-flex align-items-center"
          >
            <span>Back to Applications</span>
          </Button>
        </Col>
      </Row>
      
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Row className="mb-4">
          <Col>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="overview" className="d-flex align-items-center">
                  <BarChartFill className="me-2" />
                  <span>Overview</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tracking" className="d-flex align-items-center">
                  <FileEarmarkText className="me-2" />
                  <span>Tracking Data</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="activity" className="d-flex align-items-center">
                  <ClockFill className="me-2" />
                  <span>Activity</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="integration" className="d-flex align-items-center">
                  <CodeSlash className="me-2" />
                  <span>Integration</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        
        <Tab.Content>
          <Tab.Pane eventKey="overview">
            <TrackingOverview application={application} />
            
            <Row className="mb-4">
              <Col>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>Application Overview</Card.Title>
                    <Card.Text>
                      This dashboard shows analytics for your {application.name} application. 
                      You can view detailed page and item tracking data in the Tracking Data tab.
                    </Card.Text>
                    <div className="d-flex">
                      <div className="me-4">
                        <strong>API Key:</strong> <code>{application.apiKey}</code>
                      </div>
                      <div>
                        <strong>Created:</strong> {application.createdAt}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            <Row className="g-4">
              <Col md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title>Recent Activity</Card.Title>
                    {activityData && activityData.length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {activityData.slice(0, 5).map((activity) => (
                          <li key={activity.id} className="list-group-item">
                            <div className="d-flex justify-content-between">
                              <div>
                                <strong>Page:</strong> <code>{activity.page}</code>
                                {activity.itemId && (
                                  <span> / <strong>Item:</strong> <code>{activity.itemId}</code></span>
                                )}
                              </div>
                              <small className="text-muted">{activity.timestamp}</small>
                            </div>
                            <small className="text-muted">{activity.location} • {activity.device}</small>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">
                        No recent activity to display. Add the tracking component to your application to start collecting data.
                      </p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title>Top Pages</Card.Title>
                    {pageTrackingData && pageTrackingData.length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {pageTrackingData
                          .sort((a, b) => b.visits - a.visits)
                          .slice(0, 5)
                          .map((page, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                              <div>
                                <div>{page.title}</div>
                                <small className="text-muted"><code>{page.page}</code></small>
                              </div>
                              <span className="badge bg-primary rounded-pill">
                                {page.visits.toLocaleString()} visits
                              </span>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <Card.Text className="text-muted">
                        No page tracking data available yet.
                      </Card.Text>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab.Pane>
          
          <Tab.Pane eventKey="tracking">
            {selectedPage ? (
              <ItemTrackingTable 
                applicationId={parseInt(id)}
                page={selectedPage}
                itemTracking={itemTrackingData}
                onBack={handleBackToPages}
              />
            ) : (
              <PageTrackingTable 
                applicationId={parseInt(id)}
                pageTracking={pageTrackingData}
                onViewItems={handleViewItems}
              />
            )}
            
            <Card className="shadow-sm">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Tracking Implementation</h5>
              </Card.Header>
              <Card.Body>
                <h6>How to Track Pages</h6>
                <pre className="bg-light p-3 rounded">
                  <code>{`
// Track page views
FineTracker.trackPage({
  apiKey: "${application.apiKey}",
  page: "products", // Unique page identifier
  title: "Products Page" // Human-readable title
});`}</code>
                </pre>
                
                <h6 className="mt-4">How to Track Items</h6>
                <pre className="bg-light p-3 rounded">
                  <code>{`
// Track item views
FineTracker.trackItem({
  apiKey: "${application.apiKey}",
  page: "products", // Page where the item appears
  itemId: "toaster", // Unique item identifier
  title: "Toaster" // Human-readable title
});`}</code>
                </pre>
              </Card.Body>
            </Card>
          </Tab.Pane>
          
          <Tab.Pane eventKey="activity">
            <ActivityTable 
              activities={activityData}
              title={`Recent Activity for ${application.name}`}
              showApplicationColumn={false}
            />
          </Tab.Pane>
          
          <Tab.Pane eventKey="integration">
            <Row className="mb-4">
              <Col>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>Integration Options</Card.Title>
                    <Card.Text>
                      Choose the integration method that works best for your application. 
                      You can track at different levels:
                    </Card.Text>
                    <ul>
                      <li><strong>Application Level</strong> - Track overall application usage</li>
                      <li><strong>Page Level</strong> - Track individual pages within your application</li>
                      <li><strong>Item Level</strong> - Track specific items or elements within pages</li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            <Row className="mb-4">
              <Col>
                <TrackingCodeSnippet 
                  apiKey={application.apiKey} 
                  trackingType="application"
                />
              </Col>
            </Row>
            
            <Row className="mb-4">
              <Col md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Header className="bg-light">
                    <h5 className="mb-0">Page Tracking Example</h5>
                  </Card.Header>
                  <Card.Body>
                    <p>Track individual pages to understand user navigation patterns:</p>
                    <pre className="bg-light p-3 rounded">
                      <code>{`
// Track when users visit specific pages
FineTracker.trackPage({
  apiKey: "${application.apiKey}",
  page: "products",
  title: "Products Page"
});

// For e-commerce sites
FineTracker.trackPage({
  apiKey: "${application.apiKey}",
  page: "cart",
  title: "Shopping Cart"
});

// For user accounts
FineTracker.trackPage({
  apiKey: "${application.apiKey}",
  page: "orders",
  title: "Orders Page"
});`}</code>
                    </pre>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Header className="bg-light">
                    <h5 className="mb-0">Item Tracking Example</h5>
                  </Card.Header>
                  <Card.Body>
                    <p>Track individual items to see what users are interested in:</p>
                    <pre className="bg-light p-3 rounded">
                      <code>{`
// Track when users view specific products
FineTracker.trackItem({
  apiKey: "${application.apiKey}",
  page: "products",
  itemId: "toaster",
  title: "Toaster"
});

// Track other products
FineTracker.trackItem({
  apiKey: "${application.apiKey}",
  page: "products",
  itemId: "kettle",
  title: "Kettle"
});

// Track user interactions with features
FineTracker.trackItem({
  apiKey: "${application.apiKey}",
  page: "dashboard",
  itemId: "quick-actions",
  title: "Quick Actions Widget"
});`}</code>
                    </pre>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </PageLayout>
  );
};

export default ApplicationPage;