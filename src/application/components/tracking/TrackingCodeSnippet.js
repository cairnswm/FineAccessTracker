import React, { useState } from 'react';
import { Card, Nav, Tab, Button } from 'react-bootstrap';
import { CodeSlash, Check2 } from 'react-bootstrap-icons';

const TrackingCodeSnippet = ({ apiKey, trackingType }) => {
  const [copied, setCopied] = useState(false);
  
  const reactCode = `
// React Example using accessElf.js
import { useEffect } from 'react';
import { accessElf } from './accessElf'; // adjust path as needed

function App() {
  useEffect(() => {
    accessElf.setApiKey("${apiKey}");
    accessElf.track("home"); // replace "home" with actual page name

    ${trackingType === 'item' ? 'accessElf.track("product", "1234");' : ''}
  }, []);

  return (
    <div className="App">
      {/* Your app content */}
    </div>
  );
}
`;

  const htmlCode = `
<!-- HTML Example using window.accessElf -->
<script src="https://yourcdn.com/accessElf.min.js"></script>
<script>
  window.accessElf.setApiKey("${apiKey}");
  window.accessElf.track("home"); // replace "home" with your page name

  ${trackingType === 'item' ? 'window.accessElf.track("product", "1234");' : ''}
</script>
`;

  const jsCode = `
// JavaScript Example using accessElf.js
import { accessElf } from './accessElf'; // adjust path

accessElf.setApiKey("${apiKey}");
accessElf.track("home");

${trackingType === 'item' ? 'accessElf.track("product", "1234");' : ''}`;

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Integration Code</Card.Title>
        <Tab.Container defaultActiveKey="react">
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="react">React</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="html">HTML</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="js">JavaScript</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="react">
              <div className="position-relative">
                <pre className="bg-dark text-light p-3 rounded" style={{ overflowX: 'auto' }}>
                  <code>{reactCode}</code>
                </pre>
                <Button 
                  variant={copied ? "success" : "light"} 
                  size="sm" 
                  className="position-absolute top-0 end-0 m-2"
                  onClick={() => copyToClipboard(reactCode)}
                >
                  {copied ? <><Check2 /> Copied</> : <><CodeSlash /> Copy</>}
                </Button>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="html">
              <div className="position-relative">
                <pre className="bg-dark text-light p-3 rounded" style={{ overflowX: 'auto' }}>
                  <code>{htmlCode}</code>
                </pre>
                <Button 
                  variant={copied ? "success" : "light"} 
                  size="sm" 
                  className="position-absolute top-0 end-0 m-2"
                  onClick={() => copyToClipboard(htmlCode)}
                >
                  {copied ? <><Check2 /> Copied</> : <><CodeSlash /> Copy</>}
                </Button>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="js">
              <div className="position-relative">
                <pre className="bg-dark text-light p-3 rounded" style={{ overflowX: 'auto' }}>
                  <code>{jsCode}</code>
                </pre>
                <Button 
                  variant={copied ? "success" : "light"} 
                  size="sm" 
                  className="position-absolute top-0 end-0 m-2"
                  onClick={() => copyToClipboard(jsCode)}
                >
                  {copied ? <><Check2 /> Copied</> : <><CodeSlash /> Copy</>}
                </Button>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
};

export default TrackingCodeSnippet;
