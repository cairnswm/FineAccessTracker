import React from "react";
import { Card, Button } from "react-bootstrap";
import CampaignCards from "./campaigncards";

const CampaignsTab = ({ 
  campaigns, 
  campaignsLoading, 
  links, 
  getApplicationName, 
  openAddCampaign, 
  openEditCampaign, 
  handleDeleteCampaign 
}) => {
  return (
          <CampaignCards 
            campaigns={campaigns}
            links={links}
            getApplicationName={getApplicationName}
            onEditCampaign={openEditCampaign}
            onDeleteCampaign={handleDeleteCampaign}
          />
  );
};

export default CampaignsTab;
