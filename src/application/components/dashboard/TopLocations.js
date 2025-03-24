import React from 'react';
import { Card } from 'react-bootstrap';

const TopLocations = ({ applicationId }) => {
  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title>Top Locations</Card.Title>
        <ul className="list-group list-group-flush mt-3">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            United States
            <span className="badge bg-primary rounded-pill">45%</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            United Kingdom
            <span className="badge bg-primary rounded-pill">20%</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Canada
            <span className="badge bg-primary rounded-pill">15%</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Australia
            <span className="badge bg-primary rounded-pill">10%</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Germany
            <span className="badge bg-primary rounded-pill">5%</span>
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
};

export default TopLocations;