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