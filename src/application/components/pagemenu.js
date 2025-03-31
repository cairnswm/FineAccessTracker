import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import "./pagemenu.css";

const PageMenu = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Helper function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  return (
    <Navbar bg="dark" variant="dark" className="page-menu mb-4">
      <Container>
        <Nav className="me-auto">
          {user ? (
            // Menu for logged-in users
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
                to="/links" 
                className={location.pathname === "/links" ? "active" : ""}
              >
                Links
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
            // Menu for non-logged-in users
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
      </Container>
    </Navbar>
  );  
}

export default PageMenu;