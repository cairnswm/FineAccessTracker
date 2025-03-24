import React, { useState } from 'react';
import { Card, Nav, Tab, Button } from 'react-bootstrap';
import { CodeSlash, Check2 } from 'react-bootstrap-icons';

const TrackingCodeSnippet = ({ apiKey, trackingType }) => {
  const [copied, setCopied] = useState(false);
  
  const reactCode = `
// React Component Example
import { FineTracker } from '@fine/access-tracker';

function App() {
  return (
    <div className="App">
      {/* Your app content */}
      
      <FineTracker 
        apiKey="${apiKey}" 
        trackPageViews={true}
        trackUserLocation={true}
        ${trackingType === 'item' ? 'trackItemViews={true}' : ''}
      />
    </div>
  );
}`;

  const htmlCode = `
<!-- HTML Example -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <script src="https://cdn.fineaccesstracker.com/tracker.min.js"></script>
</head>
<body>
  <!-- Your website content -->
  
  <script>
    // Initialize FineAccessTracker
    FineTracker.init({
      apiKey: '${apiKey}',
      trackPageViews: true,
      trackUserLocation: true,
      ${trackingType === 'item' ? 'trackItemViews: true,' : ''}
    });
  </script>
</body>
</html>`;

  const jsCode = `
// JavaScript API Example
import { trackEvent } from '@fine/access-tracker';

// Track application visit
trackEvent({
  apiKey: "${apiKey}",
  eventType: "visit"
});

${trackingType === 'page' || trackingType === 'item' ? `
// Track page view
trackEvent({
  apiKey: "${apiKey}",
  eventType: "pageview",
  page: "products",
  title: "Products Page"
});` : ''}

${trackingType === 'item' ? `
// Track item view
trackEvent({
  apiKey: "${apiKey}",
  eventType: "itemview",
  page: "products",
  itemId: "1001",
  title: "Toaster"
});` : ''}`;

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Integration Code</Card.Title>
        <Tab.Container defaultActiveKey="react">
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="react">React</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="html">HTML</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="js">JavaScript API</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="react">
              <div className="position-relative">
                <pre className="bg-dark text-light p-3 rounded" style={{ overflowX: 'auto' }}>
                  <code>{reactCode}</code>
                </pre>
                <Button 
                  variant={copied ? "success" : "light"} 
                  size="sm" 
                  className="position-absolute top-0 end-0 m-2"
                  onClick={() => copyToClipboard(reactCode)}
                >
                  {copied ? <><Check2 /> Copied</> : <><CodeSlash /> Copy</>}
                </Button>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="html">
              <div className="position-relative">
                <pre className="bg-dark text-light p-3 rounded" style={{ overflowX: 'auto' }}>
                  <code>{htmlCode}</code>
                </pre>
                <Button 
                  variant={copied ? "success" : "light"} 
                  size="sm" 
                  className="position-absolute top-0 end-0 m-2"
                  onClick={() => copyToClipboard(htmlCode)}
                >
                  {copied ? <><Check2 /> Copied</> : <><CodeSlash /> Copy</>}
                </Button>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="js">
              <div className="position-relative">
                <pre className="bg-dark text-light p-3 rounded" style={{ overflowX: 'auto' }}>
                  <code>{jsCode}</code>
                </pre>
                <Button 
                  variant={copied ? "success" : "light"} 
                  size="sm" 
                  className="position-absolute top-0 end-0 m-2"
                  onClick={() => copyToClipboard(jsCode)}
                >
                  {copied ? <><Check2 /> Copied</> : <><CodeSlash /> Copy</>}
                </Button>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
};

export default TrackingCodeSnippet;