import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/context/AuthContext";

const WhySection = () => {
  return (
    <>
      <Row className="py-3">
        <Col xs={12}>
          <h2 className="text-center mb-4">Why Did We Develop This?</h2>
        </Col>
      </Row>
      <Row className="g-4 mb-5">
        <Col>
          <Card className="h-100 shadow-sm benefit-card">
            <Card.Body className="text-center p-4">
                <div>
                  As developers building our own SaaS projects, we kept running
                  into the same frustrating question:
                </div>

                <div  className="text-center p-4">
                  <strong>“Is anyone actually using this?”</strong>
                </div>

                <div className="text-start mt-3">
                  <p>
                    Sure, there are big analytics tools out there—but they’re
                    often bloated, expensive, and packed with features we didn’t
                    need. We just wanted to know the basics:
                  </p>
                  <ul>
                    <li>Are people visiting our site?</li>

                    <li>What pages are they seeing?</li>

                    <li>Are they interacting with the features we’ve built?</li>
                  </ul>

                  <p>
                    So we built Access Tracker—a lightweight, privacy-friendly
                    way to track real usage on your app or site. It’s designed
                    for early-stage SaaS founders who want clarity without
                    complexity. No invasive tracking, no guessing, just simple,
                    actionable insights that help you decide what to build next.
                  </p>

                  <p>
                    If you're launching something new, Access Tracker helps you
                    find out what’s working—and what’s not—so you can grow
                    smarter.
                  </p>
                </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default WhySection;
