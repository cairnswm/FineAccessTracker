import React from "react";
import { Card } from "react-bootstrap";

const TopPages = ({ pageTrackingData }) => {
  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title>Top Pages</Card.Title>
        {pageTrackingData && pageTrackingData.length > 0 ? (
          <ul className="list-group list-group-flush">
            {pageTrackingData
              .sort((a, b) => b.totalVisits - a.totalVisits)
              .slice(0, 5)
              .map((page, index) => {
                return (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <div>{page.title}</div>
                      <small className="text-muted">
                        <code>{page.page}</code>
                      </small>
                    </div>
                    <span className="badge bg-primary rounded-pill">
                      {page.totalVisits} visits
                    </span>
                  </li>
                );
              })}
          </ul>
        ) : (
          <Card.Text className="text-muted">
            No page tracking data available yet.
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default TopPages;
