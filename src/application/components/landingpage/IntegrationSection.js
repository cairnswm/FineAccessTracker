import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const IntegrationSection = () => {
  const apiKey = "example-api-key-12345";

  const spaIntegrationCode = `
<script src="https://accesself.co.za/accesself.js"></script>
<script>
  // Set your API key once loaded
  AccessElf.setApiKey('YOUR_API_KEY_HERE');
</script>
`;

  return (
    <Row className="py-4">
      <Col xs={12}>
        <h2 className="text-center mb-4">Easy to Integrate</h2>
        <p className="text-center mb-4">
          Just add our component to your application and you're ready to go.
        </p>
      </Col>
      <Col md={10} className="mx-auto">
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Integration for SPA Applications</Card.Title>
            <Card.Text>
              Use the following code snippet to integrate AccessElf into your Single Page Application (SPA):
            </Card.Text>
            <pre className="bg-dark text-light p-3 rounded" style={{ overflowX: 'auto' }}>
              <code>{spaIntegrationCode}</code>
            </pre>
            <Card.Text className="mt-3">
              For non-SPA applications, detailed documentation is available to guide you through the integration process.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default IntegrationSection;