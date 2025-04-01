import React from "react";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import { House, FileText, InfoCircle, App, Link45deg } from "react-bootstrap-icons";
import useIsMobile from "../../application/hooks/useIsMobile";
import "./pagemenu.css";

const PageMenu = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const isLocalHost = window.location.hostname === "localhost";

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <Navbar bg="dark" variant="dark" className="page-menu mb-4">
      <Container>
        {isMobile ? (
          <Row className="w-100 text-center">
            <Col>
              <Nav.Link
                as={Link}
                to="/home"
                className={isActive("/home") ? "active" : ""}
              >
                <House size={24} color="white" />
              </Nav.Link>
            </Col>
            <Col>
              <Nav.Link
                as={Link}
                to="/applications"
                className={isActive("/applications") ? "active" : ""}
              >
                <App size={24} color="white" />
              </Nav.Link>
            </Col>
              <Col>
                <Nav.Link
                  as={Link}
                  to="/campaigns"
                  className={location.pathname === "/campaigns" ? "active" : ""}
                >
                  <Link45deg size={24} color="white" />
                </Nav.Link>
              </Col>
            <Col>
              <Nav.Link
                as={Link}
                to="/documentation"
                className={isActive("/documentation") ? "active" : ""}
              >
                <FileText size={24} color="white" />
              </Nav.Link>
            </Col>
            <Col>
              <Nav.Link
                as={Link}
                to="/about"
                className={isActive("/about") ? "active" : ""}
              >
                <InfoCircle size={24} color="white" />
              </Nav.Link>
            </Col>
          </Row>
        ) : (
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/home"
                  className={isActive("/home") ? "active" : ""}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/applications"
                  className={isActive("/applications") ? "active" : ""}
                >
                  Applications
                </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/campaigns"
                    className={location.pathname === "/campaigns" ? "active" : ""}
                  >
                    Campaigns
                  </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/documentation"
                  className={isActive("/documentation") ? "active" : ""}
                >
                  Documentation
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/about"
                  className={isActive("/about") ? "active" : ""}
                >
                  About
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/"
                  className={location.pathname === "/" ? "active" : ""}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/documentation"
                  className={isActive("/documentation") ? "active" : ""}
                >
                  Documentation
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/about"
                  className={isActive("/about") ? "active" : ""}
                >
                  About
                </Nav.Link>
              </>
            )}
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default PageMenu;
