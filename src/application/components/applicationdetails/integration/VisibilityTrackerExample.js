import React from 'react';
import { Card } from 'react-bootstrap';
import DownloadButton from '../DownloadButton';
import TabMenu from './TabMenu';

const VisibilityTrackerExample = ({ apiKey }) => {
  // Use the provided API key or a placeholder
  const displayApiKey = apiKey || "YOUR_API_KEY";
  
  const componentCode = `
import React, { useEffect, useRef } from 'react';

/**
 * VisibilityTracker - A component that tracks when elements become visible in the viewport
 * 
 * Uses Intersection Observer API to efficiently detect when elements enter the viewport
 * and only sends tracking data when items are actually seen by the user.
 * 
 * @param {Object} props
 * @param {string} props.apiKey - Your Access Tracker API key
 * @param {string} props.page - The page identifier (e.g., "products", "blog")
 * @param {string} props.itemId - Item identifier for tracking specific items
 * @param {string} props.title - Human-readable title for the item
 * @param {Object} [props.data] - Optional additional data to track
 * @param {number} [props.threshold=0.5] - Visibility threshold (0-1) that triggers tracking
 * @param {boolean} [props.trackOnce=true] - Whether to track only the first time item becomes visible
 * @param {React.ReactNode} props.children - The content to render and track
 */
const VisibilityTracker = ({ 
  apiKey, 
  page, 
  itemId, 
  title, 
  data = {}, 
  threshold = 0.5,
  trackOnce = true,
  children 
}) => {
  const elementRef = useRef(null);
  const hasTracked = useRef(false);
  const observerRef = useRef(null);

  // If no API key is provided, try to use the current application's API key
  const effectiveApiKey = apiKey || "${displayApiKey}";

  useEffect(() => {
    // Skip if missing required props
    if (!effectiveApiKey || !page || !itemId) {
      console.warn('VisibilityTracker: Missing required props (apiKey, page, or itemId)');
      return;
    }

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      console.warn('VisibilityTracker: IntersectionObserver not supported in this browser');
      // Fallback to immediate tracking
      trackItemView();
      hasTracked.current = true;
      return;
    }

    // Create the intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Check if the element is intersecting (visible)
          if (entry.isIntersecting) {
            // If trackOnce is true and we've already tracked, skip
            if (trackOnce && hasTracked.current) {
              return;
            }
            
            // Track the view
            trackItemView();
            
            // Mark as tracked
            hasTracked.current = true;
            
            // If we only need to track once, unobserve the element
            if (trackOnce) {
              observerRef.current.unobserve(entry.target);
            }
          }
        });
      },
      { threshold }
    );

    // Start observing the element
    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [effectiveApiKey, page, itemId, title, threshold, trackOnce]);

  const trackItemView = async () => {
    try {
      // Prepare the payload
      const payload = {
        page,
        itemId,
        title,
        timestamp: new Date().toISOString(),
        viewType: 'visible', // Indicate this was tracked when visible
        ...data
      };

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
        console.error('VisibilityTracker: Failed to track item view');
      }
    } catch (error) {
      console.error('VisibilityTracker: Error tracking item view', error);
    }
  };

  // Wrap children in a div that we can observe
  return (
    <div ref={elementRef}>
      {children}
    </div>
  );
};

export default VisibilityTracker;
`;

  const usageExample = `
// Example usage in a product listing page

import React from 'react';
import VisibilityTracker from './VisibilityTracker';
import AccessTracker from './AccessTracker';

// Your API key from Access Tracker dashboard
const API_KEY = "${displayApiKey}";

// Product listing component
const ProductListing = ({ products }) => {
  return (
    <div className="product-listing">
      <h1>Our Products</h1>
      
      {/* Track the page view */}
      <AccessTracker
        apiKey={API_KEY}
        page="products"
        title="Products Page"
      >
        <div className="products-grid">
          {products.map(product => (
            <VisibilityTracker
              key={product.id}
              apiKey={API_KEY}
              page="products"
              itemId={product.id}
              title={product.name}
              data={{ 
                category: product.category,
                price: product.price,
                inStock: product.inStock
              }}
              threshold={0.6} // Item is considered viewed when 60% visible
              trackOnce={true} // Only track the first time it becomes visible
            >
              <div className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="price">\${product.price}</div>
                <button>Add to Cart</button>
              </div>
            </VisibilityTracker>
          ))}
        </div>
      </AccessTracker>
    </div>
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
        For more advanced use cases like product listings, blog posts, or forum threads, 
        this component only tracks items when they become visible in the viewport. This is more 
        efficient and provides more accurate data about what users actually see.
      </p>
      
      <h6 className="mt-3">How It Works</h6>
      <ul>
        <li>Uses the <strong>Intersection Observer API</strong> to detect when elements enter the viewport</li>
        <li>Only sends tracking data when items are actually visible to the user</li>
        <li>Configurable visibility threshold (e.g., track when 50% of the item is visible)</li>
        <li>Option to track only once or every time an item becomes visible</li>
        <li>Includes fallback for browsers that don't support Intersection Observer</li>
      </ul>
      
      <h6 className="mt-4">Usage Example</h6>
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
    <Card className="shadow-sm mb-4" id="advanced-component">
      <Card.Header className="bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Advanced: Visibility-Based Tracking</h5>
        <DownloadButton 
          content={componentCode.trim()} 
          filename="VisibilityTracker.js" 
        />
      </Card.Header>
      <Card.Body>
        <TabMenu tabs={tabs} defaultActiveKey="component" />
      </Card.Body>
    </Card>
  );
};

export default VisibilityTrackerExample;