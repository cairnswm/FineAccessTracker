import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import TrackingOverview from '../tracking/TrackingOverview';
import TrafficOverview from '../dashboard/TrafficOverview';
import TopLocations from '../dashboard/TopLocations';
import RecentActivityTable from '../dashboard/RecentActivityTable';

const OverviewTab = ({ application, pageTrackingData, activityData }) => {
  const applicationId = application.id;

  return (
    <>
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
      
      <Row className="g-4 mb-4">
        <Col md={8}>
          <TrafficOverview applicationId={applicationId} />
        </Col>
        
        <Col md={4}>
          <TopLocations applicationId={applicationId} />
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
      
      <Row className="mt-4">
        <Col>
          <RecentActivityTable activities={activityData} />
        </Col>
      </Row>
    </>
  );
};

export default OverviewTab;