<Tab.Pane eventKey="integration">
  <Row className="mb-4">
    <Col>
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>Integration Options</Card.Title>
          <Card.Text>
            Choose the integration method that works best for your application. 
            You can track at different levels:
          </Card.Text>
          <ul>
            <li><strong>Application Level</strong> - Track overall application usage</li>
            <li><strong>Page Level</strong> - Track individual pages within your application</li>
            <li><strong>Item Level</strong> - Track specific items or elements within pages</li>
          </ul>
        </Card.Body>
      </Card>
    </Col>
  </Row>
  
  <Row className="mb-4">
    <Col>
      <TrackingCodeSnippet 
        apiKey={application.apiKey} 
        trackingType="application"
      />
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
// Track when users visit specific pages
FineTracker.trackPage({
  apiKey: "${application.apiKey}",
  page: "products",
  title: "Products Page"
});

// For e-commerce sites
FineTracker.trackPage({
  apiKey: "${application.apiKey}",
  page: "cart",
  title: "Shopping Cart"
});

// For user accounts
FineTracker.trackPage({
  apiKey: "${application.apiKey}",
  page: "orders",
  title: "Orders Page"
});`}</code>
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
FineTracker.trackItem({
  apiKey: "${application.apiKey}",
  page: "products",
  itemId: "1001",
  title: "Toaster"
});

// Track other products
FineTracker.trackItem({
  apiKey: "${application.apiKey}",
  page: "products",
  itemId: "1003",
  title: "Kettle"
});

// Track user interactions with features
FineTracker.trackItem({
  apiKey: "${application.apiKey}",
  page: "dashboard",
  itemId: "3001",
  title: "Quick Actions Widget"
});`}</code>
          </pre>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Tab.Pane>