import React from 'react';
import { Card } from 'react-bootstrap';
import DownloadButton from './DownloadButton';
import TabMenu from './integration/TabMenu';

const AccessTrackerExample = ({ apiKey }) => {
  // Use the provided API key or a placeholder
  const displayApiKey = apiKey || "YOUR_API_KEY";
  
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

  // If no API key is provided, try to use the current application's API key
  const effectiveApiKey = apiKey || "${displayApiKey}";

  useEffect(() => {
    // Skip if already tracked or missing required props
    if (hasTracked.current || !effectiveApiKey || !page) {
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
  }, [effectiveApiKey, page, itemId, title]);

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
          'Authorization': \`Bearer \${effectiveApiKey}\`
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
const API_KEY = "${displayApiKey}";

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

  const componentContent = (
    <pre className="bg-light p-3 rounded">
      <code>{componentCode}</code>
    </pre>
  );

  const usageContent = (
    <>
      <p>
        Copy this component into your React project to easily track page views and item interactions.
        The component wraps your content and is invisible to users.
      </p>
      <pre className="bg-light p-3 rounded">
        <code>{usageExample}</code>
      </pre>
    </>
  );

  const tabs = [
    { key: 'component', title: 'Component Code', content: componentContent },
    { key: 'usage', title: 'How to Use', content: usageContent }
  ];

  return (
    <Card className="shadow-sm mb-4" id="basic-component">
      <Card.Header className="bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Basic Tracking Component</h5>
        <DownloadButton 
          content={componentCode.trim()} 
          filename="AccessTracker.js" 
        />
      </Card.Header>
      <Card.Body>
        <TabMenu tabs={tabs} defaultActiveKey="component" />
      </Card.Body>
    </Card>
  );
};

export default AccessTrackerExample;