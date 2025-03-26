import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import TrackingOverview from "../tracking/TrackingOverview";
import TrafficOverview from "../tracking/TrafficOverview";
import TopLocations from "../dashboard/TopLocations";
import RecentActivityTable from "../dashboard/RecentActivityTable";
import RecentSessions from "../dashboard/RecentSessions";
import ApplicationOverview from "./ApplicationOverview";

const OverviewTab = ({
  application,
  analytics,
  pageTrackingData,
  activityData,
  sessionData,
  dailyAnalytics,
  countryAnalytics
}) => {
  const applicationId = application.id;

  return (
    <>
      <TrackingOverview application={application} analytics={analytics}/>

      <Row className="mb-4">
        <Col>
          <ApplicationOverview application={application} />
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col md={8}>
          <TrafficOverview analytics={dailyAnalytics} />
        </Col>

        <Col md={4}>
          <TopLocations analytics={countryAnalytics} />
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <RecentSessions activities={sessionData} />
        </Col>

        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Top Pages</Card.Title>
              {pageTrackingData && pageTrackingData.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {pageTrackingData
                    .sort((a, b) => b.totalVisits - a.totalVisits)
                    .slice(0, 5)
                    .map((page, index) => {
                      return (
                        <li
                          key={index}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <div>{page.title}</div>
                            <small className="text-muted">
                              <code>{page.page}</code>
                            </small>
                          </div>
                          <span className="badge bg-primary rounded-pill">
                            {page.totalVisits} visits
                          </span>
                        </li>
                      );
                    })}
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
