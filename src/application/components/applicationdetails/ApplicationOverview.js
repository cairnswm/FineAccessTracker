import React, {useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Copy } from "react-bootstrap-icons";

const ApplicationOverview = ({ application }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Application Overview</Card.Title>
        <Card.Text>
          This dashboard shows analytics for your {application.name}{" "}
          application. You can view detailed page and item tracking data in the
          Tracking Data tab.
        </Card.Text>
        <div className="d-flex">
          <div className="me-4">
            <strong>API Key:</strong> <code>{application.api_key}</code>
            <Button
              variant="light"
              onClick={() => copyToClipboard(application.api_key)}
            >
              <Copy size={16} />
            </Button>
            {copied && <span className="text-success ms-2">Copied!</span>}
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
