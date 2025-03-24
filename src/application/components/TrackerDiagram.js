import React from 'react';
import { Card } from 'react-bootstrap';

const TrackerDiagram = () => {
  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <div className="text-center mb-3">
          <h4>How FineAccessTracker Works</h4>
        </div>
        <div className="mermaid-diagram">
          {`
          graph TD
            A[Your Application] -->|Embeds| B[Tracker Component]
            B -->|API Call| C[FineAccessTracker Service]
            C -->|Stores Data| D[(Analytics Database)]
            D -->|Processes| E[Dashboard]
            E -->|Displays to| F[You]
            
            style A fill:#f9f9f9,stroke:#333,stroke-width:2px
            style B fill:#d4edda,stroke:#28a745,stroke-width:2px
            style C fill:#cce5ff,stroke:#007bff,stroke-width:2px
            style D fill:#e2e3e5,stroke:#6c757d,stroke-width:2px
            style E fill:#fff3cd,stroke:#ffc107,stroke-width:2px
            style F fill:#f8d7da,stroke:#dc3545,stroke-width:2px
          `}
        </div>
        <div className="text-center mt-3">
          <small className="text-muted">Simple integration with powerful analytics</small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TrackerDiagram;