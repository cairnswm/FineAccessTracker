import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Clipboard } from 'react-bootstrap-icons';

const HowItWorks = ({ apiKey }) => {
  const [copied, setCopied] = useState(false);
  const displayApiKey = apiKey || "YOUR_API_KEY";

  const integrationCode = `
<!-- Include AccessElf script in your index.html -->
<script src="https://accesself.co.za/accesself.js"></script>
<script>
  // Set your API key once loaded
  AccessElf.setApiKey('${displayApiKey}');
</script>
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(integrationCode.trim()).then(() => {
      setCopied(true);
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <Card className="shadow-sm" id="how-it-works">
      <Card.Header className="bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Integration Code</h5>
        <Button variant="outline-primary" size="sm" onClick={copyToClipboard} disabled={copied}>
          {copied ? 'Copied' : <><Clipboard /> Copy</>}
        </Button>
      </Card.Header>
      <Card.Body>
        <pre className="bg-light p-3 rounded">
          <code>{integrationCode.trim()}</code>
        </pre>
      </Card.Body>
    </Card>
  );
};

export default HowItWorks;