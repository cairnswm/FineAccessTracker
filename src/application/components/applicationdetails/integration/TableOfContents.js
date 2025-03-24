import React from 'react';
import { Card } from 'react-bootstrap';

const TableOfContents = () => {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h5>Quick Navigation</h5>
        <div className="d-flex flex-wrap gap-3 mt-3">
          <a href="#how-it-works" className="btn btn-outline-primary btn-sm">How It Works</a>
          <a href="#basic-component" className="btn btn-outline-primary btn-sm">Basic Component</a>
          <a href="#advanced-component" className="btn btn-outline-primary btn-sm">Advanced Component</a>
          <a href="#manual-api" className="btn btn-outline-primary btn-sm">Manual API</a>
          <a href="#examples" className="btn btn-outline-primary btn-sm">Usage Examples</a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TableOfContents;