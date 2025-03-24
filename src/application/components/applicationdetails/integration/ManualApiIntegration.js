import React from 'react';
import { Card } from 'react-bootstrap';

const ManualApiIntegration = ({ apiKey }) => {
  return (
    <Card className="shadow-sm" id="manual-api">
      <Card.Header className="bg-light">
        <h5 className="mb-0">Manual API Integration</h5>
      </Card.Header>
      <Card.Body>
        <p>
          If you prefer to make direct API calls instead of using our component, 
          you can use the following endpoints:
        </p>
        
        <h6 className="mt-3">API Endpoints</h6>
        <pre className="bg-light p-3 rounded">
          <code>{`
// Track page views
POST https://cairns.co.za/accesstracker/php/trackitem.php

// Headers
Content-Type: application/json
Authorization: Bearer ${apiKey}

// Body for page tracking
{
  "page": "products",
  "title": "Products Page",
  "timestamp": "2023-05-15T14:30:00Z"
}

// Body for item tracking
{
  "page": "products",
  "itemId": "1001",
  "title": "Toaster",
  "timestamp": "2023-05-15T14:32:00Z",
  "data": {
    "category": "appliances",
    "price": 49.99
  }
}
`}</code>
        </pre>
      </Card.Body>
    </Card>
  );
};

export default ManualApiIntegration;