import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { CodeSlash } from 'react-bootstrap-icons';

const TrackerDemo = () => {
  const [copied, setCopied] = useState(false);
  
  const sampleCode = `// Add this to your React application
import { FineTracker } from '@fine/access-tracker';

function YourApp() {
  return (
    <div>
      <h1>Your Application</h1>
      {/* Your app content */}
      
      {/* FineAccessTracker component */}
      <FineTracker apiKey="your-api-key" />
    </div>
  );
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center bg-light">
        <div className="d-flex align-items-center">
          <CodeSlash size={20} className="me-2" />
          <span>Sample Integration Code</span>
        </div>
        <Button 
          variant={copied ? "success" : "outline-secondary"} 
          size="sm" 
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy Code"}
        </Button>
      </Card.Header>
      <Card.Body>
        <pre className="bg-dark text-light p-3 rounded" style={{ overflowX: 'auto' }}>
          <code>{sampleCode}</code>
        </pre>
      </Card.Body>
    </Card>
  );
};

export default TrackerDemo;