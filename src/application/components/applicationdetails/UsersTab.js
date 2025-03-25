import React, { useState } from 'react';
import { Row, Col, Card, Table, Button, Form, Alert } from 'react-bootstrap';
import { PersonPlusFill, TrashFill, SendFill, XCircleFill } from 'react-bootstrap-icons';
import { useApplicationUsers } from '../../context/ApplicationContext';
import { useAuth } from '../../../auth/context/AuthContext';
import ComingSoon from '../../../auth/components/comingsoon';

const UsersTab = ({ application }) => {
  const { user } = useAuth();
  const { 
    applicationUsers,
    applicationInvites,
    removeApplicationUser, 
    addInvite,
    getApplicationInvites,
    deleteInvite,
    updateInvite
  } = useApplicationUsers();

  console.log("==== UsersTab applicationUsers", applicationUsers);
  console.log("==== UsersTab applicationInvites", applicationInvites);
  
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('viewer');
  const [alert, setAlert] = useState(null);
    
  const handleInviteUser = (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setAlert({ type: 'danger', message: 'Please enter an email address' });
      return;
    }
    
    // Check if user is already a member
    const existingUser = applicationUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      setAlert({ type: 'warning', message: 'This user is already a member of this application' });
      return;
    }
    
    // Add invite
    addInvite({
      applicationId: application.id,
      applicationName: application.name,
      email: email.trim(),
      role,
      invitedBy: user.email
    });
    
    // Show success message
    setAlert({ type: 'success', message: `Invitation sent to ${email}` });
    
    // Reset form
    setEmail('');
    setRole('viewer');
    
    // Clear alert after 3 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  
  const handleRemoveUser = (userId) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      removeApplicationUser(userId);
    }
  };
  
  const handleCancelInvite = (inviteId) => {
    if (window.confirm('Are you sure you want to cancel this invitation?')) {
      deleteInvite(inviteId);
    }
  };
  
  const handleResendInvite = (inviteId) => {
    // Update the invite with a new timestamp to simulate resending
    updateInvite(inviteId, { invitedAt: new Date().toISOString().split('T')[0] });
    setAlert({ type: 'success', message: 'Invitation has been resent' });
    
    // Clear alert after 3 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return <ComingSoon more="You will be able to add your team to monitor your application."/>
  
  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h3>Application Users</h3>
          <p className="text-muted">Manage users who have access to this application</p>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Invite New User</h5>
              
              {alert && (
                <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
                  {alert.message}
                </Alert>
              )}
              
              <Form onSubmit={handleInviteUser}>
                <Row className="align-items-end">
                  <Col md={5}>
                    <Form.Group>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Role</Form.Label>
                      <Form.Select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="viewer">Viewer</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="w-100 d-flex align-items-center justify-content-center"
                    >
                      <PersonPlusFill className="me-2" />
                      <span>Invite User</span>
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {applicationInvites.length > 0 && (
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="mb-3">Pending Invitations</h5>
                
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Invited By</th>
                      <th>Invited On</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationInvites.map(invite => (
                      <tr key={invite.id}>
                        <td>{invite.email}</td>
                        <td>
                          <span className={`badge bg-${
                            invite.role === 'admin' ? 'danger' : 
                            invite.role === 'editor' ? 'warning' : 'info'
                          }`}>
                            {invite.role.charAt(0).toUpperCase() + invite.role.slice(1)}
                          </span>
                        </td>
                        <td>{invite.invitedBy}</td>
                        <td>{invite.invitedAt}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="d-inline-flex align-items-center me-2"
                            onClick={() => handleResendInvite(invite.id)}
                          >
                            <SendFill className="me-1" />
                            <span>Resend</span>
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="d-inline-flex align-items-center"
                            onClick={() => handleCancelInvite(invite.id)}
                          >
                            <XCircleFill className="me-1" />
                            <span>Cancel</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Active Users</h5>
              
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applicationUsers.length > 0 ? (
                    applicationUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.firstname} {user.lastname}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge bg-${
                            user.role === 'owner' ? 'dark' : 
                            user.role === 'admin' ? 'danger' : 
                            user.role === 'editor' ? 'warning' : 'info'
                          }`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>
                        <td>{user.joinedAt}</td>
                        <td>
                          {user.role !== 'owner' && (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="d-inline-flex align-items-center"
                              onClick={() => handleRemoveUser(user.id)}
                            >
                              <TrashFill className="me-1" />
                              <span>Remove</span>
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        <p className="mb-0">No users found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UsersTab;
