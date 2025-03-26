import React from 'react';
import { Card, Alert } from 'react-bootstrap';
import { InfoCircleFill, GeoAltFill } from 'react-bootstrap-icons';

const HowItWorks = ({ apiKey }) => {
  // Use a display-friendly API key
  const displayApiKey = apiKey || "YOUR_API_KEY";
  
  return (
    <Card className="shadow-sm" id="how-it-works">
      <Card.Header className="bg-light">
        <h5 className="mb-0">How Access Tracker Works</h5>
      </Card.Header>
      <Card.Body>
        <p>
          Access Tracker works by sending tracking data to our API whenever a user views a page or interacts with an item.
          The tracking is done through simple HTTP requests with your API key for authentication.
        </p>
        
        <Alert variant="info" className="d-flex align-items-start mb-4">
          <InfoCircleFill className="me-2 mt-1" size={20} />
          <div>
            <strong>Session Tracking:</strong> Users accessing the same page/item within a 15-minute window will only be counted once. 
            If a user returns to the same page after 15 minutes, it will be recorded as a new access.
          </div>
        </Alert>
        
        <Alert variant="info" className="d-flex align-items-start mb-4">
          <GeoAltFill className="me-2 mt-1" size={20} />
          <div>
            <strong>Location Tracking:</strong> Only application-level tracking calls (without specific page and item IDs) 
            will capture IP address and location data. To ensure you collect geographic information about your users, 
            always include Access Tracker on your home page or main entry points.
          </div>
        </Alert>
        
        <h6 className="mt-3">Core Concepts</h6>
        <ul>
          <li><strong>API Key</strong> - Your unique identifier for authentication (found in your dashboard)</li>
          <li><strong>Page Tracking</strong> - Records when users visit specific pages in your application</li>
          <li><strong>Item Tracking</strong> - Records when users interact with specific items (products, articles, etc.)</li>
          <li><strong>Error Tracking</strong> - Capture Errors as they happen</li>
        </ul>
        
        <h6 className="mt-4">Vanilla JavaScript Example</h6>
        <pre className="bg-light p-3 rounded">
          <code>{`
// Function to track a page view
function trackPageView(apiKey, page, id, error) {
  // Create the payload
  const payload = {
    page: page,
    id: id
  };
  if (error) {
    payload.error = error;
    }

  // Send the tracking data to the API
  fetch('https://accesself.co.za/php/api/track.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${apiKey}\`
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) {
      console.error('Failed to track page view');
    }
  })
  .catch(error => {
    console.error('Error tracking page view:', error);
  });
}

// Function to track an item view
function trackItemView(apiKey, page, id) {
  // Create the payload
  const payload = {
    page: page,
    id: itemId,
  };

  // Send the tracking data to the API
  fetch('https://accesself.co.za/php/api/track.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${apiKey}\`
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) {
      console.error('Failed to track item view');
    }
  })
  .catch(error => {
    console.error('Error tracking item view:', error);
  });
}
`}</code>
        </pre>
        
        <h6 className="mt-4">Implementation Tips</h6>
        <ul>
          <li><strong>Debounce your tracking calls</strong> to prevent excessive API requests</li>
          <li><strong>Handle errors gracefully</strong> so tracking failures don't affect your application</li>
          <li><strong>Track meaningful events</strong> that provide insights into user behavior</li>
          <li><strong>Add site-level tracking</strong> on your main page to capture location data</li>
          <li><strong>Add Error tracking</strong> where needed so all errors can be monitored in one space</li>
          <li><strong>Use Intersection Observer API</strong> to track user interactions with elements on the page</li>
        </ul>
      </Card.Body>
    </Card>
  );
};

export default HowItWorks;