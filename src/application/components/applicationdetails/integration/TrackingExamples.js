import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const TrackingExamples = ({ apiKey }) => {
  // Use a display-friendly API key
  const displayApiKey = apiKey || "YOUR_API_KEY";
  
  return (
    <Row className="mb-4" id="examples">
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
  apiKey="${displayApiKey}"
  page="products"
  title="Products Page"
>
  <YourPageComponent />
</AccessTracker>

// For e-commerce sites
<AccessTracker
  apiKey="${displayApiKey}"
  page="cart"
  title="Shopping Cart"
>
  <ShoppingCartPage />
</AccessTracker>

// For user accounts
<AccessTracker
  apiKey="${displayApiKey}"
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
  apiKey="${displayApiKey}"
  page="products"
  itemId="1001"
  title="Toaster"
>
  <ProductDetail product={product} />
</AccessTracker>

// Track other products
<AccessTracker
  apiKey="${displayApiKey}"
  page="products"
  itemId="1003"
  title="Kettle"
  data={{ category: "appliances" }}
>
  <ProductDetail product={product} />
</AccessTracker>

// Track user interactions with features
<AccessTracker
  apiKey="${displayApiKey}"
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
  );
};

export default TrackingExamples;