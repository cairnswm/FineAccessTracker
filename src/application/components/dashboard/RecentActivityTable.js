import React from 'react';
import { Card, Table } from 'react-bootstrap';

const RecentActivityTable = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>Recent Activity</Card.Title>
          <div className="text-center text-muted py-4">
            <p>No activity data available yet</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Recent Activity</Card.Title>
        <Table responsive hover className="mt-3">
          <thead>
            <tr>
              <th>Page</th>
              <th>Item</th>
              <th>Timestamp</th>
              <th>IP Address</th>
              <th>Location</th>
              <th>Device</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td><code>{activity.page}</code></td>
                <td>{activity.itemId ? <code>{activity.itemId}</code> : '-'}</td>
                <td>{activity.timestamp}</td>
                <td>{activity.ipAddress}</td>
                <td>{activity.location}</td>
                <td>{activity.device}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default RecentActivityTable;