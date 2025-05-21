import React from 'react';
import { Card, Alert } from 'react-bootstrap';
import { InfoCircleFill, GeoAltFill } from 'react-bootstrap-icons';

const TrackingInformation = () => {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-light">
        <h5 className="mb-0">Important Tracking Information</h5>
      </Card.Header>
      <Card.Body>
        <Alert variant="info" className="d-flex align-items-start">
          <InfoCircleFill className="me-2 mt-1" size={20} />
          <div>
            <strong>Session Tracking:</strong> Users accessing the same page/item within a 15-minute window will only be counted once. 
            If a user returns to the same page after 15 minutes, it will be recorded as a new access.
          </div>
        </Alert>
        
        <Alert variant="info" className="d-flex align-items-start">
          <GeoAltFill className="me-2 mt-1" size={20} />
          <div>
            <strong>Location Tracking:</strong> Only application-level tracking calls (without specific page and item IDs) 
            will capture IP address and location data. To ensure you collect geographic information about your users, 
            always trigger a track call on your home page or main entry points.
          </div>
        </Alert>
        
        <div className="mt-3">
          <h6>Recommended Implementation for Single Page Applications (SPAs):</h6>
          <pre className="bg-light p-3 rounded">
            <code>{`
<script src="http://accesself.co.za/accesself.js"></script>
<script>
  // Set your API key once loaded
  AccessElf.setApiKey('YOUR_API_KEY_HERE');
</script>
`}</code>
          </pre>
        </div>

        <div className="mt-3">
          <h6>Recommended Implementation for Non-SPA Applications:</h6>
          <pre className="bg-light p-3 rounded">
            <code>{`
// In your main app (e.g., App.js or useEffect in layout)
import { setApiKey, track } from './accessElf';

// Set API key once
setApiKey("YOUR_API_KEY");

// On the home page to track location-based site visit
track(); // no page or id specified

// On specific pages to track views (no location data)
track("products"); // page only
track("products", "product-123"); // page and item ID
`}</code>
          </pre>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TrackingInformation;
