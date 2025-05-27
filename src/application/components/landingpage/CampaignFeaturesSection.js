import React from "react";
import { Row, Col } from "react-bootstrap";
import { BarChartFill, GraphUpArrow } from "react-bootstrap-icons";

const CampaignFeaturesSection = () => {
  return (
    <Row className="py-5">
      <Col xs={12}>
        <h2 className="text-center mb-4">Campaign Link Management</h2>
      </Col>
      <Col md={6}>
        <div className="d-flex mb-4">
          <div className="flex-shrink-0">
            <BarChartFill size={30} className="text-primary me-3" />
          </div>
          <div>
            <h4>Track Link Performance</h4>
            <p>
              Create custom links for your campaigns and track which links get
              the most clicks. Gain insights into your content's performance.
            </p>
          </div>
        </div>
      </Col>
      <Col md={6}>
        <div className="d-flex mb-4">
          <div className="flex-shrink-0">
            <GraphUpArrow size={30} className="text-primary me-3" />
          </div>
          <div>
            <h4>Analyze Trends</h4>
            <p>
              Get detailed reports at both the campaign and link levels. Analyze
              trends over time to understand what content drives engagement and
              conversions.
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CampaignFeaturesSection;
