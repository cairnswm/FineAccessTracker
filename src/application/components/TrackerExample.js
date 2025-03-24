import React from 'react';
import { Card, Tab, Nav } from 'react-bootstrap';

const TrackerExample = () => {
  const reactCode = `// React Component Example
import { FineTracker } from '@fine/access-tracker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Application</h1>
      </header>
      <main>
        {/* Your app content */}
      </main>
      
      {/* FineAccessTracker - invisible component */}
      <FineTracker 
        apiKey="your-api-key-here" 
        trackPageViews={true}
        trackUserLocation={true}
      />
    </div>
  );
}`;

  const htmlCode = `<!-- HTML Example -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <script src="https://cdn.fineaccesstracker.com/tracker.min.js"></script>
</head>
<body>
  <h1>My Website</h1>
  
  <!-- Your website content -->
  
  <script>
    // Initialize FineAccessTracker
    FineTracker.init({
      apiKey: 'your-api-key-here',
      trackPageViews: true,
      trackUserLocation: true
    });
  </script>
</body>
</html>`;

  const vueCode = `<!-- Vue Component Example -->
<template>
  <div id="app">
    <header>
      <h1>My Vue Application</h1>
    </header>
    <main>
      <!-- Your app content -->
    </main>
    
    <!-- FineAccessTracker component -->
    <FineTracker 
      :apiKey="apiKey"
      :trackPageViews="true"
      :trackUserLocation="true"
    />
  </div>
</template>

<script>
import { FineTracker } from '@fine/access-tracker-vue';

export default {
  name: 'App',
  components: {
    FineTracker
  },
  data() {
    return {
      apiKey: 'your-api-key-here'
    }
  }
}
</script>`;

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Integration Examples</Card.Title>
        <Tab.Container defaultActiveKey="react">
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="react">React</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="html">HTML</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="vue">Vue</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="react">
              <pre className="bg-dark text-light p-3 rounded" style={{ overflowX: 'auto' }}>
                <code>{reactCode}</code>
              </pre>
            </Tab.Pane>
            <Tab.Pane eventKey="html">
              <pre className="bg-dark text-light p-3 rounded" style={{ overflowX: 'auto' }}>
                <code>{htmlCode}</code>
              </pre>
            </Tab.Pane>
            <Tab.Pane eventKey="vue">
              <pre className="bg-dark text-light p-3 rounded" style={{ overflowX: 'auto' }}>
                <code>{vueCode}</code>
              </pre>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
};

export default TrackerExample;