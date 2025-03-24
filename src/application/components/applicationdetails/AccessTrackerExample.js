import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import DownloadButton from './DownloadButton';

const AccessTrackerExample = ({ apiKey }) => {
  const componentCode = `
import React, { useEffect, useRef } from 'react';

/**
 * AccessTracker - A component to track page views and item interactions
 * 
 * @param {Object} props
 * @param {string} props.apiKey - Your Access Tracker API key
 * @param {string} props.page - The page identifier (e.g., "products", "cart")
 * @param {string} [props.itemId] - Optional item identifier for tracking specific items
 * @param {string} props.title - Human-readable title for the page or item
 * @param {Object} [props.data] - Optional additional data to track (e.g., user info, context)
 * @param {React.ReactNode} props.children - The content to render inside the tracker
 */
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

export default AccessTracker;
`;

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
        <div className="price">\${product.price}</div>
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
};
`;

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">AccessTracker Component</h5>
        <DownloadButton 
          content={componentCode.trim()} 
          filename="AccessTracker.js" 
        />
      </Card.Header>
      <Card.Body>
        <p>
          Copy this component into your React project to easily track page views and item interactions.
          The component wraps your content and is invisible to users.
        </p>
        
        <Row className="mt-4">
          <Col>
            <h6>Component Implementation</h6>
            <pre className="bg-light p-3 rounded">
              <code>{componentCode}</code>
            </pre>
          </Col>
        </Row>
        
        <Row className="mt-4">
          <Col>
            <h6>Usage Examples</h6>
            <pre className="bg-light p-3 rounded">
              <code>{usageExample}</code>
            </pre>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AccessTrackerExample;