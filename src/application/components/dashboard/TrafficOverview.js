import React from 'react';
import { Card } from 'react-bootstrap';

const TrafficOverview = ({ applicationId }) => {
  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title>Traffic Overview</Card.Title>
        <div className="text-center py-5">
          {/* In a real implementation, this would be a chart */}
          <div className="bg-light p-3 rounded">
            <div className="d-flex justify-content-between mb-2">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>
            <div className="progress" style={{ height: '30px' }}>
              <div className="progress-bar" style={{ width: '15%' }}></div>
              <div className="progress-bar bg-success" style={{ width: '20%' }}></div>
              <div className="progress-bar bg-info" style={{ width: '10%' }}></div>
              <div className="progress-bar bg-warning" style={{ width: '25%' }}></div>
              <div className="progress-bar bg-danger" style={{ width: '15%' }}></div>
              <div className="progress-bar bg-secondary" style={{ width: '8%' }}></div>
              <div className="progress-bar bg-dark" style={{ width: '7%' }}></div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TrafficOverview;