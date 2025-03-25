import React from 'react';
import { Container } from 'react-bootstrap';
import PageLayout from '../../auth/components/pagelayout';
import PageMenu from '../components/pagemenu';
import IntegrationTab from '../components/applicationdetails/IntegrationTab';
import TrackingInformation from '../components/documentation/TrackingInformation';
import AccessTracker from '../../application/components/integration/AccessTracker';

const DocumentationPage = () => {
  // Example API key for documentation purposes
  const exampleApiKey = "example-api-key-12345";
  
  return (
    <PageLayout>
      
      <AccessTracker page="documentation" />
      <PageMenu />
      <Container>
        <h1 className="mb-4">Documentation</h1>
        <p className="lead mb-4">
          Learn how to integrate Access Tracker into your applications. 
          The examples below use a sample API key for demonstration purposes.
        </p>
        
        <TrackingInformation />
        
        <IntegrationTab apiKey={exampleApiKey} />
      </Container>
    </PageLayout>
  );
};

export default DocumentationPage;