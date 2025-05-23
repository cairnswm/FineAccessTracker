import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { BarChartFill, PeopleFill, ArrowDownRight, ArrowUpRight, ClockFill } from 'react-bootstrap-icons';
import { useApplications } from '../../context/ApplicationContext';

const TrackingOverview = ({ application }) => {
  
  if (!application) return null;
  
  const formatSessionTime = (time) => {
    if (!time || time.includes("m")) return "0:00:00";
    const [hours, minutes, sec] = time.split(':');
    let seconds = sec;
    if (seconds.includes('.')) {
      [seconds] = seconds.split('.');
    }
    return `${parseInt(hours, 10)}:${minutes}:${seconds}`;
  };

  return (
    <Row className="g-4 mb-4">
      <Col md={4}>
        <Card className="h-100 shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="text-muted">Todays Events</div>
              <BarChartFill size={20} className="text-primary" />
            </div>
            <h3 className="mb-0">{application.eventsToday}</h3>
            <div className="small text-success mt-2">
              All events today
            </div>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={4}>
        <Card className="h-100 shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="text-muted">Unique Visitors Today</div>
              <PeopleFill size={20} className="text-success" />
            </div>
            <h3 className="mb-0">{application.visitsToday}</h3>
            <div className="small text-success mt-2">
              Derived from unique IP Addresses
            </div>
          </Card.Body>
        </Card>
      </Col>
            
      <Col md={4}>
        <Card className="h-100 shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="text-muted">Avg. Session</div> 
              <ClockFill size={20} className="text-danger" />
            </div>
            <h3 className="mb-0">{formatSessionTime(application.avgSession)}</h3> 
            <div className="small text-success mt-2">
              Estimated time between first and last event
            </div>
            <div className="small text-muted mt-1">
              Last updated: {application.lastUpdated}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TrackingOverview;
