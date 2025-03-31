import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import LinkTable from "./linktable";

const LinksTab = ({ 
  links, 
  linksLoading, 
  campaigns, 
  selectedCampaignId, 
  setSelectedCampaignId, 
  getCampaignName, 
  getClickCount, 
  formatDate, 
  openAddLink, 
  openEditLink, 
  handleDeleteLink 
}) => {
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Your Links</h5>
        <div>
          <Form.Select 
            className="d-inline-block me-2" 
            style={{ width: "auto" }}
            value={selectedCampaignId || ""}
            onChange={(e) => setSelectedCampaignId(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">All Campaigns</option>
            {campaigns.map(campaign => (
              <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
            ))}
          </Form.Select>
          <Button variant="primary" onClick={openAddLink}>
            Add New Link
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        {linksLoading ? (
          <p>Loading links...</p>
        ) : links.length === 0 ? (
          <p>No links found. Create your first link!</p>
        ) : (
          <LinkTable 
            links={links}
            getCampaignName={getCampaignName}
            getClickCount={getClickCount}
            formatDate={formatDate}
            onEditLink={openEditLink}
            onDeleteLink={handleDeleteLink}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default LinksTab;
