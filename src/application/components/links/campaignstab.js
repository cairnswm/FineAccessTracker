import React from "react";
import { Card, Button } from "react-bootstrap";
import CampaignTable from "./campaigntable";

const CampaignsTab = ({ 
  campaigns, 
  campaignsLoading, 
  links, 
  getApplicationName, 
  openAddCampaign, 
  openEditCampaign, 
  handleDeleteCampaign, 
  handleViewCampaignLinks 
}) => {
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Your Campaigns</h5>
        <Button variant="primary" onClick={openAddCampaign}>
          Add New Campaign
        </Button>
      </Card.Header>
      <Card.Body>
        {campaignsLoading ? (
          <p>Loading campaigns...</p>
        ) : campaigns.length === 0 ? (
          <p>No campaigns found. Create your first campaign!</p>
        ) : (
          <CampaignTable 
            campaigns={campaigns}
            links={links}
            getApplicationName={getApplicationName}
            onViewLinks={handleViewCampaignLinks}
            onEditCampaign={openEditCampaign}
            onDeleteCampaign={handleDeleteCampaign}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default CampaignsTab;
