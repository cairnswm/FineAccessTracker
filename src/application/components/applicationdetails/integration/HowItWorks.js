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
          <li><strong>Additional Data</strong> - Optional context information you can include with each tracking event</li>
        </ul>
        
        <h6 className="mt-4">Vanilla JavaScript Example</h6>
        <pre className="bg-light p-3 rounded">
          <code>{`
// Function to track a page view
function trackPageView(apiKey, page, title, additionalData = {}) {
  // Create the payload
  const payload = {
    page: page,
    title: title,
    timestamp: new Date().toISOString(),
    ...additionalData
  };

  // Send the tracking data to the API
  fetch('https://cairns.co.za/accesstracker/php/trackitem.php', {
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
function trackItemView(apiKey, page, itemId, title, additionalData = {}) {
  // Create the payload
  const payload = {
    page: page,
    itemId: itemId,
    title: title,
    timestamp: new Date().toISOString(),
    ...additionalData
  };

  // Send the tracking data to the API
  fetch('https://cairns.co.za/accesstracker/php/trackitem.php', {
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

// Usage examples
document.addEventListener('DOMContentLoaded', function() {
  const API_KEY = "${displayApiKey}";
  
  // Track application-level access to capture location data
  fetch('https://cairns.co.za/accesstracker/php/trackitem.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${API_KEY}\`
    },
    body: JSON.stringify({
      timestamp: new Date().toISOString()
    })
  });
  
  // Track the current page view
  trackPageView(API_KEY, 'products', 'Products Page', { 
    referrer: document.referrer 
  });
  
  // Track item views when a product is clicked
  document.querySelectorAll('.product-item').forEach(product => {
    product.addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      const productName = this.getAttribute('data-product-name');
      
      trackItemView(API_KEY, 'products', productId, productName, {
        category: this.getAttribute('data-category'),
        price: this.getAttribute('data-price')
      });
    });
  });
});
`}</code>
        </pre>
        
        <h6 className="mt-4">Implementation Tips</h6>
        <ul>
          <li><strong>Debounce your tracking calls</strong> to prevent excessive API requests</li>
          <li><strong>Handle errors gracefully</strong> so tracking failures don't affect your application</li>
          <li><strong>Track meaningful events</strong> that provide insights into user behavior</li>
          <li><strong>Include relevant context data</strong> to make your analytics more valuable</li>
          <li><strong>Add application-level tracking</strong> on your main page to capture location data</li>
        </ul>
      </Card.Body>
    </Card>
  );
};

export default HowItWorks;