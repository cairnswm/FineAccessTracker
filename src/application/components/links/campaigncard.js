import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PencilSquare, Trash, ArrowRightCircle, Link } from "react-bootstrap-icons";

const CampaignCard = ({ 
  campaign, 
  getApplicationName, 
  linkCount, 
  onEdit, 
  onDelete 
}) => {
  const navigate = useNavigate();
  // Assuming we have a click count, if not available, default to 0
  const clickCount = campaign.total_clicks || 0;
  const clickUnique = campaign.unique_clicks || 0;
  
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title className="mb-0">{campaign.name}</Card.Title>
          <div>
            <PencilSquare 
              className="me-2 text-secondary" 
              style={{ cursor: "pointer" }} 
              onClick={() => onEdit(campaign)} 
              size={18}
            />
            <Trash 
              className="text-danger" 
              style={{ cursor: "pointer" }} 
              onClick={() => onDelete(campaign.id)} 
              size={18}
            />
          </div>
        </div>
        <Card.Subtitle className="mb-2 text-muted">
          {getApplicationName(campaign.application_id)}
        </Card.Subtitle>

        {campaign.description && (
          <Card.Text className="mb-2">
            {campaign.description}
          </Card.Text>
        )}
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <small className="text-muted">Created: {campaign.created_at || 'N/A'}</small>
          <div className="feature-icon bg-primary">
            <Link size={20} />
          </div>
        </div>
        
        <Row className="text-center g-2 mb-3">
          <Col xs={4}>
            <div className="border rounded p-2">
              <div className="small text-muted">Links</div>
              <div className="fw-bold">{linkCount}</div>
            </div>
          </Col>
          <Col xs={4}>
            <div className="border rounded p-2">
              <div className="small text-muted">Clicks</div>
              <div className="fw-bold">{clickCount}</div>
            </div>
          </Col>
          
          <Col xs={4}>
            <div className="border rounded p-2">
              <div className="small text-muted">Unique</div>
              <div className="fw-bold">{clickUnique}</div>
            </div>
          </Col>
        </Row>
        
        <div className="d-grid">
          <Button 
            variant="outline-primary" 
            onClick={() => {
              console.log(`View Links /campaigns/${campaign.id}`);
              navigate(`/campaigns/${campaign.id}`);
            }}
            className="d-flex align-items-center justify-content-center"
          >
            <span>View Details</span>
            <ArrowRightCircle className="ms-2" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CampaignCard;
