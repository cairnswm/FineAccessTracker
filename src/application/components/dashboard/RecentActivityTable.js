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
  
  console.log("Recent Activities", activities);
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
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td><code>{activity.page !== ""? activity.page : "<site>"}</code></td>
                <td>{activity.item_id ? <code>{activity.item_id}</code> : '-'}</td>
                <td>{activity.modified_at}</td>
                <td>{activity.ip_address}</td>
                <td>{activity.country_name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default RecentActivityTable;