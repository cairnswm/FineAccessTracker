import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const LinkModal = ({ 
  show, 
  onHide, 
  formData, 
  handleInputChange, 
  handleSubmit, 
  campaigns, 
  isEditing, 
  selectedCampaignId 
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit Link" : "Add New Link"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {!selectedCampaignId && (
            <Form.Group className="mb-3">
              <Form.Label>Campaign</Form.Label>
              <Form.Select
                name="campaign_id"
                value={formData.campaign_id || ""}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Campaign</option>
                {campaigns.map(campaign => (
                  <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Short Code</Form.Label>
            <Form.Control
              type="text"
              name="short_code"
              value={formData.short_code}
              onChange={handleInputChange}
              required
            />
            <Form.Text className="text-muted">
              This will be the unique identifier for your link (e.g., "summer-sale")
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Destination URL</Form.Label>
            <Form.Control
              type="url"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Expiration Date (Optional)</Form.Label>
            <Form.Control
              type="date"
              name="expires_at"
              value={formData.expires_at}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? "Update Link" : "Create Link"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LinkModal;
