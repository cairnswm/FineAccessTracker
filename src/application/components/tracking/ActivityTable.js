import React from 'react';
import { Table, Card } from 'react-bootstrap';
import { ClockFill } from 'react-bootstrap-icons';
import { useApplications } from '../../context/ApplicationContext';
import { getApplicationNameById } from '../../utils/applicationUtils';

const ActivityTable = ({ activities, title = "Recent Activity", showApplicationColumn = true }) => {
  const { applications } = useApplications();
  
  if (!activities || activities.length === 0) {
    return (
      <Card className="shadow-sm">
        <Card.Body className="text-center p-4">
          <ClockFill size={30} className="text-muted mb-3" />
          <h5>No Activity Data Available</h5>
          <p className="text-muted">
            Once users start interacting with your application, activity data will appear here.
          </p>
        </Card.Body>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Table responsive hover className="mt-3">
          <thead>
            <tr>
              {showApplicationColumn && <th>Application</th>}
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
                {showApplicationColumn && (
                  <td>{getApplicationNameById(applications, activity.applicationId)}</td>
                )}
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

export default ActivityTable;
