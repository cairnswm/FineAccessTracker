import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import {
  BarChartFill,
  GeoAltFill,
  CodeSlash,
  ClockFill,
  KeyFill,
  Code,
} from "react-bootstrap-icons";

const BenefitsSection = () => {
  return (
    <>
      <Row className="py-3">
        <Col xs={12}>
          <h2 className="text-center mb-4">Why Choose Access Tracker?</h2>
        </Col>
      </Row>
      <Row className="g-4 mb-5">
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm benefit-card">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <div className="feature-icon bg-primary mx-auto">
                  <ClockFill size={30} />
                </div>
              </div>
              <Card.Title>Immediate Tracking</Card.Title>
              <Card.Text>Easy to use – start in 1 minute.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm benefit-card">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <div className="feature-icon bg-primary mx-auto">
                  <BarChartFill size={30} />
                </div>
              </div>
              <Card.Title>Real-time Analytics</Card.Title>
              <Card.Text>
                Monitor application usage in real-time with our intuitive
                dashboard. Track visits, unique users, and engagement metrics.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm benefit-card">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <div className="feature-icon bg-primary mx-auto">
                  <CodeSlash size={30} />
                </div>
              </div>
              <Card.Title>Simple Integration</Card.Title>
              <Card.Text>
                Add our lightweight component to your application with just a
                few lines of code. No complex setup required.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm benefit-card">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <div className="feature-icon bg-primary mx-auto">
                  <GeoAltFill size={30} />
                </div>
              </div>
              <Card.Title>Geographic Insights</Card.Title>
              <Card.Text>
                Coming soon: Discover where your users are coming from with
                IP-based location tracking and visualization.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm benefit-card">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <div className="feature-icon bg-primary mx-auto">
                  <KeyFill size={30} />
                </div>
              </div>
              <Card.Title>Privacy</Card.Title>
              <Card.Text>
                No cookies, no personal data – privacy friendly
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm benefit-card">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <div className="feature-icon bg-primary mx-auto">
                  <Code size={30} />
                </div>
              </div>
              <Card.Title>For Developers</Card.Title>
              <Card.Text>Developer-first, no bloated dashboards</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BenefitsSection;
