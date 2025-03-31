import React from "react";
import { Row, Col } from "react-bootstrap";
import CampaignCard from "./campaigncard";

const CampaignCards = ({ 
  campaigns, 
  links, 
  getApplicationName, 
  onEditCampaign, 
  onDeleteCampaign 
}) => {
  const getLinkCount = (campaignId) => {
    return links.filter(link => link.campaign_id === campaignId).length;
  };

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {campaigns.map(campaign => (
        <Col key={campaign.id}>
          <CampaignCard 
            campaign={campaign}
            getApplicationName={getApplicationName}
            linkCount={getLinkCount(campaign.id)}
            onEdit={onEditCampaign}
            onDelete={onDeleteCampaign}
          />
        </Col>
      ))}
    </Row>
  );
};

export default CampaignCards;
