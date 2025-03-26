import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

const TopLocations = ({ analytics }) => {
  const [option, setOption] = useState("ip_today");
  const [analyticsToDisplay, setAnalyticsToDisplay] = useState([]);

  useEffect(() => {
    const display = [...analytics].filter(
      (location) => location[option] > 0
    );
    let sorted = [...display].sort((a, b) => b[option] - a[option]);
    setAnalyticsToDisplay(sorted);
  }, [analytics, option]);

  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title>Top Locations</Card.Title>
        <Button variant={option === "ip_last_30_days" ? "primary": "outline-primary"} size="sm" onClick={()=>setOption("ip_last_30_days")}>30 days</Button>
        <Button variant={option === "ip_last_7_days" ? "primary": "outline-primary"} size="sm" onClick={()=>setOption("ip_last_7_days")}>7 days</Button>
        <Button variant={option === "ip_yesterday" ? "primary": "outline-primary"} size="sm" onClick={()=>setOption("ip_yesterday")}>Yesterday</Button>
        <Button variant={option === "ip_today" ? "primary": "outline-primary"} size="sm" onClick={()=>setOption("ip_today")}>Today</Button>
        <ul className="list-group list-group-flush mt-3">
          {analyticsToDisplay && analyticsToDisplay.slice(0,5).map((location, index) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={index}
            >
              {location.country_name}
              <span className="badge bg-primary rounded-pill">
                {location[option]} visits
              </span>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default TopLocations;
