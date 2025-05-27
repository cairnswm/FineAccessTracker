import React from "react";
import { Row, Col, Image } from "react-bootstrap";

const HowItWorksSection = () => {
  return (
    <Row className="py-5 bg-light rounded mt-4">
      <Col xs={12}>
        <h2 className="text-center mb-4">How It Works</h2>
      </Col>
      <Col md={10} className="mx-auto">
        <Row className="g-4">
          <Col md={4}>
            <div className="text-center">
              <div
                className="bg-primary text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
                style={{ width: "60px", height: "60px" }}
              >
                <span className="fs-4">1</span>
              </div>
              <h4>Add Our Component</h4>
              <p>
                Drop our tracking component into your application with minimal
                code.
              </p>
              <p>
                <em>
                  <small>A library coming soon</small>
                </em>
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              <div
                className="bg-primary text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
                style={{ width: "60px", height: "60px" }}
              >
                <span className="fs-4">2</span>
              </div>
              <h4>Configure API Key</h4>
              <p>
                Add your unique API key to securely track your application
                usage.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              <div
                className="bg-primary text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
                style={{ width: "60px", height: "60px" }}
              >
                <span className="fs-4">3</span>
              </div>
              <h4>View Analytics</h4>
              <p>
                Access your dashboard to view comprehensive usage statistics.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              <div
                className="bg-primary text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
                style={{ width: "60px", height: "60px" }}
              >
                <span className="fs-4">4</span>
              </div>
              <h4>Data Security</h4>
              <p>
                Data is stored on South African-based servers, outside of the
                USA and Europe. Sessions are tracked by IP address only—no other
                personal information is stored. No cookies are stored on the end
                user's machine.
              </p>
            </div>
          </Col>
          <Col xs={12}>
            <Image src="applications.png" alt="Applications List" fluid />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default HowItWorksSection;
