import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { PlusLg, PencilFill } from 'react-bootstrap-icons';

const AddApplicationModal = ({ show, handleClose, formData, handleInputChange, handleSaveApplication, isEditMode }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{isEditMode ? 'Edit Application' : 'Add New Application'}</Modal.Title>
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
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button 
        variant="primary" 
        onClick={handleSaveApplication}
        className="d-flex align-items-center"
      >
        {isEditMode ? <PencilFill className="me-2" /> : <PlusLg className="me-2" />}
        <span>{isEditMode ? 'Save Changes' : 'Add Application'}</span>
      </Button>
    </Modal.Footer>
  </Modal>
);

export default AddApplicationModal;