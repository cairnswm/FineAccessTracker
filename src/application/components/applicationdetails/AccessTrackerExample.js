import React from 'react';
import { Card } from 'react-bootstrap';
import DownloadButton from './DownloadButton';
import TabMenu from './integration/TabMenu';

const AccessTrackerExample = ({ apiKey }) => {
  // Use the provided API key or a placeholder
  const displayApiKey = apiKey || "YOUR_API_KEY";
  
  const componentCode = `
let accessElfApikey = "";
const accessElfTrackerUrl = "https://accesself.co.za/php/api/track.php";

export const setApiKey = (key) => {
  accessElfApikey = key;
};

const accessElfDebounceMap = new Map();

const sendAccessElfTracking = (page, id, message) => {
  
  const key = page + "-" + id + "-" + message;
  const payload = {
    page,
    id,
  };
  if (message) {
    payload.error = message;
  }

  if (accessElfDebounceMap.has(key)) {
    clearTimeout(accessElfDebounceMap.get(key));
  }

  accessElfDebounceMap.set(key, setTimeout(() => {
    fetch(accessElfTrackerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: accessElfApikey,
      },
      body: JSON.stringify(payload),
    });
    accessElfDebounceMap.delete(key);
  }, 800));
};

export const track = (page, id) => {
  sendAccessElfTracking(page, id);
};

export const error = (page, id, message) => {
  sendAccessElfTracking(page, id, message);
};

export const accessElf = {
  track,
  error,
  setApiKey,
  apiKey: accessElfApikey,
}
`;

  const usageExample = `
// Example usage in your application

import React from 'react';
import {accessElf} from './accessElf';

// Your API key from Access Tracker dashboard
const API_KEY = "YourApplicationApiKey";
accessElf.setApiKey(API_KEY);

// Example product component
const ProductDetail = ({ product }) => {
  accessElf.track("product", product.id);
  return (
      <div className="product-detail">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <div className="price">\${product.price}</div>
        <button>Add to Cart</button>
      </div>
  );
};

// Example page component
const ProductsPage = ({ products }) => {
  accessElf.track("products");
  return (
      <div className="products-page">
        <h1>Our Products</h1>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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
          filename="accessElf.js" 
        />
      </Card.Header>
      <Card.Body>
        <TabMenu tabs={tabs} defaultActiveKey="component" />
      </Card.Body>
    </Card>
  );
};

export default AccessTrackerExample;