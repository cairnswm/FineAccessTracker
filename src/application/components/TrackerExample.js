import React from 'react';
import { Card, Tab, Nav } from 'react-bootstrap';

const TrackerExample = () => {
  const apiKey = "example-api-key-12345";

  const basicTrackerCode = `
import React, { useEffect, useRef } from 'react';

const AccessTracker = ({ 
  apiKey, 
  page, 
  itemId, 
  title, 
  data = {}, 
  children 
}) => {
  // Use a ref to track if the component has already sent the tracking data
  const hasTracked = useRef(false);
  
  // Debounce timer reference
  const timerRef = useRef(null);

  useEffect(() => {
    // Skip if already tracked or missing required props
    if (hasTracked.current || !apiKey || !page) {
      return;
    }

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a debounce timer for 500ms
    timerRef.current = setTimeout(() => {
      // Track the view
      trackView();
      // Mark as tracked to prevent duplicate tracking
      hasTracked.current = true;
    }, 500);

    // Cleanup function to clear the timer if component unmounts
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [apiKey, page, itemId, title]);

  const trackView = async () => {
    try {
      // Determine if this is a page view or item view
      const eventType = itemId ? 'item' : 'page';
      
      // Prepare the payload
      const payload = {
        page,
        title,
        timestamp: new Date().toISOString(),
        ...data
      };
      
      // Add itemId if available
      if (itemId) {
        payload.itemId = itemId;
      }

      // Send the tracking data to the API
      const response = await fetch('https://cairns.co.za/accesstracker/php/trackitem.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${apiKey}\`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error('Access Tracker: Failed to track view');
      }
    } catch (error) {
      console.error('Access Tracker: Error tracking view', error);
    }
  };

  // Simply render the children - the tracker is invisible
  return <>{children}</>;
};

export default AccessTracker;`;

  const usageExample = `
// Example usage in your application

import React from 'react';
import AccessTracker from './AccessTracker';

// Your API key from Access Tracker dashboard
const API_KEY = "${apiKey}";

// Example product component
const ProductDetail = ({ product }) => {
  return (
    <AccessTracker
      apiKey={API_KEY}
      page="products"
      itemId={product.id}
      title={product.name}
      data={{ category: product.category, price: product.price }}
    >
      <div className="product-detail">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <div className="price">${product.price}</div>
        <button>Add to Cart</button>
      </div>
    </AccessTracker>
  );
};

// Example page component
const ProductsPage = ({ products }) => {
  return (
    <AccessTracker
      apiKey={API_KEY}
      page="products"
      title="Products Page"
    >
      <div className="products-page">
        <h1>Our Products</h1>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </AccessTracker>
  );
};`;

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Integration Examples</Card.Title>
        <Tab.Container defaultActiveKey="component">
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="component">Component</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="usage">Usage</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="component">
              <pre className="bg-dark text-light p-3 rounded" style={{ overflowX: 'auto' }}>
                <code>{basicTrackerCode}</code>
              </pre>
            </Tab.Pane>
            <Tab.Pane eventKey="usage">
              <pre className="bg-dark text-light p-3 rounded" style={{ overflowX: 'auto' }}>
                <code>{usageExample}</code>
              </pre>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
};

export default TrackerExample;