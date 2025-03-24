import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import TrackingCodeSnippet from '../tracking/TrackingCodeSnippet';
import AccessTrackerExample from './AccessTrackerExample';

const IntegrationTab = ({ apiKey }) => {
  return (
    <>
      <Row className="mb-4">
        <Col>
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
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-light">
              <h5 className="mb-0">How Access Tracker Works</h5>
            </Card.Header>
            <Card.Body>
              <p>
                Access Tracker works by sending tracking data to our API whenever a user views a page or interacts with an item.
                The tracking is done through simple HTTP requests with your API key for authentication.
              </p>
              
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
  const API_KEY = "${apiKey}";
  
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
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <AccessTrackerExample apiKey={apiKey} />
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
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
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Page Tracking Example</h5>
            </Card.Header>
            <Card.Body>
              <p>Track individual pages to understand user navigation patterns:</p>
              <pre className="bg-light p-3 rounded">
                <code>{`
// React component approach
<AccessTracker
  apiKey="${apiKey}"
  page="products"
  title="Products Page"
>
  <YourPageComponent />
</AccessTracker>

// For e-commerce sites
<AccessTracker
  apiKey="${apiKey}"
  page="cart"
  title="Shopping Cart"
>
  <ShoppingCartPage />
</AccessTracker>

// For user accounts
<AccessTracker
  apiKey="${apiKey}"
  page="orders"
  title="Orders Page"
>
  <OrdersPage />
</AccessTracker>`}</code>
              </pre>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Item Tracking Example</h5>
            </Card.Header>
            <Card.Body>
              <p>Track individual items to see what users are interested in:</p>
              <pre className="bg-light p-3 rounded">
                <code>{`
// Track when users view specific products
<AccessTracker
  apiKey="${apiKey}"
  page="products"
  itemId="1001"
  title="Toaster"
>
  <ProductDetail product={product} />
</AccessTracker>

// Track other products
<AccessTracker
  apiKey="${apiKey}"
  page="products"
  itemId="1003"
  title="Kettle"
  data={{ category: "appliances" }}
>
  <ProductDetail product={product} />
</AccessTracker>

// Track user interactions with features
<AccessTracker
  apiKey="${apiKey}"
  page="dashboard"
  itemId="3001"
  title="Quick Actions Widget"
>
  <QuickActionsWidget />
</AccessTracker>`}</code>
              </pre>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default IntegrationTab;