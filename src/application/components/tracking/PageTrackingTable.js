import React from 'react';
import { Table, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BarChartFill, ArrowRightCircle } from 'react-bootstrap-icons';
import { useItemTracking } from '../../context/ApplicationContext';

const PageTrackingTable = ({ applicationId, pageTracking, onViewItems }) => {
  const navigate = useNavigate();
  const { getItemTrackingByAppIdAndPage } = useItemTracking();
  
  // Function to check if a page has items
  const pageHasItems = (page) => {
    const items = getItemTrackingByAppIdAndPage(applicationId, page);
    return items && items.length > 0;
  };
  
  if (!pageTracking || pageTracking.length === 0) {
    return (
      <Card className="shadow-sm mb-4">
        <Card.Body className="text-center p-4">
          <BarChartFill size={30} className="text-muted mb-3" />
          <h5>No Page Tracking Data Available</h5>
          <p className="text-muted">
            Once you implement tracking on your application pages, data will appear here.
          </p>
        </Card.Body>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-light">
        <h5 className="mb-0">Page Analytics</h5>
      </Card.Header>
      <Card.Body>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Page</th>
              <th>Title</th>
              <th>Visits</th>
              <th>Unique Visitors</th>
              <th>Avg. Time on Page</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageTracking.map((page, index) => (
              <tr key={index}>
                <td><code>{page.page}</code></td>
                <td>{page.title}</td>
                <td>{page.visits}</td>
                <td>{page.uniqueVisitors}</td>
                <td>{page.avgTimeOnPage}</td>
                <td>
                  {pageHasItems(page.page) ? (
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => onViewItems(page.page)}
                      className="d-flex align-items-center"
                    >
                      <span>View Items</span>
                      <ArrowRightCircle size={14} className="ms-1" />
                    </Button>
                  ) : (
                    <span className="text-muted small">No items</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default PageTrackingTable;
