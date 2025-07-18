import React from 'react';
import { Card } from 'react-bootstrap';
import DownloadButton from './DownloadButton';

const AccessTrackerExample = ({ apiKey }) => {
  const displayApiKey = apiKey || "YOUR_API_KEY";

  const componentCode = `
<!-- Include AccessElf script in your index.html -->
<script src="https://accesself.co.za/accesself.js"></script>
<script>
  // Set your API key once loaded
  AccessElf.setApiKey('${displayApiKey}');
</script>
`;

  const componentContent = (
    <pre className="bg-light p-3 rounded">
      <code>{componentCode}</code>
    </pre>
  );

  return (
    <Card className="shadow-sm mb-4" id="basic-component">
      <Card.Header className="bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Integration into index.html</h5>
        <DownloadButton content={componentCode.trim()} filename="accessElf.html" />
      </Card.Header>
      <Card.Body>{componentContent}</Card.Body>
    </Card>
  );
};

export default AccessTrackerExample;