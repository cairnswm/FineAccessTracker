import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TrafficOverview = ({ analytics }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (analytics && analytics.length > 0) {
      const totalVisits = analytics.reduce((sum, data) => sum + data.totalVisits, 0);
      const dayColors = {
        Mon: '#007bff',
        Tue: '#6c757d',
        Wed: '#28a745',
        Thu: '#dc3545',
        Fri: '#ffc107',
        Sat: '#17a2b8',
        Sun: '#343a40'
      };

      const labels = analytics.map(data => {
        const date = new Date(data.visitDate);
        return date.toLocaleString('en-us', { weekday: 'short' });
      });

      const data = analytics.map(data => data.totalVisits);

      const backgroundColors = labels.map(label => dayColors[label]);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Total Visits',
            data,
            backgroundColor: backgroundColors
          }
        ]
      });
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
          {chartData && (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top'
                  },
                  title: {
                    display: true,
                    text: 'Daily Traffic Overview'
                  }
                }
              }}
            />
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TrafficOverview;