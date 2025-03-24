import React from 'react';
import { Table, Card, Button } from 'react-bootstrap';
import { TagFill, XCircleFill, ArrowLeftCircle } from 'react-bootstrap-icons';

const ItemTrackingTable = ({ applicationId, page, itemTracking, onBack }) => {
  if (!itemTracking || itemTracking.length === 0) {
    return (
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Item Analytics for: <code>{page}</code></h5>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            onClick={onBack}
            className="d-flex align-items-center"
          >
            <ArrowLeftCircle className="me-1" />
            <span>Back to Pages</span>
          </Button>
        </Card.Header>
        <Card.Body className="text-center p-4">
          <TagFill size={30} className="text-muted mb-3" />
          <h5>No Item Tracking Data Available</h5>
          <p className="text-muted">
            Once you implement item tracking on this page, data will appear here.
          </p>
        </Card.Body>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Item Analytics for: <code>{page}</code></h5>
        <Button 
          variant="outline-secondary" 
          size="sm" 
          onClick={onBack}
          className="d-flex align-items-center"
        >
          <ArrowLeftCircle className="me-1" />
          <span>Back to Pages</span>
        </Button>
      </Card.Header>
      <Card.Body>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Title</th>
              <th>Views</th>
              <th>Unique Viewers</th>
              <th>Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            {itemTracking.map((item, index) => (
              <tr key={index}>
                <td><code>{item.itemId}</code></td>
                <td>{item.title}</td>
                <td>{item.views.toLocaleString()}</td>
                <td>{item.uniqueViewers.toLocaleString()}</td>
                <td>{item.conversionRate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ItemTrackingTable;