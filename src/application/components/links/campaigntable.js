import React from "react";
import { Table } from "react-bootstrap";
import CampaignRow from "./campaignrow";

const CampaignTable = ({ 
  campaigns, 
  links, 
  getApplicationName, 
  onViewLinks, 
  onEditCampaign, 
  onDeleteCampaign 
}) => {
  const getLinkCount = (campaignId) => {
    return links.filter(link => link.campaign_id === campaignId).length;
  };

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Application</th>
          <th>Links</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {campaigns.map(campaign => (
          <CampaignRow 
            key={campaign.id}
            campaign={campaign}
            getApplicationName={getApplicationName}
            linkCount={getLinkCount(campaign.id)}
            onViewLinks={onViewLinks}
            onEdit={onEditCampaign}
            onDelete={onDeleteCampaign}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default CampaignTable;
