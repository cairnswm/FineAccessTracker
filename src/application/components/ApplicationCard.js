import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BarChartFill, ArrowRightCircle } from 'react-bootstrap-icons';

const ApplicationCard = ({ application }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="h-100 shadow-sm app-card">
      <Card.Body>
        <Card.Title>{application.name}</Card.Title>
        <Card.Text>{application.description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <small className="text-muted">Created: {application.createdAt}</small>
          <div className="feature-icon bg-primary">
            <BarChartFill size={20} />
          </div>
        </div>
        <Row className="text-center g-2 mb-3 app-stats">
          <Col xs={6}>
            <div className="border rounded p-2">
              <div className="small text-muted">Visits</div>
              <div className="fw-bold">{application.stats.totalVisits.toLocaleString()}</div>
            </div>
          </Col>
          <Col xs={6}>
            <div className="border rounded p-2">
              <div className="small text-muted">Unique</div>
              <div className="fw-bold">{application.stats.uniqueVisitors.toLocaleString()}</div>
            </div>
          </Col>
        </Row>
        <div className="d-grid">
          <Button 
            variant="outline-primary" 
            onClick={() => navigate(`/application/${application.id}`)}
          >
            View Details
            <ArrowRightCircle className="ms-2" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ApplicationCard;