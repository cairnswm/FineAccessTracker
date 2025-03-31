import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CampaignModal = ({ 
  show, 
  onHide, 
  formData, 
  handleInputChange, 
  handleSubmit, 
  applications, 
  isEditing 
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit Campaign" : "Add New Campaign"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Campaign Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Application</Form.Label>
            <Form.Select
              name="application_id"
              value={formData.application_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Application</option>
              {applications.map(app => (
                <option key={app.id} value={app.id}>{app.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? "Update Campaign" : "Create Campaign"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CampaignModal;
