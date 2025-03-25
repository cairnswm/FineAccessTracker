import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import { useApplications } from '../context/ApplicationContext';
import PageLayout from '../../auth/components/pagelayout';
import PageMenu from '../components/pagemenu';
import { PlusLg, PencilFill, TrashFill, EyeFill } from 'react-bootstrap-icons';
import AddApplicationModal from '../components/AddApplicationModal';

const ApplicationsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    applications, 
    addApplication, 
    updateApplication, 
    deleteApplication, 
    setActiveApplicationId
  } = useApplications();
  
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentApp, setCurrentApp] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  
  useEffect(() => {
    // Set the first application as active when the page loads
    if (applications.length > 0) {
      setActiveApplicationId(applications[0].id);
    }
  }, [applications, setActiveApplicationId]);
  
  const handleCloseModals = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setCurrentApp(null);
    setFormData({ name: '', description: '' });
    setIsEditMode(false);
  };
  
  const handleShowAddModal = () => {
    setFormData({ name: '', description: '' });
    setShowModal(true);
    setIsEditMode(false);
  };
  
  const handleShowEditModal = (app) => {
    setCurrentApp(app);
    setFormData({ name: app.name, description: app.description });
    setShowModal(true);
    setIsEditMode(true);
  };
  
  const handleShowDeleteModal = (app) => {
    setCurrentApp(app);
    setShowDeleteModal(true);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSaveApplication = () => {
    if (formData.name.trim() === '') return;

    if (isEditMode && currentApp) {
      updateApplication(currentApp.id, {
        name: formData.name,
        description: formData.description
      });
    } else {
      const apiKey = `${formData.name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 10)}`;
      const newApp = addApplication({
        name: formData.name,
        description: formData.description,
        apiKey
      });
      setActiveApplicationId(newApp.id);
    }

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
                    <td>{app.totalVisits}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2 d-inline-flex align-items-center"
                        onClick={() => {
                          setActiveApplicationId(app.id);
                          navigate(`/application/${app.id}`);
                        }}
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
      
      {/* Add/Edit Application Modal */}
      <AddApplicationModal 
        show={showModal} 
        handleClose={handleCloseModals} 
        formData={formData} 
        handleInputChange={handleInputChange} 
        handleSaveApplication={handleSaveApplication} 
        isEditMode={isEditMode}
      />
      
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
