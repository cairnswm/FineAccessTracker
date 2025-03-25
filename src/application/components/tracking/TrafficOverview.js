import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

const TrafficOverview = ({ analytics }) => {
  const [trafficData, setTrafficData] = useState([]);

  useEffect(() => {
    if (analytics && analytics.length > 0) {
      const totalVisits = analytics.reduce((sum, data) => sum + data.totalVisits, 0);
      const dayColors = {
        Mon: 'primary',
        Tue: 'secondary',
        Wed: 'success',
        Thu: 'danger',
        Fri: 'warning',
        Sat: 'info',
        Sun: 'dark'
      };
      const processedData = analytics.map(data => {
        const date = new Date(data.visitDate);
        const dayOfWeek = date.toLocaleString('en-us', { weekday: 'short' });
        const percentage = (data.totalVisits / totalVisits) * 100;
        return {
          dayOfWeek,
          percentage,
          color: dayColors[dayOfWeek]
        };
      });
      setTrafficData(processedData);
    }
  }, [analytics]);

  if (!analytics || analytics.length === 0) {
    return <Card className="shadow-sm h-100">No Daily traffic stats found</Card>;
  }

  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title>Traffic Overview</Card.Title>
        <div className="text-center py-5">
          {/* In a real implementation, this would be a chart */}
          <div className="bg-light p-3 rounded">
            <div className="d-flex justify-content-between mb-2">
              {trafficData.map((data, index) => (
                <div key={index}>{data.dayOfWeek}</div>
              ))}
            </div>
            <div className="progress" style={{ height: '30px' }}>
              {trafficData.map((data, index) => (
                <div
                  key={index}
                  className={`progress-bar bg-${data.color}`}
                  style={{ width: `${data.percentage}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TrafficOverview;