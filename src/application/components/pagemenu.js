import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./pagemenu.css";

const PageMenu = () => {
  const location = useLocation();
  
  // Helper function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  return (
    <Navbar bg="dark" variant="dark" className="page-menu mb-4">
      <Container>
        <Nav className="me-auto">
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
            to="/dashboard" 
            className={isActive("/dashboard") ? "active" : ""}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to="/profile" 
            className={isActive("/profile") ? "active" : ""}
          >
            Profile
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );  
}

export default PageMenu;