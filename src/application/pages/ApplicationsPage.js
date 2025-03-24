import React, { useState } from 'react';
import { Row, Col, Card, Button, Table, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import { useApplications } from '../context/ApplicationContext';
import PageLayout from '../../auth/components/pagelayout';
import PageMenu from '../components/pagemenu';
import { PlusLg, PencilFill, TrashFill, EyeFill } from 'react-bootstrap-icons';

const ApplicationsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { applications, addApplication, updateApplication, deleteApplication } = useApplications();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentApp, setCurrentApp] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  
  const handleCloseModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setCurrentApp(null);
    setFormData({ name: '', description: '' });
  };
  
  const handleShowAddModal = () => {
    setFormData({ name: '', description: '' });
    setShowAddModal(true);
  };
  
  const handleShowEditModal = (app) => {
    setCurrentApp(app);
    setFormData({ name: app.name, description: app.description });
    setShowEditModal(true);
  };
  
  const handleShowDeleteModal = (app) => {
    setCurrentApp(app);
    setShowDeleteModal(true);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleAddApplication = () => {
    if (formData.name.trim() === '') return;
    
    const apiKey = `${formData.name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 10)}`;
    
    addApplication({
      name: formData.name,
      description: formData.description,
      apiKey
    });
    
    handleCloseModals();
  };
  
  const handleEditApplication = () => {
    if (formData.name.trim() === '' || !currentApp) return;
    
    updateApplication(currentApp.id, {
      name: formData.name,
      description: formData.description
    });
    
    handleCloseModals();
  };
  
  const handleDeleteApplication = () => {
    if (!currentApp) return;
    
    deleteApplication(currentApp.id);
    handleCloseModals();
  };
  
  return (
    <PageLayout>
      <PageMenu />
      <Row className="mb-4">
        <Col>
          <h1>Your Applications</h1>
          <p className="lead">Manage all your tracked applications</p>
        </Col>
        <Col xs="auto">
          <Button 
            variant="primary" 
            onClick={handleShowAddModal}
            className="d-flex align-items-center"
          >
            <PlusLg className="me-2" />
            <span>Add Application</span>
          </Button>
        </Col>
      </Row>
      
      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>API Key</th>
                <th>Created</th>
                <th>Total Visits</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map(app => (
                  <tr key={app.id}>
                    <td>{app.name}</td>
                    <td>{app.description}</td>
                    <td><code>{app.apiKey}</code></td>
                    <td>{app.createdAt}</td>
                    <td>{app.stats.totalVisits.toLocaleString()}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2 d-inline-flex align-items-center"
                        onClick={() => navigate(`/application/${app.id}`)}
                      >
                        <EyeFill />
                        <span className="ms-1">View</span>
                      </Button>
                      <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        className="me-2 d-inline-flex align-items-center"
                        onClick={() => handleShowEditModal(app)}
                      >
                        <PencilFill />
                        <span className="ms-1">Edit</span>
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        className="d-inline-flex align-items-center"
                        onClick={() => handleShowDeleteModal(app)}
                      >
                        <TrashFill />
                        <span className="ms-1">Delete</span>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <p className="mb-2">No applications found</p>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={handleShowAddModal}
                      className="d-inline-flex align-items-center"
                    >
                      <PlusLg className="me-2" />
                      <span>Add Your First Application</span>
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      {/* Add Application Modal */}
      <Modal show={showAddModal} onHide={handleCloseModals}>
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
                value={formData.name}
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
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter a brief description"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
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
      
      {/* Edit Application Modal */}
      <Modal show={showEditModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Application Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
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
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter a brief description"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleEditApplication}
            className="d-flex align-items-center"
          >
            <PencilFill className="me-2" />
            <span>Save Changes</span>
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Delete Application Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete <strong>{currentApp?.name}</strong>?</p>
          <p className="text-danger">This action cannot be undone and all tracking data will be lost.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteApplication}
            className="d-flex align-items-center"
          >
            <TrashFill className="me-2" />
            <span>Delete Application</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </PageLayout>
  );
};

export default ApplicationsPage;