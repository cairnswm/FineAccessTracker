import React from "react";
import { Card } from "react-bootstrap";

const ApplicationOverview = ({ application }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Application Overview</Card.Title>
        <Card.Text>
          This dashboard shows analytics for your {application.name}{" "}
          application. You can view detailed page and item tracking data
          in the Tracking Data tab.
        </Card.Text>
        <div className="d-flex">
          <div className="me-4">
            <strong>API Key:</strong> <code>{application.api_key}</code>
          </div>
          <div>
            <strong>Created:</strong> {application.created_at}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ApplicationOverview;
