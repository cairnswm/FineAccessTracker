import React, { useState } from 'react';
import { Row, Col, Card, Table, Button, Alert } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApplications } from '../../application/context/ApplicationContext';
import AccessTracker from '../../application/components/integration/AccessTracker';
import PageLayout from '../components/pagelayout';

const InvitesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    getUserInvites, 
    acceptInvite, 
    rejectInvite 
  } = useApplications();
  
  const [alert, setAlert] = useState(null);
  
  // Get pending invites for the current user
  const pendingInvites = getUserInvites(user.email);
  
  const handleAcceptInvite = (inviteId) => {
    acceptInvite(inviteId, {
      userId: user.id,
      name: `${user.firstname} ${user.lastname || ''}`.trim()
    });
    
    setAlert({
      type: 'success',
      message: 'Invitation accepted successfully!'
    });
    
    // Clear alert after 3 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  
  const handleRejectInvite = (inviteId) => {
    rejectInvite(inviteId);
    
    setAlert({
      type: 'info',
      message: 'Invitation rejected'
    });
    
    // Clear alert after 3 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  
  return (
    <PageLayout>
      
      <AccessTracker page="invitations" />
      <Row className="mb-4">
        <Col>
          <h1>Application Invites</h1>
          <p className="lead">Manage invitations to collaborate on applications</p>
        </Col>
      </Row>
      
      {alert && (
        <Row className="mb-4">
          <Col>
            <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
              {alert.message}
            </Alert>
          </Col>
        </Row>
      )}
      
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Pending Invitations</h5>
              
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Application</th>
                    <th>Role</th>
                    <th>Invited By</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingInvites.length > 0 ? (
                    pendingInvites.map(invite => (
                      <tr key={invite.id}>
                        <td>{invite.applicationName}</td>
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
                            variant="outline-success"
                            size="sm"
                            className="me-2 d-inline-flex align-items-center"
                            onClick={() => handleAcceptInvite(invite.id)}
                          >
                            <CheckCircleFill className="me-1" />
                            <span>Accept</span>
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="d-inline-flex align-items-center"
                            onClick={() => handleRejectInvite(invite.id)}
                          >
                            <XCircleFill className="me-1" />
                            <span>Reject</span>
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        <p className="mb-0">No pending invitations</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default InvitesPage;
