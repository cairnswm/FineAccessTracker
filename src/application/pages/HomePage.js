import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import { useApplications } from '../context/ApplicationContext';
import PageLayout from '../../auth/components/pagelayout';
import PageMenu from '../components/pagemenu';
import ApplicationCard from '../components/ApplicationCard';
import { PlusLg } from 'react-bootstrap-icons';
import './HomePage.css';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { applications, addApplication } = useApplications();
  
  const [showModal, setShowModal] = useState(false);
  const [newApp, setNewApp] = useState({ name: '', description: '' });
  
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewApp({ ...newApp, [name]: value });
  };
  
  const handleAddApplication = () => {
    if (newApp.name.trim() === '') return;
    
    const apiKey = `${newApp.name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 10)}`;
    
    const application = addApplication({
      name: newApp.name,
      description: newApp.description,
      apiKey
    });
    
    setNewApp({ name: '', description: '' });
    handleClose();
    navigate(`/application/${application.id}`);
  };
  
  return (
    <PageLayout>
      <PageMenu />
      <Row className="mb-4">
        <Col>
          <h1>Welcome to Access Tracker, {user?.firstname || 'User'}!</h1>
          <p className="lead">Manage and monitor your applications</p>
        </Col>
        <Col xs="auto">
          <Button 
            variant="primary" 
            onClick={handleShow}
            className="d-flex align-items-center"
          >
            <PlusLg className="me-2" />
            <span>Add Application</span>
          </Button>
        </Col>
      </Row>
      
      <Row className="g-4">
        {applications.length > 0 ? (
          applications.map(app => (
            <Col md={4} key={app.id}>
              <ApplicationCard application={app} />
            </Col>
          ))
        ) : (
          <Col md={12}>
            <Card className="text-center p-5">
              <Card.Body>
                <h3>No Applications Yet</h3>
                <p>Add your first application to start tracking usage.</p>
                <Button 
                  variant="primary" 
                  onClick={handleShow}
                  className="d-flex align-items-center mx-auto"
                >
                  <PlusLg className="me-2" />
                  <span>Add Application</span>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
      
      {/* Add Application Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Application Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newApp.name}
                onChange={handleInputChange}
                placeholder="Enter application name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={newApp.description}
                onChange={handleInputChange}
                placeholder="Enter a brief description"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddApplication}
            className="d-flex align-items-center"
          >
            <PlusLg className="me-2" />
            <span>Add Application</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </PageLayout>
  );
};

export default HomePage;