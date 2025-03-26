import React from "react";
import { Card } from "react-bootstrap";

const RecentSessions = ({ activities }) => {
  const formatTimeRange = (start, end) => {
    const pad = (n) => n.toString().padStart(2, "0");

    const format = (datetime) => {
      if (!datetime) {
        return "";
      }
      if (datetime.includes("T")) {
        const date = new Date(datetime.replace(" ", "T"));
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        return `${hours}:${minutes}`;
      }
      if (datetime.includes(" ")) {
        const date = new Date(datetime.replace(" ", " "));
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        return `${hours}:${minutes}`;
      }
      return datetime;
    };

    return `${format(start)} - ${format(end)}`;
  };

  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title>Recent Sessions</Card.Title>
        {activities && activities.length > 0 ? (
          <ul className="list-group list-group-flush">
            {activities.slice(0, 5).map((activity) => (
              <li key={activity.id} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <div>Session</div>
                  <small className="text-muted">{activity.timestamp}</small>
                </div>

                <div className="d-flex justify-content-between">
                  <small>{activity.ip_address}</small>
                  <small className="text-muted">
                    {formatTimeRange(activity.created_at, activity.modified_at)}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">
            No recent activity to display. Add the tracking component to your
            application to start collecting data.
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

export default RecentSessions;
