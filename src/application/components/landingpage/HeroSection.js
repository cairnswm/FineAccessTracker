import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/context/AuthContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <Row className="hero-section text-center rounded">
      <Col md={8} className="mx-auto">
        <h1 className="display-4 fw-bold mb-3">
          Track Your Application Usage with Ease
        </h1>
        <p className="lead mb-4">Know what your users are doing – instantly</p>
        <p className="lead mb-4">
          Access Tracker provides simple, easy to use analytics for your web
          applications. Drop in our lightweight component and start tracking
          user access instantly.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
          <Button
            variant="light"
            size="lg"
            onClick={handleGetStarted}
            className="px-4 me-sm-3"
          >
            Get Started for Free
          </Button>
        </div>
        <div
          className="lead p-4 code rounded"
          style={{ backgroundColor: "black" }}
        >
          track('pageview', 'home');
        </div>
        <Row className="py-4">
          <Col xs={6}>
            <Image src="applications.png" alt="Home Page" fluid />
          </Col>
          
          <Col xs={6}>
            <Image src="dashboard.png" alt="ApplicationDashboard" fluid />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default HeroSection;
