import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import { useApplications } from '../context/ApplicationContext';
import PageLayout from '../../auth/components/pagelayout';
import PageMenu from '../components/pagemenu';
import ApplicationCard from '../components/ApplicationCard';
import { PlusLg } from 'react-bootstrap-icons';
import AddApplicationModal from '../components/AddApplicationModal';
import './HomePage.css';
import { accessElf } from '../functions/accessElf';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { applications, addApplication, setActiveApplicationId } = useApplications();
  accessElf.track("home");
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: '', description: '' });
  };

  const handleShowModal = () => {
    setFormData({ name: '', description: '' });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveApplication = async () => {
    if (formData.name.trim() === '') return;
    
    const apiKey = `${formData.name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 10)}`;
    
    const newApp = await addApplication({
      name: formData.name,
      description: formData.description
    });
    
    setActiveApplicationId(newApp.id);
    handleCloseModal();
    navigate(`/application/${newApp.id}`);
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
            onClick={handleShowModal}
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
            <Col md={6} lg={4} key={app.id}>
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
                  onClick={handleShowModal}
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
      
      <AddApplicationModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        formData={formData} 
        handleInputChange={handleInputChange} 
        handleSaveApplication={handleSaveApplication} 
        isEditMode={false}
      />
    </PageLayout>
  );
};

export default HomePage;