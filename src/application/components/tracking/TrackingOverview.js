import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { BarChartFill, PeopleFill, ArrowDownRight, ArrowUpRight, ClockFill } from 'react-bootstrap-icons';

const TrackingOverview = ({ application }) => {
  if (!application) return null;
  
  return (
    <Row className="g-4 mb-4">
      <Col md={3}>
        <Card className="h-100 shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="text-muted">Total Visits</div>
              <BarChartFill size={20} className="text-primary" />
            </div>
            <h3 className="mb-0">{application.stats.totalVisits.toLocaleString()}</h3>
            <div className="small text-success mt-2">
              <ArrowUpRight /> 12% from last period
            </div>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={3}>
        <Card className="h-100 shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="text-muted">Unique Visitors</div>
              <PeopleFill size={20} className="text-success" />
            </div>
            <h3 className="mb-0">{application.stats.uniqueVisitors.toLocaleString()}</h3>
            <div className="small text-success mt-2">
              <ArrowUpRight /> 8% from last period
            </div>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={3}>
        <Card className="h-100 shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="text-muted">Bounce Rate</div>
              <ArrowDownRight size={20} className="text-warning" />
            </div>
            <h3 className="mb-0">{application.stats.bounceRate}</h3>
            <div className="small text-danger mt-2">
              <ArrowDownRight /> 3% from last period
            </div>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={3}>
        <Card className="h-100 shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="text-muted">Avg. Session</div>
              <ClockFill size={20} className="text-danger" />
            </div>
            <h3 className="mb-0">{application.stats.avgSession}</h3>
            <div className="small text-success mt-2">
              <ArrowUpRight /> 5% from last period
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TrackingOverview;