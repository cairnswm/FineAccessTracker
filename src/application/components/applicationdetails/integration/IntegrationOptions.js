import React from 'react';
import { Card } from 'react-bootstrap';

const IntegrationOptions = () => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Integration Options</Card.Title>
        <Card.Text>
          Choose the integration method that works best for your application. 
          We recommend using our React component for the easiest integration.
        </Card.Text>
        <ul>
          <li><strong>React Component</strong> - Wrap your pages or items with our AccessTracker component</li>
          <li><strong>Manual API Calls</strong> - Make direct API calls for more control</li>
          <li><strong>Multiple Tracking Levels</strong> - Track at application, page, or item level</li>
        </ul>
      </Card.Body>
    </Card>
  );
};

export default IntegrationOptions;