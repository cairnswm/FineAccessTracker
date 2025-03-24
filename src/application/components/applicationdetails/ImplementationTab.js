import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const ImplementationTab = ({ apiKey }) => {
  return (
    <>
      <Card className="shadow-sm">
        <Card.Header className="bg-light">
          <h5 className="mb-0">Tracking Implementation</h5>
        </Card.Header>
        <Card.Body>
          <h6>How to Track Pages</h6>
          <pre className="bg-light p-3 rounded">
            <code>{`
// Track page views
FineTracker.trackPage({
  apiKey: "${apiKey}",
  page: "products", // Unique page identifier
  title: "Products Page" // Human-readable title
});`}</code>
          </pre>
          
          <h6 className="mt-4">How to Track Items</h6>
          <pre className="bg-light p-3 rounded">
            <code>{`
// Track item views
FineTracker.trackItem({
  apiKey: "${apiKey}",
  page: "products", // Page where the item appears
  itemId: "1001", // Unique numeric item identifier
  title: "Toaster" // Human-readable title
});`}</code>
          </pre>
        </Card.Body>
      </Card>
      
      <Card className="shadow-sm mt-4">
        <Card.Header className="bg-light">
          <h5 className="mb-0">Implementation Examples</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h6>E-commerce Example</h6>
              <pre className="bg-light p-3 rounded">
                <code>{`
// On product listing page
FineTracker.trackPage({
  apiKey: "${apiKey}",
  page: "products",
  title: "Products Page"
});

// When user views a product
FineTracker.trackItem({
  apiKey: "${apiKey}",
  page: "products",
  itemId: "1001",
  title: "Toaster Deluxe 5000"
});

// When user adds to cart
FineTracker.trackEvent({
  apiKey: "${apiKey}",
  eventType: "add_to_cart",
  page: "products",
  itemId: "1001"
});`}</code>
              </pre>
            </Col>
            
            <Col md={6}>
              <h6>Blog Example</h6>
              <pre className="bg-light p-3 rounded">
                <code>{`
// On blog home page
FineTracker.trackPage({
  apiKey: "${apiKey}",
  page: "blog",
  title: "Blog Home"
});

// When user reads an article
FineTracker.trackItem({
  apiKey: "${apiKey}",
  page: "blog",
  itemId: "2001",
  title: "How to Improve Your Website Analytics"
});

// When user comments
FineTracker.trackEvent({
  apiKey: "${apiKey}",
  eventType: "comment",
  page: "blog",
  itemId: "2001"
});`}</code>
              </pre>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ImplementationTab;