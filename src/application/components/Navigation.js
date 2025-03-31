import React from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import { useAdmin } from "../../auth/hooks/useAdmin";
import {
  PersonCircle,
  StarFill,
  BarChartFill,
  EnvelopeFill,
  Link45deg,
} from "react-bootstrap-icons";
import { useApplicationUsers } from "../context/UsersContext";
import { useSummary } from "../context/SummaryContext";
import "./Navigation.css";
import { accessElf } from "../../auth/utils/accessElf";


const Navigation = () => {
  const { user, logout } = useAuth();
  const isAdmin = useAdmin();
  const navigate = useNavigate();
  const { getUserInvites } = useApplicationUsers();
  accessElf.track();

  const { isPremium } = useSummary();

  // Get pending invites count for the current user
  const pendingInvites = user ? getUserInvites(user.email) : [];
  const inviteCount = pendingInvites.length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            as={Link}
            to={user ? "/home" : "/"}
            className="d-flex align-items-center"
          >
            <BarChartFill className="me-2" />
            <span>Access Tracker</span>
          </Navbar.Brand>
          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {user ? (
                <NavDropdown
                  title={
                    <div className="d-inline-flex align-items-center">
                      {isPremium ? (
                        <StarFill
                          size={20}
                          className="me-1"
                          style={{ color: "gold" }}
                        />
                      ) : (
                        <PersonCircle size={20} className="me-1" />
                      )}
                      <span>{user.firstname || "User"}</span>
                    </div>
                  }
                  id="user-dropdown"
                  align="end"
                  className="nav-dropdown-fix"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item as={Link} to="/invites">
                  Invites
                  {inviteCount > 0 && (
                    <Badge bg="danger" pill className="ms-2">
                      {inviteCount}
                    </Badge>
                  )}
                </NavDropdown.Item>
                {isAdmin && (
                  <NavDropdown.Item as={Link} to="/admin">
                    Admin
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item as={Link} to="/settings">
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/properties">
                  Properties
                </NavDropdown.Item> */}
                  <NavDropdown.Item as={Link} to="/subscriptions">
                    Subscriptions
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item as={Link} to="/comingsoon">
                  Coming Soon
                </NavDropdown.Item> */}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
