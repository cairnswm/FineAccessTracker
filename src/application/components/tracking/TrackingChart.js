import React from 'react';
import { Card } from 'react-bootstrap';

const TrackingChart = ({ title, data, type = 'bar' }) => {
  // In a real implementation, this would use a charting library like Chart.js or Recharts
  // For this mock, we'll create a simple visual representation
  
  // Handle empty data array to avoid Math.max returning -Infinity
  const maxValue = data && data.length > 0 
    ? Math.max(...data.map(item => item.value))
    : 0;
  
  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {data && data.length > 0 ? (
          <div className="chart-container mt-3">
            {data.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="d-flex justify-content-between mb-1">
                  <span>{item.label}</span>
                  <span>{item.value.toLocaleString()}</span>
                </div>
                <div className="progress">
                  <div 
                    className="progress-bar bg-primary" 
                    role="progressbar" 
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                    aria-valuenow={item.value} 
                    aria-valuemin="0" 
                    aria-valuemax={maxValue}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted py-4">
            <p>No data available to display</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TrackingChart;